import { useState } from "react";
import { generateCramPlan } from "../../state/studentMemory";
import { IconFlame, IconClock, IconTeacher, IconZap } from "../Icons";

export function CramModal({ isOpen, onClose, studentState, initialTimeframe = "3hours", onLaunchCompanion }) {
  if (!isOpen) return null;

  const [timeframe, setTimeframe] = useState(initialTimeframe);
  const isEmergency = timeframe === "lastminute";

  const cramResult = generateCramPlan(timeframe, studentState);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <IconFlame className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-black text-white">
                {isEmergency ? "🚨 Last-Minute Exam Rapid Drill" : "⚡ Cram Mode (High-Yield Filter)"}
              </h3>
              <p className="text-xs text-slate-400">
                {isEmergency ? "Exam in 2 hours: Maximum marks yield protocol." : "Prioritizes 100% past exam questions & essential formulas."}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white font-bold">✕</button>
        </div>

        {/* Timeframe Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "1hour", label: "1 Hour" },
            { id: "3hours", label: "3 Hours" },
            { id: "1day", label: "1 Day" },
            { id: "3days", label: "3 Days" },
            { id: "lastminute", label: "🚨 Last-Minute (2h)" }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTimeframe(t.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition ${
                timeframe === t.id
                  ? t.id === "lastminute"
                    ? "bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20"
                    : "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Plan Content */}
        {isEmergency ? (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 space-y-1">
              <strong className="block text-rose-300 text-sm">EXAM IN 2 HOURS: DO THIS NOW</strong>
              <p>Do NOT start reading new textbooks. Follow this strict triage countdown:</p>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { step: "1. Formula Review (20 min)", desc: "Master Theorem conditions, AVL balance factors, TF-IDF equation, CRC division." },
                { step: "2. High-Frequency Topics (30 min)", desc: "FIRST & FOLLOW algorithm, TCP 3-way handshake, Hadoop Ecosystem diagram." },
                { step: "3. Active Recall Drill (25 min)", desc: "Answer 5 high-weight questions from memory without looking at notes." },
                { step: "4. Fast Cheat Sheet Scan (15 min)", desc: "Review 1-page condensed sheet and pack stationery." },
                { step: "5. Mental Reset (30 min)", desc: "Stop studying. Hydrate, breathe, and enter the examination with full confidence." }
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-700 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <strong className="text-white block">{s.step}</strong>
                    <span className="text-slate-400">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Optimized Plan: {cramResult.plan.length} Critical Topics</span>
              <span className="font-mono text-cyan-300 font-bold">{cramResult.totalMinutes} Min Total</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {cramResult.plan.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400">{item.timeMin} mins</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{item.yield}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{item.topic}</h4>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onLaunchCompanion(item.topic, item.subject);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs transition flex items-center gap-1"
                  >
                    <IconTeacher className="w-3.5 h-3.5" /> Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
          >
            Close Plan
          </button>
        </div>
      </div>
    </div>
  );
}
