const RETURN_STATE_KEY = "portfolio:case-study-return";
const RETURN_PENDING_KEY = "portfolio:case-study-return-pending";

export type PortfolioReturnState = {
  version: 1;
  projectId: string;
  scrollY: number;
};

export function savePortfolioReturn(projectId: string) {
  const state: PortfolioReturnState = {
    version: 1,
    projectId,
    scrollY: window.scrollY,
  };
  sessionStorage.setItem(RETURN_STATE_KEY, JSON.stringify(state));
  sessionStorage.setItem(RETURN_PENDING_KEY, "1");
}

export function readPortfolioReturn(): PortfolioReturnState | null {
  const raw = sessionStorage.getItem(RETURN_STATE_KEY);
  if (!raw) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.error("Unable to read the saved portfolio return state.", error);
    sessionStorage.removeItem(RETURN_STATE_KEY);
    return null;
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("version" in parsed) ||
    parsed.version !== 1 ||
    !("projectId" in parsed) ||
    typeof parsed.projectId !== "string" ||
    !("scrollY" in parsed) ||
    typeof parsed.scrollY !== "number" ||
    !Number.isFinite(parsed.scrollY) ||
    parsed.scrollY < 0
  ) {
    sessionStorage.removeItem(RETURN_STATE_KEY);
    return null;
  }

  return {
    version: 1,
    projectId: parsed.projectId,
    scrollY: parsed.scrollY,
  };
}

export function consumePortfolioReturnMarker() {
  const pending = sessionStorage.getItem(RETURN_PENDING_KEY) === "1";
  sessionStorage.removeItem(RETURN_PENDING_KEY);
  return pending && readPortfolioReturn() !== null;
}

export function hasPendingPortfolioReturn(projectId: string) {
  return (
    sessionStorage.getItem(RETURN_PENDING_KEY) === "1" &&
    readPortfolioReturn()?.projectId === projectId
  );
}

export function clearPortfolioReturn() {
  sessionStorage.removeItem(RETURN_STATE_KEY);
  sessionStorage.removeItem(RETURN_PENDING_KEY);
}
