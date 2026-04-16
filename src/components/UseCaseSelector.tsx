"use client";

import React, { memo } from "react";
import type { Persona, VerticalConfig } from "@/types";

const USE_CASE_ICONS = ["🔬", "💰", "🏗️", "🤝", "📋", "🧠"] as const;

export const UseCaseSelector = memo(function UseCaseSelector({
  vd,
  selectedPersona,
  selectedUseCase,
  onSelectUseCase
}: {
  vd: VerticalConfig;
  selectedPersona: Persona | null;
  selectedUseCase: string | null;
  onSelectUseCase: (useCase: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <div className="text-sm font-semibold text-slate-100">Choose a use case</div>
        <div className="text-xs text-slate-500">
          This selection drives the outreach email draft.
        </div>
      </div>

      {selectedPersona ? (
        <div
          className="mb-4 rounded-2xl border p-3"
          style={{ borderColor: `${vd.color}33`, backgroundColor: `${vd.color}10` }}
        >
          <div className="text-xs text-slate-400">
            Persona:{" "}
            <span className="font-semibold" style={{ color: vd.color }}>
              {selectedPersona.title}
            </span>{" "}
            <span className="text-slate-600">·</span> Recommended anchor demo:{" "}
            <span className="font-semibold text-slate-100">{selectedPersona.anchorDemo}</span>
          </div>
        </div>
      ) : (
        <div className="mb-4 rounded-2xl border border-slate-800/60 bg-white/2 p-3 text-sm text-slate-500">
          Tip: pick a persona first to get an anchor demo recommendation.
        </div>
      )}

      <div className="grid gap-3">
        {vd.useCases.map((uc, i) => {
          const selected = selectedUseCase === uc;
          return (
            <button
              key={uc}
              onClick={() => onSelectUseCase(uc)}
              className={[
                "group flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition",
                selected ? "bg-white/4" : "bg-white/2 hover:bg-white/3",
                "border-slate-800/70"
              ].join(" ")}
              style={selected ? { borderColor: `${vd.color}55`, boxShadow: `0 0 0 1px ${vd.color}33 inset` } : undefined}
            >
              <div
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/3 text-lg"
                aria-hidden="true"
              >
                {USE_CASE_ICONS[i % USE_CASE_ICONS.length]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-slate-100">{uc}</div>
                <div className="mt-1 text-xs text-slate-500">
                  Next: generate outreach → copy / export
                </div>
              </div>
              <div className="mt-1 text-xs text-slate-600 opacity-0 transition group-hover:opacity-100">
                Select →
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

