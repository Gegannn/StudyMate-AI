import { useState } from "react";
import { SUBJECTS, SCHEDULE_DAYS } from "../../data/curriculum";
import { getWhatShouldIStudyNow, generateCramPlan } from "../../state/studentMemory";
import {
  IconBrain,
  IconZap,
  IconClock,
  IconFlame,
  IconCheckCircle,
  IconTeacher,
  IconBookOpen,
  IconEye
} from "../Icons";

export function CommandCenter({
  studentState,
  onLaunchCompanion,
  onSelectTab,
  onOpenCram
}) {
  const [selectedDuration, setSelectedDuration] = useState("auto");
  const recommendation = getWhatShouldIStudyNow(studentState);

  // Compute metrics
  const totalTasks = SCHEDULE_DAYS.reduce((acc, day) => acc + day.tasks.length, 0);
  const completedCount = Object.values(studentState.completedTasks || {}).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Mastered topics count
  const masteredCount = Object.values(studentState.topicMastery || {}).filter(
    m => m.level === "Mastered" || m.level === "Strong"
  ).length;

  const weakCount = Object.values(studentState.topicMastery || {}).filter(
    m => m.level === "Weak"
  ).length;

  return (
    <div className="space-y-6">
      {/* Hero: "WHAT SHOULD I STUDY NOW?" */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-cyan-950/40 to-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <IconBrain className="w-3.5 h-3.5 animate-pulse" />
              Strategic Learning Recommendation
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {recommendation.topic}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700 font-semibold text-slate-300">
                {recommendation.subjectName}
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <IconClock className="w-4 h-4" /> {recommendation.durationMinutes} Minutes
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                Priority: {recommendation.urgency}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-cyan-300 font-semibold">Why this now:</strong> {recommendation.reason}
            </p>

            {/* Quick Duration Filters */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-medium">I have:</span>
              {["20 min", "35 min", "1 hour", "Today"].map(dur => (
                <button
                  key={dur}
                  onClick={() => setSelectedDuration(dur)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                    selectedDuration === dur
                      ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400"
                      : "bg-slate-800/60 hover:bg-slate-700/60 border-slate-700 text-slate-300"
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            <button
              onClick={() => onLaunchCompanion(recommendation.topic, recommendation.subject)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2.5"
            >
              <IconTeacher className="w-5 h-5" />
              <span>START LESSON NOW</span>
            </button>

            <button
              onClick={() => onSelectTab("practice")}
              className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <IconZap className="w-4 h-4 text-amber-400" />
              <span>Quick Diagnostic Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-lg p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Syllabus Progress</span>
            <IconCheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{progressPercent}%</div>
          <div className="text-[11px] text-slate-400 mt-1">
            {completedCount} / {totalTasks} Timetable Tasks Done
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-lg p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Concept Mastery</span>
            <IconBrain className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-300">{masteredCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            {masteredCount} Concepts at Strong/Mastered
          </div>
          <div className="text-[10px] text-slate-500 mt-2 font-mono">
            Active memory tracking
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-lg p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Topics At Risk</span>
            <IconFlame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">{weakCount}</div>
          <div className="text-[11px] text-rose-300/80 mt-1">
            High upcoming exam confusion
          </div>
          <button
            onClick={() => onSelectTab("recall")}
            className="text-[10px] text-cyan-400 hover:underline mt-2 font-semibold block"
          >
            Review weak topics →
          </button>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-lg p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Next Critical Exam</span>
            <IconClock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg font-black text-white">Data Analytics</div>
          <div className="text-[11px] text-amber-300 font-semibold mt-1">
            10 Nov 2026 • 09:30 AM
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Slot A: B24CD3T01
          </div>
        </div>
      </div>

      {/* AI Strategic Insights & Continue Learning Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: AI Learning Insights */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <IconBrain className="w-4 h-4 text-cyan-400" />
              Real-Time AI Academic Insights
            </h3>
            <span className="text-xs text-slate-400">Grounded in MACE Syllabus</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 mt-0.5">
                <IconFlame className="w-4 h-4" />
              </span>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-200">
                  Critical Zero-Gap Bottleneck: 19 & 20 Nov
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Computer Networks exam is on Thursday 19 Nov, followed immediately by Algorithm Analysis on Friday 20 Nov with <strong>zero gap days</strong>. You have 3 weak spots in AAD (AVL rotations, Floyd-Warshall).
                </p>
                <button
                  onClick={() => onLaunchCompanion("AVL Tree Rotations (LL, RR, LR, RL)", "aad")}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Quick 15-min AVL Drill →
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5">
                <IconCheckCircle className="w-4 h-4" />
              </span>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-200">
                  High-Yield Repeat Area: Master's Theorem (100% Recurrence)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Master's Theorem recurrence solving has appeared in every single past S5 paper analyzed (7-8 marks guaranteed).
                </p>
                <button
                  onClick={() => onLaunchCompanion("Master's Theorem Recurrences", "aad")}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Launch Master Theorem Lesson →
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 mt-0.5">
                <IconEye className="w-4 h-4" />
              </span>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-200">
                  Visual Learning Engine Ready
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive step-through animations are active for AVL tree rotations, Dijkstra's algorithm, TCP 3-way handshakes, and Compiler 3AC pipelines.
                </p>
                <button
                  onClick={() => onSelectTab("visualizer")}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Open Visual Lab Simulations →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Modes */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5 sm:p-6 space-y-4">
          <h3 className="font-extrabold text-white text-base flex items-center gap-2">
            <IconZap className="w-4 h-4 text-amber-400" />
            Special Study Modes
          </h3>

          <div className="space-y-2.5">
            <button
              onClick={() => onOpenCram("3hours")}
              className="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-amber-300">
                  ⚡ Cram Mode (High Yield)
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                  1h - 3h Plan
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Filters curriculum strictly to 100% past exam questions & must-know definitions.
              </p>
            </button>

            <button
              onClick={() => onOpenCram("lastminute")}
              className="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-rose-300">
                  🚨 Last-Minute 2-Hour Drill
                </span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-mono">
                  Emergency
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Formulas (20m) → Top PYQs (25m) → Active Recall (20m) → Exam sheet.
              </p>
            </button>

            <button
              onClick={() => onSelectTab("practice")}
              className="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300">
                  📝 Exam Simulator
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">
                  Full Mock
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Timed 3-hour university style papers with marks calculation & diagnostic score.
              </p>
            </button>

            <button
              onClick={() => onSelectTab("materials")}
              className="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-emerald-300">
                  📚 Ask My Materials
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                  RAG
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Grounded semantic question answering with verified page number citations.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
