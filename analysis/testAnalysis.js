
import { sampleDocuments } from "./sampleData.js";

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