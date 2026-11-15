import { buildLenjiPTKnowledge } from "../lib/lenjiptKnowledge.ts";
import { answerPortfolioQuestion } from "../lib/lenjiptCore.ts";

const records = buildLenjiPTKnowledge(true);
const cases = [
  {
    id: "english-docugraph-technology",
    question: "Which tools did Lenj use for the DocuGraph document workflow?",
    status: "answer",
    intent: "technology",
    matchedId: "project:docugraph",
    language: "en",
  },
  {
    id: "filipino-docugraph-technology",
    question: "Anong mga teknolohiya ang ginamit ni Lenj sa DocuGraph?",
    status: "answer",
    intent: "technology",
    matchedId: "project:docugraph",
    language: "fil",
    localizedMarker: "Mga Teknolohiya",
  },
  {
    id: "taglish-docugraph-stack",
    question: "Ano yung tech stack ng DocuGraph?",
    status: "answer",
    intent: "technology",
    matchedId: "project:docugraph",
    language: "taglish",
    localizedMarker: "Tech Stack",
  },
  {
    id: "misspelled-docugraph-demo",
    question: "Can I open the DocuGrahp demo?",
    status: "answer",
    intent: "demo",
    matchedId: "project:docugraph",
    language: "en",
  },
  {
    id: "indirect-canvas-extension",
    question: "Does the student study companion connect to Canvas?",
    status: "answer",
    matchedId: "project:mayari",
    language: "en",
  },
  {
    id: "mayari-user-count",
    question: "How many students actively use Mayari?",
    status: "answer",
    intent: "outcome",
    matchedId: "project:mayari",
    language: "en",
  },
  {
    id: "red-warriors-app-integration",
    question: "Do the customer and canteen operator apps synchronize orders?",
    status: "answer",
    matchedId: "project:red-warriors",
    language: "en",
  },
  {
    id: "red-warriors-demo-boundary",
    question: "Does the Red Warriors browser simulation connect the original AOS and POS?",
    status: "answer",
    intent: "approach",
    matchedId: "project:red-warriors",
    language: "en",
  },
  {
    id: "cs-expo-production-scope",
    question: "Which sections are actually released on the CS Expo production site?",
    status: "answer",
    matchedId: "project:cs-expo-2026",
    language: "en",
  },
  {
    id: "wedding-rsvp-preview",
    question: "Does the portfolio wedding RSVP preview save real submissions?",
    status: "answer",
    intent: "approach",
    matchedId: "project:wedding",
    language: "en",
  },
  {
    id: "recruiter-internship",
    question: "Is Lenj open to an internship placement?",
    status: "answer",
    intent: "internship",
    matchedId: "internship",
    language: "en",
  },
  {
    id: "recruiter-contact",
    question: "How can a hiring manager get in touch with Lenj?",
    status: "answer",
    intent: "contact",
    matchedId: "contact",
    language: "en",
  },
  {
    id: "education-current-program",
    question: "Where is Lenj currently studying?",
    status: "answer",
    intent: "education",
    matchedId: "education-index",
    language: "en",
  },
  {
    id: "pmi-credential-id",
    question: "What is the PMI Project Management Ready credential ID?",
    status: "answer",
    intent: "certifications",
    matchedId: "certification:pmi-project-management",
    language: "en",
  },
  {
    id: "docugraph-model-training",
    question: "Is DocuGraph's graph module a trained neural network?",
    status: "answer",
    intent: "approach",
    matchedId: "project:docugraph",
    language: "en",
  },
  {
    id: "docugraph-validated-accuracy",
    question: "Does DocuGraph have validated accuracy measurements?",
    status: "answer",
    intent: "outcome",
    matchedId: "project:docugraph",
    language: "en",
  },
  {
    id: "mayari-team-members",
    question: "Who were Lenj's teammates on Mayari?",
    status: "unknown",
    matchedId: "project:mayari",
    language: "en",
  },
  {
    id: "missing-gpa",
    question: "What was Lenj's GPA?",
    status: "unknown",
    matchedId: "education-index",
    language: "en",
  },
  {
    id: "unrelated-weather",
    question: "What will the weather be tomorrow?",
    status: "out-of-scope",
    language: "en",
  },
  {
    id: "unrelated-general-ai",
    question: "Explain how transformer models work in general.",
    status: "out-of-scope",
    language: "en",
  },
  {
    id: "filipino-activity",
    question: "May sinalihan bang hackathon si Lenj?",
    status: "answer",
    matchedId: "activity:acm-developers-week",
    language: "fil",
  },
  {
    id: "paraphrased-comparison",
    question: "How do DocuGraph and Mayari differ in their implementations?",
    status: "answer",
    intent: "comparison",
    matchedId: "project:docugraph",
    language: "en",
  },
];

const failures = [];
const counts = {
  status: 0,
  intent: 0,
  retrieval: 0,
  language: 0,
  fullyCorrect: 0,
  retrievalCases: 0,
};
const startedAt = performance.now();

for (const testCase of cases) {
  const result = answerPortfolioQuestion(testCase.question, records);
  const checks = {
    status: result.status === testCase.status,
    intent: !testCase.intent || result.intent === testCase.intent,
    retrieval: !testCase.matchedId || result.matchedId === testCase.matchedId,
    language:
      result.language === testCase.language &&
      result.response.language === testCase.language,
    localized:
      !testCase.localizedMarker ||
      result.response.sections.some(
        (section) => section.heading === testCase.localizedMarker,
      ),
  };
  if (checks.status) counts.status += 1;
  if (checks.intent) counts.intent += 1;
  if (testCase.matchedId) {
    counts.retrievalCases += 1;
    if (checks.retrieval) counts.retrieval += 1;
  }
  if (checks.language) counts.language += 1;
  if (Object.values(checks).every(Boolean)) counts.fullyCorrect += 1;
  if (!Object.values(checks).every(Boolean)) {
    failures.push({
      id: testCase.id,
      question: testCase.question,
      expected: {
        status: testCase.status,
        intent: testCase.intent ?? "(not asserted)",
        matchedId: testCase.matchedId ?? "(not asserted)",
        language: testCase.language,
      },
      received: {
        status: result.status,
        intent: result.intent,
        matchedId: result.matchedId,
        language: result.language ?? null,
        title: result.response.title,
        summary: result.response.summary,
      },
    });
  }
}

const conversation = [
  ["What is DocuGraph?", "project:docugraph"],
  ["What technologies does it use?", "project:docugraph"],
  ["Can I try it?", "project:docugraph"],
  ["How about Mayari?", "project:mayari"],
  ["Does that have a live demo?", "project:mayari"],
  ["What about the earlier project?", "project:docugraph"],
];
let contextId = null;
let recentRecordIds = [];
const conversationFailures = [];
for (const [question, expectedId] of conversation) {
  const result = answerPortfolioQuestion(
    question,
    records,
    contextId,
    recentRecordIds,
  );
  if (result.matchedId !== expectedId) {
    conversationFailures.push({
      question,
      expectedId,
      actualId: result.matchedId,
      answer: result.answer,
    });
  }
  contextId = result.contextId;
  if (result.status === "answer" && result.matchedId) {
    recentRecordIds = [
      result.matchedId,
      ...recentRecordIds.filter((id) => id !== result.matchedId),
    ].slice(0, 5);
  }
}

const elapsedMs = performance.now() - startedAt;
const percent = (value, total) =>
  `${((value / Math.max(total, 1)) * 100).toFixed(1)}%`;
console.log(`Held-out LenjiPT evaluation: ${cases.length} questions.`);
console.log(
  `Status ${counts.status}/${cases.length} (${percent(counts.status, cases.length)}); ` +
    `intent ${counts.intent}/${cases.length} (${percent(counts.intent, cases.length)}); ` +
    `retrieval ${counts.retrieval}/${counts.retrievalCases} (${percent(counts.retrieval, counts.retrievalCases)}); ` +
    `language ${counts.language}/${cases.length} (${percent(counts.language, cases.length)}); ` +
    `all checks ${counts.fullyCorrect}/${cases.length} (${percent(counts.fullyCorrect, cases.length)}).`,
);
console.log(
  `Conversation turns: ${conversation.length - conversationFailures.length}/${conversation.length}; ` +
    `mean evaluation time ${(elapsedMs / (cases.length + conversation.length)).toFixed(2)} ms/query.`,
);
if (failures.length) {
  console.log("Question failures:");
  failures.forEach((failure) => console.log(JSON.stringify(failure)));
}
if (conversationFailures.length) {
  console.log("Conversation failures:");
  conversationFailures.forEach((failure) =>
    console.log(JSON.stringify(failure)),
  );
}
