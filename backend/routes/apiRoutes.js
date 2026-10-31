import express from "express";
import multer from "multer";
import path from "path";
import pool from "../config/database.js";

const router = express.Router();

console.log("VERITAS AI API ROUTES FILE LOADED");

// ==============================
// MULTER CONFIGURATION
// ==============================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage
});

// ==============================
// API WELCOME ROUTE
// ==============================

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "VERITAS AI API is working!"
    });
});

// ==============================
// API STATUS ROUTE
// ==============================

router.get("/status", (req, res) => {
    res.json({
        success: true,
        project: "VERITAS AI",
        backend: "Active",
        database: "Connected"
    });
});

// ==============================
// DOCUMENT UPLOAD ROUTE
// ==============================

router.post("/upload", upload.single("document"), async (req, res) => {

    try {

        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No document uploaded"
            });
        }

        // Insert file information into MySQL
        const sql = `
            INSERT INTO documents
            (
                original_filename,
                stored_filename,
                file_path,
                file_type,
                file_size,
                processing_status
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [
            req.file.originalname,
            req.file.filename,
            req.file.path,
            req.file.mimetype,
            req.file.size,
            "uploaded"
        ];

        const [result] = await pool.execute(sql, values);

        // Send response
        res.status(200).json({
            success: true,
            message: "Document uploaded and saved to database successfully!",
            documentId: result.insertId,

            file: {
                originalName: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size,
                type: req.file.mimetype
            }
        });

    } catch (error) {

        console.error("Upload Error:", error);

        res.status(500).json({
            success: false,
            message: "Error uploading document",
            error: error.message
        });
    }

});

export default router;