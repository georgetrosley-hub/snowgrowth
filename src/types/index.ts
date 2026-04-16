export interface DemoRecipe {
  title: string;
  data: string;
  build: string;
  showMoment: string;
  seRole: string;
  aeRole: string;
}

export interface Persona {
  id: string;
  title: string;
  dept: string;
  level: "VP" | "C-Suite" | "Director";
  trigger: string;
  unconsumedSurface: string[];
  loomLead: "AE" | "SE";
  loomReason: string;
  anchorDemo: string;
  demoRecipe: DemoRecipe;
  loomScript: string;
}

export interface VerticalConfig {
  color: string;
  icon: string;
  personas: Persona[];
  useCases: string[];
  execTriggers: string[];
}

export type VerticalKey =
  | "Pharma / Life Sciences"
  | "Financial Services"
  | "Healthcare"
  | "Manufacturing / Industrial";

export type MotionKey =
  | "Mix of all three"
  | "New persona outreach"
  | "Exec escalation"
  | "Use case mapping";

export type TabKey = "personas" | "usecases" | "demo" | "outreach" | "exec-triggers";

export interface EmailDraft {
  subject: string;
  body: string;
}

