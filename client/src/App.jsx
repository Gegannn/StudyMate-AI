import { useState, useEffect } from "react";
import BackgroundCanvas from "./components/BackgroundCanvas";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { CommandCenter } from "./components/Dashboard/CommandCenter";
import { CompanionView } from "./components/Companion/CompanionView";
import { TimetableView } from "./components/Timetable/TimetableView";
import { StudyMapView } from "./components/StudyMap/StudyMapView";
import { MaterialsView } from "./components/Materials/MaterialsView";
import { VisualLabView } from "./components/VisualLab/VisualLabView";
import { RecallView } from "./components/Recall/RecallView";
import { QuizExamView } from "./components/Practice/QuizExamView";
import { MemoryLabView } from "./components/MemoryLab/MemoryLabView";
import { LabVivaView } from "./components/LabViva/LabVivaView";
import { AnalyticsView } from "./components/Analytics/AnalyticsView";
import { FocusTimerModal } from "./components/FocusTimer/FocusTimerModal";
import { CramModal } from "./components/Dashboard/CramModal";
import { SettingsModal } from "./components/SettingsModal";
import { loadStudentMemory, saveStudentMemory } from "./state/studentMemory";

export default function App() {
  const [studentState, setStudentState] = useState(() => loadStudentMemory());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState(() => localStorage.getItem("mace_theme") || "dark");

  // Companion launch state
  const [companionTopic, setCompanionTopic] = useState("Master's Theorem Recurrences");
  const [companionSubject, setCompanionSubject] = useState("aad");

  // Modals state
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [cramModalOpen, setCramModalOpen] = useState(false);
  const [cramInitialTimeframe, setCramInitialTimeframe] = useState("3hours");
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Focus Timer state
  const [timerState, setTimerState] = useState({
    secondsLeft: 25 * 60,
    totalSeconds: 25 * 60,
    isRunning: false,
    goal: "Master AVL Tree Rotations & Balance Factors"
  });

  // Theme effect
  useEffect(() => {
    localStorage.setItem("mace_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Save student memory changes
  const updateStudentState = (updater) => {
    setStudentState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveStudentMemory(next);
      return next;
    });
  };

  // Synthesized Web Audio chime on timer completion
  const playChime = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.warn("Audio Context unavailable:", e);
    }
  };

  // Timer Tick
  useEffect(() => {
    let interval;
    if (timerState.isRunning && timerState.secondsLeft > 0) {
      interval = setInterval(() => {
        setTimerState((prev) => {
          if (prev.secondsLeft <= 1) {
            playChime();
            return { ...prev, secondsLeft: 0, isRunning: false };
          }
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.secondsLeft]);

  // Master Handlers
  const handleToggleTask = (taskId) => {
    updateStudentState((prev) => {
      const current = !!prev.completedTasks[taskId];
      const updated = { ...prev.completedTasks, [taskId]: !current };
      return { ...prev, completedTasks: updated };
    });
  };

  const handleUpdateMastery = (topic, score, level) => {
    updateStudentState((prev) => {
      const existing = prev.topicMastery[topic] || {};
      const updated = {
        ...prev.topicMastery,
        [topic]: {
          ...existing,
          score,
          level,
          lastStudied: new Date().toISOString().split("T")[0],
          timesReviewed: (existing.timesReviewed || 0) + 1
        }
      };
      return { ...prev, topicMastery: updated };
    });
  };

  const handleLaunchCompanion = (topic, subject, task = null) => {
    setCompanionTopic(topic);
    setCompanionSubject(subject || "aad");
    setActiveTab("companion");

    // Also update focus timer goal!
    setTimerState((prev) => ({
      ...prev,
      goal: `Learn & Master: ${topic}`
    }));

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenCram = (timeframe = "3hours") => {
    setCramInitialTimeframe(timeframe);
    setCramModalOpen(true);
  };

  const handleResetState = () => {
    localStorage.removeItem("studymate_memory_v2");
    localStorage.removeItem("mace_aiml_study_progress");
    window.location.reload();
  };

  return (
    <div className={`min-h-screen relative font-sans ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
      {/* Dynamic Moving Background Canvas */}
      <BackgroundCanvas theme={theme} />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Header with Live Countdown Ribbon */}
        <Header
          theme={theme}
          onToggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenTimer={() => setTimerModalOpen(true)}
          timerState={timerState}
          studentState={studentState}
        />

        {/* Unified Navigation Bar */}
        <Navigation
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          unreadRecalls={studentState.revisionQueue?.length || 0}
        />

        {/* Viewport Workspace */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {activeTab === "dashboard" && (
            <CommandCenter
              studentState={studentState}
              onLaunchCompanion={handleLaunchCompanion}
              onSelectTab={setActiveTab}
              onOpenCram={handleOpenCram}
            />
          )}

          {activeTab === "companion" && (
            <CompanionView
              initialTopic={companionTopic}
              initialSubject={companionSubject}
              studentState={studentState}
              onUpdateMastery={handleUpdateMastery}
              onCompleteTask={handleToggleTask}
              onOpenVisualizer={() => setActiveTab("visualizer")}
            />
          )}

          {activeTab === "studymap" && (
            <StudyMapView
              studentState={studentState}
              onLaunchCompanion={handleLaunchCompanion}
            />
          )}

          {activeTab === "timetable" && (
            <TimetableView
              studentState={studentState}
              onToggleTask={handleToggleTask}
              onLaunchCompanion={handleLaunchCompanion}
            />
          )}

          {activeTab === "materials" && (
            <MaterialsView
              studentState={studentState}
              onLaunchCompanion={handleLaunchCompanion}
            />
          )}

          {activeTab === "recall" && (
            <RecallView
              studentState={studentState}
              onUpdateMastery={handleUpdateMastery}
              onLaunchCompanion={handleLaunchCompanion}
            />
          )}

          {activeTab === "practice" && (
            <QuizExamView
              onUpdateMastery={handleUpdateMastery}
              onLaunchCompanion={handleLaunchCompanion}
            />
          )}

          {activeTab === "visualizer" && (
            <VisualLabView
              onLaunchCompanion={handleLaunchCompanion}
            />
          )}

          {activeTab === "memorylab" && (
            <MemoryLabView
              onUpdateMastery={handleUpdateMastery}
            />
          )}

          {activeTab === "labviva" && (
            <LabVivaView />
          )}

          {activeTab === "analytics" && (
            <AnalyticsView
              studentState={studentState}
              onLaunchCompanion={handleLaunchCompanion}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <strong>StudyMate AI — Beast Mode</strong> • AI Learning Operating System
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={() => setSettingsOpen(true)} className="hover:text-cyan-400">
                System Diagnostics
              </button>
              <button onClick={() => handleOpenCram("3hours")} className="hover:text-amber-400">
                Cram Mode
              </button>
              <button onClick={() => setTimerModalOpen(true)} className="hover:text-cyan-400">
                Focus Pomodoro
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <FocusTimerModal
        isOpen={timerModalOpen}
        onClose={() => setTimerModalOpen(false)}
        timerState={timerState}
        onStartTimer={() => setTimerState(p => ({ ...p, isRunning: true }))}
        onPauseTimer={() => setTimerState(p => ({ ...p, isRunning: false }))}
        onResetTimer={() => setTimerState(p => ({ ...p, secondsLeft: p.totalSeconds, isRunning: false }))}
        onSetDuration={(secs) => setTimerState(p => ({ ...p, totalSeconds: secs, secondsLeft: secs, isRunning: false }))}
        onLaunchCompanion={handleLaunchCompanion}
      />

      <CramModal
        isOpen={cramModalOpen}
        onClose={() => setCramModalOpen(false)}
        studentState={studentState}
        initialTimeframe={cramInitialTimeframe}
        onLaunchCompanion={handleLaunchCompanion}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        studentState={studentState}
        onSaveSettings={(settings) => updateStudentState(p => ({ ...p, settings }))}
        onResetState={handleResetState}
      />
    </div>
  );
}
