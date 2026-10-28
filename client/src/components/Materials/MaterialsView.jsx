import { useState, useEffect } from "react";
import { SUBJECTS } from "../../data/curriculum";
import {
  IconBookOpen,
  IconBrain,
  IconCheckCircle,
  IconSparkles,
  IconTeacher
} from "../Icons";

export function MaterialsView({ studentState, onLaunchCompanion }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSubject, setUploadSubject] = useState("aad");
  const [uploadModule, setUploadModule] = useState(1);

  // Ask My Materials State
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${studentState.settings.apiUrl}/api/documents`);
      const data = await res.json();
      if (data.documents) {
        setDocuments(data.documents);
      }
    } catch (err) {
      console.warn("Could not fetch documents from server:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("subject", uploadSubject);
    formData.append("module", uploadModule);

    try {
      setUploading(true);
      setUploadMessage("Uploading and extracting vectors into Chroma DB...");

      const res = await fetch(`${studentState.settings.apiUrl}/api/documents/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setUploadMessage(data.message || "File uploaded successfully!");
      setSelectedFile(null);
      fetchDocuments();
    } catch (err) {
      setUploadMessage("Upload failed. Make sure server is running on port 5000.");
    } finally {
      setUploading(false);
    }
  };

  const handleAskMaterials = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setSearching(true);
      setSearchResult(null);

      const res = await fetch(`${studentState.settings.apiUrl}/api/ai/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
          api_key: studentState.settings.geminiKey
        })
      });

      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      setSearchResult({
        answer: "Could not connect to the AI search service. Please check your backend connection.",
        matches: []
      });
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <IconBookOpen className="w-5 h-5 text-cyan-400" />
              My Study Materials & RAG Document Intelligence
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload your PDFs, class notes, and question papers. The AI extracts chunks, embeds them into vectors, and grounds all answers with page citations.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            {documents.length} Materials Ingested
          </span>
        </div>
      </div>

      {/* Grid: Upload Box & Ask My Materials */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upload Material Form (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <IconSparkles className="w-4 h-4 text-cyan-400" />
            Upload New Study Material
          </h3>

          <form onSubmit={handleFileUpload} className="space-y-3">
            <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-xl p-5 text-center transition cursor-pointer bg-slate-950/40">
              <input
                type="file"
                accept=".pdf,.docx,.pptx,.txt,.md"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
                id="material-file-upload"
              />
              <label htmlFor="material-file-upload" className="cursor-pointer space-y-1 block">
                <IconBookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                <span className="text-xs font-bold text-slate-200 block">
                  {selectedFile ? selectedFile.name : "Click to select PDF or notes"}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  PDF, DOCX, PPTX, TXT (Auto-indexed with PyMuPDF & Chroma)
                </span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Subject:</label>
                <select
                  value={uploadSubject}
                  onChange={(e) => setUploadSubject(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.8 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {Object.values(SUBJECTS).map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Module:</label>
                <select
                  value={uploadModule}
                  onChange={(e) => setUploadModule(parseInt(e.target.value, 10))}
                  className="w-full text-xs px-2.5 py-1.8 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>Module {n}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedFile || uploading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition"
            >
              {uploading ? "Ingesting & Embedding..." : "Ingest Material into AI Brain"}
            </button>
          </form>

          {uploadMessage && (
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-cyan-300">
              {uploadMessage}
            </div>
          )}
        </div>

        {/* Right: "Ask My Materials" Search & Q&A (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <IconBrain className="w-4 h-4 text-cyan-400" />
            Ask My Materials (Grounded RAG Search)
          </h3>

          <form onSubmit={handleAskMaterials} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask anything (e.g. 'What are the 3 cases of Master's Theorem?')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={searching}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs disabled:opacity-50 transition"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </form>

          {/* RAG Answer Display */}
          {searchResult && (
            <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-300 border-b border-slate-800 pb-2">
                <span>Grounded AI Tutor Answer:</span>
                <span className="text-[10px] text-slate-400">Strict Source Verification</span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                {searchResult.answer}
              </p>

              {/* Retrieved Chunks with Page Badges */}
              {searchResult.matches?.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Verified Source Pages ({searchResult.matches.length}):
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {searchResult.matches.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-cyan-400 font-semibold">
                          <span>Page {m.page} ({m.filename})</span>
                          <span className="text-slate-500 font-mono">Distance: {m.distance?.toFixed(3)}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2">{m.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Materials Library Grid */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
        <h3 className="text-sm font-extrabold text-white">Ingested Materials In AI Vector Brain</h3>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading documents...</div>
        ) : documents.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No custom materials uploaded yet. Upload your PDFs above or study from the built-in syllabus.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <IconBookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-xs font-bold text-white line-clamp-1">{doc.originalName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-slate-700/60 text-cyan-300 font-bold uppercase">
                    {doc.subject || "General"}
                  </span>
                  <span>{(doc.size / (1024 * 1024)).toFixed(2)} MB</span>
                  {doc.totalPages > 0 && <span>• {doc.totalPages} Pages</span>}
                </div>

                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                  <a
                    href={`${studentState.settings.apiUrl}${doc.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-cyan-400 hover:underline font-semibold"
                  >
                    Open PDF ↗
                  </a>
                  <button
                    onClick={() => onLaunchCompanion(doc.originalName, doc.subject || "aad")}
                    className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 font-bold transition"
                  >
                    Teach from this
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
