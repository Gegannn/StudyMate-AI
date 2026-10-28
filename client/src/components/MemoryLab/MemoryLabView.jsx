import { useState } from "react";
import { MNEMONICS_DATA } from "../../data/mnemonicsData";
import { FORMULAS_DATA } from "../../data/formulasData";
import { IconSparkles, IconBrain, IconCheckCircle, IconRotateCcw } from "../Icons";

export function MemoryLabView({ onUpdateMastery }) {
  const [activeTab, setActiveTab] = useState("flashcards"); // "flashcards" | "mnemonics" | "formulas"
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedFormula, setSelectedFormula] = useState(null);

  const flashcards = [
    {
      id: "fc-1",
      subject: "Algorithm Analysis & Design",
      front: "What is Master's Theorem Case 1?",
      back: "If f(n) = O(n^(log_b a - ε)) for ε > 0, then T(n) = Θ(n^(log_b a)). Leaves dominate the execution cost.",
      tag: "Recurrences"
    },
    {
      id: "fc-2",
      subject: "Algorithm Analysis & Design",
      front: "When do you perform an LR double rotation in an AVL Tree?",
      back: "When a node has Balance Factor +2 and its Left child has Balance Factor -1 (Right-heavy left child). Left rotation on child, then Right rotation on parent.",
      tag: "AVL Trees"
    },
    {
      id: "fc-3",
      subject: "Computer Networks",
      front: "What is the PDU (Protocol Data Unit) at the Transport Layer?",
      back: "Segments in TCP (or Datagrams in UDP). Contains source/destination port numbers and sequence numbers.",
      tag: "Transport Layer"
    },
    {
      id: "fc-4",
      subject: "Compiler Design",
      front: "What is the key difference between S-attributed and L-attributed SDDs?",
      back: "S-attributed definitions use ONLY synthesized attributes (evaluated bottom-up). L-attributed can use synthesized AND inherited attributes (evaluated left-to-right top-down).",
      tag: "Syntax Directed Translation"
    },
    {
      id: "fc-5",
      subject: "Data Analytics",
      front: "What is the Apriori Principle?",
      back: "All non-empty subsets of a frequent itemset must also be frequent (anti-monotonicity of support). If an itemset is infrequent, all its supersets are pruned.",
      tag: "Frequent Pattern Mining"
    }
  ];

  const currentCard = flashcards[currentCardIndex];

  const handleRateCard = (rating) => {
    setIsFlipped(false);
    if (currentCardIndex + 1 < flashcards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
    if (rating === "easy") {
      onUpdateMastery(currentCard.tag, 90, "Mastered");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Tab Switcher */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <IconSparkles className="w-5 h-5 text-cyan-400" />
              Memory Lab & Cognitive Accelerator
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Spaced repetition flashcards, university mnemonics, and formula practice labs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: "flashcards", label: "Spaced Flashcards" },
              { id: "mnemonics", label: "Mnemonics & Hooks" },
              { id: "formulas", label: "Formula Lab" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FLASHCARDS TAB */}
      {activeTab === "flashcards" && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Card {currentCardIndex + 1} of {flashcards.length}</span>
            <span className="font-bold text-cyan-400">{currentCard.subject}</span>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[260px] rounded-2xl border-2 border-slate-700/80 hover:border-cyan-500/60 bg-gradient-to-br from-slate-900 to-slate-950 p-8 flex flex-col justify-between items-center text-center cursor-pointer shadow-2xl transition-all transform hover:scale-[1.01]"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-cyan-300">
              {isFlipped ? "Answer (Click to flip back)" : "Question (Click to reveal answer)"}
            </span>

            <div className="my-auto">
              {!isFlipped ? (
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {currentCard.front}
                </h3>
              ) : (
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                  {currentCard.back}
                </p>
              )}
            </div>

            <span className="text-[10px] text-slate-400 font-mono">
              Tag: {currentCard.tag}
            </span>
          </div>

          {/* Spaced Repetition Rating Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleRateCard("hard")}
              className="py-3 rounded-xl bg-slate-800 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/50 text-slate-300 hover:text-rose-300 font-bold text-xs transition"
            >
              Again / Hard (1d)
            </button>
            <button
              onClick={() => handleRateCard("good")}
              className="py-3 rounded-xl bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 font-bold text-xs transition"
            >
              Good (3d)
            </button>
            <button
              onClick={() => handleRateCard("easy")}
              className="py-3 rounded-xl bg-slate-800 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 font-bold text-xs transition"
            >
              Easy / Mastered (7d)
            </button>
          </div>
        </div>
      )}

      {/* MNEMONICS TAB */}
      {activeTab === "mnemonics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MNEMONICS_DATA.map(m => (
            <div
              key={m.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-white text-sm">{m.title}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {m.subject.toUpperCase()}
                </span>
              </div>

              {/* Mnemonic Sentence */}
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs">
                <span className="text-cyan-400 font-bold block mb-1">Mnemonic Hook:</span>
                <p className="font-extrabold text-white text-sm italic">"{m.mnemonicBottomUp || m.mnemonicTopDown}"</p>
              </div>

              {/* Breakdown List */}
              <div className="space-y-1.5">
                {m.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-md bg-slate-800 font-mono font-bold text-cyan-300 flex items-center justify-center text-[11px]">
                      {item.letter}
                    </span>
                    <strong className="text-white">{item.name}:</strong>
                    <span className="text-slate-400">{item.hook}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-amber-300 font-medium pt-2 border-t border-slate-800/80">
                💡 <strong>Exam Scoring Tip:</strong> {m.examTip}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FORMULAS LAB TAB */}
      {activeTab === "formulas" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FORMULAS_DATA.map(f => (
              <div
                key={f.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-white text-sm">{f.name}</h3>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    {f.subject.toUpperCase()}
                  </span>
                </div>

                {/* LaTeX Equation Box */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-cyan-300 text-xs sm:text-sm overflow-x-auto">
                  {f.latex}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {f.meaning}
                </p>

                {/* Variables */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-400 block text-[11px] uppercase tracking-wider">Variables:</span>
                  {f.variables.map((v, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <span className="font-mono text-cyan-400 font-bold">{v.sym}:</span>
                      <span>{v.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Common Mistake & Memory Trick */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1 text-amber-200">
                  <div><strong>Common Trap:</strong> {f.commonMistakes}</div>
                  <div><strong>Trick:</strong> {f.memoryTrick}</div>
                </div>

                <button
                  onClick={() => setSelectedFormula(f)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <IconBrain className="w-3.5 h-3.5" /> Practice Numerical Problem
                </button>
              </div>
            ))}
          </div>

          {/* Practice Modal */}
          {selectedFormula && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-white text-base">Practice: {selectedFormula.name}</h3>
                  <button onClick={() => setSelectedFormula(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-cyan-400 block">Exam Numerical Problem:</span>
                  <p className="text-slate-200 text-sm font-semibold">{selectedFormula.practice.problem}</p>
                  <p className="text-slate-400 italic">Hint: {selectedFormula.practice.hint}</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5 text-xs">
                  <span className="font-bold text-emerald-400 block">Step-by-Step Solution:</span>
                  <p className="text-slate-200 leading-relaxed font-mono">{selectedFormula.practice.solution}</p>
                </div>

                <button
                  onClick={() => setSelectedFormula(null)}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Got It! Close Problem
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
