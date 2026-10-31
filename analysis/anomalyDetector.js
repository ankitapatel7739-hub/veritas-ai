
/*
    VERITAS AI
    Anomaly Detection Engine

    Purpose:
    Identify missing, invalid and suspicious information
    inside individual documents.
*/


// STEP 1: Define required fields for each document type

const requiredFields = {

    salary_slip: ["name", "salary"],

    bank_statement: ["name"],

    identity_proof: ["name", "dateOfBirth"]

};


// STEP 2: Read simple or structured OCR values

function readField(fieldData) {

    if (fieldData === undefined || fieldData === null) {
        return null;
    }

    // Simple value, for example: "Aditi Sharma"
    if (
        typeof fieldData !== "object" ||
        Array.isArray(fieldData)
    ) {
        return {
            value: fieldData,
            confidence: null,
            page: null,
            sourceText: null,
            boundingBox: null
        };
    }

    // Structured OCR value
    return {
        value: fieldData.value,
        confidence:
            fieldData.confidence ??
            fieldData.ocrConfidence ??
            null,

        page: fieldData.page ?? null,

        sourceText: fieldData.sourceText ?? null,

        boundingBox: fieldData.boundingBox ?? null
    };
}


// STEP 3: Check whether a field is empty

function isEmpty(value) {

    return (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    );
}


// STEP 4: Validate dates

function isValidDate(value) {

    if (typeof value !== "string") {
        return false;
    }

    const date = value.trim();

    let year, month, day;

    // Format: YYYY-MM-DD
    const isoMatch = date.match(
        /^(\d{4})-(\d{1,2})-(\d{1,2})$/
    );

    // Format: DD/MM/YYYY or DD-MM-YYYY
    const indianMatch = date.match(
        /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/
    );

    if (isoMatch) {

        [, year, month, day] = isoMatch;

    } else if (indianMatch) {

        [, day, month, year] = indianMatch;

    } else {

        return false;
    }

    const y = Number(year);
    const m = Number(month);
    const d = Number(day);

    const parsed = new Date(Date.UTC(y, m - 1, d));

    // Check whether the calendar date actually exists
    return (
        parsed.getUTCFullYear() === y &&
        parsed.getUTCMonth() === m - 1 &&
        parsed.getUTCDate() === d
    );
}


// STEP 5: Create a standard finding

function createFinding(document, field, type, severity, message, fieldData) {

    return {

        findingId: `ANOM-${document.documentId || "UNKNOWN"}-${field}`,

        category: "Document anomaly",

        documentId: document.documentId || null,

        documentType: document.documentType || "unknown",

        field: field,

        type: type,

        severity: severity,

        message: message,

        evidence: fieldData ? {
            value: fieldData.value,
            page: fieldData.page,
            sourceText: fieldData.sourceText,
            boundingBox: fieldData.boundingBox,
            ocrConfidence: fieldData.confidence
        } : null,

        status: "Needs review"
    };
}


// STEP 6: Main anomaly detection function

export function detectAnomalies(documents) {

    const anomalies = [];

    // Check input
    if (!Array.isArray(documents)) {
        throw new TypeError(
            "detectAnomalies expects an array of documents"
        );
    }

    for (const document of documents) {

        const fields = document.fields || {};

        // Check document ID
        if (isEmpty(document.documentId)) {

            anomalies.push(
                createFinding(
                    document,
                    "documentId",
                    "Missing Identifier",
                    "Medium",
                    "Document ID is missing.",
                    null
                )
            );
        }

        // STEP 6A: Check required fields

        const required =
            requiredFields[document.documentType] || [];

        for (const field of required) {

            const fieldData = readField(fields[field]);

            if (
                !fieldData ||
                isEmpty(fieldData.value)
            ) {

                anomalies.push(
                    createFinding(
                        document,
                        field,
                        "Missing Information",
                        "Medium",
                        `${field} is missing from ${document.documentType}.`,
                        null
                    )
                );
            }
        }


        // STEP 6B: Check all extracted fields

        for (const field of Object.keys(fields)) {

            const fieldData = readField(fields[field]);

            if (!fieldData || isEmpty(fieldData.value)) {
                continue;
            }

            const value = fieldData.value;


            // Validate salary
            if (
                field === "salary" ||
                field === "monthlySalaryCredit"
            ) {

                const numericValue = Number(value);

                if (
                    !Number.isFinite(numericValue) ||
                    numericValue <= 0
                ) {

                    anomalies.push(
                        createFinding(
                            document,
                            field,
                            "Invalid Value",
                            "High",
                            `${field} must be a valid positive number.`,
                            fieldData
                        )
                    );
                }
            }


            // Validate date of birth
            if (field === "dateOfBirth") {

                if (!isValidDate(value)) {

                    anomalies.push(
                        createFinding(
                            document,
                            field,
                            "Invalid Date",
                            "High",
                            "Date of birth is invalid or uses an unsupported format.",
                            fieldData
                        )
                    );
                }
            }


            // Check OCR confidence
            if (
                typeof fieldData.confidence === "number" &&
                (
                    fieldData.confidence < 0 ||
                    fieldData.confidence > 1
                )
            ) {

                anomalies.push(
                    createFinding(
                        document,
                        field,
                        "Invalid OCR Confidence",
                        "Medium",
                        "OCR confidence must be between 0 and 1.",
                        fieldData
                    )
                );

            } else if (
                typeof fieldData.confidence === "number" &&
                fieldData.confidence < 0.70
            ) {

                anomalies.push(
                    createFinding(
                        document,
                        field,
                        "Low OCR Confidence",
                        "Medium",
                        `OCR has low confidence while reading ${field}. Manual verification is recommended.`,
                        fieldData
                    )
                );
            }
        }
    }

    return anomalies;
}
