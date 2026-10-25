const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());


// -----------------------------
// Multer configuration
// -----------------------------

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {

        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }

    }
});


// -----------------------------
// Test routes
// -----------------------------

app.get("/", (req, res) => {
    res.json({
        message: "StudyMate AI backend is running!"
    });
});


app.get("/api/test", (req, res) => {
    res.json({
        message: "Hello from StudyMate backend!"
    });
});


// -----------------------------
// PDF upload route
// -----------------------------

app.post(
    "/api/documents/upload",
    upload.single("pdf"),
    async (req, res) => {

        if (!req.file) {
            return res.status(400).json({
                message: "No PDF file uploaded"
            });
        }

        try {

            // Get the full absolute path of the uploaded PDF
            const absolutePath = path.resolve(req.file.path);

            console.log("PDF saved at:", absolutePath);

            // Send the absolute path to Python
            const pythonResponse = await axios.post(
                "http://127.0.0.1:8000/extract",
                {
                    pdf_path: absolutePath,
                    filename: req.file.originalname
                }
            );

            console.log("Python extraction successful");

            res.json({
                message: "PDF uploaded and processed successfully!",
                filename: req.file.filename,
                total_pages: pythonResponse.data.total_pages,
                total_chunks: pythonResponse.data.total_chunks,
                stored_chunks: pythonResponse.data.stored_chunks
            });

        } catch (error) {

            console.error(
                "PDF extraction error:",
                error.response?.data || error.message
            );

            res.status(500).json({
                message: "PDF uploaded, but text extraction failed."
            });

        }
    }
);


// -----------------------------
// Start server
// -----------------------------

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});