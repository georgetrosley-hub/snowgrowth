"use client";

import type { MotionKey, Persona, VerticalConfig, VerticalKey } from "@/types";

const MOTIONS: MotionKey[] = [
  "Mix of all three",
  "New persona outreach",
  "Exec escalation",
  "Use case mapping"
];

function stepState(hasPersona: boolean, hasUseCase: boolean) {
  if (!hasPersona) return 1;
  if (!hasUseCase) return 2;
  return 3;
}

export function Sidebar({
  verticals,
  selectedVertical,
  selectedVerticalData,
  onVerticalSelect,
  motion,
  onMotionSelect,
  selectedPersona,
  selectedUseCase
}: {
  verticals: Record<VerticalKey, VerticalConfig>;
  selectedVertical: VerticalKey | null;
  selectedVerticalData: VerticalConfig | null;
  onVerticalSelect: (name: VerticalKey) => void;
  motion: MotionKey;
  onMotionSelect: (motion: MotionKey) => void;
  selectedPersona: Persona | null;
  selectedUseCase: string | null;
}) {
  const vd = selectedVerticalData;
  const currentStep = stepState(Boolean(selectedPersona), Boolean(selectedUseCase));

  return (
    <aside className="flex h-full flex-col border-r border-slate-800/80 bg-zinc-950/40 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        Vertical
      </div>

      <div className="mt-3 flex flex-col gap-1">
        {(Object.entries(verticals) as [VerticalKey, VerticalConfig][]).map(([name, data]) => {
          const selected = selectedVertical === name;
          return (
            <button
              key={name}
              onClick={() => onVerticalSelect(name)}
              className={[
                "group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                selected
                  ? "bg-white/5 text-slate-100 ring-1 ring-inset ring-white/10"
                  : "text-slate-400 hover:bg-white/3 hover:text-slate-200"
              ].join(" ")}
            >
              <span className="text-base">{data.icon}</span>
              <span className="flex-1">{name}</span>
              <span
                className={[
                  "h-2 w-2 rounded-full transition",
                  selected ? "" : "opacity-0 group-hover:opacity-60"
                ].join(" ")}
                style={{ backgroundColor: data.color }}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-slate-800/60 bg-zinc-950/50 p-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-200">Progress</div>
          <div className="text-[11px] text-slate-500">
            Step {currentStep} of 3
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
          {[
            { label: "Persona", done: Boolean(selectedPersona) },
            { label: "Use case", done: Boolean(selectedUseCase) },
            { label: "Outreach", done: Boolean(selectedPersona && selectedUseCase) }
          ].map((s, idx) => (
            <div
              key={s.label}
              className={[
                "rounded-lg border px-2 py-2 text-center",
                s.done
                  ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
                  : idx + 1 === currentStep
                    ? "border-sky-500/25 bg-sky-500/10 text-sky-200"
                    : "border-slate-800/60 bg-white/2 text-slate-500"
              ].join(" ")}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {selectedVertical && vd ? (
        <>
          <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Motion
          </div>

          <div className="mt-3 flex flex-col gap-1">
            {MOTIONS.map((m) => {
              const selected = motion === m;
              return (
                <button
                  key={m}
                  onClick={() => onMotionSelect(m)}
                  className={[
                    "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                    selected
                      ? "bg-white/5 text-sky-200 ring-1 ring-inset ring-white/10"
                      : "text-slate-500 hover:bg-white/3 hover:text-slate-300"
                  ].join(" ")}
                >
                  {m}
                </button>
              );
            })}
          </div>

          {selectedPersona ? (
            <div
              className="mt-6 rounded-xl border p-3"
              style={{
                borderColor: `${vd.color}33`,
                backgroundColor: `${vd.color}14`
              }}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: vd.color }}>
                Selected persona
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-100">{selectedPersona.title}</div>
              <div className="mt-0.5 text-xs text-slate-400">
                {selectedPersona.dept} · {selectedPersona.level}
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-slate-800/60 bg-white/2 p-3 text-sm text-slate-500">
              Pick a persona to unlock the demo recipe and outreach flow.
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-xl border border-slate-800/60 bg-white/2 p-3 text-sm text-slate-500">
          Choose a vertical to begin.
        </div>
      )}

      <div className="mt-auto pt-6 text-xs text-slate-600">
        Built for fast persona → demo → outreach iteration.
      </div>
    </aside>
  );
}

