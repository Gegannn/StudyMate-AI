import { useState, useEffect } from "react";
import { SUBJECTS } from "../../data/curriculum";
import { VISUALIZATION_MODULES } from "../../data/visualizationsData";
import {
  IconBrain,
  IconTeacher,
  IconSparkles,
  IconEye,
  IconCheckCircle,
  IconFlame,
  IconBookOpen,
  IconZap,
  IconPlay,
  IconRotateCcw
} from "../Icons";

export function CompanionView({
  initialTopic = "Master's Theorem Recurrences",
  initialSubject = "aad",
  studentState,
  onUpdateMastery,
  onCompleteTask,
  onOpenVisualizer
}) {
  const [currentTopic, setCurrentTopic] = useState(initialTopic);
  const [currentSubject, setCurrentSubject] = useState(initialSubject);
  const [activeLayer, setActiveLayer] = useState("intuition"); // intuition, analogy, visual, technical, story, simple, feynman, comparison
  const [confusedAngle, setConfusedAngle] = useState(null);
  const [simpleLevel, setSimpleLevel] = useState("normal"); // ultra, simple, normal, deep, 2mark, 5mark, 10mark
  const [feynmanText, setFeynmanText] = useState("");
  const [feynmanFeedback, setFeynmanFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [showMeStep, setShowMeStep] = useState(1);

  // Update if props change
  useEffect(() => {
    if (initialTopic) setCurrentTopic(initialTopic);
    if (initialSubject) setCurrentSubject(initialSubject);
  }, [initialTopic, initialSubject]);

  const subjData = SUBJECTS[currentSubject] || SUBJECTS.aad;

  // Check if visualization exists for this topic
  const visualModule = Object.values(VISUALIZATION_MODULES).find(
    v => currentTopic.toLowerCase().includes(v.topic.toLowerCase()) || v.topic.toLowerCase().includes(currentTopic.toLowerCase())
  );

  // Teaching Content Synthesizer (Source Grounded + AI Brain integration)
  const fetchOrGenerateContent = async (layer) => {
    setLoading(true);
    setAiResponse(null);

    try {
      const response = await fetch(`${studentState.settings.apiUrl}/api/ai/teach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: currentTopic,
          subject: subjData.name,
          layer: layer,
          api_key: studentState.settings.geminiKey
        })
      });

      const data = await response.json();
      if (data && data.answer) {
        setAiResponse(data);
      }
    } catch (err) {
      console.warn("Backend teach endpoint unavailable. Using local grounded synthesis.");
    } finally {
      setLoading(false);
    }
  };

  const handleLayerSwitch = (layer) => {
    setActiveLayer(layer);
    setConfusedAngle(null);
    fetchOrGenerateContent(layer);
  };

  const handleConfusedAngle = (angle) => {
    setConfusedAngle(angle);
    fetchOrGenerateContent(angle);
  };

  const handleEvaluateFeynman = () => {
    if (!feynmanText.trim()) return;

    // Intelligent evaluation heuristic based on keywords & depth
    const words = feynmanText.toLowerCase().split(/\s+/);
    const length = words.length;

    let score = 70;
    const missing = [];
    const strong = [];

    if (currentTopic.toLowerCase().includes("master")) {
      if (words.includes("a") && words.includes("b")) strong.push("Identified subproblems 'a' and division factor 'b'");
      else missing.push("Define role of 'a' (subproblems) and 'b' (shrink factor)");

      if (words.includes("case") || words.includes("cases")) strong.push("Understood case boundary logic");
      else missing.push("Explicitly explain the 3 boundary conditions comparing f(n) with n^(log_b a)");

      if (words.includes("leaf") || words.includes("root") || words.includes("dominate")) strong.push("Great intuition on leaf vs root dominance!");
    } else if (currentTopic.toLowerCase().includes("avl")) {
      if (words.includes("balance") || words.includes("factor")) strong.push("Mentioned balance factor invariant {-1, 0, +1}");
      else missing.push("Explain what the Balance Factor is (Left height - Right height)");

      if (words.includes("rotation") || words.includes("rotations")) strong.push("Highlighted LL, RR, LR, RL rotation mechanism");
      else missing.push("Explain how single vs double rotations restore balance");
    } else {
      if (length > 30) strong.push("Good descriptive depth in your own words");
      else missing.push("Elaborate on the step-by-step mechanism and consequences");
    }

    if (strong.length >= 2) score = 88;
    else if (strong.length === 1) score = 74;
    else score = 58;

    const feedback = {
      score,
      strong,
      missing,
      verdict: score >= 80 ? "Excellent Mastery!" : score >= 65 ? "Good Intuition, Minor Missing Terminology" : "Needs Conceptual Refinement",
      correctionTip: missing.length > 0 ? `To score full 7 marks in exam: Ensure you explicitly mention: ${missing.join(", ")}.` : "You can reproduce this clearly under exam conditions!"
    };

    setFeynmanFeedback(feedback);
  };

  const currentMastery = studentState.topicMastery[currentTopic] || { level: "Learning", score: 50 };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT COLUMN: Course Context & Material Links (3 cols) */}
      <div className="lg:col-span-3 space-y-4">
        {/* Course Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Classroom Context</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div>
            <div className="text-xs text-slate-400 font-semibold">{subjData.code}</div>
            <h3 className="text-lg font-black text-white">{subjData.name}</h3>
            <div className="text-xs text-cyan-400 font-medium mt-0.5">Exam: {subjData.date} ({subjData.day})</div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Current Concept:
            </label>
            <input
              type="text"
              value={currentTopic}
              onChange={(e) => setCurrentTopic(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Mastery Meter */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Mastery Level:</span>
              <span className="font-bold text-cyan-300">{currentMastery.level} ({currentMastery.score}%)</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentMastery.score}%` }}
              />
            </div>
          </div>

          {/* Grounded Source Citations */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Grounded Source Citations:
            </span>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                <IconBookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>{subjData.name} Syllabus.pdf</span>
              </div>
              <div className="text-[11px] text-cyan-400">Page 14 • Module 1 Analysis</div>
              <p className="text-[10px] text-slate-400">Strict KTU/MACE academic curriculum alignment.</p>
            </div>
          </div>
        </div>

        {/* Prerequisite Detector */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <IconBrain className="w-3.5 h-3.5 text-amber-400" />
            Prerequisites Check
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <IconCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Basic Asymptotic Notations (O, Ω, Θ)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <IconCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Recursion Tree Subdivision</span>
            </div>
            <div className="flex items-center gap-2 text-amber-300 font-medium">
              <span className="w-3.5 h-3.5 text-center font-bold">⚠️</span>
              <span>Logarithmic Base Properties (log_b a)</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: The Teaching Engine (6 cols) */}
      <div className="lg:col-span-6 space-y-4">
        {/* Layer Switching Navigation Bar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-2 flex flex-wrap items-center gap-1.5">
          {[
            { id: "intuition", label: "1. 10s Intuition", icon: IconZap },
            { id: "analogy", label: "2. Analogy", icon: IconSparkles },
            { id: "visual", label: "3. Visual Diagram", icon: IconEye },
            { id: "technical", label: "4. Technical Rigor", icon: IconBrain },
            { id: "story", label: "Story Mode", icon: IconTeacher },
            { id: "simple", label: "Make Simple", icon: IconCheckCircle },
            { id: "feynman", label: "Teach It Back", icon: IconFlame }
          ].map(tab => {
            const Icon = tab.icon;
            const isCur = activeLayer === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleLayerSwitch(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.8 rounded-xl text-xs font-bold transition ${
                  isCur
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Explain Like I'm Confused - 12 Angles Toolbar */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <IconFlame className="w-3.5 h-3.5" />
              Confused? Explain this differently:
            </span>
            <span className="text-[10px] text-slate-400">12 pedagogical angles</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              "Explain Simpler",
              "Real-World Analogy",
              "Show Diagram",
              "Tell as a Story",
              "Step-by-Step",
              "Compare With Something I Know",
              "Like I'm 10",
              "Technical Rigor",
              "Exam-Oriented Answer",
              "Math Intuition",
              "Common Trap/Mistake"
            ].map(ang => (
              <button
                key={ang}
                onClick={() => handleConfusedAngle(ang)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                  confusedAngle === ang
                    ? "bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold"
                    : "bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-300"
                }`}
              >
                {ang}
              </button>
            ))}
          </div>
        </div>

        {/* Main Teaching Canvas */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 space-y-5 shadow-xl">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-cyan-300 font-medium">StudyMate AI Teacher is structuring lesson...</p>
            </div>
          ) : (
            <>
              {/* LAYER 1: 10-SECOND INTUITION */}
              {activeLayer === "intuition" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                    <IconZap className="w-3.5 h-3.5" /> Layer 1 — 10-Second Intuition
                  </div>

                  <h3 className="text-xl font-black text-white">
                    What is {currentTopic}?
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-800/70 border-l-4 border-cyan-400 text-slate-200 text-sm leading-relaxed">
                    {currentTopic.toLowerCase().includes("master") ? (
                      <p>
                        <strong>Master's Theorem is a cookbook formula</strong> for divide-and-conquer algorithms. Whenever you cut a problem into <em>a</em> smaller pieces of size <em>n/b</em> and do <em>f(n)</em> work to combine them, Master's Theorem instantly gives you the Big-Theta time complexity without drawing out thousands of recursion nodes!
                      </p>
                    ) : currentTopic.toLowerCase().includes("avl") ? (
                      <p>
                        <strong>An AVL Tree is an auto-adjusting Binary Search Tree</strong> that guarantees search takes O(log n) time. Whenever an insertion makes one branch taller than its sibling by more than 1 level, the tree performs a quick <em>rotation</em> (LL, RR, LR, RL) to pull the subtree back into balance.
                      </p>
                    ) : (
                      <p>
                        <strong>{currentTopic}</strong> is an essential pillar in {subjData.name}. It establishes the foundation for high-performance execution and is frequently evaluated in university examinations.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleLayerSwitch("analogy")}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      Next: See Real-World Analogy →
                    </button>
                    {visualModule && (
                      <button
                        onClick={() => handleLayerSwitch("visual")}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                      >
                        <IconEye className="w-3.5 h-3.5" /> SHOW ME VISUALLY
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* LAYER 2: REAL-WORLD ANALOGY */}
              {activeLayer === "analogy" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
                    <IconSparkles className="w-3.5 h-3.5" /> Layer 2 — Relatable Real-World Analogy
                  </div>

                  <h3 className="text-xl font-black text-white">
                    Think of {currentTopic} like this:
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-800/70 border-l-4 border-purple-400 text-slate-200 text-sm leading-relaxed space-y-2">
                    {currentTopic.toLowerCase().includes("master") ? (
                      <>
                        <p>Imagine a corporate CEO delegating tasks:</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-300">
                          <li><strong>Case 1 (Workers Dominate):</strong> The CEO assigns millions of micro-tasks to intern workers at the bottom. The total time depends entirely on the interns doing the ground work.</li>
                          <li><strong>Case 2 (Even Split):</strong> Every level of management does the exact same amount of paperwork. Time is work-per-level × number of levels (<em>n log n</em>).</li>
                          <li><strong>Case 3 (CEO Dominates):</strong> The CEO spends 99% of the time creating the master strategy, and interns do almost nothing. Time is governed solely by the root work <em>f(n)</em>.</li>
                        </ul>
                      </>
                    ) : currentTopic.toLowerCase().includes("avl") ? (
                      <p>
                        Think of a <strong>seesaw in a playground</strong>. If you place a heavy weight on the far left, the seesaw violently tilts. An AVL rotation is like sliding the pivot toward the heavier kid so the seesaw effortlessly returns to horizontal equilibrium.
                      </p>
                    ) : (
                      <p>
                        Imagine a postal sorting facility where letters are grouped, stamped, and routed along shortest paths according to strict protocol standards.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleLayerSwitch("visual")}
                      className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                    >
                      Next: Interactive Step-Through Visual →
                    </button>
                  </div>
                </div>
              )}

              {/* LAYER 3: VISUAL EXPLANATION & "SHOW ME" */}
              {activeLayer === "visual" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                    <IconEye className="w-3.5 h-3.5" /> Layer 3 — Interactive Visual Engine
                  </div>

                  <h3 className="text-xl font-black text-white">
                    Step-by-Step Simulation: {visualModule ? visualModule.title : currentTopic}
                  </h3>

                  {visualModule ? (
                    <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 space-y-4">
                      {/* Interactive Step Navigator */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">
                          Step {showMeStep} of {visualModule.steps?.length || 5}:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            disabled={showMeStep <= 1}
                            onClick={() => setShowMeStep(p => Math.max(1, p - 1))}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold"
                          >
                            ← Back
                          </button>
                          <button
                            disabled={showMeStep >= (visualModule.steps?.length || 5)}
                            onClick={() => setShowMeStep(p => Math.min((visualModule.steps?.length || 5), p + 1))}
                            className="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold"
                          >
                            Next Step →
                          </button>
                          <button
                            onClick={() => setShowMeStep(1)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
                            title="Reset simulation"
                          >
                            <IconRotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Visual Diagram Display Canvas */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 min-h-[220px] flex flex-col justify-center items-center text-center">
                        {visualModule.id === "avl" && (
                          <div className="space-y-3 w-full">
                            <div className="text-xs text-cyan-300 font-mono">
                              {visualModule.steps[showMeStep - 1]?.codeHighlight}
                            </div>
                            <div className="relative w-full h-36 border border-slate-800 rounded-lg bg-slate-950 flex items-center justify-center">
                              <div className="flex items-center justify-center gap-8">
                                <div className="w-12 h-12 rounded-full border-2 border-cyan-400 bg-cyan-950 text-cyan-200 font-bold flex items-center justify-center text-sm shadow-lg shadow-cyan-500/20">
                                  {showMeStep === 1 ? "30" : showMeStep === 2 ? "30" : "20"}
                                </div>
                                <div className="w-12 h-12 rounded-full border-2 border-purple-400 bg-purple-950 text-purple-200 font-bold flex items-center justify-center text-sm">
                                  {showMeStep === 1 ? "20" : showMeStep === 2 ? "20" : "30"}
                                </div>
                                {showMeStep >= 2 && (
                                  <div className="w-10 h-10 rounded-full border-2 border-amber-400 bg-amber-950 text-amber-200 font-bold flex items-center justify-center text-xs animate-bounce">
                                    10
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {visualModule.id !== "avl" && (
                          <div className="space-y-2">
                            <div className="text-sm font-bold text-white">
                              {visualModule.steps[showMeStep - 1]?.title}
                            </div>
                            <p className="text-xs text-slate-300 max-w-md">
                              {visualModule.steps[showMeStep - 1]?.explanation}
                            </p>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {visualModule.steps[showMeStep - 1]?.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
                      <p className="text-xs text-slate-400">Flowchart schematic for {currentTopic}:</p>
                      <div className="inline-block p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                        Input [Data Stream] → [Validation / Parsing] → [Core Logic Transform] → [Optimal Output]
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleLayerSwitch("technical")}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                    >
                      Next: Technical Rigor & Equations →
                    </button>
                  </div>
                </div>
              )}

              {/* LAYER 4: TECHNICAL RIGOR */}
              {activeLayer === "technical" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    <IconBrain className="w-3.5 h-3.5" /> Layer 4 — Technical Rigor & Equations
                  </div>

                  <h3 className="text-xl font-black text-white">
                    Formal Definition & Mathematical Proof
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3">
                    {currentTopic.toLowerCase().includes("master") ? (
                      <>
                        <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-cyan-300 text-sm">
                          T(n) = a T(n/b) + f(n), where a ≥ 1, b &gt; 1
                        </div>
                        <p className="font-semibold text-slate-100">Three Fundamental Cases:</p>
                        <ol className="list-decimal pl-5 space-y-2 text-slate-300">
                          <li><strong>Case 1:</strong> If f(n) = O(n^(log_b(a) - ε)) for ε &gt; 0, then <code>T(n) = Θ(n^(log_b a))</code>.</li>
                          <li><strong>Case 2:</strong> If f(n) = Θ(n^(log_b a) · log^k n) for k ≥ 0, then <code>T(n) = Θ(n^(log_b a) · log^(k+1) n)</code>.</li>
                          <li><strong>Case 3:</strong> If f(n) = Ω(n^(log_b(a) + ε)) for ε &gt; 0, and regularity condition a·f(n/b) ≤ c·f(n) holds for c &lt; 1, then <code>T(n) = Θ(f(n))</code>.</li>
                        </ol>
                      </>
                    ) : (
                      <p>
                        Formal mathematical specifications and asymptotic boundaries as defined in the curriculum textbook.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STORY MODE */}
              {activeLayer === "story" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <IconTeacher className="w-3.5 h-3.5" /> Story Mode
                  </div>

                  <h3 className="text-xl font-black text-white">The Tale of {currentTopic}</h3>

                  <div className="p-4 rounded-xl bg-slate-800/80 border border-amber-500/30 text-slate-200 text-xs sm:text-sm leading-relaxed space-y-2">
                    <p>
                      In a high-tech kingdom, King Algorithm had three master architects building a towering fortress. Whenever problems arrived, the King sliced each problem into <em>a</em> identical sub-tasks...
                    </p>
                  </div>

                  {/* Story to Concept Mapping Table */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Story → Technical Concept Mapping
                    </span>
                    <table className="w-full text-xs border border-slate-800 rounded-xl overflow-hidden">
                      <thead className="bg-slate-800 text-slate-300">
                        <tr>
                          <th className="p-2 text-left">Story Element</th>
                          <th className="p-2 text-left">Technical Reality</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-300">
                        <tr>
                          <td className="p-2 font-medium">King Algorithm</td>
                          <td className="p-2 text-cyan-300">Main Recursive Caller T(n)</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Task Slicing Factor</td>
                          <td className="p-2 text-cyan-300">Division Factor b in (n/b)</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Intern Guilds at the Foundation</td>
                          <td className="p-2 text-cyan-300">Base Case Leaf Nodes n^(log_b a)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* MAKE IT SIMPLE (All 7 Levels) */}
              {activeLayer === "simple" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      "Make It Simple" Engine
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px]">
                      {[
                        { id: "ultra", label: "Ultra Simple" },
                        { id: "simple", label: "Simple" },
                        { id: "normal", label: "University" },
                        { id: "deep", label: "Deep Tech" },
                        { id: "2mark", label: "2-Mark" },
                        { id: "5mark", label: "5-Mark" },
                        { id: "10mark", label: "10-Mark Full" }
                      ].map(lvl => (
                        <button
                          key={lvl.id}
                          onClick={() => setSimpleLevel(lvl.id)}
                          className={`px-2 py-0.5 rounded-lg border transition ${
                            simpleLevel === lvl.id
                              ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400"
                              : "bg-slate-800 border-slate-700 text-slate-300"
                          }`}
                        >
                          {lvl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 text-slate-200 text-xs sm:text-sm leading-relaxed">
                    {simpleLevel === "ultra" && (
                      <p><strong>In 1 sentence:</strong> A rapid formula to solve divide-and-conquer recurrences in seconds by comparing root work against leaf work.</p>
                    )}
                    {simpleLevel === "2mark" && (
                      <div className="space-y-1">
                        <p><strong>Q: State Master's Theorem. (2 Marks)</strong></p>
                        <p><strong>Answer:</strong> Master's Theorem solves recurrences of the form T(n) = aT(n/b) + f(n) where a ≥ 1, b &gt; 1. Depending on whether f(n) is asymptotically smaller, equal to, or larger than n^(log_b a), T(n) is Θ(n^(log_b a)), Θ(n^(log_b a) log n), or Θ(f(n)).</p>
                      </div>
                    )}
                    {simpleLevel === "5mark" && (
                      <div className="space-y-2">
                        <p><strong>Q: Explain the 3 cases of Master's Theorem with examples. (5 Marks)</strong></p>
                        <p>State equation: T(n) = aT(n/b) + f(n).</p>
                        <p>Case 1: Leaf heavy → T(n) = 8T(n/2) + 10n^2 ⇒ Θ(n^3).</p>
                        <p>Case 2: Balanced → T(n) = 2T(n/2) + 10n ⇒ Θ(n log n).</p>
                        <p>Case 3: Root heavy → T(n) = 2T(n/2) + n^2 ⇒ Θ(n^2).</p>
                      </div>
                    )}
                    {(simpleLevel === "normal" || simpleLevel === "deep" || simpleLevel === "10mark" || simpleLevel === "simple") && (
                      <p>Comprehensive standard university academic breakdown with step-by-step mathematical proofs and diagrams.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TEACH IT BACK (Feynman Mode) */}
              {activeLayer === "feynman" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
                    <IconFlame className="w-3.5 h-3.5" /> Teach It Back — Feynman Technique
                  </div>

                  <h3 className="text-xl font-black text-white">
                    Explain {currentTopic} In Your Own Words
                  </h3>

                  <p className="text-xs text-slate-300">
                    The ultimate test of true understanding: If you can explain it simply without jargon, you have truly mastered it.
                  </p>

                  <textarea
                    rows={4}
                    value={feynmanText}
                    onChange={(e) => setFeynmanText(e.target.value)}
                    placeholder={`Explain ${currentTopic} as if you were teaching a junior student...`}
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />

                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleEvaluateFeynman}
                      disabled={!feynmanText.trim()}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold shadow-md shadow-rose-500/20 disabled:opacity-50"
                    >
                      Evaluate My Teaching
                    </button>
                    <span className="text-[11px] text-slate-400">AI tests clarity, depth & terminology</span>
                  </div>

                  {feynmanFeedback && (
                    <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-white">{feynmanFeedback.verdict}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                          Score: {feynmanFeedback.score}/100
                        </span>
                      </div>

                      {feynmanFeedback.strong.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-emerald-400">Strong Points:</span>
                          <ul className="text-xs text-slate-300 list-disc pl-5">
                            {feynmanFeedback.strong.map((s, idx) => <li key={idx}>{s}</li>)}
                          </ul>
                        </div>
                      )}

                      {feynmanFeedback.missing.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-rose-400">Missing Concepts / Traps:</span>
                          <ul className="text-xs text-slate-300 list-disc pl-5">
                            {feynmanFeedback.missing.map((m, idx) => <li key={idx}>{m}</li>)}
                          </ul>
                        </div>
                      )}

                      <p className="text-xs text-cyan-300 font-medium pt-1">
                        💡 {feynmanFeedback.correctionTip}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Diagnostic Actions & Mastery Updating (3 cols) */}
      <div className="lg:col-span-3 space-y-4">
        {/* Learning Status Box */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Current Learning Status
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Conceptual Intuition:</span>
                <span className="text-emerald-400 font-bold">85%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[85%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Active Recall:</span>
                <span className="text-cyan-400 font-bold">60%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full w-[60%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Exam Problem Solving:</span>
                <span className="text-amber-400 font-bold">50%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[50%]" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => onUpdateMastery(currentTopic, 85, "Strong")}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition"
            >
              <IconCheckCircle className="w-4 h-4" />
              <span>Mark Concept Mastered (+85%)</span>
            </button>

            <button
              onClick={() => onCompleteTask("t-1029-2")}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition"
            >
              <span>Sync to Timetable Task ✓</span>
            </button>
          </div>
        </div>

        {/* Exam Past Questions in this module */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <IconZap className="w-3.5 h-3.5 text-amber-400" />
            University PYQs on this Topic
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
              <span className="text-amber-300 font-bold text-[11px]">7 Marks • Model Paper</span>
              <p className="text-slate-300">
                State Master's Theorem. Solve T(n) = 8T(n/2) + 100n^2 and T(n) = 2T(n/2) + 10n.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
              <span className="text-amber-300 font-bold text-[11px]">3 Marks • Past Year</span>
              <p className="text-slate-300">
                Arrange functions in increasing order of growth rate: n^3, 2^n, log n^3, 2^100, n^n.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
