import type { AccountConfig, Persona, PlaybookKey } from "@/types";
import { INDUSTRY_PLAYBOOKS } from "@/data/territoryPlaybooks";

/** Build a stable persona id and substitute [Account] in loom scripts. */
export function persona(
  accountId: string,
  accountName: string,
  slug: string,
  fields: Omit<Persona, "id">
): Persona {
  return {
    id: `${accountId}__${slug}`,
    ...fields,
    loomScript: fields.loomScript.replaceAll("[Account]", accountName)
  };
}

/** Assemble account config from playbook styling + account-defined personas and wedges. */
export function buildAccount(
  playbook: PlaybookKey,
  spec: Omit<AccountConfig, "color" | "iconKey"> & {
    execTriggers?: string[];
  }
): AccountConfig {
  const lib = INDUSTRY_PLAYBOOKS[playbook];
  const ids = new Set(spec.personas.map((p) => p.id));
  for (const uc of spec.useCases) {
    if (!ids.has(uc.demoPersonaId)) {
      throw new Error(
        `Use case "${uc.id}" references demoPersonaId "${uc.demoPersonaId}" — not found in this account's personas`
      );
    }
  }
  return {
    color: lib.color,
    iconKey: lib.iconKey,
    ...spec,
    execTriggers: spec.execTriggers ?? []
  };
}
