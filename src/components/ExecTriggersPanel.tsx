"use client";

import type { VerticalConfig } from "@/types";

export function ExecTriggersPanel({ vd }: { vd: VerticalConfig }) {
  return (
    <div className="animate-fade-in space-y-3">
      <div className="mb-2">
        <div className="text-sm font-semibold text-slate-100">Exec triggers</div>
        <div className="text-xs text-slate-500">
          Use these as “why now” hooks. Lead with the trigger, not the product.
        </div>
      </div>

      {vd.execTriggers.map((trigger) => (
        <div
          key={trigger}
          className="flex gap-4 rounded-2xl border border-slate-800/70 bg-white/2 p-4"
        >
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/3 text-lg"
            style={{ color: vd.color }}
            aria-hidden="true"
          >
            🎯
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-100">{trigger}</div>
            <div className="mt-1 text-xs text-slate-500">
              Search{" "}
              <span className="font-semibold text-slate-300">
                {`"[Account] + ${trigger.split(" ").slice(0, 3).join(" ")}"`}
              </span>{" "}
              on Google News + LinkedIn before outreach.
            </div>
          </div>
        </div>
      ))}

      <div className="mt-3 rounded-2xl border border-slate-800/60 bg-white/2 p-4 text-sm text-slate-500">
        If you find a match on any of these triggers, that’s your reason to reach out today instead
        of next week.
      </div>
    </div>
  );
}

