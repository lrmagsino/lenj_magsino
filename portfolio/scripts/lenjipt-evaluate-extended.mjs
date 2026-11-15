import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildLenjiPTKnowledge } from "../lib/lenjiptKnowledge.ts";
import { answerPortfolioQuestion } from "../lib/lenjiptCore.ts";
import {
  phase3Cases,
  phase3Conversations,
} from "../tests/lenjipt/phase3-fixtures.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const records = buildLenjiPTKnowledge(true);
const failures = [];
const allResults = [];

function responseHrefs(result) {
  return [
    ...result.actions.map((action) => action.href),
    ...result.response.actions.map((action) => action.href),
    ...result.response.sections.flatMap((section) => [
      ...(section.items ?? []).flatMap((item) =>
        item.action ? [item.action.href] : [],
      ),
    ]),
  ];
}

function evaluate(testCase, result, context = null) {
  const checks = {
    status: result.status === testCase.status,
    intent: !testCase.intent || result.intent === testCase.intent,
    retrieval: !testCase.matchedId || result.matchedId === testCase.matchedId,
    language: !testCase.language || result.language === testCase.language,
    navigation:
      !testCase.actionHref ||
      responseHrefs(result).includes(testCase.actionHref),
    evidence:
      (!testCase.mustContain ||
        testCase.mustContain.every((text) =>
          result.answer.toLowerCase().includes(text.toLowerCase()),
        )) &&
      (!testCase.mustNotContain ||
        testCase.mustNotContain.every(
          (text) => !result.answer.toLowerCase().includes(text.toLowerCase()),
        )),
    structured: Boolean(
      result.response &&
        Array.isArray(result.response.sections) &&
        Array.isArray(result.response.followUps),
    ),
  };
  const failureCategories = [];
  if (!checks.status) {
    if (testCase.status === "out-of-scope" && result.status !== "out-of-scope") {
      failureCategories.push("incorrect in-scope acceptance");
    } else if (
      result.status === "out-of-scope" &&
      testCase.status !== "out-of-scope"
    ) {
      failureCategories.push("false out-of-scope rejection");
    } else if (result.status === "clarification") {
      failureCategories.push("ambiguous question mishandling");
    } else if (testCase.status === "unknown" && result.status === "answer") {
      failureCategories.push("unsupported factual claim");
    } else {
      failureCategories.push("incorrect response status");
    }
  }
  if (!checks.intent) failureCategories.push("incorrect intent detection");
  if (!checks.retrieval) failureCategories.push("incorrect project/entity retrieval");
  if (!checks.language) failureCategories.push("incorrect language detection");
  if (!checks.navigation) failureCategories.push("incorrect navigation action");
  if (!checks.evidence) failureCategories.push("unsupported or missing answer evidence");
  if (!checks.structured) failureCategories.push("poor answer structure");

  const row = {
    id: testCase.id ?? context?.id,
    category: testCase.category ?? "multi-turn context",
    difficulty: testCase.difficulty ?? "conversational",
    question: testCase.question,
    expected: {
      status: testCase.status,
      intent: testCase.intent ?? null,
      matchedId: testCase.matchedId ?? null,
      language: testCase.language ?? null,
      actionHref: testCase.actionHref ?? null,
    },
    actual: {
      status: result.status,
      intent: result.intent,
      matchedId: result.matchedId,
      language: result.language,
      actionHrefs: responseHrefs(result),
      answer: result.answer,
    },
    checks,
    failureCategories,
  };
  allResults.push(row);
  if (!Object.values(checks).every(Boolean)) failures.push(row);
  return row;
}

for (const testCase of phase3Cases) {
  evaluate(
    testCase,
    answerPortfolioQuestion(testCase.question, records),
  );
}

const conversationResults = [];
for (const conversation of phase3Conversations) {
  let contextId = null;
  let recentRecordIds = [];
  for (const [turnIndex, turn] of conversation.turns.entries()) {
    const result = answerPortfolioQuestion(
      turn.question,
      records,
      contextId,
      recentRecordIds,
    );
    const row = evaluate(
      {
        ...turn,
        id: `${conversation.id}-turn-${turnIndex + 1}`,
        category: "multi-turn context",
        difficulty: "hard",
      },
      result,
      conversation,
    );
    conversationResults.push(row);
    contextId = result.contextId;
    if (result.status === "answer" && result.matchedId) {
      recentRecordIds = [
        result.matchedId,
        ...recentRecordIds.filter((id) => id !== result.matchedId),
      ].slice(0, 5);
    }
  }
}

function groupedAccuracy(rows, key) {
  const groups = new Map();
  for (const row of rows) {
    const name = key(row);
    const group = groups.get(name) ?? { total: 0, passed: 0 };
    group.total += 1;
    if (Object.values(row.checks).every(Boolean)) group.passed += 1;
    groups.set(name, group);
  }
  return Object.fromEntries(
    [...groups.entries()].sort(([left], [right]) => left.localeCompare(right)),
  );
}

function groupedLanguageDetection(rows) {
  const groups = new Map();
  for (const row of rows) {
    const name = row.expected.language ?? "not asserted";
    const group = groups.get(name) ?? { total: 0, correct: 0 };
    group.total += 1;
    if (row.checks.language) group.correct += 1;
    groups.set(name, group);
  }
  return Object.fromEntries(
    [...groups.entries()].sort(([left], [right]) => left.localeCompare(right)),
  );
}

const failuresByCategory = failures.reduce((groups, failure) => {
  failure.failureCategories.forEach((category) => {
    groups[category] = (groups[category] ?? 0) + 1;
  });
  return groups;
}, {});
const counts = {
  questions: allResults.length,
  independentQuestions: phase3Cases.length,
  contextTurns: conversationResults.length,
  fullyCorrect: allResults.length - failures.length,
  failures: failures.length,
  statusCorrect: allResults.filter((row) => row.checks.status).length,
  intentCorrect: allResults.filter((row) => row.checks.intent).length,
  retrievalCases: allResults.filter((row) => row.expected.matchedId).length,
  retrievalCorrect: allResults.filter(
    (row) => row.expected.matchedId && row.checks.retrieval,
  ).length,
  navigationCases: allResults.filter((row) => row.expected.actionHref).length,
  languageCorrect: allResults.filter((row) => row.checks.language).length,
  languageCases: allResults.filter((row) => row.expected.language).length,
  navigationCorrect: allResults.filter(
    (row) => row.expected.actionHref && row.checks.navigation,
  ).length,
  evidenceCorrect: allResults.filter((row) => row.checks.evidence).length,
  contextCorrect: conversationResults.filter((row) =>
    Object.values(row.checks).every(Boolean),
  ).length,
};
const report = {
  counts,
  fullyCorrectByLanguage: groupedAccuracy(
    allResults,
    (row) => row.expected.language ?? "not asserted",
  ),
  languageDetectionByExpectedLanguage: groupedLanguageDetection(allResults),
  accuracyByTopic: groupedAccuracy(allResults, (row) => row.category),
  accuracyByDifficulty: groupedAccuracy(allResults, (row) => row.difficulty),
  failureCategories: failuresByCategory,
  failures,
};

console.log(`Phase 3 evaluation: ${counts.questions} questions.`);
console.log(
  `Fully correct ${counts.fullyCorrect}/${counts.questions} ` +
    `(${((counts.fullyCorrect / counts.questions) * 100).toFixed(1)}%); ` +
    `status ${counts.statusCorrect}/${counts.questions}; ` +
    `intent ${counts.intentCorrect}/${counts.questions}; ` +
    `retrieval ${counts.retrievalCorrect}/${counts.retrievalCases}; ` +
    `language ${counts.languageCorrect}/${counts.languageCases}; ` +
    `navigation ${counts.navigationCorrect}/${counts.navigationCases}; ` +
    `evidence ${counts.evidenceCorrect}/${counts.questions}; ` +
    `context ${counts.contextCorrect}/${counts.contextTurns}.`,
);
console.log("Fully correct by language:", JSON.stringify(report.fullyCorrectByLanguage));
console.log("Language detection by expected language:", JSON.stringify(report.languageDetectionByExpectedLanguage));
console.log("Accuracy by topic:", JSON.stringify(report.accuracyByTopic));
console.log("Accuracy by difficulty:", JSON.stringify(report.accuracyByDifficulty));
console.log("Failure categories:", JSON.stringify(failuresByCategory));
if (failures.length) {
  console.log("Failures:");
  failures.forEach((failure) =>
    console.log(JSON.stringify(failure)),
  );
}

if (process.argv.includes("--write-report")) {
  const outputDirectory = resolve(root, "docs", "lenjipt-evaluation");
  const percentage = (correct, total) =>
    total ? `${((correct / total) * 100).toFixed(1)}%` : "n/a";
  const table = (headers, rows) =>
    [
      `| ${headers.join(" | ")} |`,
      `| ${headers.map(() => "---").join(" | ")} |`,
      ...rows.map((row) => `| ${row.join(" | ")} |`),
    ].join("\n");
  const safeCell = (value) =>
    String(value ?? "—").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
  const metricRows = [
    ["Fully correct", counts.fullyCorrect, counts.questions],
    ["Status classification", counts.statusCorrect, counts.questions],
    ["Intent classification", counts.intentCorrect, counts.questions],
    ["Evidence checks", counts.evidenceCorrect, counts.questions],
    ["Language detection", counts.languageCorrect, counts.languageCases],
    ["Navigation actions", counts.navigationCorrect, counts.navigationCases],
    ["Conversation turns", counts.contextCorrect, counts.contextTurns],
    ["Retrieved-record selection", counts.retrievalCorrect, counts.retrievalCases],
  ].map(([label, correct, total]) => [
    label,
    `${correct}/${total}`,
    percentage(correct, total),
  ]);
  const languageRows = Object.entries(
    report.languageDetectionByExpectedLanguage,
  ).map(([language, result]) => [
    language,
    `${result.correct}/${result.total}`,
    percentage(result.correct, result.total),
  ]);
  const overallLanguageRows = Object.entries(
    report.fullyCorrectByLanguage,
  ).map(([language, result]) => [
    language,
    `${result.passed}/${result.total}`,
    percentage(result.passed, result.total),
  ]);
  const topicRows = Object.entries(report.accuracyByTopic).map(
    ([topic, result]) => [
      topic,
      `${result.passed}/${result.total}`,
      percentage(result.passed, result.total),
    ],
  );
  const difficultyRows = Object.entries(report.accuracyByDifficulty).map(
    ([difficulty, result]) => [
      difficulty,
      `${result.passed}/${result.total}`,
      percentage(result.passed, result.total),
    ],
  );
  const unknownCases = phase3Cases.filter(
    (testCase) => testCase.status === "unknown",
  );
  const unknownByCategory = unknownCases.reduce((groups, testCase) => {
    groups[testCase.category] = (groups[testCase.category] ?? 0) + 1;
    return groups;
  }, {});
  const phaseResults = [
    "# LenjiPT Phase 3 Evaluation Results",
    "",
    "## Scope and method",
    "",
    `The local, deterministic evaluation exercised ${counts.questions} prompts: ${phase3Cases.length} independent question cases and ${counts.contextTurns} turns across the conversation scenarios. The suite checks response status, intent, selected knowledge record where specified, detected language, safe navigation targets, evidence assertions, structured response shape, and contextual follow-up behavior.`,
    "",
    "These are results on a curated engineering test set, not a probability estimate or a guarantee about arbitrary visitor questions. Retrieval ranking scores are heuristic and must not be interpreted as confidence probabilities.",
    "",
    "## Overall measurements",
    "",
    table(["Measure", "Correct", "Rate"], metricRows),
    "",
    "## Language detection",
    "",
    "Language detection correctness is scored separately from full-case correctness. The following table compares the detected language with each case's expected language.",
    "",
    table(["Expected language", "Correct", "Rate"], languageRows),
    "",
    "A case is fully correct only when all of its applicable checks pass:",
    "",
    table(["Language", "Fully correct", "Rate"], overallLanguageRows),
    "",
    "## Full-case results by difficulty",
    "",
    table(["Difficulty", "Fully correct", "Rate"], difficultyRows),
    "",
    "## Full-case results by topic",
    "",
    table(["Topic", "Fully correct", "Rate"], topicRows),
    "",
    "## Limitations",
    "",
    "- The expected labels and required evidence are authored for this test set; passing it does not demonstrate coverage of every spelling, dialect, or conversational style.",
    "- The language detector uses local phrase and token heuristics. It does not identify a visitor's language with probabilistic certainty.",
    "- No visitor messages, API services, embeddings, or paid model calls are used by this evaluation.",
    "",
  ].join("\n");
  const failureRows = failures.map((failure) => [
    safeCell(failure.id),
    safeCell(failure.category),
    safeCell(failure.question),
    safeCell(failure.failureCategories.join(", ")),
    safeCell(
      `${failure.expected.status}/${failure.expected.intent ?? "—"}/${failure.expected.matchedId ?? "—"}/${failure.expected.language ?? "—"}`,
    ),
    safeCell(
      `${failure.actual.status}/${failure.actual.intent}/${failure.actual.matchedId ?? "—"}/${failure.actual.language}`,
    ),
  ]);
  const failureAnalysis = [
    "# LenjiPT Failure Analysis",
    "",
    `The latest evaluation found ${failures.length} full-case failure${failures.length === 1 ? "" : "s"} in ${counts.questions} checks.`,
    "",
    "A full-case failure means at least one asserted check did not match; the response may still have the correct status or evidence.",
    "",
    "## Failure counts by category",
    "",
    Object.keys(failuresByCategory).length
      ? table(
          ["Category", "Count"],
          Object.entries(failuresByCategory).map(([category, count]) => [
            category,
            count,
          ]),
        )
      : "No failure categories were recorded.",
    "",
    "## Cases",
    "",
    failures.length
      ? table(
          [
            "Case",
            "Topic",
            "Question",
            "Failed checks",
            "Expected status / intent / record / language",
            "Actual status / intent / record / language",
          ],
          failureRows,
        )
      : "No cases failed on this evaluation run.",
    "",
    "## Interpretation",
    "",
    "A zero-failure result describes only this curated set. Keep the separate regression suite and unseen prompts in the validation cycle, and add newly observed failures as independently reviewed cases rather than tuning answers to individual prompts.",
    "",
  ].join("\n");
  const knowledgeGaps = [
    "# LenjiPT Knowledge Gaps",
    "",
    "This inventory is derived from test cases that expect an in-scope `unknown` response. It identifies information the current public portfolio does not establish in the evaluated questions; it is not a claim that the facts do not exist elsewhere.",
    "",
    `The evaluation contains ${unknownCases.length} in-scope questions expected to produce a missing-evidence response.`,
    "",
    "## Missing-evidence cases by topic",
    "",
    Object.keys(unknownByCategory).length
      ? table(
          ["Topic", "Cases"],
          Object.entries(unknownByCategory).map(([category, count]) => [
            category,
            count,
          ]),
        )
      : "No missing-evidence cases were included in the independent set.",
    "",
    "## Questions that should remain unanswered without new evidence",
    "",
    unknownCases.length
      ? unknownCases
          .map(
            (testCase) =>
              `- **${safeCell(testCase.category)}** — “${safeCell(testCase.question)}”`,
          )
          .join("\n")
      : "No unresolved questions were recorded in the test set.",
    "",
    "## Handling rule",
    "",
    "Keep these as portfolio-related but insufficiently documented questions. LenjiPT should acknowledge the gap, avoid inventing a value, and only add an answer after the portfolio owner supplies an approved source.",
    "",
  ].join("\n");
  const improvements = [
    "# LenjiPT Improvement Plan",
    "",
    "## Implemented in this phase",
    "",
    "- Expanded English, Filipino, and Taglish knowledge-query coverage while keeping one canonical factual record per topic.",
    "- Improved field-weighted BM25-style retrieval with fuzzy token matching, query normalization, and portfolio terminology aliases; ranking scores remain heuristic.",
    "- Added focused Filipino synonyms for technical, education, activity, evidence, and navigation wording, plus safe correction for a frequent certification typo.",
    "- Resolved exact credential names and unique issuing organizations before falling back to grouped or complete certification indexes; broad plural certification questions return the collection rather than an arbitrary credential.",
    "- Avoided false project matches from common Filipino words, improved project-vs-demo distinction, and prioritized contextual question resolution across multi-turn conversations.",
    "- Kept missing-evidence questions in scope and out-of-scope questions distinct; retained structured responses and allowlisted portfolio navigation.",
    "- Added a local diagnostics model for normalized question, language, intent, entities, context, top retrieval records, answer record, scope outcome, and processing time. The UI is gated by development mode.",
    "- Added no dependency, paid inference, embedding service, or external database.",
    "",
    "## Measured result",
    "",
    table(["Measure", "Correct", "Rate"], metricRows),
    "",
    "## Recommended next work",
    "",
    "1. Validate with new, human-authored prompts not derived from the current fixture, especially Filipino spelling variants and regional Taglish phrasing.",
    "2. Review development diagnostics when a response is wrong; classify the cause as language, intent, entity selection, evidence gap, or scope before changing logic.",
    "3. Add a regression case only when its expected answer is source-backed and independently reviewed.",
    "4. Periodically verify that navigation actions remain on allowlisted portfolio routes or approved external hosts and that diagnostics remain unavailable in production.",
    "5. Keep factual updates in canonical portfolio sources and regenerate the knowledge records rather than adding duplicated Q&A responses.",
    "",
  ].join("\n");

  mkdirSync(outputDirectory, { recursive: true });
  const artifacts = [
    ["phase3-evaluation-latest.json", `${JSON.stringify(report, null, 2)}\n`],
    ["PHASE3_RESULTS.md", phaseResults],
    ["FAILURE_ANALYSIS.md", failureAnalysis],
    ["KNOWLEDGE_GAPS.md", knowledgeGaps],
    ["IMPROVEMENTS.md", improvements],
  ];
  artifacts.forEach(([fileName, content]) => {
    const target = resolve(outputDirectory, fileName);
    writeFileSync(target, content, "utf8");
    console.log(`Wrote ${target}`);
  });
}
