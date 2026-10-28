import { useState } from "react";
import { SUBJECTS, SCHEDULE_DAYS } from "../../data/curriculum";
import { SyllabusDrawer } from "./SyllabusDrawer";
import {
  IconCalendar,
  IconCheckCircle,
  IconTeacher,
  IconBookOpen,
  IconClock,
  IconFlame,
  IconEye
} from "../Icons";

export function TimetableView({
  studentState,
  onToggleTask,
  onLaunchCompanion
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubj, setSelectedSubj] = useState("all");
  const [viewMode, setViewMode] = useState("tree"); // "tree" | "table"
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSubj, setDrawerSubj] = useState(null);
  const [drawerMod, setDrawerMod] = useState(1);

  const completedTasks = studentState.completedTasks || {};

  // Filter days and tasks
  const filteredDays = SCHEDULE_DAYS.map(day => {
    const matchingTasks = day.tasks.filter(task => {
      const matchSubj = selectedSubj === "all" || task.subj === selectedSubj;
      const matchQuery =
        !searchQuery ||
        task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        day.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubj && matchQuery;
    });

    return {
      ...day,
      filteredTasks: matchingTasks
    };
  }).filter(day => day.filteredTasks.length > 0);

  const totalTasks = SCHEDULE_DAYS.reduce((sum, d) => sum + d.tasks.length, 0);
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const openDrawerForModule = (subjId, modNum) => {
    setDrawerSubj(SUBJECTS[subjId]);
    setDrawerMod(modNum);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Progress Controls Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <IconCalendar className="w-5 h-5 text-cyan-400" />
              Master Exam Strategy & Timetable (29 Oct – 11 Dec 2026)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              KTU/MACE AIML S5 & S3 Autonomous Curriculum with Zero-Gap Strategy
            </p>
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-300">
                {completedCount} / {totalTasks} Tasks Completed
              </div>
              <div className="text-[11px] text-cyan-300 font-mono font-bold">
                {progressPercent}% Total Progress
              </div>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
              <span className="text-xs font-extrabold text-white">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Search & Subject Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <input
            type="text"
            placeholder="Search topics, modules, algorithms, PYQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 text-xs px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedSubj("all")}
              className={`text-xs px-3 py-1 rounded-lg border font-semibold transition ${
                selectedSubj === "all"
                  ? "bg-cyan-500 text-slate-950 border-cyan-400"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
              }`}
            >
              All Subjects
            </button>
            {Object.values(SUBJECTS).map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSubj(s.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition whitespace-nowrap ${
                  selectedSubj === s.id
                    ? "bg-cyan-500 text-slate-950 border-cyan-400"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {s.code || s.name}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setViewMode("tree")}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                viewMode === "tree" ? "bg-cyan-500 text-slate-950" : "text-slate-400"
              }`}
            >
              Tree View
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                viewMode === "table" ? "bg-cyan-500 text-slate-950" : "text-slate-400"
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* Main Schedule Days */}
      {viewMode === "tree" ? (
        <div className="space-y-5">
          {filteredDays.map(day => {
            const isExam = day.type === "exam";
            const isZeroGap = day.badge?.includes("0-GAP") || day.title.includes("ZERO-GAP");

            return (
              <div
                key={day.date}
                className={`rounded-2xl border backdrop-blur-xl transition shadow-lg overflow-hidden ${
                  isExam
                    ? "border-rose-500/50 bg-slate-900/90 shadow-rose-500/10"
                    : isZeroGap
                    ? "border-amber-500/50 bg-slate-900/90 shadow-amber-500/10"
                    : "border-slate-800 bg-slate-900/70"
                }`}
              >
                {/* Day Header Bar */}
                <div
                  className={`px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b ${
                    isExam
                      ? "bg-rose-950/40 border-rose-500/30 text-rose-200"
                      : isZeroGap
                      ? "bg-amber-950/40 border-amber-500/30 text-amber-200"
                      : "bg-slate-800/60 border-slate-700/60 text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-400">{day.date}</span>
                    <span className="font-extrabold text-sm text-white">{day.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isExam
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                          : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      }`}
                    >
                      {day.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">({day.day})</span>
                  </div>
                </div>

                {/* Task Items List */}
                <div className="p-4 sm:p-5 space-y-2.5 divide-y divide-slate-800/60">
                  {day.filteredTasks.map(task => {
                    const isDone = !!completedTasks[task.id];
                    const subj = SUBJECTS[task.subj] || { color: "#38bdf8", name: task.subj.toUpperCase() };

                    return (
                      <div
                        key={task.id}
                        className={`pt-2.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-xl transition ${
                          isDone ? "opacity-60 bg-slate-950/40" : "hover:bg-slate-800/40"
                        }`}
                      >
                        {/* Checkbox and Text */}
                        <div className="flex items-start gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => onToggleTask(task.id)}
                            className="mt-1 w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-cyan-500 cursor-pointer"
                          />

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: subj.color }}
                              />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                {task.subj.toUpperCase()} • M{task.mod || 1}
                              </span>
                              <span className="text-[10px] text-slate-400 px-1.5 py-0.2 rounded bg-slate-800">
                                {task.hrs}h
                              </span>
                              <span className="text-[10px] font-bold uppercase text-cyan-400">
                                [{task.cat}]
                              </span>
                            </div>

                            <p className={`text-xs font-medium leading-relaxed ${isDone ? "line-through text-slate-400" : "text-slate-200"}`}>
                              {task.text}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons: START LEARNING & Syllabus Drawer */}
                        <div className="flex items-center gap-2 self-end sm:self-center pl-7 sm:pl-0">
                          {task.mod > 0 && (
                            <button
                              onClick={() => openDrawerForModule(task.subj, task.mod)}
                              title="Explore module syllabus and PYQs"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition"
                            >
                              <IconBookOpen className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* THE MOST IMPORTANT CONNECTOR: START LEARNING */}
                          <button
                            onClick={() => onLaunchCompanion(task.text, task.subj, task)}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition transform hover:scale-[1.02]"
                          >
                            <IconTeacher className="w-3.5 h-3.5" />
                            <span>START LEARNING</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-800 text-slate-300 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 w-10">Done</th>
                <th className="p-3 w-28">Date</th>
                <th className="p-3 w-20">Subject</th>
                <th className="p-3">Study Task & Syllabus Concept</th>
                <th className="p-3 w-16">Hours</th>
                <th className="p-3 w-36 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredDays.flatMap(day =>
                day.filteredTasks.map(task => {
                  const isDone = !!completedTasks[task.id];
                  return (
                    <tr key={task.id} className={isDone ? "bg-slate-950/40 opacity-60" : "hover:bg-slate-800/40"}>
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => onToggleTask(task.id)}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="p-3 font-mono text-slate-400">{day.date}</td>
                      <td className="p-3 font-bold text-cyan-300">{task.subj.toUpperCase()}</td>
                      <td className={`p-3 ${isDone ? "line-through text-slate-500" : "text-slate-200"}`}>{task.text}</td>
                      <td className="p-3 font-mono">{task.hrs}h</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onLaunchCompanion(task.text, task.subj, task)}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
                        >
                          Learn
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Syllabus Drawer for Deep Dives */}
      <SyllabusDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        subject={drawerSubj}
        moduleNum={drawerMod}
        onLaunchCompanion={onLaunchCompanion}
      />
    </div>
  );
}
