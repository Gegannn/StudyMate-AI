import { useState, useEffect } from "react";
import { IconSettings, IconCheckCircle, IconBrain } from "./Icons";

export function SettingsModal({ isOpen, onClose, studentState, onSaveSettings, onResetState }) {
  if (!isOpen) return null;

  const [apiUrl, setApiUrl] = useState(studentState.settings.apiUrl || "http://localhost:5000");
  const [geminiKey, setGeminiKey] = useState(studentState.settings.geminiKey || "");
  const [healthStatus, setHealthStatus] = useState(null);
  const [checking, setChecking] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const checkHealth = async () => {
    try {
      setChecking(true);
      const res = await fetch(`${apiUrl}/api/health`);
      const data = await res.json();
      setHealthStatus(data);
    } catch (err) {
      setHealthStatus({ node_server: "offline", python_ai_brain: "offline" });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, [apiUrl]);

  const handleSave = () => {
    onSaveSettings({
      ...studentState.settings,
      apiUrl,
      geminiKey
    });
    setSaveMsg("Settings updated successfully!");
    setTimeout(() => setSaveMsg(""), 2000);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(studentState, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `studymate_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <IconSettings className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-black text-white">System Settings & AI Brain</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white font-bold">✕</button>
        </div>

        {/* Backend Health Status Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">Backend System Diagnostics:</span>
            <button
              onClick={checkHealth}
              disabled={checking}
              className="text-cyan-400 hover:underline text-[11px]"
            >
              {checking ? "Checking..." : "Recheck Status"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Node API:</span>
              <span className={`font-bold ${healthStatus?.node_server === "online" ? "text-emerald-400" : "text-amber-400"}`}>
                {healthStatus?.node_server === "online" ? "● Online (5000)" : "● Standalone Mode"}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Python Brain:</span>
              <span className={`font-bold ${healthStatus?.python_ai_brain === "online" ? "text-emerald-400" : "text-amber-400"}`}>
                {healthStatus?.python_ai_brain === "online" ? "● Online (8000)" : "● Local Heuristic"}
              </span>
            </div>
          </div>

          {healthStatus?.indexed_chunks !== undefined && (
            <div className="text-[11px] text-slate-400 pt-1 font-mono">
              Indexed Knowledge Chunks in Chroma: <strong className="text-cyan-300">{healthStatus.indexed_chunks}</strong>
            </div>
          )}
        </div>

        {/* Configuration Fields */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">Node Backend Server URL:</label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">
              Google Gemini / OpenAI API Key (Optional):
            </label>
            <input
              type="password"
              placeholder="AIzaSy... (For direct cloud LLM generation if Ollama is idle)"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <span className="text-[10px] text-slate-500 block">
              Stored purely locally in your browser's private localStorage. Never sent to any external server.
            </span>
          </div>
        </div>

        {/* Data Persistence Tools */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={handleExportData}
            className="px-3.5 py-1.8 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold"
          >
            Export Backup JSON
          </button>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all task checkboxes and mastery?")) {
                onResetState();
              }
            }}
            className="px-3.5 py-1.8 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold"
          >
            Reset Progress
          </button>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-2">
          {saveMsg ? (
            <span className="text-xs text-emerald-400 font-bold">{saveMsg}</span>
          ) : <span />}

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
