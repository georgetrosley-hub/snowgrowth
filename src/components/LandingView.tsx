"use client";

import { ArrowRight, Gauge, Target, Zap } from "lucide-react";
import type { AccountConfig } from "@/types";
import { AccountGlyph } from "@/components/icons/AccountGlyph";

const TIER_LABELS: Record<AccountConfig["tier"], string> = {
  1: "Tier 1",
  2: "Tier 2",
  "2B": "Tier 2B",
  3: "Tier 3"
};

const TIER_ORDER: AccountConfig["tier"][] = [1, 2, "2B", 3];

function primaryPath(account: AccountConfig) {
  return {
    persona: account.personas.find((item) => item.id === account.primaryMotion.personaId),
    useCase: account.useCases.find((item) => item.id === account.primaryMotion.useCaseId)
  };
}

export function LandingView({
  accounts,
  onSelectAccount
}: {
  accounts: AccountConfig[];
  onSelectAccount: (id: string) => void;
}) {
  const byTier = TIER_ORDER.map((tier) => ({
    tier,
    items: accounts.filter((account) => account.tier === tier).sort((a, b) => a.name.localeCompare(b.name))
  }));
  const recommended = accounts
    .filter((account) => account.tier === 1)
    .sort((a, b) => a.name.localeCompare(b.name))[0] ?? accounts[0] ?? null;
  const recommendedPath = recommended ? primaryPath(recommended) : null;

  return (
    <div className="min-h-[calc(100vh-73px)] bg-white px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="grid gap-6 border-b border-sf-border pb-8 lg:grid-cols-[1fr_26rem] lg:items-end">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
              Expansion workspace
            </div>
            <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-sf-foreground md:text-4xl">
              Open the highest-probability expansion motion.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sf-foreground-muted">
              Start with the account, stakeholder, workload, demo, and touch that can move this week.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="border-l border-sf-border pl-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
                  Accounts
                </div>
                <div className="mt-1 text-xl font-semibold text-sf-foreground">{accounts.length}</div>
              </div>
              <div className="border-l border-sf-border pl-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
                  Priority
                </div>
                <div className="mt-1 text-xl font-semibold text-sf-foreground">
                  {accounts.filter((account) => account.tier === 1).length}
                </div>
              </div>
              <div className="border-l border-sf-border pl-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
                  Output
                </div>
                <div className="mt-1 text-xl font-semibold text-sf-foreground">Touch</div>
              </div>
            </div>
          </div>

          {recommended && recommendedPath ? (
            <button
              type="button"
              onClick={() => onSelectAccount(recommended.id)}
              className="group rounded-lg border border-sf-border bg-sf-foreground p-5 text-left text-white shadow-panel transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
                  <Zap className="h-3.5 w-3.5" aria-hidden />
                  Recommended motion
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 opacity-70 transition group-hover:translate-x-0.5" aria-hidden />
              </div>
              <div className="mt-5 text-2xl font-semibold tracking-tight">{recommended.name}</div>
              <div className="mt-2 text-sm leading-relaxed text-white/70">
                {recommendedPath.persona?.title ?? recommended.pipelineSnapshot.firstMeetingTarget}
                {" - "}
                {recommendedPath.useCase?.title ?? recommended.primaryMotion.demoLabel}
              </div>
              <div className="mt-5 grid gap-3 text-xs text-white/75">
                <div className="flex items-center gap-2">
                  <Gauge className="h-3.5 w-3.5" aria-hidden />
                  {recommended.pipelineSnapshot.estimatedAcvRange}
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-3.5 w-3.5" aria-hidden />
                  {recommended.pipelineSnapshot.firstMeetingTarget}
                </div>
              </div>
            </button>
          ) : null}
        </section>

        <div className="mt-8 space-y-7">
          {byTier.map(({ tier, items }) =>
            items.length === 0 ? null : (
              <section key={tier}>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
                    {TIER_LABELS[tier]}
                  </div>
                  <div className="h-px flex-1 bg-sf-border" />
                </div>
                <div className="grid gap-2">
                  {items.map((account) => {
                    const { persona, useCase } = primaryPath(account);
                    return (
                      <button
                        key={account.id}
                        type="button"
                        onClick={() => onSelectAccount(account.id)}
                        className="group rounded-lg border border-sf-border bg-white px-4 py-3 text-left transition hover:border-slate-300 hover:bg-sf-surface-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-sf-border bg-sf-surface-muted"
                            style={{ color: account.color }}
                            aria-hidden="true"
                          >
                            <AccountGlyph size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="grid gap-1 md:grid-cols-[12rem_1fr_8rem] md:items-center">
                              <div className="truncate text-base font-semibold text-sf-foreground">
                                {account.name}
                              </div>
                              <div className="truncate text-xs text-sf-foreground-muted">
                                {persona?.title ?? account.pipelineSnapshot.firstMeetingTarget}
                                {" - "}
                                {useCase?.title ?? account.primaryMotion.demoLabel}
                              </div>
                              <div className="hidden text-right text-xs font-semibold text-sf-foreground md:block">
                                {account.pipelineSnapshot.estimatedAcvRange}
                              </div>
                            </div>
                          </div>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-sf-foreground-muted opacity-0 transition group-hover:opacity-100"
                            aria-hidden
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )
          )}
        </div>
      </div>
    </div>
  );
}
