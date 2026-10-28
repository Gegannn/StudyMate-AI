import { useState, useEffect } from "react";
import { SUBJECTS } from "../data/curriculum";
import { IconBrain, IconSun, IconMoon, IconSettings, IconClock, IconFlame } from "./Icons";

export function Header({ theme, onToggleTheme, onOpenSettings, onOpenTimer, timerState, studentState }) {
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date();
      const cds = {};

      Object.values(SUBJECTS).forEach(subj => {
        if (!subj.date) return;
        const examDate = new Date(`${subj.date}T09:30:00`);
        const diff = examDate - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60)) / (1000 * 60));
          cds[subj.id] = { days, hours, mins, totalHours: Math.floor(diff / (1000 * 60 * 60)), urgent: days < 14 };
        } else {
          cds[subj.id] = { days: 0, hours: 0, mins: 0, totalHours: 0, urgent: false, completed: true };
        }
      });

      setCountdowns(cds);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 dark:bg-slate-950/80 border-b border-slate-700/50 shadow-lg">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black text-xl">
            <IconBrain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                StudyMate AI
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <IconFlame className="w-3 h-3 text-cyan-400" /> Beast Mode
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Autonomous AI Learning Operating System • MACE AIML
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Focus Pill */}
          <button
            onClick={onOpenTimer}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition shadow-sm"
          >
            <IconClock className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span className="hidden sm:inline text-slate-400">Focus Goal:</span>
            <span className="text-amber-300 font-mono">
              {Math.floor(timerState.secondsLeft / 60)}:{(timerState.secondsLeft % 60).toString().padStart(2, "0")}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-slate-300 transition"
          >
            {theme === "dark" ? <IconSun className="w-4 h-4 text-amber-400" /> : <IconMoon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title="Settings & AI Services"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-slate-300 transition"
          >
            <IconSettings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Exam Countdown Ribbon */}
      <div className="border-t border-slate-800/60 bg-slate-950/40 px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs whitespace-nowrap">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 mr-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Exam Countdown:
          </span>

          {Object.values(SUBJECTS).map(subj => {
            if (!subj.date) return null;
            const cd = countdowns[subj.id];
            if (!cd) return null;

            return (
              <div
                key={subj.id}
                className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-medium transition ${
                  cd.urgent
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-300 shadow-sm shadow-rose-500/10"
                    : "bg-slate-800/50 border-slate-700/50 text-slate-300"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: subj.color }} />
                <span className="font-semibold">{subj.code || subj.name}:</span>
                <span className="font-mono text-[11px] text-cyan-300 font-bold">
                  {cd.days}d {cd.hours}h
                </span>
                <span className="text-[10px] text-slate-400">({subj.date.split("-").slice(1).join("/")})</span>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
