export type ProjectEngineeringFact = {
  id: string;
  category: "feature" | "implementation" | "limitation" | "evidence";
  summary: string;
  detail: string;
};

export type ProjectEngineeringNotes = {
  facts: ProjectEngineeringFact[];
  lesson: string;
  questionExamples: string[];
};

export const projectEngineeringNotes: Record<string, ProjectEngineeringNotes> = {
  docugraph: {
    facts: [
      {
        id: "baselineBehavior",
        category: "implementation",
        summary:
          "The independent CNN-only baseline detects document regions and uses a separate OCR path.",
        detail:
          "The independent CNN-only baseline uses LayoutParser and Detectron2 with the PubLayNet Faster R-CNN ResNeSt-50 FPN configuration and a 0.5 score threshold. OCR is a separate pipeline; reading order is sorted geometrically, and the baseline source excludes graph and connector output.",
      },
      {
        id: "proposedBehavior",
        category: "implementation",
        summary:
          "The proposed workflow adds spatial relationships, shape and connector analysis, and structured exports.",
        detail:
          "The proposed workflow includes browser-side region analysis, OCR, shape and connector analysis, and structured export. Its graph-style analysis uses fixed spatial heuristics.",
      },
      {
        id: "modelStatus",
        category: "limitation",
        summary:
          "The graph-attention-named module is heuristic; the inspected code does not establish a trained graph neural network.",
        detail:
          "Although a repository JavaScript module is named GraphAttentionNetwork, the inspected code uses distance-based heuristic attention to aggregate neighboring regions for two iterations. The reviewed implementation does not show learned weights or a training procedure; it is described as a graph-style heuristic, not a verified trained GNN.",
      },
      {
        id: "researchEvidence",
        category: "evidence",
        summary:
          "Reported confidence values are not validated accuracy measurements.",
        detail:
          "The thesis case study reports average-confidence percentages, not measured accuracy. The aggregation method is undocumented, some values conflict with individual screenshots, and no ground-truth reading-order accuracy or processing-time benchmark is presented.",
      },
      {
        id: "technologyNotes",
        category: "limitation",
        summary:
          "Firebase helper files do not verify authentication in the live deployment.",
        detail:
          "The public repository contains Firebase authentication helper and configuration files. Their presence does not verify that Firebase authentication is configured in the live deployment.",
      },
      {
        id: "researchSamples",
        category: "evidence",
        summary:
          "The research explorer covers flowchart and form samples; sensitive invoice and receipt images are withheld.",
        detail:
          "The research explorer compares flowchart and blank-form samples. Invoice and receipt images are withheld where they contain personal or financial identifiers.",
      },
    ],
    lesson:
      "A model confidence score is not ground-truth accuracy; reliable comparisons need an explicit annotation set, metric definition, and repeatable evaluation protocol.",
    questionExamples: [
      "What does DocuGraph analyze?",
      "How does the DocuGraph baseline work?",
      "Does DocuGraph use a trained graph neural network?",
      "Does the graph attention module have learned weights?",
      "How does DocuGraph's CNN-only baseline compare with its proposed workflow?",
      "Does DocuGraph use Firebase authentication?",
      "Are the reported DocuGraph percentages accuracy scores?",
      "What are the limitations of DocuGraph?",
      "Ano ang ginagawa ng DocuGraph sa mga dokumento?",
    ],
  },
  mayari: {
    facts: [
      {
        id: "extensionArchitecture",
        category: "implementation",
        summary:
          "Mayari is a Manifest V3 extension with a popup, background worker, Chrome storage, and Canvas REST API access.",
        detail:
          "The Manifest V3 extension has a popup and background service worker, stores extension data in Chrome storage, and retrieves Canvas data through the Canvas REST API.",
      },
      {
        id: "deadlineFeatures",
        category: "feature",
        summary:
          "Mayari organizes Canvas assignments with deadline filters and browser reminders.",
        detail:
          "Chrome alarms and notifications support deadline reminders; the documented workflow also includes assignment filters, course announcements, and class or meeting-link management.",
      },
      {
        id: "configuration",
        category: "limitation",
        summary:
          "Users configure their own Canvas instance and access token locally.",
        detail:
          "Users configure their Canvas instance and access token locally. The repository is distributed as an unpacked extension, with no public hosted demo.",
      },
      {
        id: "usageMetrics",
        category: "evidence",
        summary:
          "No adoption, user-count, or usage measurements are documented.",
        detail:
          "No adoption, user-count, or usage metrics are listed in the reviewed portfolio or repository documentation.",
      },
    ],
    lesson:
      "Keeping the workflow in the browser makes setup and credential handling important: users configure their own Canvas instance and token locally.",
    questionExamples: [
      "How does Mayari sync Canvas assignments?",
      "What reminders and course features does Mayari include?",
      "Does Mayari have a public hosted demo?",
      "What do I need to configure to use Mayari?",
      "Paano tinutulungan ng Mayari ang students sa deadlines?",
    ],
  },
  "red-warriors": {
    facts: [
      {
        id: "aosBehavior",
        category: "feature",
        summary:
          "The customer-facing AOS prototype uses sample menus, an in-memory cart, and a locally generated queue number.",
        detail:
          "The AOS uses Java activities and XML layouts for sample menu navigation, process-local cart data, and a locally generated queue number. Its displayed email/order message is not backed by email or order-submission code.",
      },
      {
        id: "posBehavior",
        category: "feature",
        summary:
          "The separate canteen-side POS prototype provides local login and navigation to placeholder operations screens.",
        detail:
          "The separate POS app has a local login check and canteen operations menus. Their destinations currently open a no-records placeholder; no sales or transaction workflow is implemented.",
      },
      {
        id: "integration",
        category: "limitation",
        summary:
          "The recovered AOS and POS apps have no verified shared service or synchronization.",
        detail:
          "The recovered source contains two independent Java 8 Android apps with XML layouts: a customer-facing AOS and a separate canteen-side POS navigation prototype. No shared API, database, payment, sales processing, or AOS/POS synchronization was found.",
      },
      {
        id: "technologyNotes",
        category: "limitation",
        summary:
          "The reviewed original Android project records do not establish Firebase integration.",
        detail:
          "The reviewed original AOS and POS records identify Java, Android SDK, AndroidX, Material Components, XML layouts, and Gradle; they do not establish Firebase integration. The portfolio browser demonstration is separate and simulates synchronized sample behavior locally.",
      },
      {
        id: "prototypeLimits",
        category: "limitation",
        summary:
          "The prototypes do not establish production authentication, order submission, payment, or persistence.",
        detail:
          "The source demonstrates UI navigation and prototype-level interactions, but does not establish real order delivery, transaction processing, payment, receipts, or operational records. No usage, transaction, or queue-time measurements are available.",
      },
    ],
    lesson:
      "A screen or success message is not proof of a completed backend workflow. Keep local prototype behavior distinct from authenticated, persisted, or synchronized operations.",
    questionExamples: [
      "What does the Red Warriors AOS actually implement?",
      "What does the Red Warriors POS prototype do?",
      "Are the AOS and POS apps connected?",
      "Does Red Warriors submit real orders or payments?",
      "Ano ang pagkakaiba ng AOS at POS?",
    ],
  },
  "cs-expo-2026": {
    facts: [
      {
        id: "productionRelease",
        category: "feature",
        summary:
          "The production release serves schedule, speakers, sponsors, and publications; other sections remain hidden browser-only demos.",
        detail:
          "The first production release serves schedule, speakers, sponsors, and publications; a release gate hides the remaining browser-only demo sections.",
      },
      {
        id: "cmsArchitecture",
        category: "implementation",
        summary:
          "Supabase backs released content and the admin CMS, with server-side role checks and row-level security for CMS writes.",
        detail:
          "Supabase backs the released content and admin CMS. The engineering notes document server-side role checks and row-level security for CMS writes.",
      },
      {
        id: "teamOwnership",
        category: "implementation",
        summary:
          "Lenj contributed frontend registration validation, error handling, and responsive improvements; backend ownership belongs to the backend team.",
        detail:
          "Lenj contributed registration validation, error handling, and responsive frontend improvements. Backend implementation belongs to the backend team.",
      },
      {
        id: "usageMetrics",
        category: "evidence",
        summary:
          "No individual registration, conversion, or usage metrics are documented.",
        detail:
          "No individual registration, conversion, or usage metrics have been provided.",
      },
    ],
    lesson:
      "For a collaborative platform, distinguish the production release boundary, team ownership, and an individual's verified contribution instead of implying every demo feature is deployed or solely authored.",
    questionExamples: [
      "Which CS Expo features are in the production release?",
      "What was Lenj responsible for on CS Expo?",
      "Are all CS Expo sections live?",
      "What is the CS Expo admin CMS backed by?",
    ],
  },
  wedding: {
    facts: [
      {
        id: "invitationFeatures",
        category: "feature",
        summary:
          "The invitation includes a personalized greeting, journey-themed visuals, a story timeline, and event details.",
        detail:
          "The repository documents a responsive Next.js invitation with a personalized greeting, journey-themed motion, a story timeline, and event details.",
      },
      {
        id: "rsvpBehavior",
        category: "implementation",
        summary:
          "The live invitation uses Google Forms; the portfolio RSVP preview is local-only and does not submit responses.",
        detail:
          "The live invitation uses Google Forms for RSVP submissions. The portfolio RSVP preview is local-only and does not submit or save responses to the live form.",
      },
      {
        id: "accessibility",
        category: "implementation",
        summary:
          "The project documents reduced-motion and keyboard-accessibility support.",
        detail:
          "The project documents reduced-motion and keyboard-accessibility support.",
      },
      {
        id: "engagementMetrics",
        category: "evidence",
        summary:
          "No engagement metrics have been provided.",
        detail:
          "No engagement metrics have been provided.",
      },
    ],
    lesson:
      "Motion, accessibility, responsive layout, and external form behavior need to work together rather than being treated as separate visual features.",
    questionExamples: [
      "How does the wedding invitation RSVP work?",
      "What accessibility and motion features are documented?",
      "Is the wedding website public?",
      "Does the portfolio wedding demo send RSVP data?",
    ],
  },
};

export function projectEngineeringFact(
  projectId: string,
  factId: string,
): ProjectEngineeringFact | undefined {
  return projectEngineeringNotes[projectId]?.facts.find(
    (fact) => fact.id === factId,
  );
}
