import assert from "node:assert/strict";
import { answerPortfolioQuestion } from "../lib/lenjiptCore.ts";
import { buildLenjiPTKnowledge } from "../lib/lenjiptKnowledge.ts";
import { getLenjiPTPresentationDelay } from "../lib/lenjiptTiming.ts";

const records = buildLenjiPTKnowledge(false);
const cases = [
  ["Hello!", "greeting", "en"],
  ["Hi there!", "greeting", "en"],
  ["Hey!", "greeting", "en"],
  ["Good morning!", "greeting", "en"],
  ["Good afternoon!", "greeting", "en"],
  ["Good evening!", "greeting", "en"],
  ["Yo!", "greeting", "en"],
  ["Sup!", "greeting", "en"],
  ["Kamusta?", "greeting", "fil"],
  ["Kumusta ka?", "greeting", "fil"],
  ["Hello po!", "greeting", "fil"],
  ["Thank you!", "gratitude", "en"],
  ["Thanks!", "gratitude", "en"],
  ["Salamat po!", "gratitude", "fil"],
  ["Nice!", "appreciation", "en"],
  ["Cool!", "appreciation", "en"],
  ["Ang galing!", "appreciation", "fil"],
  ["Okay!", "appreciation", "en"],
  ["Sige!", "appreciation", "fil"],
  ["Bye!", "farewell", "en"],
  ["Goodbye!", "farewell", "en"],
  ["Paalam!", "farewell", "fil"],
  ["How are you?", "small-talk", "en"],
  ["Hi, how are you?", "small-talk", "en"],
  ["Thanks, how are you?", "small-talk", "en"],
  ["How’s it going?", "small-talk", "en"],
  ["What’s up?", "small-talk", "en"],
  ["I’m doing well, how are you?", "small-talk", "en"],
  ["Who are you?", "identity", "en"],
  ["What’s your name?", "identity", "en"],
  ["Are you ChatGPT?", "identity", "en"],
  ["Are you a bot?", "identity", "en"],
  ["Are you real?", "identity", "en"],
  ["What can you do?", "capabilities", "en"],
  ["Can you help me?", "capabilities", "en"],
  ["Paano ka makakatulong?", "capabilities", "fil"],
];

const failures = [];
for (const [question, expectedIntent, expectedLanguage] of cases) {
  const result = answerPortfolioQuestion(question, records);
  if (
    result.status !== "answer" ||
    result.intent !== "conversation" ||
    result.language !== expectedLanguage ||
    result.response.presentation !== "conversational" ||
    !result.answer.trim()
  ) {
    failures.push({
      question,
      expected: `${expectedIntent} / ${expectedLanguage} / conversational`,
      received: `${result.status} / ${result.intent} / ${result.language} / ${result.response.presentation ?? "structured"}`,
      answer: result.answer,
    });
  }
}

const mixedCases = [
  ["Hello, what is DocuGraph?", "project:docugraph", "en"],
  ["Thanks! Can you show me Mayari?", "project:mayari", "en"],
  ["Good morning, where does Lenj study?", "education-index", "en"],
  ["Kamusta? Ano yung Red Warriors?", "project:red-warriors", "taglish"],
  ["Hi, can I contact Lenj?", "contact", "en"],
];
for (const [question, expectedId, expectedLanguage] of mixedCases) {
  const result = answerPortfolioQuestion(question, records);
  if (
    result.status !== "answer" ||
    result.matchedId !== expectedId ||
    result.language !== expectedLanguage ||
    result.response.presentation === "conversational"
  ) {
    failures.push({
      question,
      expected: `answer / ${expectedId} / ${expectedLanguage} / portfolio response`,
      received: `${result.status} / ${result.matchedId} / ${result.language} / ${result.response.presentation ?? "structured"}`,
      answer: result.answer,
    });
  }
  assert.ok(result.response.summary.length > 0);
}

const missingMixed = answerPortfolioQuestion(
  "Hi! What is Lenj’s exact GPA?",
  records,
);
assert.equal(missingMixed.status, "unknown");
const outOfScope = answerPortfolioQuestion(
  "Hello, how’s the weather?",
  records,
);
assert.equal(outOfScope.status, "out-of-scope");

const initialProject = answerPortfolioQuestion("What is DocuGraph?", records);
const greeting = answerPortfolioQuestion(
  "Hello!",
  records,
  initialProject.contextId,
  [initialProject.matchedId],
  0,
);
assert.equal(greeting.contextId, initialProject.contextId);
const gratitude = answerPortfolioQuestion(
  "Thank you!",
  records,
  greeting.contextId,
  [initialProject.matchedId],
  1,
);
assert.equal(gratitude.contextId, initialProject.contextId);
const followUp = answerPortfolioQuestion(
  "Can I try it?",
  records,
  gratitude.contextId,
  [initialProject.matchedId],
);
assert.equal(followUp.matchedId, "project:docugraph");

const firstGreeting = answerPortfolioQuestion("Hello!", records, null, [], 0);
const secondGreeting = answerPortfolioQuestion("Hello!", records, null, [], 1);
assert.notEqual(firstGreeting.answer, secondGreeting.answer);
assert.equal(
  firstGreeting.answer,
  answerPortfolioQuestion("Hello!", records, null, [], 0).answer,
);

assert.equal(getLenjiPTPresentationDelay("Hi!", "conversation"), 450);
assert.equal(getLenjiPTPresentationDelay("x".repeat(40), "overview"), 3000);
assert.equal(getLenjiPTPresentationDelay("x".repeat(41), "overview"), 4000);
assert.equal(getLenjiPTPresentationDelay("x".repeat(120), "overview"), 4000);
assert.equal(getLenjiPTPresentationDelay("x".repeat(121), "overview"), 5000);
assert.equal(
  getLenjiPTPresentationDelay(
    "Explain DocuGraph’s architecture and algorithm.",
    "approach",
  ),
  5000,
);
assert.equal(getLenjiPTPresentationDelay("Hello!", "conversation", true), 0);
assert.equal(getLenjiPTPresentationDelay("Short question", "overview", true), 0);

if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
} else {
  console.log(
    `LenjiPT conversational evaluation passed: ${cases.length + mixedCases.length} intent and mixed-question cases, context checks, and timing thresholds.`,
  );
}
