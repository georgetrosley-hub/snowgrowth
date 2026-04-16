import type { MotionKey } from "@/types";

/** Display labels for territory motions (stored keys stay stable for email + localStorage). */
export const MOTION_DISPLAY: Record<MotionKey, string> = {
  "Mix of all three": "Balanced coverage",
  "New persona outreach": "New stakeholder thread",
  "Exec escalation": "Executive escalation",
  "Use case mapping": "Lead with workload"
};
