"use client";

import type { Persona, VerticalConfig } from "@/types";

function LoomLeadBadge({ lead }: { lead: Persona["loomLead"] }) {
  const isSe = lead === "SE";
  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold",
        isSe ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-sky-500/30 bg-sky-500/10 text-sky-200"
      ].join(" ")}
    >
      <span aria-hidden="true">📹</span>
      Loom Lead: {lead}
    </div>
  );
}

function Section({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        <span className="mr-1" aria-hidden="true">
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-2 rounded-xl border border-slate-800/70 bg-zinc-950/40 px-4 py-3 text-sm leading-relaxed text-slate-300">
        {value}
      </div>
    </div>
  );
}

export function DemoPanel({
  vd,
  selectedPersona,
  onPickPersona,
  onCopy
}: {
  vd: VerticalConfig;
  selectedPersona: Persona | null;
  onPickPersona: () => void;
  onCopy: (text: string, label: string) => Promise<void>;
}) {
  if (!selectedPersona) {
    return (
      <div className="animate-fade-in rounded-2xl border border-slate-800/60 bg-white/2 p-8 text-center">
        <div className="text-sm font-semibold text-slate-100">Select a persona first</div>
        <div className="mt-1 text-sm text-slate-500">
          The demo recipe and Loom script are persona-specific.
        </div>
        <button
          onClick={onPickPersona}
          className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-800/70 bg-white/3 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/5"
        >
          Pick persona →
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-100">Demo recipe</div>
          <div className="text-xs text-slate-500">
            Optimized for fast “show moment” delivery and clean AE/SE handoff.
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LoomLeadBadge lead={selectedPersona.loomLead} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/70 bg-white/2 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: vd.color }}>
              Demo
            </div>
            <div className="mt-1 truncate text-lg font-semibold text-slate-100">
              {selectedPersona.demoRecipe.title}
            </div>
          </div>
          <div
            className="hidden shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold md:block"
            style={{ borderColor: `${vd.color}33`, backgroundColor: `${vd.color}12`, color: vd.color }}
          >
            Anchor: {selectedPersona.anchorDemo}
          </div>
        </div>

        <div className="mt-5 grid gap-5">
          <Section label="Anchor capability" value={selectedPersona.anchorDemo} icon="❄" />
          <Section label="Data to use" value={selectedPersona.demoRecipe.data} icon="🗄️" />
          <Section label="What to build" value={selectedPersona.demoRecipe.build} icon="🔧" />
          <Section label="The show moment" value={selectedPersona.demoRecipe.showMoment} icon="⚡" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800/70 bg-white/2 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200">
            Your role (AE)
          </div>
          <div className="mt-2 text-sm leading-relaxed text-slate-300">
            {selectedPersona.demoRecipe.aeRole}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-white/2 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
            SE role
          </div>
          <div className="mt-2 text-sm leading-relaxed text-slate-300">
            {selectedPersona.demoRecipe.seRole}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/70 bg-white/2 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-100">
              Loom script <span className="text-slate-500">({selectedPersona.loomLead} records)</span>
            </div>
            <div className="text-xs text-slate-500">
              Copy, paste, personalize. Keep it short and concrete.
            </div>
          </div>
          <button
            onClick={() => onCopy(selectedPersona.loomScript, "Loom script")}
            className="inline-flex items-center justify-center rounded-xl border border-slate-800/70 bg-white/3 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/5"
          >
            Copy
          </button>
        </div>
        <div className="mt-4 whitespace-pre-wrap rounded-xl border border-slate-800/70 bg-zinc-950/40 p-4 text-sm leading-relaxed text-slate-300">
          {selectedPersona.loomScript}
        </div>
      </div>
    </div>
  );
}

