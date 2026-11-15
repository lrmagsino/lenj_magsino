import type { LenjiPTIntent } from "@/lib/lenjiptCore";

export function getLenjiPTPresentationDelay(
  question: string,
  intent: LenjiPTIntent,
  reducedMotion = false,
) {
  if (reducedMotion) return 0;
  if (intent === "conversation") return 450;

  const normalized = question.toLowerCase();
  const hasTechnicalDetail =
    /\b(?:architecture|algorithm|implementation|technology|technologies|tech stack|workflow|integration|model|database|api|accuracy|system)\b/.test(
      normalized,
    );
  const hasMultipleParts =
    /\b(?:and|also|plus|as well as|pati|tsaka|compare|versus|vs)\b/.test(
      normalized,
    );
  if (hasTechnicalDetail && hasMultipleParts) return 5000;

  const length = question.trim().length;
  if (length <= 40) return 3000;
  if (length <= 120) return 4000;
  return 5000;
}
