import {
  classifyIntent,
  detectQueryLanguage,
  normalizeText,
  rankKnowledge,
  type KnowledgeRecord,
  type LenjiPTResult,
} from "@/lib/lenjiptCore";

export type LenjiPTDiagnostics = {
  originalQuestion: string;
  normalizedQuestion: string;
  detectedLanguage: string;
  detectedIntent: string;
  identifiedEntities: Array<{ id: string; title: string; kind: string }>;
  conversationContext: {
    activeId: string | null;
    recentRecordIds: string[];
  };
  topRetrievedRecords: Array<{
    id: string;
    title: string;
    score: number;
  }>;
  selectedAnswerRecordId: string | null;
  scopeClassification:
    | "in-scope / answerable"
    | "in-scope / missing evidence"
    | "out of scope"
    | "ambiguous";
  fallbackReason: string | null;
  responseStatus: LenjiPTResult["status"];
  processingMs: number;
};

function isNamedEntityMentioned(
  query: string,
  record: KnowledgeRecord,
) {
  const normalizedQuery = ` ${normalizeText(query)} `;
  return [record.title, ...(record.aliases ?? [])].some((alias) => {
    const normalizedAlias = normalizeText(alias);
    return (
      normalizedAlias.length > 2 &&
      normalizedQuery.includes(` ${normalizedAlias} `)
    );
  });
}

export function createLenjiPTDiagnostics(
  question: string,
  records: KnowledgeRecord[],
  result: LenjiPTResult,
  activeContextId: string | null,
  recentRecordIds: string[],
  processingMs: number,
): LenjiPTDiagnostics {
  const ranking = rankKnowledge(question, records);
  const identifiedEntities = records
    .filter(
      (record) =>
        !record.kind.endsWith("-index") &&
        isNamedEntityMentioned(question, record),
    )
    .map(({ id, title, kind }) => ({ id, title, kind }))
    .slice(0, 5);
  const scopeClassification =
    result.status === "answer"
      ? "in-scope / answerable"
      : result.status === "unknown"
        ? "in-scope / missing evidence"
        : result.status === "clarification"
          ? "ambiguous"
          : "out of scope";
  const fallbackReason =
    result.status === "answer"
      ? null
      : result.status === "clarification"
        ? "A contextual reference was used without an active topic."
        : result.status === "unknown"
          ? "The question is portfolio-related, but matching evidence is missing or the requested detail is undocumented."
          : "No portfolio signal matched, or the request was explicitly outside the portfolio scope.";

  return {
    originalQuestion: question,
    normalizedQuestion: normalizeText(question),
    detectedLanguage: detectQueryLanguage(question, records),
    detectedIntent: classifyIntent(question),
    identifiedEntities,
    conversationContext: {
      activeId: activeContextId,
      recentRecordIds: recentRecordIds.slice(0, 5),
    },
    topRetrievedRecords: ranking.slice(0, 5).map(({ record, score }) => ({
      id: record.id,
      title: record.title,
      score: Number(score.toFixed(3)),
    })),
    selectedAnswerRecordId: result.matchedId,
    scopeClassification,
    fallbackReason,
    responseStatus: result.status,
    processingMs: Number(processingMs.toFixed(2)),
  };
}
