import { useState } from "react";
import { SUBJECTS } from "../../data/curriculum";
import { IconBrain, IconCheckCircle, IconFlame, IconTeacher, IconSparkles } from "../Icons";

export function RecallView({ studentState, onUpdateMastery, onLaunchCompanion }) {
  const [selectedSubj, setSelectedSubj] = useState("aad");
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  const questions = [
    {
      id: "r-deadlock",
      subject: "aad",
      topic: "Deadlock Conditions",
      question: "What are the four necessary and sufficient conditions for a deadlock to occur?",
      idealAnswer: "1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.\n2. Hold and Wait: A process must hold at least one resource and wait for additional resources.\n3. No Preemption: Resources cannot be preempted; they are released only voluntarily.\n4. Circular Wait: A closed chain of processes exists such that each holds one resource needed by the next.",
      keywords: ["mutual exclusion", "hold and wait", "no preemption", "circular wait"],
      trick: "Mnemonic: 'Many Hungry Nurses Cry' (Mutual, Hold, No preemption, Circular)."
    },
    {
      id: "r-master",
      subject: "aad",
      topic: "Master's Theorem",
      question: "In Master's Theorem T(n) = aT(n/b) + f(n), what are the three conditions comparing f(n) with n^(log_b a)?",
      idealAnswer: "Case 1: f(n) = O(n^(log_b a - ε)) => T(n) = Θ(n^(log_b a))\nCase 2: f(n) = Θ(n^(log_b a) * log^k n) => T(n) = Θ(n^(log_b a) * log^(k+1) n)\nCase 3: f(n) = Ω(n^(log_b a + ε)) with regularity => T(n) = Θ(f(n))",
      keywords: ["case 1", "case 2", "case 3", "log_b a"],
      trick: "Root vs Leaf comparison: Smaller = Case 1; Equal = Case 2; Larger = Case 3."
    },
    {
      id: "r-tcp",
      subject: "cn",
      topic: "TCP Handshake",
      question: "Explain the TCP 3-way handshake packet sequence and flag bits used.",
      idealAnswer: "1. Client -> Server: SYN=1, Seq=ISN(c)\n2. Server -> Client: SYN=1, ACK=1, Seq=ISN(s), Ack=ISN(c)+1\n3. Client -> Server: ACK=1, Seq=ISN(c)+1, Ack=ISN(s)+1",
      keywords: ["syn", "syn-ack", "ack", "sequence number", "acknowledgment"],
      trick: "SYN -> SYN-ACK -> ACK: Sequence increments by 1 for SYN segments."
    },
    {
      id: "r-compiler",
      subject: "cd",
      topic: "FIRST & FOLLOW",
      question: "Can the FOLLOW set of a grammar non-terminal ever contain epsilon (ε)? Why or why not?",
      idealAnswer: "NO! The FOLLOW set can NEVER contain epsilon (ε). FOLLOW(A) is defined as the set of terminals that can appear immediately to the right of A in some sentential form. Epsilon is an empty string, not a terminal that can be followed in a sentence.",
      keywords: ["never", "no", "terminal", "epsilon"],
      trick: "FOLLOW only contains terminals and end-of-input ($), NEVER epsilon!"
    }
  ];

  const currentQ = questions[activeQuestionIdx] || questions[0];

  const handleEvaluateAnswer = () => {
    if (!studentAnswer.trim()) return;

    const lowerAns = studentAnswer.toLowerCase();
    const matched = currentQ.keywords.filter(k => lowerAns.includes(k));
    const missing = currentQ.keywords.filter(k => !lowerAns.includes(k));

    let score = Math.round((matched.length / currentQ.keywords.length) * 100);
    if (score < 40 && studentAnswer.length > 50) score = 55;

    setEvaluation({
      score,
      matched,
      missing,
      verdict: score >= 80 ? "Superb Recall!" : score >= 50 ? "Partial Recall" : "Recall Gap Detected",
      ideal: currentQ.idealAnswer,
      trick: currentQ.trick
    });

    onUpdateMastery(currentQ.topic, score, score >= 75 ? "Strong" : score >= 50 ? "Practicing" : "Weak");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <IconBrain className="w-5 h-5 text-cyan-400" />
              Active Recall Laboratory
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Testing yourself produces up to 300% higher exam retention than re-reading notes. Answer from memory below.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
            No Multiple Choice • Pure Recall
          </span>
        </div>

        {/* Question Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setActiveQuestionIdx(idx);
                setStudentAnswer("");
                setEvaluation(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeQuestionIdx === idx
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Q{idx + 1}: {q.topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Active Recall Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Question Prompt & Student Answer (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {currentQ.topic}
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Subject: {currentQ.subject.toUpperCase()}
            </span>
          </div>

          <h3 className="text-lg font-black text-white leading-snug">
            {currentQ.question}
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Type your answer from memory (Do not look up notes!):
            </label>
            <textarea
              rows={6}
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="Type your explanation, points, and conditions here..."
              className="w-full text-xs p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handleEvaluateAnswer}
              disabled={!studentAnswer.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition"
            >
              Evaluate My Recall
            </button>
            <button
              onClick={() => onLaunchCompanion(currentQ.topic, currentQ.subject)}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              Don't know? Teach me in Companion →
            </button>
          </div>
        </div>

        {/* Right: AI Recall Diagnostic Evaluation (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recall Evaluation & Ideal Model Answer
          </h4>

          {evaluation ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-sm font-black text-white">{evaluation.verdict}</span>
                <span className="text-sm font-black text-cyan-300 font-mono">
                  {evaluation.score}% Accuracy
                </span>
              </div>

              {/* Matched Keywords */}
              {evaluation.matched.length > 0 && (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-400">Correctly Recalled:</span>
                  <div className="flex flex-wrap gap-1">
                    {evaluation.matched.map(k => (
                      <span key={k} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                        ✓ {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {evaluation.missing.length > 0 && (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-rose-400">Forgotten / Missing Points:</span>
                  <div className="flex flex-wrap gap-1">
                    {evaluation.missing.map(k => (
                      <span key={k} className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-semibold">
                        ✗ {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideal Answer */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                <span className="font-bold text-cyan-400 block">Ideal Exam Model Answer:</span>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed font-mono text-[11px]">
                  {evaluation.ideal}
                </p>
              </div>

              {/* Memory Trick */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                <strong>Memory Trick:</strong> {evaluation.trick}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-slate-500 space-y-2">
              <IconBrain className="w-8 h-8 mx-auto text-slate-600" />
              <p>Type your answer on the left to reveal the evaluation rubric, model answer, and memory hooks.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
