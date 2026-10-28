import { useState, useEffect } from "react";
import { SUBJECTS } from "../../data/curriculum";
import {
  IconZap,
  IconClock,
  IconCheckCircle,
  IconFlame,
  IconTeacher,
  IconRotateCcw
} from "../Icons";

export function QuizExamView({ onUpdateMastery, onLaunchCompanion }) {
  const [activeTab, setActiveTab] = useState("quiz"); // "quiz" | "mock"
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Mock Exam Simulator State
  const [mockStarted, setMockStarted] = useState(false);
  const [mockTimeLeft, setMockTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds
  const [mockFinished, setMockFinished] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      subject: "Algorithm Analysis & Design",
      topic: "Master's Theorem",
      question: "In the recurrence T(n) = 8T(n/2) + 100n^2, what is the asymptotic solution using Master's Theorem?",
      options: [
        "A) Θ(n^2)",
        "B) Θ(n^3)",
        "C) Θ(n^2 log n)",
        "D) Θ(n log n)"
      ],
      correctIndex: 1,
      explanation: "Here a=8, b=2. So log_b(a) = log_2(8) = 3. f(n) = 100n^2 = O(n^(3 - 1)). By Master's Theorem Case 1, T(n) = Θ(n^(log_b a)) = Θ(n^3)."
    },
    {
      id: 2,
      subject: "Algorithm Analysis & Design",
      topic: "AVL Trees",
      question: "What is the maximum allowable difference between heights of left and right subtrees for any node in an AVL tree?",
      options: [
        "A) 0",
        "B) 1",
        "C) 2",
        "D) Any constant k"
      ],
      correctIndex: 1,
      explanation: "In an AVL tree, the Balance Factor is BF = Height(Left) - Height(Right), and must satisfy BF ∈ {-1, 0, +1}. The max difference is 1."
    },
    {
      id: 3,
      subject: "Compiler Design",
      topic: "Lexical Analysis",
      question: "Which data structure is typically used by a compiler to store token attributes and identifiers across all phases?",
      options: [
        "A) Parse Tree",
        "B) Activation Record",
        "C) Symbol Table",
        "D) Quadruple Array"
      ],
      correctIndex: 2,
      explanation: "The Symbol Table is the central data structure accessed by all compiler phases to record variable identifiers, types, scopes, and memory locations."
    },
    {
      id: 4,
      subject: "Computer Networks",
      topic: "Transport Layer",
      question: "In TCP Congestion Control, what happens immediately upon receiving 3 duplicate ACKs?",
      options: [
        "A) Slow start restarts with cwnd = 1",
        "B) Fast Retransmit is triggered without waiting for retransmission timer expiration",
        "C) Connection is immediately closed with RST packet",
        "D) Window size is multiplied by 2"
      ],
      correctIndex: 1,
      explanation: "3 duplicate ACKs signify that a single packet was lost while subsequent packets arrived. TCP initiates Fast Retransmit and Fast Recovery rather than waiting for a slow RTO timeout."
    },
    {
      id: 5,
      subject: "Big Data Processing",
      topic: "HDFS Architecture",
      question: "In Hadoop HDFS, which master component maintains metadata, file system namespace, and block locations in memory?",
      options: [
        "A) DataNode",
        "B) NameNode",
        "C) TaskTracker",
        "D) NodeManager"
      ],
      correctIndex: 1,
      explanation: "The NameNode manages the file system directory namespace and maps data blocks to DataNodes."
    }
  ];

  const currentQ = quizQuestions[currentQIndex];

  const handleSelectOption = (idx) => {
    if (showAnswer) return;
    setSelectedAnswer(idx);
    setShowAnswer(true);

    if (idx === currentQ.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizFinished(true);
      onUpdateMastery("Practice Quizzes", Math.round(((score + 1) / quizQuestions.length) * 100), "Strong");
    }
  };

  const resetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher: Rapid Quiz vs Full Exam Simulator */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "quiz" ? "bg-cyan-500 text-slate-950 shadow-md" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            ⚡ Adaptive Quiz Generator
          </button>
          <button
            onClick={() => setActiveTab("mock")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "mock" ? "bg-rose-500 text-white shadow-md" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            📝 Full 100-Mark Exam Simulator
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          Grounded strictly in S5 & S3 PYQs
        </span>
      </div>

      {activeTab === "quiz" ? (
        /* RAPID QUIZ GENERATOR */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {!quizFinished ? (
            <>
              {/* Progress and Topic */}
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-cyan-400 uppercase tracking-wider">
                  Question {currentQIndex + 1} of {quizQuestions.length} • {currentQ.topic}
                </span>
                <span className="text-slate-400 font-mono">
                  Score: {score} / {quizQuestions.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all"
                  style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = "border-slate-700 bg-slate-800/70 hover:bg-slate-800 text-slate-200";
                  if (showAnswer) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = "border-emerald-500 bg-emerald-950/70 text-emerald-200 font-bold";
                    } else if (idx === selectedAnswer) {
                      btnStyle = "border-rose-500 bg-rose-950/70 text-rose-200";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showAnswer}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showAnswer && idx === currentQ.correctIndex && (
                        <IconCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {showAnswer && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-fade-in">
                  <div className="text-xs font-bold text-cyan-300">
                    {selectedAnswer === currentQ.correctIndex ? "✓ Correct!" : "✗ Incorrect"}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => onLaunchCompanion(currentQ.topic, "aad")}
                      className="text-xs text-cyan-400 hover:underline font-semibold"
                    >
                      Teach this in Companion →
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                    >
                      {currentQIndex + 1 < quizQuestions.length ? "Next Question →" : "See Final Score"}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Quiz Completed Screen */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto text-2xl font-black">
                {score}/{quizQuestions.length}
              </div>
              <h3 className="text-2xl font-black text-white">Quiz Completed!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                You demonstrated {Math.round((score / quizQuestions.length) * 100)}% accuracy. Your student memory state and mastery levels have been updated.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={resetQuiz}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={() => onLaunchCompanion("Master's Theorem Recurrences", "aad")}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
                >
                  Review Weak Topics in Companion
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* FULL 100-MARK EXAM SIMULATOR */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Autonomous University Model Paper
              </span>
              <h3 className="text-xl font-black text-white">
                B24CS3T04 — Algorithm Analysis and Design (Full Mock)
              </h3>
              <div className="text-xs text-slate-400">Total Marks: 100 • Duration: 3 Hours</div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 font-mono text-sm font-bold border border-rose-500/40">
                <IconClock className="w-4 h-4" /> 03:00:00
              </span>
              <button
                onClick={() => setMockStarted(true)}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs"
              >
                {mockStarted ? "Submit Paper" : "Start Timed Exam"}
              </button>
            </div>
          </div>

          {/* Part A Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-white flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <span>PART A (Answer all questions — 10 × 3 = 30 Marks)</span>
              <span className="text-xs text-cyan-300 font-mono">30 Marks</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
                <span className="font-bold text-amber-300">1. Arrange functions by growth rate: n^3, 2^n, log n^3, 2^100, n^n. (3 marks)</span>
                <p className="text-slate-400">Hint: Constant 2^100 &lt; log n^3 &lt; n^3 &lt; 2^n &lt; n^n.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
                <span className="font-bold text-amber-300">2. Define Little-oh (o) and Little-omega (ω) asymptotic notations. (3 marks)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
                <span className="font-bold text-amber-300">3. Define Balance Factor in an AVL Tree. (3 marks)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
                <span className="font-bold text-amber-300">4. Distinguish between P and NP problems with examples. (3 marks)</span>
              </div>
            </div>
          </div>

          {/* Part B Section */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-extrabold text-white flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <span>PART B (Module Choice Derivations & Numericals — 5 × 14 = 70 Marks)</span>
              <span className="text-xs text-cyan-300 font-mono">70 Marks</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
                <span className="font-bold text-cyan-300">Q11. State and prove Master's Theorem. Solve T(n) = 8T(n/2) + 100n^2. (14 marks)</span>
                <button
                  onClick={() => onLaunchCompanion("Master's Theorem Recurrences", "aad")}
                  className="text-[11px] text-cyan-400 hover:underline block pt-1 font-semibold"
                >
                  Revise full 14-mark derivation in Companion →
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
                <span className="font-bold text-cyan-300">Q12. Construct an AVL tree by inserting keys: 40, 20, 10, 25, 30, 22, 50. Trace every rotation. (14 marks)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
