import { useState } from "react";
import { IconClock, IconPlay, IconPause, IconRotateCcw, IconTeacher } from "../Icons";

export function FocusTimerModal({
  isOpen,
  onClose,
  timerState,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onSetDuration,
  onLaunchCompanion
}) {
  if (!isOpen) return null;

  const minutes = Math.floor(timerState.secondsLeft / 60);
  const seconds = timerState.secondsLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 space-y-6 shadow-2xl text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white font-bold"
        >
          ✕
        </button>

        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5">
            <IconClock className="w-3.5 h-3.5" /> Intelligent Focus Mode
          </span>
          <h3 className="text-xl font-black text-white pt-2">Focus & Mastery Timer</h3>
          <p className="text-xs text-slate-400">
            The timer tracks exactly what syllabus topic you are studying.
          </p>
        </div>

        {/* Current Active Goal Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
            Current Learning Target:
          </span>
          <p className="text-sm font-extrabold text-white">
            {timerState.goal || "Master AVL Tree Rotations & Balance Factors"}
          </p>
        </div>

        {/* Big Digital Clock Display */}
        <div className="py-6">
          <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
            {timeFormatted}
          </div>
          <span className="text-xs text-slate-400 mt-2 block font-medium">
            {timerState.isRunning ? "Session in progress • Stay focused" : "Paused"}
          </span>
        </div>

        {/* Duration Selectors */}
        <div className="flex justify-center gap-2">
          {[15, 25, 45, 60].map(mins => (
            <button
              key={mins}
              onClick={() => onSetDuration(mins * 60)}
              className="text-xs px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold transition"
            >
              {mins}m
            </button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={timerState.isRunning ? onPauseTimer : onStartTimer}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-cyan-500/25 flex items-center gap-2 transition transform hover:scale-105"
          >
            {timerState.isRunning ? <IconPause className="w-5 h-5" /> : <IconPlay className="w-5 h-5" />}
            <span>{timerState.isRunning ? "Pause Session" : "Start Focus"}</span>
          </button>

          <button
            onClick={onResetTimer}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Reset timer"
          >
            <IconRotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Jump to Companion Teacher */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onLaunchCompanion(timerState.goal || "AVL Trees", "aad");
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center justify-center gap-1.5 mx-auto"
          >
            <IconTeacher className="w-4 h-4" />
            <span>Open Topic in Companion Mode →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
