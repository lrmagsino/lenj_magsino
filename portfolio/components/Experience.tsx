"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";

export type ExperiencePhase = "intro" | "intro-exiting" | "main-entering" | "ready";

type ExperienceState = {
  phase: ExperiencePhase;
  initialized: boolean;
};

type ExperienceAction =
  | { type: "initialize"; playIntro: boolean }
  | { type: "begin-exit" }
  | { type: "enter-main" }
  | { type: "ready" };

type ExperienceContextValue = ExperienceState & {
  beginIntroExit: () => void;
  enterMain: () => void;
  markReady: () => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);
const initialState: ExperienceState = { phase: "intro", initialized: false };

function experienceReducer(
  state: ExperienceState,
  action: ExperienceAction,
): ExperienceState {
  switch (action.type) {
    case "initialize":
      if (state.initialized) return state;
      return { initialized: true, phase: action.playIntro ? "intro" : "main-entering" };
    case "begin-exit":
      return state.phase === "intro" ? { ...state, phase: "intro-exiting" } : state;
    case "enter-main":
      return state.phase === "intro-exiting" ? { ...state, phase: "main-entering" } : state;
    case "ready":
      return state.phase === "main-entering" ? { ...state, phase: "ready" } : state;
    default:
      return state;
  }
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(experienceReducer, initialState);
  const originalPageState = useRef<{
    htmlOverflow: string;
    bodyOverflow: string;
    scrollRestoration: ScrollRestoration;
  } | null>(null);
  const beginIntroExit = useCallback(() => dispatch({ type: "begin-exit" }), []);
  const enterMain = useCallback(() => dispatch({ type: "enter-main" }), []);
  const markReady = useCallback(() => dispatch({ type: "ready" }), []);

  useEffect(() => {
    const shouldPlayIntro = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    dispatch({ type: "initialize", playIntro: shouldPlayIntro });
  }, []);

  useLayoutEffect(() => {
    if (originalPageState.current === null) {
      originalPageState.current = {
        htmlOverflow: document.documentElement.style.overflow,
        bodyOverflow: document.body.style.overflow,
        scrollRestoration: history.scrollRestoration,
      };
    }

    if (state.phase === "ready") {
      document.documentElement.style.overflow = originalPageState.current.htmlOverflow;
      document.body.style.overflow = originalPageState.current.bodyOverflow;
      return;
    }

    history.scrollRestoration = "manual";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  }, [state.phase]);

  useEffect(
    () => () => {
      if (originalPageState.current) {
        document.documentElement.style.overflow = originalPageState.current.htmlOverflow;
        document.body.style.overflow = originalPageState.current.bodyOverflow;
        history.scrollRestoration = originalPageState.current.scrollRestoration;
      }
    },
    [],
  );

  const value = useMemo(
    () => ({ ...state, beginIntroExit, enterMain, markReady }),
    [state, beginIntroExit, enterMain, markReady],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("useExperience must be used within ExperienceProvider.");
  return context;
}
