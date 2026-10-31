
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


// Convert text into a standard format
function normalizeValue(value, field) {

    if (value === null || value === undefined) {
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

        const parts = normalized.split(/[/-]/);

        if (parts.length === 3) {

            let day, month, year;

            if (parts[0].length === 4) {
                [year, month, day] = parts;
            } else {
                [day, month, year] = parts;
            }

            if (
                day.length <= 2 &&
                month.length <= 2 &&
                year.length === 4
            ) {
                return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            }
        }
    }

    return normalized;
}


// Main document comparison function
export function analyzeDocuments(documents) {

    const findings = [];

    const fieldsToCompare = Object.keys(comparableFields);

    for (const field of fieldsToCompare) {

        const configuration = comparableFields[field];

        const values = [];

        for (const document of documents) {

            // Compare only allowed document types
            if (
                !configuration.documentTypes.includes(
                    document.documentType
                )
            ) {
                continue;
            }

            const value = document.fields?.[field];

            if (
                value === undefined ||
                value === null ||
                String(value).trim() === ""
            ) {
                continue;
            }

            values.push({
                documentId: document.documentId,
                documentType: document.documentType,
                value: value,
                normalizedValue: normalizeValue(value, field)
            });
        }

        // At least two documents must contain the field
        if (values.length < 2) {
            continue;
        }

        const uniqueValues = [
            ...new Set(
                values.map(item => item.normalizedValue)
            )
        ];

        if (uniqueValues.length > 1) {

            findings.push({

                field: field,

                label: configuration.label,

                issue: "Value mismatch",

                severity: configuration.severity,

                explanation:
                    `${configuration.label} has different values across comparable documents.`,

                details: values.map(item => ({
                    documentId: item.documentId,
                    documentType: item.documentType,
                    value: item.value
                })),

                status: "Needs review"
            });
        }
    }

    return findings;
}
