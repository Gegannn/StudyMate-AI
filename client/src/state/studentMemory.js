// Student Memory & State Engine
// Manages shared student state, persistence, mastery calculations, spaced repetition, and study recommendations.
import { SUBJECTS, SCHEDULE_DAYS } from "../data/curriculum";
import { PYQ_INTELLIGENCE } from "../data/pyqIntelligenceData";

const MEMORY_KEY = "studymate_memory_v2";
const PROGRESS_KEY = "mace_aiml_study_progress";

const DEFAULT_STATE = {
  completedTasks: {},
  topicMastery: {
    "Master's Theorem": { level: "Practicing", score: 68, timesReviewed: 3, lastStudied: "2026-10-28", confusionCount: 1 },
    "AVL Trees": { level: "Weak", score: 45, timesReviewed: 2, lastStudied: "2026-10-27", confusionCount: 3 },
    "Dijkstra's Algorithm": { level: "Strong", score: 82, timesReviewed: 4, lastStudied: "2026-10-26", confusionCount: 0 },
    "TCP 3-Way Handshake": { level: "Mastered", score: 94, timesReviewed: 5, lastStudied: "2026-10-25", confusionCount: 0 },
    "FIRST and FOLLOW": { level: "Learning", score: 55, timesReviewed: 2, lastStudied: "2026-10-26", confusionCount: 2 }
  },
  quizHistory: [
    { id: "q-1", subject: "aad", topic: "Master's Theorem", score: 4, total: 5, date: "2026-10-27", passed: true },
    { id: "q-2", subject: "cd", topic: "FIRST & FOLLOW", score: 3, total: 5, date: "2026-10-26", passed: true }
  ],
  recallHistory: [
    { id: "r-1", topic: "TCP 3-Way Handshake", rating: "Strong", date: "2026-10-28" },
    { id: "r-2", topic: "AVL Rotations", rating: "Weak", date: "2026-10-27" }
  ],
  feynmanHistory: [],
  mistakes: [
    { id: "m-1", topic: "AVL Trees", errorText: "Confused LR double rotation with single right rotation", correction: "Perform Left rotation on child first, then Right on parent", reviewDue: "2026-10-29" },
    { id: "m-2", topic: "FIRST and FOLLOW", errorText: "Added epsilon to FOLLOW set", correction: "FOLLOW never contains epsilon (only EOF $ or terminals)", reviewDue: "2026-10-29" }
  ],
  revisionQueue: [
    { id: "rev-1", topic: "AVL Trees", subject: "aad", dueDate: "2026-10-29", intervalDays: 1, priority: "High" },
    { id: "rev-2", topic: "Master's Theorem", subject: "aad", dueDate: "2026-10-30", intervalDays: 3, priority: "Medium" }
  ],
  studySessions: [
    { id: "s-1", topic: "Master Theorem", subject: "aad", durationMinutes: 45, date: "2026-10-28", goal: "Master Case 1 & Case 2" }
  ],
  settings: {
    apiUrl: "http://localhost:5000",
    aiUrl: "http://127.0.0.1:8000",
    geminiKey: "",
    theme: "dark",
    pomodoroMinutes: 25,
    autoPlayVisuals: true
  }
};

export function loadStudentMemory() {
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    const existingLegacy = localStorage.getItem(PROGRESS_KEY);
    let legacyCompleted = {};

    if (existingLegacy) {
      try { legacyCompleted = JSON.parse(existingLegacy); } catch (e) {}
    }

    if (!raw) {
      const initial = { ...DEFAULT_STATE, completedTasks: legacyCompleted };
      saveStudentMemory(initial);
      return initial;
    }

    const parsed = JSON.parse(raw);
    // Merge any newly toggled legacy tasks
    parsed.completedTasks = { ...legacyCompleted, ...parsed.completedTasks };
    return parsed;
  } catch (err) {
    console.error("Error loading student memory:", err);
    return DEFAULT_STATE;
  }
}

export function saveStudentMemory(state) {
  try {
    localStorage.setItem(MEMORY_KEY, JSON.stringify(state));
    // Also save legacy compatibility key for tasks
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.completedTasks || {}));
  } catch (err) {
    console.error("Error saving student memory:", err);
  }
}

// Mastery Level Calculation
export function getMasteryLevel(score) {
  if (score >= 90) return "Mastered";
  if (score >= 75) return "Strong";
  if (score >= 60) return "Practicing";
  if (score >= 40) return "Learning";
  if (score >= 20) return "Weak";
  return "Introduced";
}

// "WHAT SHOULD I STUDY NOW?" Recommendation Engine
export function getWhatShouldIStudyNow(state) {
  // 1. Check for immediate weak spots in upcoming exams
  const weakTopics = Object.entries(state.topicMastery || {})
    .filter(([_, data]) => data.level === "Weak" || data.score < 50)
    .sort((a, b) => (b[1].confusionCount || 0) - (a[1].confusionCount || 0));

  if (weakTopics.length > 0) {
    const [topic, info] = weakTopics[0];
    return {
      topic: topic,
      subject: "aad", // default subject
      subjectName: "Algorithm Analysis & Design",
      durationMinutes: 35,
      reason: `You struggled with this topic ${info.confusionCount || 1} times and mastery is only ${info.score}%. High upcoming exam frequency.`,
      action: "Revise intuition, watch step-by-step visual, and practice 3 exam problems",
      urgency: "High"
    };
  }

  // 2. Check next uncompleted task in timetable
  for (const day of SCHEDULE_DAYS) {
    for (const task of day.tasks) {
      if (!state.completedTasks[task.id]) {
        const subj = SUBJECTS[task.subj] || { name: task.subj.toUpperCase() };
        return {
          topic: task.text.replace(/^[A-Z0-9\s]+:\s*/, ""),
          subject: task.subj,
          subjectName: subj.name,
          durationMinutes: Math.round(task.hrs * 60) || 45,
          reason: `Scheduled on ${day.title} (${task.cat.toUpperCase()}). Core curriculum requirement.`,
          action: "Launch Companion Mode to learn the theory, test recall, and mark complete",
          urgency: day.type === "exam" ? "Critical" : "Scheduled"
        };
      }
    }
  }

  // 3. Fallback to Master Theorem
  return {
    topic: "Master's Theorem Recurrences",
    subject: "aad",
    subjectName: "Algorithm Analysis and Design",
    durationMinutes: 30,
    reason: "Guaranteed 100% past recurrence rate in all university exams.",
    action: "Master the 3 cases and solve 2 PYQ numericals",
    urgency: "Recommended"
  };
}

// Dynamic Cram Mode Generator
export function generateCramPlan(timeframe, state) {
  // Priority: High-frequency PYQ topics with lowest mastery
  const highYieldTopics = [
    { subject: "aad", topic: "Master's Theorem Recurrences", timeMin: 25, yield: "100% Recurrence" },
    { subject: "aad", topic: "AVL Tree Rotations (LL, RR, LR, RL)", timeMin: 30, yield: "88% Recurrence" },
    { subject: "cd", topic: "FIRST and FOLLOW Sets + LL(1)", timeMin: 30, yield: "100% Recurrence" },
    { subject: "cn", topic: "IPv4 Subnetting & CIDR", timeMin: 25, yield: "88% Recurrence" },
    { subject: "cn", topic: "TCP 3-Way Handshake & Congestion", timeMin: 25, yield: "100% Recurrence" },
    { subject: "bdp", topic: "Hadoop Ecosystem Architecture", timeMin: 20, yield: "100% Recurrence" },
    { subject: "da", topic: "Data Analytics Life Cycle Stages", timeMin: 20, yield: "100% Recurrence" },
    { subject: "da", topic: "Apriori Algorithm & Support/Confidence", timeMin: 25, yield: "83% Recurrence" }
  ];

  let maxMinutes = 60;
  if (timeframe === "3hours") maxMinutes = 180;
  else if (timeframe === "1day") maxMinutes = 480;
  else if (timeframe === "3days") maxMinutes = 1440;
  else if (timeframe === "1week") maxMinutes = 3360;

  let allocated = 0;
  const plan = [];

  for (const item of highYieldTopics) {
    if (allocated + item.timeMin <= maxMinutes) {
      const mastery = state.topicMastery[item.topic]?.score || 30;
      plan.push({
        ...item,
        currentMastery: mastery,
        category: mastery < 50 ? "Must Know" : "High Yield"
      });
      allocated += item.timeMin;
    }
  }

  return { timeframe, totalMinutes: allocated, plan };
}
