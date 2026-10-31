
/*
    VERITAS AI
    Contextual Analysis Engine

    Purpose:
    Check relationships between information in different
    documents, rather than simply comparing individual fields.
*/


// Read simple and structured OCR values

function readField(fieldData) {

    if (fieldData === undefined || fieldData === null) {
        return null;
    }

    if (
        typeof fieldData !== "object" ||
        Array.isArray(fieldData)
    ) {
        return {
            value: fieldData,
            confidence: null,
            page: null,
            sourceText: null
        };
    }

    return {
        value: fieldData.value,
        confidence:
            fieldData.confidence ??
            fieldData.ocrConfidence ??
            null,
        page: fieldData.page ?? null,
        sourceText: fieldData.sourceText ?? null
    };
}


// Convert salary values into numbers

function parseAmount(value) {

    if (typeof value === "number") {
        return Number.isFinite(value) ? value : null;
    }

    if (typeof value !== "string") {
        return null;
    }

    // Remove currency symbols, commas and spaces
    const cleaned = value.replace(/[₹,\s]/g, "");

    if (cleaned === "") {
        return null;
    }

    const amount = Number(cleaned);

    return Number.isFinite(amount) ? amount : null;
}


// Check whether a value is present

function isPresent(value) {

    return (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
    );
}


// Main contextual analysis function

export function analyzeContext(documents) {

    if (!Array.isArray(documents)) {
        throw new TypeError(
            "analyzeContext expects an array of documents"
        );
    }

    const findings = [];

    // Find salary slips and bank statements
    const salarySlips = documents.filter(
        doc => doc.documentType === "salary_slip"
    );

    const bankStatements = documents.filter(
        doc => doc.documentType === "bank_statement"
    );


    // Compare salary information across related documents

    for (const salarySlip of salarySlips) {

        for (const bankStatement of bankStatements) {

            const salary = readField(
                salarySlip.fields?.salary
            );

            const bankCredit = readField(
                bankStatement.fields?.monthlySalaryCredit
            );

            // Both values must exist
            if (
                !salary ||
                !bankCredit ||
                !isPresent(salary.value) ||
                !isPresent(bankCredit.value)
            ) {
                continue;
            }


            // Both documents must identify their periods
            const salaryPeriod = readField(
                salarySlip.fields?.salaryPeriod
            );

            const creditPeriod = readField(
                bankStatement.fields?.creditPeriod
            );

            if (
                !salaryPeriod ||
                !creditPeriod ||
                !isPresent(salaryPeriod.value) ||
                !isPresent(creditPeriod.value)
            ) {
                continue;
            }


            // Compare only matching periods
            if (
                String(salaryPeriod.value).trim() !==
                String(creditPeriod.value).trim()
            ) {
                continue;
            }


            const salaryAmount = parseAmount(salary.value);

            const creditAmount = parseAmount(bankCredit.value);


            // Ignore invalid or negative amounts
            if (
                salaryAmount === null ||
                creditAmount === null ||
                salaryAmount < 0 ||
                creditAmount < 0
            ) {
                continue;
            }


            // Different values require investigation
            if (salaryAmount !== creditAmount) {

                findings.push({

                    findingId:
                        `CTX-SALARY-${salarySlip.documentId}-${bankStatement.documentId}`,

                    category: "Contextual inconsistency",

                    field: "salaryCredit",

                    issue: "Salary and bank credit mismatch",

                    severity: "Medium",

                    explanation:
                        "The salary amount in the salary slip differs from the salary credit recorded in the bank statement for the same period.",

                    details: [

                        {
                            documentId: salarySlip.documentId,

                            documentType: "salary_slip",

                            field: "salary",

                            value: salary.value,

                            page: salary.page,

                            sourceText: salary.sourceText,

                            ocrConfidence: salary.confidence
                        },

                        {
                            documentId: bankStatement.documentId,

                            documentType: "bank_statement",

                            field: "monthlySalaryCredit",

                            value: bankCredit.value,

                            page: bankCredit.page,

                            sourceText: bankCredit.sourceText,

                            ocrConfidence: bankCredit.confidence
                        }

                    ],

                    period: salaryPeriod.value,

                    status: "Needs review"
                });
            }
        }
    }

    return findings;
}
