import { describe, expect, it } from "vitest";
import { buildAccount, persona } from "./accountPersonaFactory";
import type { AccountConfig, DemoRecipe, Persona } from "@/types";

const demoRecipe: DemoRecipe = {
  title: "Demo",
  businessProblem: "bp",
  economicWhy: "ew",
  data: "d",
  build: "b",
  showMoment: "sm",
  expectedReaction: "er",
  nextStepTrigger: "ns",
  seRole: "se",
  aeRole: "ae"
};

function basePersona(overrides: Partial<Persona> & { id: string }): Persona {
  return {
    title: "VP Data",
    dept: "Engineering",
    level: "VP",
    trigger: "Scale",
    unconsumedSurface: ["Snowpark", "Unistore"],
    loomLead: "AE",
    loomReason: "Proof",
    anchorDemo: "Anchor",
    demoRecipe,
    loomScript: "Walkthrough for [Account].",
    ...overrides
  };
}

function minimalAccount(
  overrides: Partial<AccountConfig> & Pick<AccountConfig, "id" | "name" | "personas" | "useCases" | "primaryMotion">
): AccountConfig {
  return buildAccount({
    tier: 1,
    color: "#000000",
    industry: "Technology",
    briefDescriptor: "Brief",
    why_now: "Why now",
    whats_broken: "Broken",
    hypothesis: "Hypothesis",
    first_workload: "Workload",
    proof_point: "Proof",
    economic_impact: "Impact",
    deal_path: { stakeholders: [], expansionFlow: [] },
    dealIntelligence: {
      entryPoint: "EP",
      expansionPath: [],
      economicBuyer: "EB",
      technicalBuyer: "TB",
      keyRisk: "Risk",
      competitorStatusQuo: "Status quo",
      landStrategy: "Land",
      expandStrategy: "Expand"
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$1M",
      dealLikelihood: "Medium",
      timeline: "FY26",
      firstMeetingTarget: "CTO"
    },
    whySnowflakeWins: ["a", "b", "c"] as const,
    execTriggers: [],
    ...overrides
  });
}

describe("persona", () => {
  it("substitutes account name into loomScript", () => {
    const { id: _id, ...fields } = basePersona({
      id: "acc-x__vp-data",
      loomScript: "Plan for [Account] next quarter."
    });
    const p = persona("acc-x", "Acme Corp", "vp-data", fields);
    expect(p.id).toBe("acc-x__vp-data");
    expect(p.loomScript).toBe("Plan for Acme Corp next quarter.");
  });
});

describe("buildAccount", () => {
  it("returns the account when primary motion and use-case links are valid", () => {
    const p = basePersona({ id: "acc__vp" });
    const uc: AccountConfig["useCases"][number] = {
      id: "uc-1",
      title: "Wedge",
      summary: "Summary",
      first_workload: "Load",
      demoPersonaId: p.id
    };
    const account = minimalAccount({
      id: "acc",
      name: "Acc",
      personas: [p],
      useCases: [uc],
      primaryMotion: { personaId: p.id, useCaseId: uc.id, demoLabel: "Label" }
    });
    expect(account.execTriggers).toEqual([]);
    expect(account.primaryMotion.useCaseId).toBe("uc-1");
  });

  it("throws when a use case references a missing persona", () => {
    const p = basePersona({ id: "acc__vp" });
    const uc: AccountConfig["useCases"][number] = {
      id: "uc-1",
      title: "Wedge",
      summary: "Summary",
      first_workload: "Load",
      demoPersonaId: "missing"
    };
    expect(() =>
      minimalAccount({
        id: "acc",
        name: "Acc",
        personas: [p],
        useCases: [uc],
        primaryMotion: { personaId: p.id, useCaseId: uc.id, demoLabel: "Label" }
      })
    ).toThrow(/not found in this account's personas/);
  });

  it("throws when primaryMotion.personaId is missing", () => {
    const p = basePersona({ id: "acc__vp" });
    const uc: AccountConfig["useCases"][number] = {
      id: "uc-1",
      title: "Wedge",
      summary: "Summary",
      first_workload: "Load",
      demoPersonaId: p.id
    };
    expect(() =>
      minimalAccount({
        id: "acc",
        name: "Acc",
        personas: [p],
        useCases: [uc],
        primaryMotion: { personaId: "nope", useCaseId: uc.id, demoLabel: "Label" }
      })
    ).toThrow(/primaryMotion\.personaId/);
  });

  it("throws when primary use case does not use the primary persona as demoPersonaId", () => {
    const p1 = basePersona({ id: "acc__vp1" });
    const p2 = basePersona({ id: "acc__vp2" });
    const uc: AccountConfig["useCases"][number] = {
      id: "uc-1",
      title: "Wedge",
      summary: "Summary",
      first_workload: "Load",
      demoPersonaId: p2.id
    };
    expect(() =>
      minimalAccount({
        id: "acc",
        name: "Acc",
        personas: [p1, p2],
        useCases: [uc],
        primaryMotion: { personaId: p1.id, useCaseId: uc.id, demoLabel: "Label" }
      })
    ).toThrow(/must use personaId as demoPersonaId/);
  });
});
