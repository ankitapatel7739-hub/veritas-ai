
export function detectAnomalies(documents) {

    const anomalies = [];

    // Required fields for each document type
    const requiredFields = {
        salary_slip: ["name", "salary"],
        bank_statement: ["name"],
        identity_proof: ["name", "dateOfBirth"]
    };

    for (const document of documents) {

        const fields = document.fields || {};

        // Check required fields
        const required = requiredFields[document.documentType] || [];

        for (const field of required) {

            const value = fields[field];

            if (
                value === undefined ||
                value === null ||
                String(value).trim() === ""
            ) {

                anomalies.push({
                    documentId: document.documentId,
                    field: field,
                    type: "Missing Information",
                    severity: "Medium",
                    message: `${field} is missing from ${document.documentType}`
                });
            }
        }

        // Check whether salary is valid
        if (
            fields.salary !== undefined &&
            (
                typeof fields.salary !== "number" ||
                !Number.isFinite(fields.salary) ||
                fields.salary <= 0
            )
        ) {

            anomalies.push({
                documentId: document.documentId,
                field: "salary",
                type: "Invalid Value",
                severity: "High",
                message: "Salary contains an invalid or unusual value"
            });
        }

        // Check whether document ID is missing
        if (!document.documentId) {

            anomalies.push({
                documentId: null,
                field: "documentId",
                type: "Missing Identifier",
                severity: "Medium",
                message: "Document ID is missing"
            });
        }
    }

    return anomalies;
}
