import apiRoutes from "./routes/apiRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";


dotenv.config();

const app = express();
console.log("VERITAS SERVER FILE IS RUNNING");

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);
app.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Direct test route is working!"
    });
});

// Welcome route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to VERITAS AI Backend!"
    });
});

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "VERITAS AI server is running successfully.",
        status: "Active"
    });
});

// Start server after checking database
const startServer = async () => {
    const isDatabaseConnected = await testConnection();

    if (!isDatabaseConnected) {
        console.error("Server startup stopped because database connection failed.");
        process.exit(1);
    }

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`VERITAS AI Backend running on http://localhost:${PORT}`);
    });
};

startServer();