import { useState, useEffect } from "react";
import { VISUALIZATION_MODULES } from "../../data/visualizationsData";
import {
  IconEye,
  IconPlay,
  IconPause,
  IconRotateCcw,
  IconCheckCircle,
  IconTeacher
} from "../Icons";

export function VisualLabView({ onLaunchCompanion }) {
  const [selectedModId, setSelectedModId] = useState("avl");
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(2500);

  const activeModule = VISUALIZATION_MODULES[selectedModId] || VISUALIZATION_MODULES.avl;
  const maxSteps = activeModule.steps?.length || 5;

  useEffect(() => {
    setCurrentStep(1);
    setIsPlaying(false);
  }, [selectedModId]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, maxSteps, speedMs]);

  const stepData = activeModule.steps?.[currentStep - 1] || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <IconEye className="w-5 h-5 text-cyan-400" />
              Visual Learning Engine & Algorithm Animations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Step through complex engineering algorithms interactively. See packet movements, tree rotations, and state transitions.
            </p>
          </div>
          <button
            onClick={() => onLaunchCompanion(activeModule.topic, activeModule.subject)}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs transition flex items-center gap-1.5"
          >
            <IconTeacher className="w-4 h-4" /> Teach in Companion
          </button>
        </div>

        {/* Algorithm Modules Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
          {Object.values(VISUALIZATION_MODULES).map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedModId(m.id)}
              className={`px-3.5 py-1.8 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedModId === m.id
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Simulation Arena */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 space-y-6 shadow-2xl">
        {/* Simulation Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              {activeModule.topic}
            </span>
            <h3 className="text-lg font-black text-white">
              {stepData.title || `Step ${currentStep}`}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentStep <= 1}
              onClick={() => setCurrentStep(p => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold"
            >
              ← Prev Step
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              {isPlaying ? <IconPause className="w-3.5 h-3.5" /> : <IconPlay className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Pause" : "Auto Play"}</span>
            </button>

            <button
              disabled={currentStep >= maxSteps}
              onClick={() => setCurrentStep(p => Math.min(maxSteps, p + 1))}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold"
            >
              Next Step →
            </button>

            <button
              onClick={() => {
                setCurrentStep(1);
                setIsPlaying(false);
              }}
              title="Reset"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
            >
              <IconRotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Graphic Rendering Arena */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 min-h-[300px] flex flex-col justify-center items-center relative overflow-hidden">
          {/* AVL Simulation Visual */}
          {selectedModId === "avl" && (
            <div className="w-full max-w-lg space-y-6">
              <div className="flex justify-center items-center gap-10">
                {stepData.treeState?.map((node) => (
                  <div
                    key={node.id}
                    className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center font-bold text-sm shadow-xl transition-all duration-500 ${
                      node.status === "danger"
                        ? "border-rose-500 bg-rose-950/80 text-rose-200 shadow-rose-500/30 scale-110 animate-bounce"
                        : node.status === "warning"
                        ? "border-amber-500 bg-amber-950/80 text-amber-200"
                        : node.status === "success"
                        ? "border-emerald-500 bg-emerald-950/80 text-emerald-200"
                        : "border-cyan-500 bg-cyan-950/80 text-cyan-200"
                    }`}
                  >
                    <span>{node.value}</span>
                    <span className="text-[10px] font-mono opacity-80">BF: {node.bf}</span>
                  </div>
                ))}
              </div>

              {stepData.codeHighlight && (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-center text-cyan-300">
                  {stepData.codeHighlight}
                </div>
              )}
            </div>
          )}

          {/* Dijkstra Simulation Visual */}
          {selectedModId === "dijkstra" && (
            <div className="w-full max-w-xl space-y-5">
              <div className="flex flex-wrap justify-center items-center gap-4">
                {stepData.nodes?.map((node) => (
                  <div
                    key={node.id}
                    className={`px-4 py-3 rounded-xl border-2 flex flex-col items-center font-bold text-xs shadow-md transition-all ${
                      node.visited
                        ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                        : "border-slate-700 bg-slate-900 text-slate-300"
                    }`}
                  >
                    <span className="text-sm font-black">Vertex {node.id}</span>
                    <span className="text-[11px] font-mono text-cyan-300">Dist: {node.dist}</span>
                  </div>
                ))}
              </div>

              {stepData.codeHighlight && (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-center text-amber-300">
                  {stepData.codeHighlight}
                </div>
              )}
            </div>
          )}

          {/* TCP 3-Way Handshake Simulation Visual */}
          {selectedModId === "tcp" && (
            <div className="w-full max-w-md space-y-6">
              <div className="flex justify-between items-center px-4">
                <div className="p-4 rounded-xl border border-cyan-500 bg-cyan-950/40 text-center space-y-1">
                  <div className="text-xs font-bold text-cyan-300">CLIENT</div>
                  <div className="text-[11px] text-slate-300 font-mono">{stepData.clientState}</div>
                </div>

                {/* Flying Segment Packet */}
                <div className="flex flex-col items-center space-y-1">
                  <div className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-lg animate-pulse">
                    {stepData.packet?.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {stepData.packet?.direction === "right" ? "───────►" : "◄───────"}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-purple-500 bg-purple-950/40 text-center space-y-1">
                  <div className="text-xs font-bold text-purple-300">SERVER</div>
                  <div className="text-[11px] text-slate-300 font-mono">{stepData.serverState}</div>
                </div>
              </div>
            </div>
          )}

          {/* Compiler Pipeline Visual */}
          {selectedModId === "compiler" && (
            <div className="w-full max-w-lg space-y-4 text-center">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                Source Input: <code>{stepData.source}</code>
              </div>

              {stepData.outputType === "tokens" && (
                <div className="flex flex-wrap justify-center gap-2">
                  {stepData.outputData?.map((tok, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-cyan-950 border border-cyan-500 text-cyan-200 font-mono text-xs">
                      {tok}
                    </span>
                  ))}
                </div>
              )}

              {stepData.outputType === "tac" && (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-left space-y-1">
                  {stepData.outputData?.map((tac, i) => (
                    <div key={i} className="text-cyan-300">{tac}</div>
                  ))}
                </div>
              )}

              {stepData.outputType === "quadruples" && (
                <table className="w-full text-xs border border-slate-800 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800 text-slate-300">
                    <tr><th className="p-1">Op</th><th className="p-1">Arg1</th><th className="p-1">Arg2</th><th className="p-1">Res</th></tr>
                  </thead>
                  <tbody className="bg-slate-900 text-slate-200 divide-y divide-slate-800 font-mono">
                    {stepData.outputData?.map((q, i) => (
                      <tr key={i}><td className="p-1 text-cyan-300">{q.op}</td><td className="p-1">{q.arg1}</td><td className="p-1">{q.arg2}</td><td className="p-1 text-emerald-300">{q.res}</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Master Theorem Decision Tree */}
          {selectedModId === "masterTheorem" && (
            <div className="w-full max-w-xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeModule.cases?.map(c => (
                  <div key={c.caseNum} className="p-3 rounded-xl border border-slate-700 bg-slate-900/80 space-y-2 text-left">
                    <span className="text-xs font-extrabold text-cyan-400">Case {c.caseNum}</span>
                    <p className="text-[11px] text-slate-300 font-mono">{c.condition}</p>
                    <div className="text-xs font-bold text-emerald-400 font-mono">{c.solution}</div>
                    <p className="text-[10px] text-slate-400">{c.example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step Explanation Text */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-sm leading-relaxed">
          {stepData.explanation || activeModule.description}
        </div>
      </div>
    </div>
  );
}
