

import { sampleDocuments } from "./sampleData.js";

import { analyzeContext } from "./contextualAnalyzer.js";

import { analyzeDocuments } from "./documentAnalyzer.js";

import { detectAnomalies } from "./anomalyDetector.js";

console.log("========== DOCUMENT ANALYSIS ==========");

const findings = analyzeDocuments(sampleDocuments);

console.log("Comparison Findings:");
console.dir(findings, { depth: null });

console.log("========== ANOMALY DETECTION ==========");

const anomalies = detectAnomalies(sampleDocuments);

console.log("Detected Anomalies:");
console.dir(anomalies, { depth: null });
const suspiciousTestDocuments = [
    {
        documentId: "TEST001",
        documentType: "identity_proof",

        fields: {
            name: {
                value: "Aditi Sharma",
                confidence: 0.45,
                page: 1,
                sourceText: "Name: Aditi Sharma"
            },

            dateOfBirth: {
                value: "32/15/2004",
                confidence: 0.98,
                page: 1,
                sourceText: "DOB: 32/15/2004"
            }
        }
    }
];

console.log("ANOMALY TEST");

console.dir(
    detectAnomalies(suspiciousTestDocuments),
    { depth: null }
);
// CONTEXTUAL ANALYSIS TEST

const contextualTestDocuments = [

    {
        documentId: "CTX001",
        documentType: "salary_slip",

        fields: {
            salary: {
                value: 45000,
                confidence: 0.98,
                page: 1,
                sourceText: "Net Salary: 45000"
            },

            salaryPeriod: "2026-10"
        }
    },

    {
        documentId: "CTX002",
        documentType: "bank_statement",

        fields: {
            monthlySalaryCredit: {
                value: 40000,
                confidence: 0.97,
                page: 2,
                sourceText: "Salary Credit: 40000"
            },

            creditPeriod: "2026-10"
        }
    }

];

console.log("CONTEXTUAL ANALYSIS");

console.dir(
    analyzeContext(contextualTestDocuments),
    { depth: null }
);