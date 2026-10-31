
/*
    VERITAS AI
    Cross-Document Analysis Engine

    Purpose:
    Compare extracted information across related documents.
*/


// STEP 1: Define which fields can be compared

const comparableFields = {

    name: {
        label: "Name",
        documentTypes: [
            "salary_slip",
            "bank_statement",
            "identity_proof"
        ],
        severity: "High"
    },

    dateOfBirth: {
        label: "Date of Birth",
        documentTypes: [
            "identity_proof",
            "salary_slip"
        ],
        severity: "Medium"
    },

    address: {
        label: "Address",
        documentTypes: [
            "identity_proof",
            "salary_slip",
            "bank_statement"
        ],
        severity: "Medium"
    },

    salary: {
        label: "Salary",
        documentTypes: ["salary_slip"],
        severity: "Medium"
    }
};


// STEP 2: Read both simple and structured OCR values

function readField(fieldData) {

    // Field is missing
    if (fieldData === undefined || fieldData === null) {
        return null;
    }

    // Simple value: "Aditi Sharma"
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


// STEP 3: Check whether a value is empty

function isEmpty(value) {

    return (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    );
}


// STEP 4: Validate and normalize dates

function normalizeDate(value) {

    const date = String(value).trim();

    // Accept ISO format: YYYY-MM-DD
    let year, month, day;

    const isoMatch = date.match(
        /^(\d{4})-(\d{1,2})-(\d{1,2})$/
    );

    // Accept Indian-style DD/MM/YYYY or DD-MM-YYYY
    const indianMatch = date.match(
        /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/
    );

    if (isoMatch) {

        [, year, month, day] = isoMatch;

    } else if (indianMatch) {

        [, day, month, year] = indianMatch;

    } else {

        return date.toLowerCase();
    }

    const y = Number(year);
    const m = Number(month);
    const d = Number(day);

    const parsedDate = new Date(Date.UTC(y, m - 1, d));

    // Reject impossible dates such as 32/15/2004
    if (
        parsedDate.getUTCFullYear() !== y ||
        parsedDate.getUTCMonth() !== m - 1 ||
        parsedDate.getUTCDate() !== d
    ) {
        return date.toLowerCase();
    }

    return [
        String(y).padStart(4, "0"),
        String(m).padStart(2, "0"),
        String(d).padStart(2, "0")
    ].join("-");
}


// STEP 5: Normalize values before comparing

function normalizeValue(value, field) {

    if (isEmpty(value)) {
        return "";
    }

    let normalized = String(value)
        .trim()
        .toLowerCase();

    if (field === "name") {

        normalized = normalized
            .replace(/[.,]/g, "")
            .replace(/\s+/g, " ");
    }

    if (field === "address") {

        normalized = normalized
            .replace(/[.,]/g, "")
            .replace(/\s+/g, " ");
    }

    if (field === "dateOfBirth") {

        normalized = normalizeDate(value);
    }

    return normalized;
}


// STEP 6: Main cross-document analysis function

export function analyzeDocuments(documents) {

    const findings = [];

    // Protect against invalid input
    if (!Array.isArray(documents)) {
        throw new TypeError(
            "analyzeDocuments expects an array of documents"
        );
    }

    for (const field of Object.keys(comparableFields)) {

        const configuration = comparableFields[field];

        const values = [];

        for (const document of documents) {

            // Ignore unrelated document types
            if (
                !configuration.documentTypes.includes(
                    document.documentType
                )
            ) {
                continue;
            }

            // Read the field
            const fieldData = readField(
                document.fields?.[field]
            );

            if (!fieldData || isEmpty(fieldData.value)) {
                continue;
            }

            values.push({

                documentId: document.documentId,

                documentType: document.documentType,

                value: fieldData.value,

                normalizedValue: normalizeValue(
                    fieldData.value,
                    field
                ),

                confidence: fieldData.confidence,

                page: fieldData.page,

                sourceText: fieldData.sourceText,

                boundingBox: fieldData.boundingBox
            });
        }

        // At least two documents must contain the field
        if (values.length < 2) {
            continue;
        }

        // Find distinct normalized values
        const uniqueValues = [
            ...new Set(
                values.map(item => item.normalizedValue)
            )
        ];

        // Different values indicate an inconsistency
        if (uniqueValues.length > 1) {

            findings.push({

                findingId: `FIND-${field.toUpperCase()}`,

                category: "Cross-document inconsistency",

                field: field,

                label: configuration.label,

                issue: "Value mismatch",

                severity: configuration.severity,

                explanation:
                    `${configuration.label} has different values across comparable documents.`,

                details: values.map(item => ({

                    documentId: item.documentId,

                    documentType: item.documentType,

                    value: item.value,

                    page: item.page,

                    sourceText: item.sourceText,

                    boundingBox: item.boundingBox,

                    ocrConfidence: item.confidence
                })),

                status: "Needs review"
            });
        }
    }

    return findings;
}
