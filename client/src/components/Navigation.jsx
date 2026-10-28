import {
  IconBrain,
  IconTeacher,
  IconCompass,
  IconCalendar,
  IconBookOpen,
  IconZap,
  IconClock,
  IconCpu,
  IconEye,
  IconSparkles
} from "./Icons";

export function Navigation({ activeTab, onSelectTab, unreadRecalls = 0 }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: IconZap, badge: "Home" },
    { id: "companion", label: "AI Companion", icon: IconTeacher, badge: "Live Teacher", highlight: true },
    { id: "studymap", label: "Study Map", icon: IconCompass, badge: "Mastery" },
    { id: "timetable", label: "Timetable & Tasks", icon: IconCalendar, badge: "Schedule" },
    { id: "materials", label: "My Materials", icon: IconBookOpen, badge: "RAG Docs" },
    { id: "recall", label: "Active Recall", icon: IconBrain, badge: unreadRecalls > 0 ? `${unreadRecalls} due` : "Feynman" },
    { id: "practice", label: "Quiz & Exam", icon: IconZap, badge: "Simulator" },
    { id: "visualizer", label: "Visual Lab", icon: IconEye, badge: "Interactive" },
    { id: "memorylab", label: "Memory & Formulas", icon: IconSparkles, badge: "Flashcards" },
    { id: "labviva", label: "Lab / Viva", icon: IconCpu, badge: "Practical" },
    { id: "analytics", label: "Analytics", icon: IconClock, badge: "Memory" }
  ];

  return (
    <nav className="sticky top-[105px] z-30 backdrop-blur-md bg-slate-900/70 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.8 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? tab.highlight
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-[1.02]"
                      : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : tab.highlight
                    ? "bg-slate-800/70 text-cyan-300 hover:bg-slate-800 border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
