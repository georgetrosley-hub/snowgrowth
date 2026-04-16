"use client";

import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  Cpu,
  GitBranch,
  Landmark,
  ShieldQuestion,
  UserCircle2
} from "lucide-react";
import type { AccountConfig } from "@/types";

function IntelBlock({
  label,
  value,
  Icon,
  accent
}: {
  label: string;
  value: string;
  Icon: LucideIcon;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-sf-border bg-white p-4 shadow-panel">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
        <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        {label}
      </div>
      <div className={`mt-2 text-sm leading-relaxed text-sf-foreground ${accent ?? ""}`}>{value}</div>
    </div>
  );
}

export function DealViewPanel({ account }: { account: AccountConfig }) {
  const d = account.dealIntelligence;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <div className="text-sm font-semibold text-sf-foreground">Deal view</div>
        <div className="mt-1 text-xs text-sf-foreground-muted">
          How the deal actually closes: entry, buyers, risk, and the path from land to expansion.
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <IntelBlock label="Entry point (first persona)" value={d.entryPoint} Icon={UserCircle2} accent="font-medium" />
        <IntelBlock label="Economic buyer" value={d.economicBuyer} Icon={BadgeDollarSign} />
        <IntelBlock label="Technical buyer" value={d.technicalBuyer} Icon={Cpu} />
        <IntelBlock label="Key risk" value={d.keyRisk} Icon={AlertTriangle} />
        <IntelBlock label="Competitor / status quo" value={d.competitorStatusQuo} Icon={ShieldQuestion} />
      </div>

      <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
        <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
          <GitBranch className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
          Expansion path
          <span className="font-normal text-sf-foreground-muted">— after the initial win</span>
        </div>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-sf-foreground">
          {d.expansionPath.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
            <Landmark className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Land strategy
          </div>
          <div className="mt-2 text-sm leading-relaxed text-sf-foreground">{d.landStrategy}</div>
        </div>
        <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
            <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Expand strategy
          </div>
          <div className="mt-2 text-sm leading-relaxed text-sf-foreground">{d.expandStrategy}</div>
        </div>
      </div>
    </div>
  );
}
