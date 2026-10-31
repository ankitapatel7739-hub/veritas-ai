
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