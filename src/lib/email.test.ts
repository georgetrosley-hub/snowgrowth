import { describe, expect, it } from "vitest";
import { buildEmail } from "./email";
import type { AccountUseCase, DemoRecipe, Persona } from "@/types";

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

const basePersona: Persona = {
  id: "acc__vp",
  title: "VP Data",
  dept: "Engineering",
  level: "VP",
  trigger: "Scale",
  unconsumedSurface: ["Snowpark"],
  loomLead: "AE",
  loomReason: "Proof",
  anchorDemo: "Anchor",
  demoRecipe,
  loomScript: "Script"
};

const baseUseCase: AccountUseCase = {
  id: "uc-1",
  title: "Unified analytics",
  summary: "Join patient and ops data",
  first_workload: "Identity graph",
  demoPersonaId: basePersona.id
};

describe("buildEmail", () => {
  it("includes use case summary and workload for Exec escalation", () => {
    const draft = buildEmail(
      "Exec escalation",
      basePersona,
      baseUseCase,
      "Healthcare / Digital health"
    );
    expect(draft.subject).toContain("Unified analytics");
    expect(draft.body).toContain(baseUseCase.summary);
    expect(draft.body).toContain(baseUseCase.first_workload);
  });

  it("uses industry prefix and persona dept for New persona outreach", () => {
    const draft = buildEmail(
      "New persona outreach",
      basePersona,
      baseUseCase,
      "Healthcare / Digital health"
    );
    expect(draft.subject).toContain("Healthcare");
    expect(draft.body).toContain("Engineering");
  });
});
