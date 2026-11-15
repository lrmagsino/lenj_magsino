"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  answerPortfolioQuestion,
  getAutocompleteSuggestions,
  getSuggestions,
  type KnowledgeRecord,
  type LenjiPTAction,
  type LenjiPTLanguage,
  type LenjiPTResponse,
  type LenjiPTResult,
} from "@/lib/lenjiptCore";
import {
  createLenjiPTDiagnostics,
  type LenjiPTDiagnostics,
} from "@/lib/lenjiptDiagnostics";
import { buildLenjiPTKnowledge } from "@/lib/lenjiptKnowledge";
import { getLenjiPTPresentationDelay } from "@/lib/lenjiptTiming";

export type LenjiPTMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
  status?: LenjiPTResult["status"];
  actions?: LenjiPTAction[];
  response?: LenjiPTResponse;
};

type LenjiPTContextValue = {
  records: KnowledgeRecord[];
  messages: LenjiPTMessage[];
  suggestions: string[];
  diagnostics: LenjiPTDiagnostics | null;
  isThinking: boolean;
  canShowAnswerNow: boolean;
  requestError: string | null;
  autocomplete: (value: string) => string[];
  ask: (question: string) => Promise<LenjiPTResult | null> | null;
  showAnswerNow: () => void;
  clearConversation: () => void;
};

type PendingResponse = {
  requestId: number;
  resolve: (result: LenjiPTResult | null) => void;
  timer: number | null;
  result: LenjiPTResult | null;
  diagnostics: LenjiPTDiagnostics | null;
};

const LenjiPTContext = createContext<LenjiPTContextValue | null>(null);

export function LenjiPTProvider({
  resumeAvailable,
  children,
}: {
  resumeAvailable: boolean;
  children: ReactNode;
}) {
  const records = useMemo(
    () => buildLenjiPTKnowledge(resumeAvailable),
    [resumeAvailable],
  );
  const [messages, setMessages] = useState<LenjiPTMessage[]>([]);
  const [diagnostics, setDiagnostics] = useState<LenjiPTDiagnostics | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [canShowAnswerNow, setCanShowAnswerNow] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const isThinkingRef = useRef(false);
  const requestIdRef = useRef(0);
  const pendingComputeTimerRef = useRef<number | null>(null);
  const pendingResponseRef = useRef<PendingResponse | null>(null);
  const conversationTurnRef = useRef(0);
  const [contextId, setContextId] = useState<string | null>(null);
  const [recentRecordIds, setRecentRecordIds] = useState<string[]>([]);
  const [language, setLanguage] = useState<LenjiPTLanguage>("en");
  const nextId = useRef(0);

  const completeResponse = useCallback((requestId: number) => {
    const pending = pendingResponseRef.current;
    if (
      !pending ||
      pending.requestId !== requestId ||
      !pending.result
    ) {
      return;
    }

    if (pending.timer !== null) window.clearTimeout(pending.timer);
    pendingResponseRef.current = null;
    isThinkingRef.current = false;
    setIsThinking(false);
    setCanShowAnswerNow(false);

    const result = pending.result;
    if (pending.diagnostics) setDiagnostics(pending.diagnostics);
    setMessages((current) => [
      ...current,
      {
        id: nextId.current++,
        role: "assistant",
        text: result.answer,
        status: result.status,
        actions: result.actions,
        response: result.response,
      },
    ]);
    setContextId(result.contextId);
    setLanguage(result.language);
    const matchedId = result.matchedId;
    if (result.status === "answer" && matchedId) {
      setRecentRecordIds((current) => [
        matchedId,
        ...current.filter((id) => id !== matchedId),
      ].slice(0, 5));
    }
    pending.resolve(result);
  }, []);

  const failRequest = useCallback(
    (requestId: number, error: unknown) => {
      const pending = pendingResponseRef.current;
      if (!pending || pending.requestId !== requestId) return;
      if (pending.timer !== null) window.clearTimeout(pending.timer);
      pendingResponseRef.current = null;
      isThinkingRef.current = false;
      setIsThinking(false);
      setCanShowAnswerNow(false);
      console.error("LenjiPT could not process the submitted question.", error);
      setRequestError(
        "I couldn’t prepare a response just now. Please try again.",
      );
      pending.resolve(null);
    },
    [],
  );

  const ask = useCallback(
    (question: string) => {
      const trimmedQuestion = question.trim().slice(0, 500);
      if (!trimmedQuestion || isThinkingRef.current) return null;

      isThinkingRef.current = true;
      setIsThinking(true);
      setRequestError(null);
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "user",
          text: trimmedQuestion,
        },
      ]);

      return new Promise<LenjiPTResult | null>((resolve) => {
        const requestId = ++requestIdRef.current;
        const requestStartedAt = performance.now();
        const pending: PendingResponse = {
          requestId,
          resolve,
          timer: null,
          result: null,
          diagnostics: null,
        };
        pendingResponseRef.current = pending;
        pendingComputeTimerRef.current = window.setTimeout(() => {
          pendingComputeTimerRef.current = null;
          if (
            requestIdRef.current !== requestId ||
            pendingResponseRef.current !== pending
          ) {
            return;
          }
          try {
            const startedAt = performance.now();
            const result = answerPortfolioQuestion(
              trimmedQuestion,
              records,
              contextId,
              recentRecordIds,
              conversationTurnRef.current,
            );
            conversationTurnRef.current += 1;
            pending.result = result;
            if (process.env.NODE_ENV === "development") {
              pending.diagnostics = createLenjiPTDiagnostics(
                trimmedQuestion,
                records,
                result,
                contextId,
                recentRecordIds,
                performance.now() - startedAt,
              );
            }
            const elapsed = performance.now() - requestStartedAt;
            const reducedMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            const delay = Math.max(
              0,
              getLenjiPTPresentationDelay(
                trimmedQuestion,
                result.intent,
                reducedMotion,
              ) - elapsed,
            );
            if (delay === 0) {
              completeResponse(requestId);
              return;
            }
            setCanShowAnswerNow(delay >= 1000);
            pending.timer = window.setTimeout(
              () => completeResponse(requestId),
              delay,
            );
          } catch (error) {
            failRequest(requestId, error);
          }
        });
      });
    },
    [completeResponse, contextId, failRequest, recentRecordIds, records],
  );

  const showAnswerNow = useCallback(() => {
    const pending = pendingResponseRef.current;
    if (pending?.result) completeResponse(pending.requestId);
  }, [completeResponse]);

  const clearConversation = useCallback(() => {
    requestIdRef.current += 1;
    if (pendingComputeTimerRef.current !== null) {
      window.clearTimeout(pendingComputeTimerRef.current);
      pendingComputeTimerRef.current = null;
    }
    const pending = pendingResponseRef.current;
    if (pending && pending.timer !== null) {
      window.clearTimeout(pending.timer);
    }
    pendingResponseRef.current = null;
    pending?.resolve(null);
    isThinkingRef.current = false;
    setIsThinking(false);
    setCanShowAnswerNow(false);
    setMessages([]);
    setContextId(null);
    setRecentRecordIds([]);
    setLanguage("en");
    conversationTurnRef.current = 0;
    setDiagnostics(null);
    setRequestError(null);
  }, []);

  useEffect(
    () => () => {
      requestIdRef.current += 1;
      if (pendingComputeTimerRef.current !== null) {
        window.clearTimeout(pendingComputeTimerRef.current);
      }
      const pending = pendingResponseRef.current;
      if (pending && pending.timer !== null) {
        window.clearTimeout(pending.timer);
      }
      pendingResponseRef.current = null;
      pending?.resolve(null);
    },
    [],
  );

  const value = useMemo<LenjiPTContextValue>(
    () => ({
      records,
      messages,
      suggestions: getSuggestions(contextId, records, language),
      isThinking,
      canShowAnswerNow,
      requestError,
      diagnostics:
        process.env.NODE_ENV === "development" ? diagnostics : null,
      autocomplete: (input) =>
        getAutocompleteSuggestions(
          input,
          getSuggestions(contextId, records, language),
          records,
          language,
        ),
      ask,
      showAnswerNow,
      clearConversation,
    }),
    [
      ask,
      canShowAnswerNow,
      clearConversation,
      contextId,
      diagnostics,
      isThinking,
      language,
      messages,
      records,
      requestError,
      showAnswerNow,
    ],
  );

  return (
    <LenjiPTContext.Provider value={value}>{children}</LenjiPTContext.Provider>
  );
}

export function useLenjiPT() {
  const context = useContext(LenjiPTContext);
  if (!context) {
    throw new Error("useLenjiPT must be used within a LenjiPTProvider.");
  }
  return context;
}
