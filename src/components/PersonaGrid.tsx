"use client";

import React, { memo, useMemo } from "react";
import type { Persona, VerticalConfig } from "@/types";

function includesLoose(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export const PersonaGrid = memo(function PersonaGrid({
  vd,
  personas,
  selectedPersonaId,
  search,
  onSearchChange,
  onPersonaSelect
}: {
  vd: VerticalConfig;
  personas: Persona[];
  selectedPersonaId: string | null;
  search: string;
  onSearchChange: (next: string) => void;
  onPersonaSelect: (persona: Persona) => void;
}) {
  const filtered = useMemo(() => {
    const q = search.trim();
    if (!q) return personas;
    return personas.filter((p) => {
      const surfaces = p.unconsumedSurface.join(" ");
      return (
        includesLoose(p.title, q) ||
        includesLoose(p.dept, q) ||
        includesLoose(p.trigger, q) ||
        includesLoose(p.anchorDemo, q) ||
        includesLoose(surfaces, q)
      );
    });
  }, [personas, search]);

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-100">Pick a persona</div>
          <div className="text-xs text-slate-500">
            This selection drives the demo recipe and Loom script.
          </div>
        </div>

        <div className="w-full md:w-96">
          <label className="sr-only" htmlFor="persona-search">
            Search personas
          </label>
          <input
            id="persona-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search title, dept, trigger, capability…"
            className="w-full rounded-xl border border-slate-800/70 bg-white/3 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-600 outline-none ring-0 transition focus:border-sky-500/40 focus:bg-white/4"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-800/60 bg-white/2 p-8 text-center">
          <div className="text-sm font-semibold text-slate-100">No matches</div>
          <div className="mt-1 text-sm text-slate-500">
            Try searching for a department (“R&D”), a capability (“Cortex”), or a pain (“compliance”).
          </div>
          <button
            onClick={() => onSearchChange("")}
            className="mt-4 rounded-xl border border-slate-800/70 bg-white/3 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((p) => {
            const selected = selectedPersonaId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onPersonaSelect(p)}
                className={[
                  "group rounded-2xl border p-4 text-left transition",
                  selected
                    ? "bg-white/4 ring-1 ring-inset"
                    : "bg-white/2 hover:bg-white/3",
                  selected ? "" : "hover:border-slate-700/70",
                  "border-slate-800/70"
                ].join(" ")}
                style={selected ? { borderColor: `${vd.color}55`, boxShadow: `0 0 0 1px ${vd.color}33 inset` } : undefined}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold text-slate-100">{p.title}</div>
                    <div className="mt-1 text-sm text-slate-500">{p.dept}</div>
                  </div>
                  <div
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${vd.color}22`, color: vd.color }}
                  >
                    {p.level}
                  </div>
                </div>

                <div className="mt-3 text-sm leading-relaxed text-slate-300/90">
                  <span className="mr-1 text-amber-400/90" aria-hidden="true">
                    ⚡
                  </span>
                  {p.trigger}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.unconsumedSurface.map((surf) => (
                    <span
                      key={surf}
                      className="rounded-lg border border-slate-800/70 bg-zinc-950/40 px-2 py-1 text-xs text-slate-400 transition group-hover:text-slate-300"
                    >
                      {surf}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="truncate">
                    <span className="text-slate-600">📹 Loom lead:</span>{" "}
                    <span className="font-semibold text-slate-300">{p.loomLead}</span>
                  </div>
                  <div className="rounded-lg bg-white/3 px-2 py-1 text-slate-300 opacity-0 transition group-hover:opacity-100">
                    Next: Demo →
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

