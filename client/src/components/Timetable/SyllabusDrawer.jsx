import { IconBookOpen, IconCheckCircle, IconTeacher } from "../Icons";

export function SyllabusDrawer({ isOpen, onClose, subject, moduleNum, onLaunchCompanion }) {
  if (!isOpen || !subject) return null;

  const currentMod = subject.modules?.find(m => m.num === moduleNum) || subject.modules?.[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-700 h-full overflow-y-auto p-6 space-y-6 shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{subject.code}</span>
            <h2 className="text-xl font-black text-white">{subject.name}</h2>
            <div className="text-xs text-slate-400 mt-0.5">
              Module {currentMod?.num}: {currentMod?.title} ({currentMod?.hours} Hours)
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Module Topics List with Teach Buttons */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <IconBookOpen className="w-4 h-4 text-cyan-400" />
            Curriculum Topics (Strict S5.pdf Alignment)
          </h3>

          <div className="space-y-2">
            {currentMod?.topics?.map((top, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start justify-between gap-3 group hover:border-cyan-500/50 transition"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-200 block">{top}</span>
                  <span className="text-[10px] text-slate-400">Core exam concept</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onLaunchCompanion(top, subject.id);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs whitespace-nowrap transition flex items-center gap-1"
                >
                  <IconTeacher className="w-3 h-3" /> Teach
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Real Exam PYQs */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
            Past Exam Questions (PYQs)
          </h3>
          <div className="space-y-2">
            {currentMod?.pyqs?.map((pyq, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-300">
                <span className="font-bold text-amber-300 block mb-1">Question {idx + 1}:</span>
                <p>{pyq}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
