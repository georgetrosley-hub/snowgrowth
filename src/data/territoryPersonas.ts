import type { AccountUseCase, Persona } from "@/types";
import { persona } from "@/data/accountPersonaFactory";

export type AccountMotion = {
  personas: Persona[];
  useCases: AccountUseCase[];
};

type BoundPersona = (slug: string, fields: Omit<Persona, "id">) => Persona;

function motion(
  accountId: string,
  name: string,
  build: (p: BoundPersona) => { personas: Persona[]; useCases: AccountUseCase[] }
): AccountMotion {
  const p: BoundPersona = (slug, fields) => persona(accountId, name, slug, fields);
  return build(p);
}

export function healthUnionMotion(accountId: string, name: string): AccountMotion {
  return motion(accountId, name, (p) => ({
    personas: [
      p("head-data-platform", {
        title: "Head of Data Platform",
        dept: "Engineering & Data",
        level: "VP",
        trigger: "Post-Adfire: patient identifiers and HCP keys still don’t join for campaigns or outcomes",
        unconsumedSurface: ["Identity graph", "Consent policies", "Streamlit activation apps"],
        loomLead: "SE",
        loomReason: "Owns the unified identity layer — needs to see governed joins, not another slide on ‘strategy’",
        anchorDemo: "Snowflake identity graph + Streamlit audience activation",
        demoRecipe: {
          title: "Patient + HCP audience activation (one therapeutic area)",
          businessProblem:
            "After Adfire, Health Union still activates patient and HCP audiences from separate stacks — monetization and compliance can’t defend the same reach numbers.",
          economicWhy:
            "Sponsor renewals and CPM depend on provable overlap; every week of spreadsheet reconciliation risks the next formulary or sponsorship cycle.",
          data: "Synthetic patient engagement + HCP NPI attributes + consent flags scoped to one TA",
          build:
            "Identity graph in Snowflake with row access by consent; Streamlit app surfaces eligible HCPs tied to engaged patients for one campaign cell — lineage from raw engagement feeds.",
          showMoment:
            "Filter one TA: show overlap count and consent path. Ask: ‘How long does this take today, and who signs off?’",
          expectedReaction:
            "‘If this is the number Legal and Sales both see, we can stop the Monday merge in Excel.’",
          nextStepTrigger:
            "Named TA + sponsor metric — 48-hour proof vs. current consolidation with Privacy in the room.",
          seRole: "Runs the graph + Streamlit build live",
          aeRole: "Frames Adfire monetization risk and sponsor QBR timeline"
        },
        loomScript:
          "Hi [Name] — [AE] here. Post-Adfire, [Account] still can’t prove patient + HCP overlap in one place for sponsors. My SE built a working identity slice in Snowflake with Streamlit on top — one TA, consent-aware. Worth 15 minutes before your next GTM review."
      }),
      p("coo", {
        title: "Chief Operating Officer",
        dept: "Operations",
        level: "C-Suite",
        trigger: "Operating plan requires one delivery chain from data to campaigns — still fragmented",
        unconsumedSurface: ["Operational SLAs", "Cross-team runbooks", "Cortex exec Q&A"],
        loomLead: "AE",
        loomReason: "Owns cross-functional outcomes — relationship-led, proof second",
        anchorDemo: "Cortex Analyst on operational cohort KPIs",
        demoRecipe: {
          title: "Ops view: cohort readiness and campaign blockers",
          businessProblem:
            "COO can’t see which audience cells are blocked by consent, data latency, or partner feeds — decisions wait on meetings, not metrics.",
          economicWhy:
            "Launch windows and sponsor obligations slip when ops lacks a single operational truth tied to audience readiness.",
          data: "Synthetic campaign calendar + consent blockers + feed freshness by TA",
          build:
            "Cortex Analyst on Snowflake marts: ‘Which TA cells are not ready for send this week and why?’ with drill to source delay.",
          showMoment:
            "Type the question in plain English; show ranked blockers. Contrast to status email threads.",
          expectedReaction:
            "‘This is the Monday standup answer without the standup.’",
          nextStepTrigger:
            "COO-sponsored weekly ops review using Cortex on live marts — one month trial.",
          seRole: "Prepares Cortex on governed tables",
          aeRole: "Leads with operating risk, not features"
        },
        loomScript:
          "Hi [Name] — before we talk org alignment, I wanted you to see how [Account] could run audience readiness off one Snowflake layer — Cortex on live blockers, no BI queue. Short video, tied to your operating plan."
      }),
      p("cro", {
        title: "Chief Revenue Officer",
        dept: "Revenue",
        level: "C-Suite",
        trigger: "Sponsors asking for proof of reach and quality — spreadsheets don’t survive procurement",
        unconsumedSurface: ["Sponsor reporting", "Horizon lineage", "Marketplace enrichment"],
        loomLead: "AE",
        loomReason: "Economic owner for sponsor revenue — needs defensible proof, not another dashboard",
        anchorDemo: "Horizon lineage + sponsor reach drill-down",
        demoRecipe: {
          title: "Sponsor defense: lineage from engagement to reported reach",
          businessProblem:
            "When a sponsor audits Health Union’s numbers, Revenue assembles exports from four teams — the story breaks under scrutiny.",
          economicWhy:
            "Renewal ACV and rate card depend on audit-ready proof; one failed audit thread can freeze upsell.",
          data: "Synthetic impression + HCP engagement + sponsor contract line items",
          build:
            "Horizon lineage from raw event to reported reach metric; drill to transformation rules; optional Marketplace join for third-party validation.",
          showMoment:
            "Click from a published reach number to full lineage — ask who signs that today and how long it takes.",
          expectedReaction:
            "‘We could hand this to procurement without a war room.’",
          nextStepTrigger:
            "Joint sponsor QBR dry run with Legal — one audited metric end-to-end.",
          seRole: "Walks lineage graph and Horizon setup",
          aeRole: "Owns sponsor renewal narrative and ACV risk"
        },
        loomScript:
          "Hi [Name] — [AE] from Snowflake. [Account]’s sponsors are asking for lineage, not slides. We put your reach metric on Horizon with a live drill — happy to walk it with you and Legal before the next renewal cycle."
      })
    ],
    useCases: [
      {
        id: "hu-patient-hcp-activation",
        title: "Patient + HCP audience activation",
        summary:
          "Post-Adfire, activate overlapping patient and HCP cohorts with consent-aware joins — the motion that unlocks monetization and compliance in one room.",
        first_workload:
          "Identity graph + consent in Snowflake; Streamlit activation slice for one therapeutic area.",
        demoPersonaId: `${accountId}__head-data-platform`
      },
      {
        id: "hu-sponsor-reach-lineage",
        title: "Sponsor reach lineage",
        summary:
          "When a sponsor audits reported reach, Revenue answers from one governed path — not four exports.",
        first_workload:
          "Horizon lineage from raw engagement to published sponsor metrics; Cortex optional for exec Q&A.",
        demoPersonaId: `${accountId}__cro`
      }
    ]
  }));
}

export function everstageMotion(accountId: string, name: string): AccountMotion {
  return motion(accountId, name, (p) => ({
    personas: [
      p("vp-engineering", {
        title: "VP Engineering",
        dept: "Engineering",
        level: "VP",
        trigger: "CRM, CPQ, and commission engines feed different truths — engineering asked to ‘fix the pipes’ every quarter",
        unconsumedSurface: ["Semantic layer", "Dynamic Tables", "Data contracts"],
        loomLead: "SE",
        loomReason: "Builds the unified pipeline — needs concrete schema and SLA proof",
        anchorDemo: "Semantic layer + Dynamic Tables (CRM → CPQ → payout)",
        demoRecipe: {
          title: "Commission + CPQ intelligence (one drill to payout)",
          businessProblem:
            "Everstage’s customers still reconcile quota, CPQ, and payouts in spreadsheets — your product sits in the middle without a governed spine they all trust.",
          economicWhy:
            "Everstage wins when customers retire dispute cycles; engineering capacity is burned on one-off integrations.",
          data: "Synthetic CRM opportunities + CPQ quotes + commission runs",
          build:
            "Semantic views in Snowflake: opportunity → quote → commission line with Dynamic Tables refreshing at sub-daily cadence; drill API for Everstage UI or partner BI.",
          showMoment:
            "Trace one deal from stage to payout line — show timestamp and rule version. Ask how long that takes in a customer QBR today.",
          expectedReaction:
            "‘This is what we’d embed behind Everstage as system of proof.’",
          nextStepTrigger:
            "Design partnership: one enterprise customer co-build on Snowflake semantic layer in 30 days.",
          seRole: "Implements semantic + pipeline live",
          aeRole: "Positions Everstage + Snowflake joint value for RevOps buyers"
        },
        loomScript:
          "Hi [Name] — [AE] here. We’re working with [Account] on how CPQ + commissions land as one truth for customers. My SE has a working semantic + Dynamic Tables path — CRM to payout — that maps how Everstage could standardize proof. Quick technical walk worth it if QBR disputes are eating engineering time."
      }),
      p("ceo", {
        title: "Chief Executive Officer",
        dept: "Executive",
        level: "C-Suite",
        trigger: "Board asks for one forecast — Sales, Finance, and Product still tell three stories",
        unconsumedSurface: ["Exec metrics", "Cortex board prep", "Snowflake consumption narrative"],
        loomLead: "AE",
        loomReason: "CEO conversation is outcome and category — minimal live build",
        anchorDemo: "Cortex Analyst on consolidated RevOps metrics",
        demoRecipe: {
          title: "One board number: attainment vs. payout vs. plan",
          businessProblem:
            "Everstage’s CEO needs category leadership proof — customers adopt when commission intelligence is undeniable, not when features ship.",
          economicWhy:
            "NRR and enterprise expansion depend on customers trusting Everstage in the CFO and CRO room.",
          data: "Aggregated marts: region, attainment, payout, plan variance",
          build:
            "Cortex Analyst: ‘Where do attainment and payout diverge by more than 2% this quarter?’ with drill to underlying deals.",
          showMoment:
            "Ask the board question in plain English — show answer with lineage to Snowflake tables.",
          expectedReaction:
            "‘This is how we show customers what board-ready looks like on Everstage data.’",
          nextStepTrigger:
            "Executive session with one enterprise logo — align on joint board narrative.",
          seRole: "Supports Cortex environment",
          aeRole: "Facilitates CEO-level category story"
        },
        loomScript:
          "Hi [Name] — [AE] from Snowflake. [Account] is defining commission intelligence as a category — wanted to share how CEOs at your customers are asking for one board-grade number. Short Cortex clip on consolidated RevOps truth; happy to discuss strategic partnership, not just pipes."
      }),
      p("vp-customer-success", {
        title: "VP Customer Success",
        dept: "Customer Success",
        level: "VP",
        trigger: "Renewals hinge on customers believing payout disputes are solved — CS lacks proof in the data",
        unconsumedSurface: ["Health scores", "Streamlit CS apps", "Renewal QBR templates"],
        loomLead: "SE",
        loomReason: "CS needs tangible before/after — demo-led",
        anchorDemo: "Streamlit renewal health on Snowflake marts",
        demoRecipe: {
          title: "Renewal QBR: dispute rate and time-to-resolution",
          businessProblem:
            "Everstage CS can’t show enterprise buyers that commission errors dropped post-implementation — proof lives in anecdotes.",
          economicWhy:
            "NRR and expansion require CS-led proof tied to dollars and SLA.",
          data: "Per-tenant dispute tickets + payout corrections + usage",
          build:
            "Streamlit app on Snowflake: trend dispute rate and resolution time; compare to pre–Everstage baseline for one account.",
          showMoment:
            "Show the account’s curve — ask what CS sends today in a QBR deck vs. live data.",
          expectedReaction:
            "‘We could standardize every enterprise QBR on this view.’",
          nextStepTrigger:
            "Pilot: top 5 accounts get Snowflake-backed QBR pack — measured CS hours saved.",
          seRole: "Builds Streamlit on tenant marts",
          aeRole: "Ties to renewal risk and expansion pipeline"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account] CS is carrying renewal proof manually. We mocked a Snowflake-backed health view your team could drop into QBRs — Streamlit, live dispute trends. Worth a look if NRR is the Q4 theme."
      })
    ],
    useCases: [
      {
        id: "ev-commission-cpq-intelligence",
        title: "Commission + CPQ intelligence",
        summary:
          "One governed path from CRM and CPQ to payout — the wedge that stops quarterly reconciliation wars at Everstage customers.",
        first_workload:
          "Semantic layer in Snowflake; Dynamic Tables from CRM, CPQ, commission engine; drill APIs for Everstage surfaces.",
        demoPersonaId: `${accountId}__vp-engineering`
      },
      {
        id: "ev-renewal-proof",
        title: "Renewal proof for enterprise CS",
        summary:
          "CS shows dispute and resolution trends from Snowflake — not slides assembled the night before.",
        first_workload:
          "Tenant marts for dispute rate, correction volume, and usage; Streamlit QBR template.",
        demoPersonaId: `${accountId}__vp-customer-success`
      }
    ]
  }));
}

export function chaliceMotion(accountId: string, name: string): AccountMotion {
  return motion(accountId, name, (p) => ({
    personas: [
      p("vp-platform", {
        title: "VP Platform Engineering",
        dept: "Engineering",
        level: "VP",
        trigger: "Every new Chalice hospital client needs a bespoke data plane — onboarding is the bottleneck to ARR",
        unconsumedSurface: ["Tenant databases", "Snowpark", "FHIR templates"],
        loomLead: "SE",
        loomReason: "Platform owner — evaluates repeatable Snowflake tenant pattern",
        anchorDemo: "Templated tenant + Bulk FHIR + Snowpark feature pipeline",
        demoRecipe: {
          title: "Repeatable Snowflake tenant for a new health system",
          businessProblem:
            "Chalice burns services hours standing up isolated stacks per client — margin collapses when pipeline isn’t productized.",
          economicWhy:
            "Faster time-to-first inference = more logos per year without linear headcount.",
          data: "Synthetic FHIR bundles + tenant-isolated schemas",
          build:
            "Scripted Snowflake database per client; Bulk FHIR landing; Snowpark feature pipeline from shared notebook template — provision timer on screen.",
          showMoment:
            "Side-by-side two tenant DBs with same code path — show provision-to-first score SLA.",
          expectedReaction:
            "‘This is the onboarding SKU we can sell.’",
          nextStepTrigger:
            "One enterprise backlog client migrates to template — measured days saved.",
          seRole: "Runs template provisioning live",
          aeRole: "Frames COGS and service attach rate"
        },
        loomScript:
          "Hi [Name] — [AE] from Snowflake. [Account]’s bottleneck is onboarding, not model accuracy. My SE scripted your tenant + FHIR + Snowpark path — same pattern we use with other clinical AI ISVs. Worth a technical session if margin per deployment is on the board agenda."
      }),
      p("head-customer-success", {
        title: "Head of Customer Success (Enterprise)",
        dept: "Customer Success",
        level: "Director",
        trigger: "Enterprise buyers ask for time-to-value proof — CS can’t pull it from one system",
        unconsumedSurface: ["Deployment metrics", "Streamlit health", "Snowflake usage"],
        loomLead: "SE",
        loomReason: "CS needs numbers, not roadmap",
        anchorDemo: "Streamlit deployment SLA dashboard",
        demoRecipe: {
          title: "Deployment SLA: days to first production inference",
          businessProblem:
            "Chalice CS defends renewals without a single chart of provision → first inference across clients.",
          economicWhy:
            "Renewal and upsell depend on provable deployment velocity.",
          data: "Per-tenant milestones from Snowflake ops tables",
          build:
            "Streamlit on Snowflake: distribution of onboarding days; red accounts by SLA breach.",
          showMoment:
            "Filter enterprise tier — show accounts past SLA. Ask what CS does today when that happens.",
          expectedReaction:
            "‘We’d run QBRs off this instead of spreadsheets from PS.’",
          nextStepTrigger:
            "CS leadership: adopt dashboard for top 10 accounts — 60-day review.",
          seRole: "Builds dashboard on tenant metadata",
          aeRole: "Connects to NRR risk"
        },
        loomScript:
          "Hi [Name] — wanted to share a working Snowflake view of deployment SLAs [Account] could give CS — days to first inference, straight from ops data. If renewals are fighting anecdotal timelines, this is the counterweight."
      }),
      p("cto", {
        title: "Chief Technology Officer",
        dept: "Technology",
        level: "C-Suite",
        trigger: "Security and HIPAA reviews multiply with every custom client cloud",
        unconsumedSurface: ["Row access policies", "Masking", "Horizon audit"],
        loomLead: "AE",
        loomReason: "Risk and architecture — AE frames, SE deep on policy",
        anchorDemo: "Multi-tenant governance demo",
        demoRecipe: {
          title: "One security model across Chalice tenants",
          businessProblem:
            "CTO can’t keep signing off on bespoke VPCs — auditors want consistent policy across clients.",
          economicWhy:
            "Faster security review = faster sales; fewer exceptions reduce legal drag.",
          data: "Two synthetic tenants with RLS + masking policies",
          build:
            "Show same analyst query against two tenant DBs — prove isolation; show Horizon audit for policy changes.",
          showMoment:
            "Toggle roles — show what each can see. Tie to how Chalice pitches enterprise buyers.",
          expectedReaction:
            "‘We could standardize the security story in sales.’",
          nextStepTrigger:
            "Security workshop with customer CISO — Snowflake as reference architecture.",
          seRole: "Demonstrates RLS + Horizon",
          aeRole: "Owns enterprise security narrative"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account]’s CTO team is scaling client isolation reviews. We built a short demo of standardized RLS + Horizon audit on Snowflake — how we see other clinical AI platforms pass enterprise security. Happy to align with your architecture review."
      })
    ],
    useCases: [
      {
        id: "ch-tenant-onboarding",
        title: "Productized tenant onboarding (FHIR + Snowpark)",
        summary:
          "Cut services-led setup — same Snowflake template per health system with measured days to first inference.",
        first_workload:
          "Tenant DB + Bulk FHIR + Snowpark features from shared notebooks; provisioning automation.",
        demoPersonaId: `${accountId}__vp-platform`
      },
      {
        id: "ch-cs-deployment-sla",
        title: "CS: deployment SLA and renewal defense",
        summary:
          "Prove velocity and risk accounts from Snowflake — the motion that protects NRR while platform scales.",
        first_workload:
          "Ops telemetry into Snowflake; Streamlit CS health by client.",
        demoPersonaId: `${accountId}__head-customer-success`
      }
    ]
  }));
}

export function cienaMotion(accountId: string, name: string): AccountMotion {
  return motion(accountId, name, (p) => ({
    personas: [
      p("vp-fpa", {
        title: "VP FP&A (Manufacturing & Programs)",
        dept: "Finance",
        level: "VP",
        trigger: "Margin questions after close take three days — AI backlog competes with the same dollars",
        unconsumedSurface: ["Program P&L", "Cortex variance", "Margin bridge"],
        loomLead: "SE",
        loomReason: "FP&A wants interactive variance — numbers, not slides",
        anchorDemo: "Cortex Analyst on program margin bridge",
        demoRecipe: {
          title: "Backlog risk + margin visibility (program view)",
          businessProblem:
            "Ciena leadership can’t see backlog aging and margin erosion on the same timeline — AI investments float without P&L grounding.",
          economicWhy:
            "When margin moves late, pricing and resource calls miss the quarter.",
          data: "Synthetic program backlog, COGS, revenue recognition by program",
          build:
            "Snowflake marts: backlog age + projected margin; Cortex: ‘Which programs slipped margin >200 bps vs. plan?’",
          showMoment:
            "Answer in plain English — drill to product line and supplier delay.",
          expectedReaction:
            "‘This is the Friday close conversation we don’t have today.’",
          nextStepTrigger:
            "FP&A + program office: one executive margin review on live Snowflake.",
          seRole: "Sets up Cortex on financial marts",
          aeRole: "Ties to AI prioritization vs. margin"
        },
        loomScript:
          "Hi [Name] — [AE] from Snowflake. [Account]’s FP&A team is still building margin bridges in Excel while AI spend grows. We have a Cortex walk on program backlog + margin — the same grain Ops and Finance can agree on. Worth 20 minutes before the next program review."
      }),
      p("vp-supply-chain-ops", {
        title: "VP Supply Chain Operations",
        dept: "Supply Chain",
        level: "VP",
        trigger: "Supplier slips move backlog — supply doesn’t see margin impact in the same session",
        unconsumedSurface: ["Supplier master", "Marketplace risk", "Dynamic Tables OT feeds"],
        loomLead: "SE",
        loomReason: "Supply leader — needs OT + supplier signal tied to financial slip",
        anchorDemo: "Supplier delay + backlog impact dashboard",
        demoRecipe: {
          title: "When tier-1 slips, backlog and margin move together",
          businessProblem:
            "Ciena’s supply org sees delays in one tool; Finance sees margin in another — no shared scenario when a supplier fails.",
          economicWhy:
            "Expedite and allocation decisions need hours, not weekly SIOP decks.",
          data: "Supplier OTIF + program backlog + margin snapshot",
          build:
            "Snowflake join: supplier events to backlog aging; Streamlit scenario — if supplier X slips 2 weeks, show margin at risk.",
          showMoment:
            "Change delay parameter — watch margin at risk update. Ask how that’s decided today.",
          expectedReaction:
            "‘We could run the supplier war room off this.’",
          nextStepTrigger:
            "Joint supply + FP&A session with one live supplier risk event replay.",
          seRole: "Builds join + Streamlit scenario",
          aeRole: "Frames expedite cost avoidance"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account]’s supply chain is flying blind on margin when tier-1 suppliers slip. We tied supplier OTIF to program margin in Snowflake — short scenario demo. Relevant if SIOP is still spreadsheet-heavy."
      }),
      p("vp-ops-technology", {
        title: "VP Operations Technology",
        dept: "Operations Technology",
        level: "VP",
        trigger: "OT and ERP feeds power AI backlog — need one pipeline truth for plant and exec",
        unconsumedSurface: ["Historian", "Dynamic Tables", "MES integration"],
        loomLead: "SE",
        loomReason: "Owns OT/IT convergence — technical demo credibility",
        anchorDemo: "Historian + ERP into Snowflake Dynamic Tables",
        demoRecipe: {
          title: "OT signals feeding the same backlog + margin layer",
          businessProblem:
            "Ops Tech is asked to prioritize AI use cases without a unified feed of line state and orders — every initiative is bespoke.",
          economicWhy:
            "One pipeline reduces duplicate ingest and makes AI models train on finance-trusted grain.",
          data: "Synthetic historian + order snapshots",
          build:
            "Dynamic Tables from MES/historian + ERP into Snowflake — same tables FP&A and supply dashboards consume.",
          showMoment:
            "Show freshness SLA on line vs. order backlog — tie to where AI should run first.",
          expectedReaction:
            "‘This is the foundation we said we needed before funding another AI pilot.’",
          nextStepTrigger:
            "OT roadmap: standardize one product line feed into Snowflake in 90 days.",
          seRole: "Architects streaming + Dynamic Tables",
          aeRole: "Links to AI backlog prioritization"
        },
        loomScript:
          "Hi [Name] — my SE built a short walkthrough of historian + ERP landing in Snowflake for [Account] — Dynamic Tables, same objects Finance uses. If AI backlog is competing with margin clarity, this is the technical entry point."
      })
    ],
    useCases: [
      {
        id: "ci-backlog-margin",
        title: "Backlog risk + margin visibility",
        summary:
          "One Snowflake layer for program backlog, supply events, and margin — where Ciena prioritizes AI and ops spend with the same truth.",
        first_workload:
          "ERP + MES/historian → Snowflake; margin bridge marts; Cortex for exec Q&A.",
        demoPersonaId: `${accountId}__vp-fpa`
      },
      {
        id: "ci-supply-margin-scenario",
        title: "Supply chain: supplier slip → margin at risk",
        summary:
          "War-room view when tier-1 suppliers slip — backlog and margin in one scenario, not two meetings.",
        first_workload:
          "Join supplier + backlog + margin in Snowflake; Streamlit what-if.",
        demoPersonaId: `${accountId}__vp-supply-chain-ops`
      }
    ]
  }));
}

export function sagentMotion(accountId: string, name: string): AccountMotion {
  return motion(accountId, name, (p) => ({
    personas: [
      p("vp-customer-success", {
        title: "VP Customer Success (Enterprise Servicers)",
        dept: "Customer Success",
        level: "VP",
        trigger: "Dara rollouts need proof of outcomes — CS can’t show deployment success in one dataset",
        unconsumedSurface: ["Renewal marts", "Streamlit QBR", "Loan KPIs"],
        loomLead: "SE",
        loomReason: "CS owns renewal proof post-Dara",
        anchorDemo: "Snowflake-backed renewal scorecard",
        demoRecipe: {
          title: "Dara deployment success: before/after loan + ops metrics",
          businessProblem:
            "Sagent servicers ask whether Dara improved delinquency, call volume, and SLA — CS assembles decks from five exports.",
          economicWhy:
            "Renewal and expansion require defensible before/after tied to Sagent modules.",
          data: "Synthetic loan performance + implementation milestones + support tickets",
          build:
            "Tenant marts in Snowflake: go-live date, module flags, KPI trends; Streamlit QBR with baseline vs. post-go-live.",
          showMoment:
            "Pick one servicer — show curves. Ask what proof CS sends today.",
          expectedReaction:
            "‘We’d run every Dara QBR off this.’",
          nextStepTrigger:
            "Flagship servicer co-design — Snowflake metrics in renewal deck next cycle.",
          seRole: "Implements marts + Streamlit",
          aeRole: "Owns NRR at risk story"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account] CS is under pressure to prove Dara in renewals. We modeled Snowflake-backed before/after on loan + ops KPIs — Streamlit, not slides. If renewals are tied to unprovable outcomes, worth a look."
      }),
      p("vp-data", {
        title: "VP Data & Analytics",
        dept: "Data",
        level: "VP",
        trigger: "Telemetry from product and servicing systems doesn’t land in one place for analytics",
        unconsumedSurface: ["Dynamic Tables", "Tasks", "Multi-tenant RLS"],
        loomLead: "SE",
        loomReason: "Data owner for tenant isolation and pipelines",
        anchorDemo: "Dynamic Tables: product + support events → tenant health",
        demoRecipe: {
          title: "Telemetry pipeline for deployment health scoring",
          businessProblem:
            "Sagent’s data team rebuilds extracts per servicer — no standard event model for health scoring.",
          economicWhy:
            "Faster detection of at-risk implementations reduces churn and PS thrash.",
          data: "Synthetic product events, errors, usage",
          build:
            "Dynamic Tables + tasks into per-tenant marts; row policies by servicer_id.",
          showMoment:
            "Show event freshness and error rate rollups — tie to CS red/yellow accounts.",
          expectedReaction:
            "‘This is the pipeline we wanted before building another internal warehouse.’",
          nextStepTrigger:
            "Data org: adopt event model for top 3 servicers — 45-day checkpoint.",
          seRole: "Builds pipeline live",
          aeRole: "Frames build vs. buy"
        },
        loomScript:
          "Hi [Name] — [AE] from Snowflake. [Account]’s VP Data is juggling tenant telemetry for Dara. We sketched Dynamic Tables + RLS for deployment health — happy to walk the pattern if you’re standardizing ingestion."
      }),
      p("vp-product", {
        title: "VP Product",
        dept: "Product",
        level: "VP",
        trigger: "Roadmap needs adoption data across servicers — product analytics is batch",
        unconsumedSurface: ["Feature usage", "Snowpark adoption models", "Cortex PM questions"],
        loomLead: "SE",
        loomReason: "Product wants self-serve analytics on usage",
        anchorDemo: "Feature usage and module adoption in Snowflake",
        demoRecipe: {
          title: "Cross-tenant adoption: which Dara modules drive outcomes",
          businessProblem:
            "Sagent Product can’t see which features correlate with loan KPI improvements — roadmap guesses.",
          economicWhy:
            "Prioritize engineering where servicers get measurable lift.",
          data: "Module usage + outcomes (aggregated)",
          build:
            "Snowflake secure views aggregating usage vs. outcomes; Cortex for PM questions.",
          showMoment:
            "Ask which module adoption precedes delinquency drop — show ranked cohorts.",
          expectedReaction:
            "‘We’d fund roadmap from this, not surveys.’",
          nextStepTrigger:
            "Product offsite: one roadmap bet validated by Snowflake cohort.",
          seRole: "Sets up secure aggregates",
          aeRole: "Connects to competitive differentiation"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account] Product is betting Dara roadmap without cross-tenant proof. We have a Cortex pattern on usage vs. loan outcomes — anonymized aggregates. Short session if roadmap is contested internally."
      })
    ],
    useCases: [
      {
        id: "sa-dara-proof",
        title: "Dara deployment success proof",
        summary:
          "Renewal QBRs with Snowflake-backed before/after on servicing KPIs — the motion that proves Dara beyond go-live.",
        first_workload:
          "Tenant marts: milestones + loan metrics + tickets; Streamlit QBR.",
        demoPersonaId: `${accountId}__vp-customer-success`
      },
      {
        id: "sa-telemetry-health",
        title: "Product + CS telemetry in one pipeline",
        summary:
          "Dynamic Tables from product and support into tenant health — CS and Product share one score.",
        first_workload:
          "Event model in Snowflake; health score by servicer; RLS.",
        demoPersonaId: `${accountId}__vp-data`
      }
    ]
  }));
}

export function usFinancialTechnologyMotion(accountId: string, name: string): AccountMotion {
  return motion(accountId, name, (p) => ({
    personas: [
      p("cro", {
        title: "Chief Risk Officer",
        dept: "Risk",
        level: "C-Suite",
        trigger: "$6.5T on platform — batch anomaly detection misses intraday concentration and settlement stress",
        unconsumedSurface: ["Snowpark scoring", "Streaming positions", "Cortex regulatory Q&A"],
        loomLead: "AE",
        loomReason: "CRO owns board-level risk narrative",
        anchorDemo: "Snowpark anomaly scoring on streaming positions",
        demoRecipe: {
          title: "Anomalies at portfolio scale (intraday)",
          businessProblem:
            "U.S. Financial Technology’s risk team finds settlement and concentration issues in reconciliation — after clients and regulators expect earlier signal.",
          economicWhy:
            "Operational loss and client penalties scale with AUM; batch lag is not credible at $6.5T.",
          data: "Synthetic intraday positions + cash + limits",
          build:
            "Streaming into Snowflake; Snowpark models flag concentration breaches vs. policy; Horizon lineage to source.",
          showMoment:
            "Show alert latency vs. prior batch — name the SLA improvement.",
          expectedReaction:
            "‘This is the exam story we need for intraday risk.’",
          nextStepTrigger:
            "Risk committee: one anomaly class in production with audit sign-off.",
          seRole: "Runs Snowpark + streaming demo",
          aeRole: "Frames regulatory and client trust"
        },
        loomScript:
          "Hi [Name] — [AE] from Snowflake. [Account] operates at a scale where batch risk runs don’t match board expectations. We have a tight demo of intraday Snowpark scoring on positions with lineage — relevant if you’re under pressure on anomaly timeliness."
      }),
      p("head-portfolio-analytics", {
        title: "Head of Portfolio Analytics",
        dept: "Investments / Analytics",
        level: "Director",
        trigger: "Analytics and risk use different cuts of the book — quant and ops rebuild the same joins",
        unconsumedSurface: ["Factor models", "Snowpark notebooks", "Shared marts"],
        loomLead: "SE",
        loomReason: "Quantitative buyer — needs notebook + data gravity proof",
        anchorDemo: "Snowpark on unified risk marts",
        demoRecipe: {
          title: "One book for risk and portfolio analytics",
          businessProblem:
            "Portfolio analytics rebuilds position and factor cuts that risk already has — duplicate pipelines add latency and disagreement.",
          economicWhy:
            "Single book of record reduces error and speeds scenario response.",
          data: "Aggregated factor + position marts",
          build:
            "Snowpark notebooks reading the same marts as risk scoring — show scenario replay.",
          showMoment:
            "Run a stress tweak — show risk and portfolio answering from identical grains.",
          expectedReaction:
            "‘We stop reconciling two books every Monday.’",
          nextStepTrigger:
            "Joint quant + risk working session on shared marts.",
          seRole: "Drives Snowpark scenario",
          aeRole: "Aligns org politics"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account]’s portfolio and risk teams still reconcile books. We walked Snowpark on unified marts — worth a joint session if scenario latency is an issue."
      }),
      p("vp-data-platform", {
        title: "VP Data Platform",
        dept: "Technology / Data",
        level: "VP",
        trigger: "Custody and cash feeds block real-time — engineering is the gating item for intraday risk",
        unconsumedSurface: ["Dynamic Tables", "Tasks", "Mainframe CDC"],
        loomLead: "SE",
        loomReason: "Platform owner — ingestion architecture",
        anchorDemo: "Dynamic Tables from custody and cash",
        demoRecipe: {
          title: "Always-current book for scoring",
          businessProblem:
            "Without fresh positions and cash, Snowpark scores are academic — platform must land feeds continuously.",
          economicWhy:
            "Faster ingestion unlocks the CRO’s anomaly SLA without another appliance.",
          data: "Synthetic custody + cash deltas",
          build:
            "Dynamic Tables + tasks; show lag metrics vs. batch window.",
          showMoment:
            "Display pipeline freshness SLA — tie to Snowpark job schedule.",
          expectedReaction:
            "‘This is the ingestion layer we’d fund first.’",
          nextStepTrigger:
            "Platform roadmap: custody feed #1 on Snowflake in 90 days.",
          seRole: "Architects pipelines",
          aeRole: "Prioritization with risk sponsor"
        },
        loomScript:
          "Hi [Name] — my SE mapped Dynamic Tables for custody/cash into Snowflake for [Account] — foundation for intraday scoring. If feed latency is the blocker, this is the technical entry."
      })
    ],
    useCases: [
      {
        id: "usft-anomaly-intraday",
        title: "Intraday anomaly detection at $6.5T scale",
        summary:
          "Snowpark on streaming positions + cash — catch concentration and settlement stress before reconciliation.",
        first_workload:
          "Streaming ingestion; Snowpark policy scores; Horizon lineage.",
        demoPersonaId: `${accountId}__cro`
      },
      {
        id: "usft-unified-book",
        title: "Unified book: portfolio + risk on same marts",
        summary:
          "Eliminate duplicate books — portfolio analytics and risk scenarios from identical Snowflake grains.",
        first_workload:
          "Shared marts; Snowpark notebooks for quant + risk.",
        demoPersonaId: `${accountId}__head-portfolio-analytics`
      }
    ]
  }));
}

export function billtrustMotion(accountId: string, name: string): AccountMotion {
  return motion(accountId, name, (p) => ({
    personas: [
      p("vp-product", {
        title: "VP Product (AR & Payments)",
        dept: "Product",
        level: "VP",
        trigger: "Billtrust wins on workflow — customers ask for AR and cash intelligence, not another invoice rail",
        unconsumedSurface: ["AR events", "Snowpark exceptions", "Embedded analytics SKU"],
        loomLead: "AE",
        loomReason: "Product-led differentiation story",
        anchorDemo: "Real-time AR + payment intelligence in Snowflake",
        demoRecipe: {
          title: "AR + payments intelligence (not just faster workflow)",
          businessProblem:
            "Billtrust’s merchants still run cash and DSO off Monday reports — exceptions and payer behavior aren’t operationalized when treasury acts.",
          economicWhy:
            "Premium ARR comes from intelligence SKUs; customers pay when cash impact is provable.",
          data: "Synthetic invoices + remittance + cash application events",
          build:
            "Dynamic Tables into Snowflake; Snowpark ranks exception queue by predicted delay; Streamlit for ops triage.",
          showMoment:
            "Show ranked queue vs. manual triage throughput — name hours saved.",
          expectedReaction:
            "‘This is the SKU we sell to the CFO, not the AP clerk.’",
          nextStepTrigger:
            "One enterprise merchant pilot — DSO delta in 60 days.",
          seRole: "Builds Snowpark + Streamlit",
          aeRole: "Positions Billtrust + Snowflake joint GTM"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account] is extending from workflow to intelligence — we built a Snowflake slice for AR exceptions and cash risk that your customers’ treasuries would actually fund. Short walk if product differentiation is the theme."
      }),
      p("vp-data", {
        title: "VP Data",
        dept: "Data",
        level: "VP",
        trigger: "Multi-tenant AR data must stay isolated — intelligence layer can’t be another export",
        unconsumedSurface: ["RLS", "Dynamic Tables", "PCI boundaries"],
        loomLead: "SE",
        loomReason: "Technical buyer for tenant model",
        anchorDemo: "Tenant AR marts + RLS",
        demoRecipe: {
          title: "Governed AR intelligence per merchant tenant",
          businessProblem:
            "Billtrust Data can’t centralize intelligence if every merchant’s AR is a different schema — need a repeatable Snowflake pattern.",
          economicWhy:
            "Faster SKU delivery when marts are standard across tenants.",
          data: "Per-tenant AR facts + payment events",
          build:
            "Row access policies by merchant_id; Dynamic Tables from application pipeline; shared Snowpark models for exception prediction.",
          showMoment:
            "Run query as two tenants — show isolation. Show same model scoring both.",
          expectedReaction:
            "‘We could ship intelligence without a bespoke project per logo.’",
          nextStepTrigger:
            "Data org: template schema for top 5 merchants.",
          seRole: "Implements RLS + pipelines",
          aeRole: "Build vs. buy framing"
        },
        loomScript:
          "Hi [Name] — [AE] from Snowflake. [Account]’s VP Data is scaling tenant AR — we mapped RLS + Dynamic Tables for a repeatable intelligence layer. Technical session if PCI and isolation are gating."
      }),
      p("vp-treasury-solutions", {
        title: "VP Treasury Solutions (customer-facing)",
        dept: "GTM / Solutions",
        level: "VP",
        trigger: "Joint wins with buyers’ treasury teams — need cash visibility before close",
        unconsumedSurface: ["Buyer-seller sharing", "Secure Data Sharing", "Cortex treasury Q&A"],
        loomLead: "AE",
        loomReason: "Executive GTM — joint value to CFO",
        anchorDemo: "Secure Data Sharing for buyer–seller cash view",
        demoRecipe: {
          title: "Treasury-grade cash visibility",
          businessProblem:
            "Billtrust’s best customers want payer and supplier on same cash truth — spreadsheets break under treasury scrutiny.",
          economicWhy:
            "Larger deals when Billtrust brings CFO-grade proof.",
          data: "Synthetic shared cash position + AR open items",
          build:
            "Snowflake Secure Data Sharing between buyer and seller views; Cortex for treasury questions.",
          showMoment:
            "Ask ‘what cash is at risk this week?’ — show shared answer.",
          expectedReaction:
            "‘We’d take this to a joint QBR with our customer’s CFO.’",
          nextStepTrigger:
            "Named joint customer: pilot sharing + cash KPI.",
          seRole: "Configures sharing + Cortex",
          aeRole: "Joint pursuit with account team"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account] sells into treasury — we’re seeing Secure Data Sharing + Cortex land joint CFO wins. Happy to explore one strategic customer where cash visibility is the wedge."
      })
    ],
    useCases: [
      {
        id: "bt-ar-cash-intelligence",
        title: "AR + cash intelligence",
        summary:
          "Real-time AR subledger + payment events — Dynamic Tables and Snowpark exception ranking so Billtrust customers act before close, not after.",
        first_workload:
          "AR + payment events in Snowflake; exception queue; Streamlit triage.",
        demoPersonaId: `${accountId}__vp-product`
      },
      {
        id: "bt-tenant-intelligence",
        title: "Multi-tenant AR intelligence (governed)",
        summary:
          "RLS + shared Snowpark models across merchants — Billtrust ships intelligence SKUs without per-logo science projects.",
        first_workload:
          "Standard tenant marts; RLS; exception prediction models.",
        demoPersonaId: `${accountId}__vp-data`
      }
    ]
  }));
}

export function theBancorpMotion(accountId: string, name: string): AccountMotion {
  return motion(accountId, name, (p) => ({
    personas: [
      p("cco", {
        title: "Chief Compliance Officer",
        dept: "Compliance",
        level: "C-Suite",
        trigger: "Embedded finance multiplies partner programs — each has its own AML and BSA posture",
        unconsumedSurface: ["Horizon lineage", "Snowpark AML features", "Program RLS"],
        loomLead: "AE",
        loomReason: "Regulatory owner — board and exam narrative",
        anchorDemo: "Cross-program AML lineage in Snowflake",
        demoRecipe: {
          title: "Partner program risk in one exam-ready hop",
          businessProblem:
            "The Bancorp’s compliance team can’t trace high-risk flows across programs in one session — auditors ask for manual assembly.",
          economicWhy:
            "Remediation and partner slowdowns when exams find gaps in cross-program visibility.",
          data: "Synthetic program + transaction + party graph",
          build:
            "Snowflake unified hub; Snowpark risk scoring; Horizon from alert to source; RLS by program.",
          showMoment:
            "Run exam-style question — show lineage across programs in one query.",
          expectedReaction:
            "‘This is the unified posture we’d show the FDIC.’",
          nextStepTrigger:
            "Exam prep: one cross-program theme with legal sign-off.",
          seRole: "Demonstrates lineage + graph",
          aeRole: "Embedded finance regulatory story"
        },
        loomScript:
          "Hi [Name] — [AE] from Snowflake. [Account]’s embedded finance growth makes cross-program BSA visibility a board topic. We have a Horizon + Snowpark walk tailored to partner programs — worth a short session if you’re in exam prep."
      }),
      p("cro", {
        title: "Chief Risk Officer",
        dept: "Risk",
        level: "C-Suite",
        trigger: "Partner concentration and credit risk — fragmented feeds hide tail exposure",
        unconsumedSurface: ["Cortex concentration", "Marketplace risk", "Limit monitoring"],
        loomLead: "SE",
        loomReason: "Risk metrics — demo-heavy",
        anchorDemo: "Cortex on partner concentration",
        demoRecipe: {
          title: "Which embedded programs drive tail risk?",
          businessProblem:
            "The Bancorp’s CRO can’t see concentration and limit breaches across partner programs in one cut — board asks for heatmaps.",
          economicWhy:
            "Capital and operational risk depend on early visibility.",
          data: "Aggregated program exposure + limits",
          build:
            "Cortex Analyst on Snowflake marts — plain English on concentration and breaches.",
          showMoment:
            "Ask top 3 programs by tail risk — drill to drivers.",
          expectedReaction:
            "‘We’d use this in ALCO and board risk packs.’",
          nextStepTrigger:
            "Risk committee: one concentration metric on live Snowflake.",
          seRole: "Sets up Cortex on marts",
          aeRole: "Board risk framing"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account]’s CRO needs partner concentration without another spreadsheet cycle. Cortex on Snowflake marts — quick demo if tail risk is on the agenda."
      }),
      p("head-partner-programs", {
        title: "Head of Partner & Fintech Programs",
        dept: "Partnerships",
        level: "Director",
        trigger: "Partner managers need revenue and risk together — data lives in program silos",
        unconsumedSurface: ["Streamlit partner scorecard", "Partner P&L", "Snowflake sharing"],
        loomLead: "SE",
        loomReason: "Partner-facing metrics — operational",
        anchorDemo: "Streamlit partner program scorecard",
        demoRecipe: {
          title: "Partner health: revenue + risk + SLA",
          businessProblem:
            "The Bancorp’s partner team can’t prioritize fintech partners without unified program KPIs — renewals and limits are guesswork.",
          economicWhy:
            "Grow embedded finance without silent risk buildup.",
          data: "Program revenue, loss, SLA, ticket volume",
          build:
            "Streamlit on Snowflake: partner scorecard with drill to risk flags.",
          showMoment:
            "Sort partners by composite risk — tie to who gets a limit increase.",
          expectedReaction:
            "‘We’d run QBRs with partners off this view.’",
          nextStepTrigger:
            "Partner leadership: adopt scorecard for tier-1 partners.",
          seRole: "Builds Streamlit app",
          aeRole: "Revenue + risk joint story"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account]’s partner org needs one scorecard — we mocked Snowflake + Streamlit for program health. Worth a look if partner growth is outpacing visibility."
      })
    ],
    useCases: [
      {
        id: "tb-embedded-partner-risk",
        title: "Embedded finance: unified partner risk",
        summary:
          "One Snowflake hub for program transactions, parties, and AML features — cross-program exams and limit decisions without manual assembly.",
        first_workload:
          "Program hub + RLS + Snowpark risk + Horizon lineage.",
        demoPersonaId: `${accountId}__cco`
      },
      {
        id: "tb-partner-concentration",
        title: "Partner concentration for CRO / ALCO",
        summary:
          "Cortex on concentration and limits across embedded programs — tail risk visible before board review.",
        first_workload:
          "Exposure marts; Cortex Q&A.",
        demoPersonaId: `${accountId}__cro`
      }
    ]
  }));
}

export function sprinklrMotion(accountId: string, name: string): AccountMotion {
  return motion(accountId, name, (p) => ({
    personas: [
      p("chief-customer-officer", {
        title: "Chief Customer Officer",
        dept: "Customer",
        level: "C-Suite",
        trigger: "Enterprise buyers demand outcome-based contracts — Sprinklr must prove unified CX value internally first",
        unconsumedSurface: ["Customer health", "Renewal risk", "Cortex exec Q&A"],
        loomLead: "AE",
        loomReason: "Owns NRR narrative — executive relationship",
        anchorDemo: "CX health score in Snowflake",
        demoRecipe: {
          title: "Unified real-time CX intelligence (internal 360)",
          businessProblem:
            "Sprinklr’s own teams still argue from channel silos — Sales, CS, and Product don’t share one customer truth for flagship logos.",
          economicWhy:
            "Sprinklr can’t sell ‘unified CX’ externally while operating on weekly exports internally.",
          data: "Synthetic cross-channel events + SLA + revenue at risk",
          build:
            "Snowflake 360 + Dynamic Tables; Streamlit health score; drill to channel.",
          showMoment:
            "Show one enterprise account red — why — in one screen.",
          expectedReaction:
            "‘This is how we run QBRs with our own customers.’",
          nextStepTrigger:
            "CCO: pilot on top 20 accounts — 45-day adoption metric.",
          seRole: "Builds 360 + Streamlit",
          aeRole: "Meta narrative: drink your own champagne"
        },
        loomScript:
          "Hi [Name] — [AE] from Snowflake. [Account] sells unified CX — wanted to show how your own Snowflake 360 could run flagship accounts before you ask customers to trust it. Short session if NRR is the north star."
      }),
      p("vp-data-ai", {
        title: "VP Data & AI",
        dept: "Data & AI",
        level: "VP",
        trigger: "CX event volume breaks batch — real-time intelligence needs streaming and governance",
        unconsumedSurface: ["Dynamic Tables", "Snowpark churn", "Multi-region"],
        loomLead: "SE",
        loomReason: "Technical owner for data platform",
        anchorDemo: "Streaming CX events → Snowflake",
        demoRecipe: {
          title: "Real-time event foundation for intelligence",
          businessProblem:
            "Sprinklr’s Data org can’t power ‘real-time’ intelligence off batch ETL — product and CS metrics are stale.",
          economicWhy:
            "Faster features and churn prediction when events are current.",
          data: "High-volume synthetic social/care events",
          build:
            "Dynamic Tables + tasks; Snowpark churn features on fresh aggregates.",
          showMoment:
            "Show event freshness SLA — compare to weekly export baseline.",
          expectedReaction:
            "‘This is the ingestion layer we’d fund first.’",
          nextStepTrigger:
            "Platform roadmap: one channel on streaming Snowflake in 90 days.",
          seRole: "Architects streaming pipeline",
          aeRole: "Capacity and cost framing"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account]’s VP Data is scaling CX telemetry — Dynamic Tables + Snowpark is the pattern we use for real-time intelligence. Technical deep dive if latency is the complaint."
      }),
      p("vp-product-analytics", {
        title: "VP Product Analytics",
        dept: "Product",
        level: "VP",
        trigger: "Roadmap needs channel-level adoption tied to outcomes — not monthly exports",
        unconsumedSurface: ["Feature usage", "Snowpark adoption models", "Cortex PM questions"],
        loomLead: "SE",
        loomReason: "Product analytics buyer",
        anchorDemo: "Feature usage and outcome correlation",
        demoRecipe: {
          title: "Which channels drive retention for enterprise logos?",
          businessProblem:
            "Sprinklr Product can’t tie feature usage to renewal outcomes — roadmap debates without data.",
          economicWhy:
            "Engineering hours where lift is measurable.",
          data: "Synthetic usage + renewal outcomes",
          build:
            "Snowpark correlation + Cortex for PM questions on Snowflake.",
          showMoment:
            "Rank features by renewal lift — show cohorts.",
          expectedReaction:
            "‘We’d fund the roadmap from this.’",
          nextStepTrigger:
            "Product council: one bet from Snowflake analysis.",
          seRole: "Runs correlation demo",
          aeRole: "CPO alignment"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account] Product is prioritizing blind — Snowpark + Cortex on usage vs. renewal could end the debate. Short walk if roadmap is contested."
      })
    ],
    useCases: [
      {
        id: "sp-unified-cx-intelligence",
        title: "Unified real-time CX intelligence",
        summary:
          "Cross-channel events, SLA, and revenue risk in one Snowflake 360 — Sprinklr operates before selling it.",
        first_workload:
          "Snowflake 360; Dynamic Tables; health score; Cortex.",
        demoPersonaId: `${accountId}__chief-customer-officer`
      },
      {
        id: "sp-streaming-foundation",
        title: "Streaming CX telemetry for Product + CS",
        summary:
          "Dynamic Tables from product and channel pipelines — intelligence that matches ‘real-time’ positioning.",
        first_workload:
          "Event streams + tasks; Snowpark features for churn.",
        demoPersonaId: `${accountId}__vp-data-ai`
      }
    ]
  }));
}

export function lyricMotion(accountId: string, name: string): AccountMotion {
  return motion(accountId, name, (p) => ({
    personas: [
      p("vp-revenue-cycle", {
        title: "VP Revenue Cycle & Payments",
        dept: "Operations",
        level: "VP",
        trigger: "Pre-pay auth and post-pay claims don’t talk — denial dollars leak in the gap",
        unconsumedSurface: ["Claims journey", "Snowpark denial ML", "Auth loop"],
        loomLead: "SE",
        loomReason: "Owns payment loop — technical + dollar",
        anchorDemo: "Unified auth → claim → pay journey in Snowflake",
        demoRecipe: {
          title: "Pre-pay + post-pay closed loop",
          businessProblem:
            "Lyric can’t tune authorization rules or payment policy without seeing outcomes across pre and post — optimization is blind.",
          economicWhy:
            "MLR, cash, and provider satisfaction depend on closing the loop.",
          data: "Synthetic auth + claim + payment + adjustment",
          build:
            "Snowflake graph of journey; Snowpark leakage analysis; policy lift scenarios.",
          showMoment:
            "Show dollars lost in the gap — name one rule change with impact.",
          expectedReaction:
            "‘This is how we’d reset prior auth policy with the CFO.’",
          nextStepTrigger:
            "One policy experiment with dollar checkpoint.",
          seRole: "Builds journey + leakage",
          aeRole: "Payer economics"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account] sits between pre-pay and post-pay — we built a Snowflake journey view that shows leakage Lyric can’t see today. Worth 20 minutes if margin is tightening."
      }),
      p("chief-analytics-officer", {
        title: "Chief Analytics Officer",
        dept: "Analytics",
        level: "C-Suite",
        trigger: "Network analytics needs one askable layer — payer, provider, member views diverge",
        unconsumedSurface: ["Cortex network questions", "Attributed journeys", "Quality metrics"],
        loomLead: "AE",
        loomReason: "Executive analytics strategy",
        anchorDemo: "Cortex on attributed member journey",
        demoRecipe: {
          title: "Network view: utilization vs. payment friction",
          businessProblem:
            "Lyric’s CAO can’t answer which members are harmed by policy friction without SQL across claims and auth.",
          economicWhy:
            "Stars, MLR, and network contracts need defensible answers.",
          data: "Attributed member + auth + claim journey",
          build:
            "Cortex Analyst on Snowflake marts — plain English cohort questions.",
          showMoment:
            "Ask which panels have auth delays driving ED utilization — show list.",
          expectedReaction:
            "‘We’d take this to network negotiations.’",
          nextStepTrigger:
            "CAO + medical leadership: one network metric with finance sign-off.",
          seRole: "Prepares Cortex layer",
          aeRole: "Value-based care angle"
        },
        loomScript:
          "Hi [Name] — [AE] from Snowflake. [Account]’s analytics org needs askable network intelligence — Cortex on the claims journey we mapped. Executive session if network contracts are in flight."
      }),
      p("cfo", {
        title: "Chief Financial Officer",
        dept: "Finance",
        level: "C-Suite",
        trigger: "Cash and MLR move — CFO needs policy changes tied to dollars, not utilization slides",
        unconsumedSurface: ["Financial impact", "MLR bridge", "Cash forecasting"],
        loomLead: "AE",
        loomReason: "Economic owner for policy change",
        anchorDemo: "Financial bridge from policy to P&L",
        demoRecipe: {
          title: "Dollar impact of a payment policy change",
          businessProblem:
            "Lyric’s CFO signs off on policy without a closed-loop dollar model — finance and ops debate different spreadsheets.",
          economicWhy:
            "Capital and credit ratings depend on credible MLR and cash.",
          data: "Policy scenario + claims cash impact",
          build:
            "Snowflake scenario tables; Streamlit bridge — change prior auth threshold → show $ impact.",
          showMoment:
            "Slide one lever — watch MLR and cash move.",
          expectedReaction:
            "‘We’d fund the Snowflake work if this is the board conversation.’",
          nextStepTrigger:
            "Finance + ops: one policy decision with Snowflake-signed model.",
          seRole: "Supports scenario model",
          aeRole: "CFO trust path"
        },
        loomScript:
          "Hi [Name] — [AE] here. [Account]’s CFO needs to see policy in dollars — we tied Snowflake journey analysis to a simple P&L bridge. Short session if MLR pressure is acute."
      })
    ],
    useCases: [
      {
        id: "ly-pre-post-loop",
        title: "Pre-pay + post-pay closed loop",
        summary:
          "Unified claims journey in Snowflake — tune authorization and payment policy with measured leakage and dollar impact, not siloed views.",
        first_workload:
          "Auth + claim + payment + adjustment graph; Snowpark leakage; policy scenarios.",
        demoPersonaId: `${accountId}__vp-revenue-cycle`
      },
      {
        id: "ly-network-intelligence",
        title: "Network intelligence for CAO",
        summary:
          "Cortex on attributed journeys — utilization and payment friction in one askable layer for partner negotiations.",
        first_workload:
          "Member journey marts; Cortex Analyst.",
        demoPersonaId: `${accountId}__chief-analytics-officer`
      }
    ]
  }));
}
