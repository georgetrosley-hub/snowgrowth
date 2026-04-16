"use client";

import type { ReactNode } from "react";
import type { EmailDraft, MotionKey, Persona, VerticalConfig } from "@/types";

function Pill({
  children,
  tone = "neutral"
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  return (
    <div
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tone === "accent" ? "border-white/10 bg-white/5 text-slate-100" : "border-slate-800/70 bg-white/2 text-slate-400"
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function OutreachPanel({
  vd,
  selectedPersona,
  selectedUseCase,
  motion,
  email,
  onPickPersona,
  onPickUseCase,
  onCopy,
  onExportTxt
}: {
  vd: VerticalConfig;
  selectedPersona: Persona | null;
  selectedUseCase: string | null;
  motion: MotionKey;
  email: EmailDraft | null;
  onPickPersona: () => void;
  onPickUseCase: () => void;
  onCopy: (text: string, label: string) => Promise<void>;
  onExportTxt: (draft: EmailDraft) => void;
}) {
  if (!selectedPersona || !selectedUseCase || !email) {
    return (
      <div className="animate-fade-in rounded-2xl border border-slate-800/60 bg-white/2 p-8 text-center">
        <div className="text-sm font-semibold text-slate-100">Select a persona and use case</div>
        <div className="mt-1 text-sm text-slate-500">
          We’ll generate an outreach email draft once both are selected.
        </div>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={onPickPersona}
            className="rounded-xl border border-slate-800/70 bg-white/3 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/5"
          >
            Persona →
          </button>
          <button
            onClick={onPickUseCase}
            className="rounded-xl border border-slate-800/70 bg-white/3 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/5"
          >
            Use case →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="accent">
          <span className="mr-2" aria-hidden="true">
            👤
          </span>
          {selectedPersona.title}
        </Pill>
        <Pill>
          <span className="mr-2" aria-hidden="true">
            🧩
          </span>
          {selectedUseCase.split("(")[0].trim()}
        </Pill>
        <div className="ml-auto">
          <div
            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
            style={{ borderColor: `${vd.color}33`, backgroundColor: `${vd.color}12`, color: vd.color }}
          >
            {motion}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/70 bg-white/2 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-100">Subject</div>
            <div className="text-xs text-slate-500">Copy into your email client.</div>
          </div>
          <button
            onClick={() => onCopy(email.subject, "Subject")}
            className="rounded-xl border border-slate-800/70 bg-white/3 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/5"
          >
            Copy subject
          </button>
        </div>
        <div className="mt-4 rounded-xl border border-slate-800/70 bg-zinc-950/40 px-4 py-3 text-sm text-slate-200">
          {email.subject}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/70 bg-white/2 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-100">Email body</div>
            <div className="text-xs text-slate-500">Personalize the bracket fields, then send.</div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => onCopy(email.body, "Email body")}
              className="rounded-xl border border-slate-800/70 bg-white/3 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/5"
            >
              Copy body
            </button>
            <button
              onClick={() => onExportTxt(email)}
              className="rounded-xl border border-slate-800/70 bg-white/3 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/5"
            >
              Export .txt
            </button>
          </div>
        </div>
        <div className="mt-4 whitespace-pre-wrap rounded-xl border border-slate-800/70 bg-zinc-950/40 p-4 text-sm leading-relaxed text-slate-300">
          {email.body}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800/70 bg-zinc-950/40 p-4 text-sm text-slate-400">
          <div className="text-xs font-semibold text-slate-200">Reference on the call</div>
          <div className="mt-2">
            <span className="font-semibold" style={{ color: vd.color }}>
              {selectedPersona.unconsumedSurface.join(" · ")}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-200/90">
          <div className="text-xs font-semibold text-amber-200">Next step before sending</div>
          <div className="mt-2 text-amber-200/80">
            Search:{" "}
            <span className="font-semibold text-amber-100">{`"${vd.execTriggers[0]}"`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

