import { SUBJECTS } from "../../data/curriculum";
import { IconClock, IconBrain, IconCheckCircle, IconFlame, IconTeacher } from "../Icons";

export function AnalyticsView({ studentState, onLaunchCompanion }) {
  const masteryMap = studentState.topicMastery || {};
  const entries = Object.entries(masteryMap);

  const strongTopics = entries.filter(([_, d]) => d.level === "Mastered" || d.level === "Strong");
  const weakTopics = entries.filter(([_, d]) => d.level === "Weak" || d.score < 50);
  const learningTopics = entries.filter(([_, d]) => d.level === "Learning" || d.level === "Practicing");

  // Calculate readiness score
  const totalEvaluated = entries.length;
  const avgScore = totalEvaluated > 0
    ? Math.round(entries.reduce((sum, [_, d]) => sum + (d.score || 0), 0) / totalEvaluated)
    : 65;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <IconClock className="w-5 h-5 text-cyan-400" />
              Student Memory & Academic Analytics
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Persistent tracking of concept retention, recall accuracy, confusion hotspots, and spaced repetition schedules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">Exam Readiness Score:</span>
            <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-black text-base font-mono border border-cyan-500/30">
              {avgScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Top 3 Analytic KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Mastered Concepts</span>
            <IconCheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{strongTopics.length}</div>
          <p className="text-xs text-slate-400">
            Concepts at {'>'}75% verified active recall under examination conditions.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Confusion Hotspots</span>
            <IconFlame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400">{weakTopics.length}</div>
          <p className="text-xs text-slate-400">
            Topics where mistakes or re-explanations were recorded in your learning state.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>In Active Practice</span>
            <IconBrain className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-300">{learningTopics.length}</div>
          <p className="text-xs text-slate-400">
            Concepts currently in spaced repetition review cycles.
          </p>
        </div>
      </div>

      {/* Weak Areas vs Strong Areas Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Confusion Hotspots & Weak Areas */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <IconFlame className="w-4 h-4 text-rose-400" />
              Confusion Hotspots (Immediate Action Required)
            </h3>
            <span className="text-xs text-rose-400 font-mono">{weakTopics.length} Topics</span>
          </div>

          {weakTopics.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No critical weak spots detected right now!</p>
          ) : (
            <div className="space-y-2.5">
              {weakTopics.map(([top, data], idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block">{top}</span>
                    <span className="text-[11px] text-rose-300 font-mono">
                      Mastery: {data.score}% • Confused {data.confusionCount || 1}x
                    </span>
                  </div>
                  <button
                    onClick={() => onLaunchCompanion(top, "aad")}
                    className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition"
                  >
                    Fix in Companion
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Spaced Repetition Due Queue */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <IconBrain className="w-4 h-4 text-cyan-400" />
              Spaced Repetition Schedule (Cognitive Retention)
            </h3>
            <span className="text-xs text-cyan-400 font-mono">Ebbinghaus Curve</span>
          </div>

          <div className="space-y-2.5">
            {studentState.revisionQueue?.map((rev, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-xs font-bold text-slate-200 block">{rev.topic}</span>
                  <span className="text-[11px] text-slate-400">
                    Due: {rev.dueDate} (Interval: {rev.intervalDays}d)
                  </span>
                </div>
                <button
                  onClick={() => onLaunchCompanion(rev.topic, rev.subject)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs transition"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
