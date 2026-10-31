import express from "express";
import multer from "multer";
import path from "path";

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

router.post("/upload", upload.single("document"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No document uploaded"
        });
    }

    res.status(200).json({
        success: true,
        message: "Document uploaded successfully!",
        file: {
            originalName: req.file.originalname,
            filename: req.file.filename,
            size: req.file.size
        }
    });
});

export default router;