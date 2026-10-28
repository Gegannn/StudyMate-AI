import { useState } from "react";
import { SUBJECTS } from "../../data/curriculum";
import { IconCompass, IconBrain, IconTeacher, IconCheckCircle, IconFlame } from "../Icons";

export function StudyMapView({ studentState, onLaunchCompanion }) {
  const [selectedSubjId, setSelectedSubjId] = useState("aad");
  const [filterLevel, setFilterLevel] = useState("all");

  const subj = SUBJECTS[selectedSubjId] || SUBJECTS.aad;
  const masteryMap = studentState.topicMastery || {};

  const getTopicMastery = (topicName) => {
    // Find closest matching mastery entry
    const entry = Object.entries(masteryMap).find(
      ([k]) => topicName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(topicName.toLowerCase())
    );
    return entry ? entry[1] : { level: "Not Started", score: 0 };
  };

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case "Mastered": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Strong": return "bg-teal-500/20 text-teal-300 border-teal-500/40";
      case "Practicing": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
      case "Learning": return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "Weak": return "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse";
      case "Introduced": return "bg-indigo-500/20 text-indigo-300 border-indigo-500/40";
      default: return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Subject Selector */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <IconCompass className="w-5 h-5 text-cyan-400" />
              Your Interactive Study Map & Knowledge Graph
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Subject → Module → Topic → Mastery. Click any concept to launch its lesson immediately.
            </p>
          </div>

          {/* Mastery Legend */}
          <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
            {["Not Started", "Learning", "Weak", "Practicing", "Strong", "Mastered"].map(lvl => (
              <span key={lvl} className={`px-2 py-0.5 rounded-full border font-semibold ${getLevelBadgeClass(lvl)}`}>
                {lvl}
              </span>
            ))}
          </div>
        </div>

        {/* Subject Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
          {Object.values(SUBJECTS).map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSubjId(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedSubjId === s.id
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {s.name} ({s.code})
            </button>
          ))}
        </div>
      </div>

      {/* Modules & Topics Tree */}
      <div className="space-y-5">
        {subj.modules?.map(mod => (
          <div
            key={mod.num}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5 space-y-4 shadow-lg"
          >
            {/* Module Title */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-extrabold text-xs flex items-center justify-center">
                  M{mod.num}
                </span>
                <h3 className="text-base font-extrabold text-white">
                  {mod.title}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {mod.hours} Hours • {mod.topics?.length || 0} Core Concepts
              </span>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mod.topics?.map((topic, idx) => {
                const mastery = getTopicMastery(topic);
                if (filterLevel !== "all" && mastery.level !== filterLevel) return null;

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800/90 border border-slate-700/60 hover:border-cyan-500/50 transition flex flex-col justify-between gap-3 group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getLevelBadgeClass(mastery.level)}`}>
                          {mastery.level} ({mastery.score || 0}%)
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">#{idx + 1}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition">
                        {topic}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] text-slate-400">
                        {mastery.timesReviewed ? `Reviewed ${mastery.timesReviewed}x` : "Unstudied"}
                      </span>
                      <button
                        onClick={() => onLaunchCompanion(topic, subj.id)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500 text-cyan-300 group-hover:text-slate-950 font-bold text-xs transition flex items-center gap-1"
                      >
                        <IconTeacher className="w-3 h-3" />
                        <span>Teach</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
