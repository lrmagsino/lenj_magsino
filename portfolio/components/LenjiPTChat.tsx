"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useLenjiPT } from "@/components/LenjiPTProvider";
import LenjiPTResponseView from "@/components/LenjiPTResponse";

export default function LenjiPTChat({
  idPrefix,
  onInternalNavigate,
}: {
  idPrefix: "dialog" | "section";
  onInternalNavigate?: (href: string) => void;
}) {
  const {
    messages,
    suggestions,
    autocomplete,
    diagnostics,
    isThinking,
    canShowAnswerNow,
    requestError,
    ask,
    showAnswerNow,
    clearConversation,
  } = useLenjiPT();
  const [input, setInput] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const matches = showAutocomplete && !isThinking ? autocomplete(input) : [];

  useEffect(() => {
    const history = historyRef.current;
    if (history) history.scrollTop = history.scrollHeight;
  }, [isThinking, messages]);

  useEffect(() => {
    const textarea = questionRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
    textarea.style.overflowY = textarea.scrollHeight > 128 ? "auto" : "hidden";
  }, [input]);

  const submitQuestion = (question: string) => {
    if (!question.trim() || isThinking) return;
    const request = ask(question);
    if (!request) return;
    setInput("");
    setShowAutocomplete(false);
    void request;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitQuestion(input);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className="theme-aware-content overflow-hidden rounded-2xl border border-cyan/25 bg-charcoal/80 shadow-[0_24px_70px_-42px_rgba(47,107,255,.55)]">
      <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-cyan/[0.06] via-transparent to-electric/[0.06] px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <LenjiPTAvatar />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-semibold text-[color:var(--color-text-primary)]">
                LenjiPT
              </h3>
              <span className="rounded-full border border-cyan/25 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[color:var(--color-text-muted)]">
                Beta
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[color:var(--color-text-secondary)]">
              Your Personal Portfolio Assistant
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={clearConversation}
          disabled={messages.length === 0}
          className="holo-link min-h-10 shrink-0 rounded-full border border-white/15 px-3 text-xs text-[color:var(--color-text-secondary)] hover:border-cyan/45 hover:text-cyan disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:transform-none"
        >
          Clear
        </button>
      </header>

      <div
        ref={historyRef}
        data-lenis-prevent
        className="max-h-[min(54vh,30rem)] min-h-48 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5"
      >
        {messages.length === 0 ? (
          <div className="flex items-start gap-3">
            <LenjiPTAvatar />
            <div className="max-w-2xl rounded-2xl rounded-tl-sm border border-cyan/20 bg-midnight/45 px-4 py-3.5">
              <p className="text-sm font-semibold leading-relaxed text-[color:var(--color-text-primary)]">
                Hi! I&apos;m LenjiPT. <span aria-hidden="true">👋</span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                I&apos;m here to help you explore Lenj&apos;s projects, technical
                skills, certifications, education, and development journey.
                What would you like to know?
              </p>
            </div>
          </div>
        ) : (
          <div
            role="log"
            aria-label="Conversation with LenjiPT"
            aria-live="polite"
            aria-relevant="additions text"
            className="space-y-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`lenjipt-message-enter flex items-end gap-2 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "assistant" && <LenjiPTAvatar />}
                <article
                  className={
                    message.role === "user"
                      ? "min-w-0 max-w-[88%] break-words rounded-2xl rounded-tr-sm bg-electric/15 px-4 py-3"
                      : "min-w-0 max-w-[calc(100%-2.5rem)] flex-1 break-words rounded-2xl rounded-tl-sm border border-cyan/20 bg-midnight/45 px-4 py-3"
                  }
                >
                  {message.role === "assistant" && message.status !== "answer" && (
                    <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-violet">
                      {message.status === "unknown"
                        ? "Not in the verified portfolio details"
                        : message.status === "clarification"
                          ? "Needs a topic clarification"
                          : "Outside portfolio scope"}
                    </p>
                  )}
                  {message.role === "assistant" &&
                  message.response?.presentation === "conversational" ? (
                    <p className="whitespace-pre-line break-words text-sm leading-relaxed text-[color:var(--color-text-primary)]">
                      {message.response.summary}
                    </p>
                  ) : message.role === "assistant" && message.response ? (
                    <LenjiPTResponseView
                      response={message.response}
                      onFollowUp={submitQuestion}
                      onInternalNavigate={onInternalNavigate}
                      isThinking={isThinking}
                    />
                  ) : (
                    <p className="whitespace-pre-line break-words text-sm leading-relaxed text-[color:var(--color-text-primary)]">
                      {message.text}
                    </p>
                  )}
                </article>
              </div>
            ))}
            {isThinking && (
              <div className="lenjipt-message-enter flex flex-wrap items-center gap-2">
                <div
                  className="flex items-end gap-2"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <LenjiPTAvatar />
                  <div className="flex min-h-12 items-center gap-2.5 rounded-2xl rounded-tl-sm border border-cyan/25 bg-midnight/55 px-4 py-3 shadow-[0_0_24px_-14px_rgba(60,224,240,.42)]">
                    <span className="text-sm text-[color:var(--color-text-secondary)]">
                      LenjiPT is thinking...
                    </span>
                    <span className="flex items-center gap-1" aria-hidden="true">
                      <span className="lenjipt-thinking-dot" />
                      <span className="lenjipt-thinking-dot [animation-delay:160ms]" />
                      <span className="lenjipt-thinking-dot [animation-delay:320ms]" />
                    </span>
                  </div>
                </div>
                {canShowAnswerNow && (
                  <button
                    type="button"
                    onClick={showAnswerNow}
                    className="min-h-10 rounded-full border border-cyan/35 px-3 text-xs font-medium text-cyan transition-colors hover:border-cyan/65 hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                  >
                    Show Answer Now
                  </button>
                )}
              </div>
            )}
            {requestError && (
              <p
                role="alert"
                className="ml-10 rounded-xl border border-[color:var(--color-text-error)]/30 bg-[color:var(--color-text-error)]/5 px-3 py-2 text-sm text-[color:var(--color-text-error)]"
              >
                {requestError}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-white/10 px-4 py-4 sm:px-6">
        {matches.length > 0 && (
          <ul
            aria-label="Question suggestions"
            className="mb-3 flex flex-wrap gap-2"
          >
            {matches.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  onClick={() => submitQuestion(suggestion)}
                  disabled={isThinking}
                  className="holo-link min-h-9 rounded-full border border-violet/30 px-3 py-1.5 text-left text-xs text-[color:var(--color-text-secondary)] hover:border-violet/60 hover:text-violet disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:transform-none"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <label className="sr-only" htmlFor={`${idPrefix}-lenjipt-question`}>
            Ask LenjiPT a portfolio question
          </label>
          <textarea
            ref={questionRef}
            id={`${idPrefix}-lenjipt-question`}
            rows={1}
            value={input}
            maxLength={500}
            autoComplete="off"
            placeholder="Ask LenjiPT anything about my portfolio..."
            disabled={isThinking}
            onKeyDown={handleInputKeyDown}
            onChange={(event) => {
              setInput(event.target.value);
              setShowAutocomplete(true);
            }}
            onFocus={() => setShowAutocomplete(true)}
            onBlur={() => {
              window.setTimeout(() => setShowAutocomplete(false), 120);
            }}
            className="max-h-32 min-h-12 min-w-0 flex-1 resize-none rounded-xl border border-white/15 bg-midnight/60 px-3 py-3 text-sm leading-relaxed text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-cyan focus:outline-none disabled:cursor-wait disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            aria-label="Send message to LenjiPT"
            title="Send message"
            className="holo-link grid min-h-12 min-w-12 shrink-0 place-items-center rounded-xl bg-electric text-white hover:bg-electric/85 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:transform-none"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path
                d="M5 12h13M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
        <p className="mt-2 flex justify-between gap-3 font-mono text-[10px] text-[color:var(--color-text-muted)]">
          <span>Enter to send · Shift+Enter for a new line</span>
          <span>{input.length}/500</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-2" aria-label="Suggested questions">
          {suggestions.slice(0, 4).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => submitQuestion(suggestion)}
              disabled={isThinking}
              className="holo-link min-h-9 rounded-full border border-white/10 px-3 py-1.5 text-left text-xs text-[color:var(--color-text-secondary)] hover:border-cyan/35 hover:text-cyan disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:transform-none"
            >
              {suggestion}
            </button>
          ))}
        </div>
        <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-relaxed text-[color:var(--color-text-muted)]">
          LenjiPT focuses on information documented in this portfolio. Responses
          may be limited when details are unavailable.
        </p>
        {process.env.NODE_ENV === "development" && diagnostics && (
          <details className="mt-4 rounded-xl border border-amber-400/30 bg-amber-950/15 p-3 text-xs text-[color:var(--color-text-secondary)]">
            <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.14em] text-amber-300">
              Developer diagnostics · local only
            </summary>
            <dl className="mt-3 grid gap-2 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-[color:var(--color-text-primary)]">
                  Original question
                </dt>
                <dd className="break-words">{diagnostics.originalQuestion}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[color:var(--color-text-primary)]">
                  Normalized question
                </dt>
                <dd className="break-words">{diagnostics.normalizedQuestion}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[color:var(--color-text-primary)]">
                  Language / intent
                </dt>
                <dd>
                  {diagnostics.detectedLanguage} / {diagnostics.detectedIntent}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[color:var(--color-text-primary)]">
                  Scope / status / processing
                </dt>
                <dd>
                  {diagnostics.scopeClassification} · {diagnostics.responseStatus} ·{" "}
                  {diagnostics.processingMs} ms
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[color:var(--color-text-primary)]">
                  Identified entities
                </dt>
                <dd className="break-words">
                  {diagnostics.identifiedEntities.length
                    ? diagnostics.identifiedEntities
                        .map(({ title, kind }) => `${title} (${kind})`)
                        .join(", ")
                    : "None"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[color:var(--color-text-primary)]">
                  Conversation context
                </dt>
                <dd className="break-words">
                  {diagnostics.conversationContext.activeId ?? "None"}
                  {diagnostics.conversationContext.recentRecordIds.length
                    ? ` · recent: ${diagnostics.conversationContext.recentRecordIds.join(", ")}`
                    : ""}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[color:var(--color-text-primary)]">
                  Selected answer record
                </dt>
                <dd className="break-words">
                  {diagnostics.selectedAnswerRecordId ?? "None"}
                </dd>
              </div>
              {diagnostics.fallbackReason && (
                <div>
                  <dt className="font-semibold text-[color:var(--color-text-primary)]">
                    Fallback reason
                  </dt>
                  <dd>{diagnostics.fallbackReason}</dd>
                </div>
              )}
            </dl>
            <div className="mt-3">
              <p className="font-semibold text-[color:var(--color-text-primary)]">
                Top retrieved records · ranking scores, not probabilities
              </p>
              <ol className="mt-1 list-decimal space-y-1 pl-5">
                {diagnostics.topRetrievedRecords.map((record) => (
                  <li key={record.id}>
                    {record.title} ({record.id}) · {record.score}
                  </li>
                ))}
              </ol>
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

function LenjiPTAvatar() {
  return (
    <span
      aria-hidden="true"
      className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-cyan/30 bg-cyan/[0.08] text-cyan shadow-[0_0_18px_-10px_rgba(60,224,240,.65)]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-4 w-4"
      >
        <path d="M19.5 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-5.5a7.5 7.5 0 1 1 16.5-4Z" />
        <path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01" strokeWidth="2.5" />
      </svg>
    </span>
  );
}
