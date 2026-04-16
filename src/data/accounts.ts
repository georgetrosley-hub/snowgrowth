import type { AccountConfig, AccountTier, DealPath, PlaybookKey } from "@/types";
import { TERRITORY_PLAYBOOKS } from "@/data/territoryPlaybooks";

function makeAccount(
  playbook: PlaybookKey,
  fields: {
    id: string;
    name: string;
    tier: AccountTier;
    industry: string;
    briefDescriptor: string;
    why_now: string;
    whats_broken: string;
    hypothesis: string;
    first_workload: string;
    proof_point: string;
    economic_impact: string;
    deal_path: DealPath;
  }
): AccountConfig {
  return {
    ...TERRITORY_PLAYBOOKS[playbook],
    ...fields
  };
}

export const ACCOUNTS: AccountConfig[] = [
  makeAccount("pharma", {
    id: "acc-vertex",
    name: "Vertex Pharmaceuticals",
    tier: 1,
    industry: "Pharma / Life Sciences",
    briefDescriptor:
      "Global biotech; Snowflake live for enterprise workloads, while R&D and commercial still default to SAS and exports.",
    why_now:
      "Major trial readouts this year; commercial analytics is being asked to move at drug-development speed.",
    whats_broken:
      "Snowflake consumption is concentrated in IT-led pipelines while R&D and commercial teams still export to SAS and spreadsheets.",
    hypothesis:
      "The risk is not Snowflake capacity; it’s that R&D and commercial still treat SAS and exports as the only “real” modeling surface.",
    first_workload:
      "Clinical trial cohort scoring in Snowpark ML with OMOP-aligned synthetic data — prove sub-minute iteration vs overnight SAS.",
    proof_point:
      "In 48 hours: working cohort score in Snowflake + timed run vs the SAS job — numbers on the wall, not a slide.",
    economic_impact:
      "Faster trial analytics cycles → earlier portfolio decisions; commercial targeting apps reduce agency and BI ticket load.",
    deal_path: {
      stakeholders: [
        "VP Data Science (R&D)",
        "Chief Data Officer",
        "Head of Commercial Analytics",
        "Enterprise procurement / cloud COE"
      ],
      expansionFlow: [
        "Technical win on cohort ML in Snowflake",
        "Add governance + Cortex for regulatory lineage",
        "Expand Streamlit apps to commercial ops",
        "Multi-year expansion aligned to launches"
      ]
    }
  }),
  makeAccount("financial", {
    id: "acc-jpm",
    name: "JPMorgan Chase",
    tier: 1,
    industry: "Financial Services",
    briefDescriptor:
      "Global bank; Snowflake in production for analytics, while desk and risk workflows still split across tools and exports.",
    why_now:
      "Basel timelines and exam prep are forcing faster risk aggregation without new data movement projects.",
    whats_broken:
      "Snowflake exists for analytics, but front-office and risk still treat it as a warehouse — not a compute layer for models and narratives.",
    hypothesis:
      "The risk is not missing a warehouse; it’s that risk and compliance can’t ask and defend a regulatory answer in one governed hop.",
    first_workload:
      "Risk aggregation + plain-English regulatory query on synthetic counterparty exposure with full lineage in one environment.",
    proof_point:
      "In 24–48 hours: Cortex Analyst on aggregated risk tables — one live question answered with lineage in the session.",
    economic_impact:
      "Fewer parallel platforms (Spark/SAS), faster exams, reduced operational risk from manual reporting.",
    deal_path: {
      stakeholders: ["CRO", "CCO", "Head of Quant Research", "VP Data Engineering", "IT security / data governance"],
      expansionFlow: [
        "Prove governed risk Q&A in Snowflake",
        "Snowpark quant path on tick data (no export)",
        "AML narrative generation for ops scale",
        "Enterprise standard for new analytics workloads"
      ]
    }
  }),
  makeAccount("healthcare", {
    id: "acc-kaiser",
    name: "Kaiser Permanente",
    tier: 2,
    industry: "Healthcare",
    briefDescriptor:
      "Integrated delivery network; Epic is the system of record, Snowflake underused for member intelligence at the edge.",
    why_now:
      "VBC contract expansion requires daily attribution — weekly batch risk scores are now a quality and revenue problem.",
    whats_broken:
      "Epic remains the system of record; analysts wait on extracts while Snowflake is underused for member-level intelligence.",
    hypothesis:
      "The risk is not Epic data; it’s that care and analytics teams can’t act on governed member intelligence without ticket queues.",
    first_workload:
      "Population health plain-language query (Cortex Analyst) on attributed member data — care managers self-serve without tickets.",
    proof_point:
      "In 48 hours: one governed Cortex Analyst question on live attributed data — list in hand, no BI ticket.",
    economic_impact:
      "Fewer readmissions and admin cost; faster revenue cycle resolution from denial prediction.",
    deal_path: {
      stakeholders: ["Chief Analytics Officer", "VP Revenue Cycle", "Director Clinical Informatics", "CIO / CISO"],
      expansionFlow: [
        "Win on pop health query + governance story",
        "Add denial ML + Dynamic Tables feeds",
        "FHIR pipeline for analyst self-service",
        "Enterprise agreement across regions"
      ]
    }
  }),
  makeAccount("manufacturing", {
    id: "acc-siemens",
    name: "Siemens Digital Industries",
    tier: 2,
    industry: "Manufacturing / Industrial",
    briefDescriptor:
      "Industrial automation leader; OT historians and MES hold truth, Snowflake not yet the operational nervous system.",
    why_now:
      "Plant consolidation and Industry 4.0 mandates require OT data in one place — board is watching downtime minutes.",
    whats_broken:
      "Historians and MES hold the truth; Snowflake is a sidecar instead of the real-time operational layer.",
    hypothesis:
      "The risk is not more sensors; it’s that OT truth never reaches the layer where maintenance and finance actually decide.",
    first_workload:
      "Multi-line sensor dashboard with anomaly flags from streaming historian feeds into Snowflake.",
    proof_point:
      "In 48 hours: streaming historian slice → Snowflake dashboard with one anomaly drill — time-to-flag in the room.",
    economic_impact:
      "Downtime avoidance + supplier risk visibility; FP&A variance reporting at close without Excel marathons.",
    deal_path: {
      stakeholders: [
        "VP Operations Technology",
        "Chief Supply Chain Officer",
        "Head of Quality Engineering",
        "Plant IT / OT security"
      ],
      expansionFlow: [
        "Land OT streaming + dashboard",
        "Supplier risk intel with Marketplace feeds",
        "Quality traceability ML across sites",
        "Digital twin data foundation for enterprise rollout"
      ]
    }
  }),
  makeAccount("healthcare", {
    id: "acc-unitedhealth",
    name: "UnitedHealth Group",
    tier: 2,
    industry: "Healthcare",
    briefDescriptor:
      "National payer; heavy Snowflake spend, uneven activation across payer and clinical analytics teams.",
    why_now:
      "Stars and HEDIS pressure is visible in executive OKRs; analytics teams are being asked for daily intervention lists.",
    whats_broken:
      "Snowflake spend is growing but persona coverage is uneven — payer analytics and clinical still siloed.",
    hypothesis:
      "The risk is not weekly batch scoring; it’s that Stars and HEDIS incentives require daily intervention lists nobody can produce on demand.",
    first_workload:
      "Daily risk stratification refresh (Dynamic Tables + Snowpark ML) replacing weekly batch scoring.",
    proof_point:
      "In 48 hours: daily refresh DAG + before/after score freshness on one market — gap closure list in the meeting.",
    economic_impact:
      "Quality bonus preservation + revenue integrity; lower cost of care through earlier interventions.",
    deal_path: {
      stakeholders: ["Chief Analytics Officer", "Head of Population Health", "VP Medicare Advantage", "Enterprise data office"],
      expansionFlow: [
        "Daily scoring pilot on one market",
        "Expand to additional lines of business",
        "PHI masking + clean rooms for research use cases",
        "Corporate standard for new analytics products"
      ]
    }
  }),
  makeAccount("pharma", {
    id: "acc-novartis",
    name: "Novartis",
    tier: 3,
    industry: "Pharma / Life Sciences",
    briefDescriptor:
      "Top-tier pharma; platform present, expansion opportunistic until a regulatory or trial trigger creates urgency.",
    why_now:
      "Pipeline and launch calendar is active but expansion is opportunistic — monitor for regulatory or M&A signals.",
    whats_broken:
      "Same pattern as peers: platform present, personas under-mapped, Snowpark and governance under-activated.",
    hypothesis:
      "The risk is not Snowflake capacity; it’s that activation waits for a trigger instead of a named wedge and owner.",
    first_workload:
      "RWE clean room join demo (claims + EHR) when data-sharing pain resurfaces in vendor discussions.",
    proof_point:
      "In 48 hours: working clean room join + “what neither party sees” walkthrough — legal posture in one session.",
    economic_impact:
      "Faster RWE studies; reduced vendor duplicative spend.",
    deal_path: {
      stakeholders: ["Director RWE", "VP Data Science", "Procurement", "IT alliance"],
      expansionFlow: [
        "Monitor exec triggers",
        "Re-engage with specific demo tied to event",
        "Pilot workload",
        "Expand on success"
      ]
    }
  }),
  makeAccount("financial", {
    id: "acc-wells",
    name: "Wells Fargo",
    tier: 3,
    industry: "Financial Services",
    briefDescriptor:
      "National bank; Snowflake in place, front-office and compliance adoption still initiative-by-initiative.",
    why_now:
      "Transformation milestones are episodic — best entry is aligned to exam, integration, or digital initiative news.",
    whats_broken:
      "Snowflake footprint without full front-office and compliance adoption — expansion is motion-dependent.",
    hypothesis:
      "The risk is not footprint; it’s that expansion only lands when tied to a named initiative with a single owner.",
    first_workload:
      "Advisor next-best-action Streamlit when wealth leadership prioritizes advisor tooling.",
    proof_point:
      "In 48 hours: Streamlit slice of advisor book + propensity — one rep workflow, no BI export.",
    economic_impact:
      "AUM and cross-sell lift; reduced time spent on manual client prioritization.",
    deal_path: {
      stakeholders: ["Head of Client Analytics", "Wealth platform owner", "AE coverage", "SE specialist"],
      expansionFlow: [
        "Signal on initiative",
        "Align demo to initiative owner",
        "Pilot",
        "Scale to regions"
      ]
    }
  }),
  makeAccount("healthcare", {
    id: "acc-mayo",
    name: "Mayo Clinic",
    tier: 3,
    industry: "Healthcare",
    briefDescriptor:
      "Academic medical center; strong governance; Snowflake wins require PHI posture and research alignment.",
    why_now:
      "Research and clinical operations compete for attention — opportunistic entry on IRB or Epic-adjacent projects.",
    whats_broken:
      "Strong IT governance can slow activation; Snowflake wins require clear PHI posture and research alignment.",
    hypothesis:
      "The risk is not governance; it’s that research and ops can’t share a PHI story without a provable clean room path.",
    first_workload:
      "De-identification + clean room for research cohorts when IRB pushes on data access boundaries.",
    proof_point:
      "In 48 hours: masked PHI view + clean room aggregate query — IRB-ready story in one walkthrough.",
    economic_impact:
      "Research throughput; reduced compliance review cycles per study.",
    deal_path: {
      stakeholders: ["CIO / CISO", "Research IT", "IRB office", "Clinical informatics"],
      expansionFlow: [
        "Monitor triggers",
        "Security-first briefing",
        "Pilot with narrow cohort",
        "Expand research footprint"
      ]
    }
  })
];

export const ACCOUNTS_BY_ID: Record<string, AccountConfig> = Object.fromEntries(
  ACCOUNTS.map((a) => [a.id, a])
);

export const DEFAULT_ACCOUNT_ID = ACCOUNTS[0]?.id ?? "";
