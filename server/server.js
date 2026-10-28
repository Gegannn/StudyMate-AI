const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const METADATA_FILE = path.join(UPLOADS_DIR, "metadata.json");

function getMetadata() {
  try {
    if (fs.existsSync(METADATA_FILE)) {
      return JSON.parse(fs.readFileSync(METADATA_FILE, "utf-8"));
    }
  } catch (e) {
    console.error("Error reading metadata:", e);
  }
  return {};
}

function saveMetadata(meta) {
  try {
    fs.writeFileSync(METADATA_FILE, JSON.stringify(meta, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving metadata:", e);
  }
}

// -----------------------------
// Multer configuration
// -----------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    // Sanitize filename
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    const uniqueName = Date.now() + "-" + safeName;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".docx", ".pptx", ".txt", ".md"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext) || file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Supported formats: PDF, DOCX, PPTX, TXT, MD"));
    }
  }
});

// Serve uploaded PDFs & static client dist
app.use("/uploads", express.static(UPLOADS_DIR));
const clientDist = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

// -----------------------------
// Health Check
// -----------------------------
app.get("/api/health", async (req, res) => {
  let pythonStatus = "offline";
  let indexedChunks = 0;
  try {
    const pyRes = await axios.get("http://127.0.0.1:8000/", { timeout: 1500 });
    pythonStatus = pyRes.data?.status || "online";
    indexedChunks = pyRes.data?.indexed_chunks || 0;
  } catch (err) {
    pythonStatus = "offline";
  }

  res.json({
    node_server: "online",
    python_ai_brain: pythonStatus,
    indexed_chunks: indexedChunks,
    uploads_dir: UPLOADS_DIR
  });
});

// -----------------------------
// Document Library Routes
// -----------------------------
app.get("/api/documents", (req, res) => {
  const metadata = getMetadata();
  const files = fs.readdirSync(UPLOADS_DIR);

  const documents = files
    .filter(file => file !== "metadata.json" && !file.startsWith("."))
    .map(filename => {
      const filePath = path.join(UPLOADS_DIR, filename);
      const stat = fs.statSync(filePath);
      const meta = metadata[filename] || {};

      return {
        filename: filename,
        originalName: meta.originalName || filename.replace(/^\d+-/, ""),
        size: stat.size,
        uploadedAt: meta.uploadedAt || stat.birthtime,
        subject: meta.subject || "General",
        module: meta.module || null,
        topic: meta.topic || null,
        totalPages: meta.totalPages || 0,
        totalChunks: meta.totalChunks || 0,
        url: `/uploads/${encodeURIComponent(filename)}`
      };
    });

  res.json({ documents });
});

app.post("/api/documents/upload", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No document file uploaded" });
  }

  const subject = req.body.subject || "General";
  const moduleNum = req.body.module ? parseInt(req.body.module, 10) : null;
  const topic = req.body.topic || null;

  const absolutePath = path.resolve(req.file.path);
  const metadata = getMetadata();

  let totalPages = 0;
  let totalChunks = 0;
  let storedChunks = 0;
  let pythonConnected = false;

  try {
    // Attempt sending to Python AI service
    const pythonResponse = await axios.post("http://127.0.0.1:8000/extract", {
      pdf_path: absolutePath,
      filename: req.file.originalname
    }, { timeout: 30000 });

    totalPages = pythonResponse.data.total_pages || 0;
    totalChunks = pythonResponse.data.total_chunks || 0;
    storedChunks = pythonResponse.data.stored_chunks || 0;
    pythonConnected = true;
  } catch (err) {
    console.warn("Python AI service offline or busy. Storing file locally without vector indexing:", err.message);
  }

  // Update metadata
  metadata[req.file.filename] = {
    originalName: req.file.originalname,
    uploadedAt: new Date().toISOString(),
    subject: subject,
    module: moduleNum,
    topic: topic,
    totalPages: totalPages,
    totalChunks: totalChunks,
    storedChunks: storedChunks,
    size: req.file.size
  };
  saveMetadata(metadata);

  res.json({
    message: pythonConnected ? "Material ingested & indexed into AI Brain!" : "Material uploaded to library (AI indexing queued)",
    filename: req.file.filename,
    originalName: req.file.originalname,
    subject: subject,
    totalPages: totalPages,
    totalChunks: totalChunks,
    pythonConnected: pythonConnected
  });
});

app.post("/api/documents/assign", (req, res) => {
  const { filename, subject, module: moduleNum, topic } = req.body;
  if (!filename) return res.status(400).json({ error: "Filename is required" });

  const metadata = getMetadata();
  if (!metadata[filename]) {
    metadata[filename] = {};
  }
  if (subject) metadata[filename].subject = subject;
  if (moduleNum !== undefined) metadata[filename].module = moduleNum;
  if (topic !== undefined) metadata[filename].topic = topic;

  saveMetadata(metadata);
  res.json({ success: true, metadata: metadata[filename] });
});

app.delete("/api/documents/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(UPLOADS_DIR, filename);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    const metadata = getMetadata();
    delete metadata[filename];
    saveMetadata(metadata);
    res.json({ success: true, message: `Deleted ${filename}` });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// -----------------------------
// AI Proxy Routes
// -----------------------------
app.post("/api/ai/search", async (req, res) => {
  const { query, filename, mode, api_key } = req.body;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const pyRes = await axios.post("http://127.0.0.1:8000/search", {
      query,
      filename,
      mode: mode || "general",
      api_key
    }, { timeout: 25000 });
    res.json(pyRes.data);
  } catch (err) {
    console.warn("Python search unavailable. Returning contextual response.");
    res.json({
      success: true,
      query: query,
      answer: `StudyMate AI Notice: Python vector brain is currently offline. You can review your syllabus materials and notes in the Study Map and Companion mode.`,
      matches: []
    });
  }
});

app.post("/api/ai/teach", async (req, res) => {
  const { topic, subject, module: mod, layer, filename, api_key } = req.body;
  if (!topic) return res.status(400).json({ error: "Topic is required" });

  try {
    const pyRes = await axios.post("http://127.0.0.1:8000/teach", {
      topic,
      subject,
      module: mod,
      layer: layer || "intuition",
      filename,
      api_key
    }, { timeout: 25000 });
    res.json(pyRes.data);
  } catch (err) {
    res.json({
      success: true,
      topic: topic,
      layer: layer || "intuition",
      answer: `AI Brain is processing in offline mode. Topic: ${topic}.`,
      matches: []
    });
  }
});

// Fallback for SPA or status
app.use((req, res) => {
  const indexPath = path.join(__dirname, "../client/dist/index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({ message: "StudyMate AI Backend Server is running on port 5000" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`StudyMate AI Server running on http://localhost:${PORT}`);
});
