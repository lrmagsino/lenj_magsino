export type KnowledgeKind =
  | "profile"
  | "internship"
  | "contact"
  | "project-index"
  | "project"
  | "skill-index"
  | "skill"
  | "education-index"
  | "education"
  | "certification-index"
  | "certification"
  | "activity"
  | "assistant";

export type LenjiPTAction = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
  purpose?:
    | "case-study"
    | "demo"
    | "repository"
    | "verification"
    | "section"
    | "contact"
    | "resume";
};

export type LenjiPTSourceReference = {
  label: string;
  href?: string;
};

export type LenjiPTResponseItem = {
  title: string;
  summary: string;
  chips?: string[];
  action?: LenjiPTAction;
};

export type LenjiPTResponseSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  chips?: string[];
  items?: LenjiPTResponseItem[];
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type LenjiPTResponse = {
  title: string;
  summary: string;
  language?: LenjiPTLanguage;
  presentation?: "conversational";
  evidenceStatus?: "portfolio-listed" | "source-reviewed";
  sections: LenjiPTResponseSection[];
  sources: LenjiPTSourceReference[];
  actions: LenjiPTAction[];
  followUps: string[];
};

export type KnowledgeItem = {
  title: string;
  summary: string;
  chips?: string[];
  action?: LenjiPTAction;
};

export type KnowledgeRecord = {
  id: string;
  kind: KnowledgeKind;
  title: string;
  summary: string;
  text: string;
  evidenceStatus?: "portfolio-listed" | "source-reviewed";
  aliases?: string[];
  keywords?: string[];
  questionExamples?: string[];
  facts?: Record<string, string>;
  features?: string[];
  technologies?: string[];
  technicalDetails?: string[];
  items?: KnowledgeItem[];
  sources?: LenjiPTSourceReference[];
  relatedProjectIds?: string[];
  actions?: LenjiPTAction[];
};

export type LenjiPTIntent =
  | "overview"
  | "projects"
  | "technology"
  | "problem"
  | "approach"
  | "role"
  | "outcome"
  | "demo"
  | "repository"
  | "navigation"
  | "skills"
  | "education"
  | "certifications"
  | "internship"
  | "contact"
  | "resume"
  | "profile"
  | "activity"
  | "comparison"
  | "conversation";

export type LenjiPTConversationIntent =
  | "greeting"
  | "farewell"
  | "gratitude"
  | "appreciation"
  | "small-talk"
  | "identity"
  | "capabilities"
  | "help";

export type LenjiPTResult = {
  status: "answer" | "unknown" | "out-of-scope" | "clarification";
  intent: LenjiPTIntent;
  language: LenjiPTLanguage;
  answer: string;
  response: LenjiPTResponse;
  actions: LenjiPTAction[];
  contextId: string | null;
  matchedId: string | null;
};

export type LenjiPTLanguage = "en" | "fil" | "taglish";

export const OUT_OF_SCOPE_RESPONSE =
  "That question is outside LenjiPT's scope. I'm designed to help you explore Lenj's portfolio, projects, technical skills, certifications, education, and development experience. Feel free to ask me about those!";

export const UNKNOWN_RESPONSE =
  "I don't have verified information about that specific detail in Lenj's portfolio yet.";
const CLARIFICATION_RESPONSE =
  "Which portfolio project or topic are you referring to? Name it and I can look up the relevant details.";

const STOP_WORDS = new Set(
  [
    "a", "an", "and", "are", "as", "at", "be", "been", "being", "but", "by",
    "can", "could", "did", "do", "does", "for", "from", "had", "has", "have",
    "he", "her", "him", "his", "i", "in", "into", "is", "it", "its", "me",
    "my", "of", "on", "or", "our", "please", "she", "so", "that", "the",
    "their", "them", "they", "this", "to", "us", "was", "we", "were", "what",
    "when", "where", "which", "who", "why", "will", "with", "would", "you",
    "your", "tell", "explain", "describe", "share", "know", "about", "more",
    "also", "how", "show", "find", "me", "ako", "alin", "ang", "ano", "anong",
    "ba", "bakit", "bang", "din", "dito", "ikaw", "ito", "iyan", "iyon",
    "kailan", "kami", "kanila", "ko", "koya", "mga", "mo", "na", "ng", "ni",
    "nina", "nito", "nila", "n'yo", "pa", "paano", "po", "sa", "si", "sila",
    "siya", "tayo", "tungkol", "ung", "yung", "maaari", "maaaring",
  ],
);

const SYNONYMS: Record<string, string> = {
  "1st": "first",
  "2nd": "second",
  "3rd": "third",
  "4th": "fourth",
  "5th": "fifth",
  available: "availability",
  experience: "role",
  experienced: "role",
  responsible: "role",
  ownership: "role",
  built: "build",
  made: "build",
  created: "build",
  developed: "build",
  development: "build",
  graduation: "education",
  graduate: "education",
  projects: "project",
  proyekto: "project",
  demos: "demo",
  demonstration: "demo",
  demonstrations: "demo",
  repositories: "repository",
  skills: "skill",
  kasanayan: "skill",
  kakayahan: "skill",
  edukasyon: "education",
  certifications: "certification",
  internships: "internship",
  degrees: "education",
  schools: "education",
  activities: "activity",
  study: "education",
  studying: "education",
  studies: "education",
  karanasan: "experience",
  gumagana: "function",
  ginagamit: "use",
  gumawa: "build",
  ginawa: "build",
  binuo: "build",
  tech: "technology",
  technologies: "technology",
  wika: "language",
  wikang: "language",
  pagprograma: "programming",
  nakatala: "list",
  nakalista: "list",
  talaan: "list",
  tools: "technology",
  stack: "technology",
  frameworks: "technology",
  libraries: "technology",
  teknolohiya: "technology",
  "teknolohiyang": "technology",
  datos: "data",
  bahagi: "component",
  bahaging: "component",
  inilathala: "published",
  nailathala: "published",
  inilabas: "released",
  inisyu: "issued",
  natututo: "trained",
  pagsasanay: "training",
  bigat: "weights",
  bilang: "metric",
  sukat: "metric",
  nasukat: "metric",
  kumpiyansa: "confidence",
  katumpakan: "accuracy",
  pagkakaayos: "layout",
  panauhin: "guest",
  bisita: "guest",
  pakikilahok: "metric",

  gamit: "technology",
  ginamit: "technology",
  "gumagamit": "use",
  "works": "function",
  "working": "function",
  "functions": "function",
  "gumana": "function",
  "problems": "problem",
  "problema": "problem",
  suliranin: "problem",
  "challenges": "problem",
  "solution": "approach",
  "solutions": "approach",
  "method": "approach",
  "methods": "approach",
  "architecture": "approach",
  "contribution": "role",
  "contributions": "role",
  ambag: "role",
  "result": "outcome",
  "results": "outcome",
  "impact": "outcome",
  accuracy: "outcome",
  accurate: "outcome",
  performance: "outcome",
  metrics: "metric",
  usage: "metric",
  downloads: "metric",
  transactions: "metric",
  conversion: "metric",
  conversions: "metric",
  attendance: "metric",
  attendees: "metric",
  "certs": "certification",
  "cert": "certification",
  certificates: "certification",
  certificate: "certification",
  credentials: "certification",
  "sertipiko": "certification",
  "sertipikasyon": "certification",
  "sertipikasyong": "certification",
  "school": "education",
  "degree": "education",
  "pagaaral": "education",
  "intern": "internship",
  "ojt": "internship",
  "resume": "resume",
  "cv": "resume",
  "portfolio": "portfolio",
  "email": "contact",
  "reach": "contact",
  "contact": "contact",
  "connect": "approach",
  "connected": "approach",
  "synchronize": "approach",
  "synchronized": "approach",
  "integration": "approach",
  "integrated": "approach",
  "paaralan": "education",
  "eskwelahan": "education",
  "aral": "education",
  "aaral": "education",
  "ginagawa": "function",
  "layunin": "problem",
  "pakay": "problem",
  "dahilan": "reason",
  "kontribusyon": "role",
  "subukan": "demo",
  "bisitahin": "demo",
  "dalawin": "demo",
  "ipakita": "view",
  "tingnan": "view",
  "ugnayan": "contact",
  "buksan": "open",
  "makita": "view",
  "saan": "where",
  "telepono": "mobile",
  "makipag": "contact",
  "karera": "career",
  "trabaho": "employment",
  "galing": "skill",
  "nagawa": "build",
  "nagagawa": "function",
  "kilos": "function",
  "paano": "approach",
  "bakit": "problem",
  "goal": "problem",
  "purpose": "problem",
  "benefit": "outcome",
  "benefits": "outcome",
  "value": "outcome",
  "responsibility": "role",
  "responsibilities": "role",
  "contributed": "role",
  "contributes": "role",
  "workflow": "approach",
  "process": "approach",
  "building": "build",
  "compare": "comparison",
  "compared": "comparison",
  "differ": "comparison",
  "between": "comparison",
  "comparisons": "comparison",
  "differences": "comparison",
  "versus": "comparison",
  "vs": "comparison",
  "authentication": "technology",
  "auth": "technology",
  "firebase": "technology",
  "trained": "train",
  "training": "train",
  "limitations": "limitation",
  "limits": "limitation",
  "gnn": "graph",
  "gat": "graph",
  "pagkakaiba": "comparison",
  "ikumpara": "comparison",
  "ihambing": "comparison",
  "aos": "project",
  "pos": "project",
  "preview": "demo",
  "simulation": "demo",
  android: "technology",
  mobile: "technology",
  application: "technology",
  applications: "technology",
  platform: "technology",
  service: "technology",
  sync: "approach",
  reminders: "approach",
  reminder: "approach",
  configure: "approach",
  itakda: "approach",
  paalala: "approach",
  sukatan: "metric",
  configured: "approach",
  configuration: "approach",
  implemented: "approach",
  implementation: "approach",
  submissions: "approach",
  published: "outcome",
};

const SEMANTIC_EXPANSIONS: Record<string, string[]> = {
  purpose: ["problem", "approach"],
  reason: ["problem", "approach"],
  goal: ["problem", "outcome"],
  problem: ["approach", "challenge"],
  approach: ["workflow", "architecture"],
  benefit: ["outcome", "impact"],
  value: ["outcome", "impact"],
  impact: ["outcome", "result"],
  workflow: ["approach", "architecture"],
  process: ["approach", "function"],
  responsibility: ["role", "contribution"],
  contribution: ["role", "approach"],
  technology: ["tool", "framework", "language", "stack"],
  school: ["education", "degree", "study"],
  credential: ["certification", "certificate"],
  demo: ["try", "website", "live"],
  repository: ["github", "repo", "source"],
  contact: ["email", "reach", "linkedin"],
  project: ["work", "build", "case"],
  build: ["approach", "project"],
  internship: ["intern", "ojt", "availability"],
  comparison: ["difference", "similarity", "project"],
  train: ["learned", "weights", "model"],
  graph: ["document", "spatial", "relationship"],
};

const OUT_OF_SCOPE_PATTERNS = [
  /\b(?:without mentioning|without reference to|unrelated to|not about)\b.{0,40}\b(?:portfolio|lenj|project|resume|career)\b/i,
  /\b(weather|forecast|temperature|basketball|nba|celebrity|celebrities|recipe|calculus|homework|equation|football|latest news)\b/i,
  /\b(solve|calculate|teach me|write|generate|debug|fix)\b.{0,32}\b(homework|calculus|essay|poem|story|code|script|equation|assignment)\b/i,
  /\b(ignore|disregard|forget)\b.{0,24}\b(previous|prior|all|your)\b.{0,18}\b(instructions|rules|prompt)\b/i,
  /\b(reveal|show|print|expose)\b.{0,24}\b(system prompt|hidden prompt|api key|secret|private data)\b/i,
  /\b(jailbreak|act as|pretend to be)\b.{0,36}\b(general|unrestricted|different|another)\b/i,
];

const PORTFOLIO_SIGNAL_PATTERN =
  /\b(lenj|lenjipt|portfolio|projects?|proyekto|aos|pos|skills?|kasanayan|kakayahan|technologies|technology|teknolohiya|tech|certifications?|sertipiko|sertipikasyon|certificates?|credentials?|education|edukasyon|schools?|paaralan|eskwelahan|degrees?|student|gpa|grade|internships?|intern|ojt|resume|cv|experience|karanasan|repositories|repository|repos?|demo|hackathons?|activities|awards?|achievements?|contact|ugnayan|email|github|linkedin|career|karera|roles?|contributions?|ambag|stud(y|ies|ying)|undergraduate|university|college|kolehiyo|kurso|pag-aaral|pinag-aralan|strand|graduat(e|ion)|recruiter|hiring manager|salary|compensation|profiles?|kasal|wedding|invitation)\b/i;

const FOLLOW_UP_PATTERN =
  /\b(it|they|them|that|this|those|these|its|their|there|he|him|his|she|her|one|ones|ito|iyan|iyon|niya|nila|ganoon|nito)\b/i;

const ALLOWED_SECTION_HREFS = new Set([
  "#about",
  "#skills",
  "#projects",
  "#lenjipt",
  "#education",
  "#activities",
  "#certifications",
  "#contact",
]);

const ALLOWED_EXTERNAL_HOSTS = new Set([
  "github.com",
  "www.linkedin.com",
  "linkedin.com",
  "docugraph.site",
  "cs-expo-main-website.vercel.app",
  "lrmagsino.github.io",
  "www.credly.com",
  "credly.com",
]);

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]s\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\bcertifcations\b/g, "certifications");
}

const FILIPINO_LANGUAGE_MARKERS = new Set([
  "ako",
  "alin",
  "ang",
  "ano",
  "anong",
  "ba",
  "bakit",
  "bang",
  "dito",
  "ginamit",
  "ginagamit",
  "kailan",
  "kamusta",
  "kami",
  "kanila",
  "ko",
  "mga",
  "mo",
  "na",
  "ng",
  "ni",
  "nito",
  "nila",
  "paalam",
  "paano",
  "po",
  "kumusta",
  "salamat",
  "sa",
  "saan",
  "sige",
  "si",
  "sila",
  "siya",
  "sino",
  "tayo",
  "yung",
]);

const TAGLISH_TERMS = new Set([
  "api",
  "app",
  "applications",
  "background",
  "backend",
  "mobile",
  "case",
  "demo",
  "degree",
  "college",
  "year",
  "start",
  "extension",
  "event",
  "experience",
  "work",
  "kinds",
  "data",
  "framework",
  "gpa",
  "internship",
  "live",
  "open",
  "program",
  "public",
  "project",
  "school",
  "student",
  "students",
  "stack",
  "system",
  "team",
  "tech",
  "programming",
  "languages",
  "listed",
  "frontend",
  "industry",
  "graduation",
  "professional",
  "proficiency",
  "query",
  "url",
  "access",
  "document",
  "layout",
  "problem",
  "trained",
  "heuristic",
  "validated",
  "accuracy",
  "percentage",
  "keyboard",
  "accessibility",
  "reduced",
  "skill",
  "skills",
  "list",
  "set",
  "technology",
  "track",
  "deadline",
  "deadlines",
  "assignment",
  "assignments",
  "certification",
  "credential",
  "configure",
  "expected",
  "issue",
  "metrics",
  "payment",
  "download",
  "course",
  "certificate",
  "certificates",
  "certifications",
  "section",
  "message",
  "score",
  "formula",
  "equation",
  "real",
  "payments",
  "sales",
  "processing",
  "current",
  "function",
  "prototype",
  "solve",
  "website",
]);

export function detectQueryLanguage(
  query: string,
  records: KnowledgeRecord[] = [],
): LenjiPTLanguage {
  const knownTitles = records
    .filter(
      (record) =>
        record.kind === "project" || record.kind === "certification",
    )
    .map((record) => normalizeText(record.title))
    .filter((title) => title.length > 3)
    .sort((left, right) => right.length - left.length);
  const normalized = knownTitles
    .reduce(
      (text, title) => text.split(title).join(" "),
      normalizeText(query),
    )
    .replace(/\s+/g, " ")
    .trim();
  if (/\btaglish\b/.test(normalized)) return "taglish";
  const words = normalized.split(" ").filter(Boolean);
  const filipinoMarkerCount = words.filter((word) =>
    FILIPINO_LANGUAGE_MARKERS.has(word),
  ).length;
  if (!filipinoMarkerCount) return "en";
  if (
    words.some((word) => TAGLISH_TERMS.has(word)) ||
    /\bano yung\b/.test(normalized) ||
    /\b(tech stack|live demo|browser extension|website)\b/.test(normalized)
  ) {
    return "taglish";
  }
  return "fil";
}

const LOCALIZED_FALLBACKS: Record<
  Exclude<LenjiPTLanguage, "en">,
  { outOfScope: string; unknown: string }
> = {
  fil: {
    outOfScope:
      "Hindi saklaw ng LenjiPT ang tanong na ito. Nakatuon ito sa portfolio ni Lenj—mga proyekto, kasanayan, sertipikasyon, edukasyon, at karanasan. Maaari kang magtanong tungkol sa mga iyon.",
    unknown:
      "Wala pang beripikadong impormasyon tungkol sa detalyeng iyon sa portfolio ni Lenj.",
  },
  taglish: {
    outOfScope:
      "Outside LenjiPT's scope ang tanong na ito. Para ito sa portfolio ni Lenj—projects, technical skills, certifications, education, at development experience. Ask me about those.",
    unknown:
      "Wala pang verified information tungkol sa detalyeng iyon sa portfolio ni Lenj.",
  },
};

const LOCALIZED_HEADINGS: Record<
  Exclude<LenjiPTLanguage, "en">,
  Record<string, string>
> = {
  fil: {
    "Technology stack": "Mga Teknolohiya",
    Technologies: "Mga Teknolohiya",
    "Problem addressed": "Problemang Tinutugunan",
    "Project focus": "Pokus ng Proyekto",
    "Implementation details": "Detalye ng Implementasyon",
    "Key features": "Mahahalagang Feature",
    Contribution: "Ambag ni Lenj",
    "Outcome and evidence": "Resulta at Ebidensya",
    "Repository status": "Kalagayan ng Repository",
    "Demo status": "Kalagayan ng Demo",
    "Demo availability": "Pagkakaroon ng Demo",
    "Repository availability": "Pagkakaroon ng Repository",
    "Featured projects": "Mga Tampok na Proyekto",
    "Education details": "Detalye ng Edukasyon",
    "Credential details": "Detalye ng Sertipikasyon",
    "How it works and its limits": "Paano Ito Gumagana at mga Limitasyon",
    "Contact options": "Mga Paraan ng Pakikipag-ugnayan",
    "Résumé availability": "Pagkakaroon ng Résumé",
    "Current availability": "Kasalukuyang Availability",
    "Related projects": "Mga Kaugnay na Proyekto",
    "At a glance": "Pangkalahatang Paghahambing",
    "Implementation comparison": "Paghahambing ng Implementasyon",
  },
  taglish: {
    "Technology stack": "Tech Stack",
    Technologies: "Technologies",
    "Problem addressed": "Problem na Tinutugunan",
    "Project focus": "Project Focus",
    "Implementation details": "Implementation Details",
    "Key features": "Key Features",
    Contribution: "Contribution ni Lenj",
    "Outcome and evidence": "Results at Evidence",
    "Repository status": "Repository Status",
    "Demo status": "Demo Status",
    "Demo availability": "Demo Availability",
    "Repository availability": "Repository Availability",
    "Featured projects": "Featured Projects",
    "Education details": "Education Details",
    "Credential details": "Credential Details",
    "How it works and its limits": "Paano Ito Gumagana at mga Limitations",
    "Contact options": "Contact Options",
    "Résumé availability": "Résumé Availability",
    "Current availability": "Current Availability",
    "Related projects": "Related Projects",
    "At a glance": "At a Glance",
    "Implementation comparison": "Implementation Comparison",
  },
};

function localizedFallback(
  status: "unknown" | "out-of-scope" | "clarification",
  language: LenjiPTLanguage,
) {
  if (language === "en") {
    if (status === "unknown") return UNKNOWN_RESPONSE;
    if (status === "clarification") return CLARIFICATION_RESPONSE;
    return OUT_OF_SCOPE_RESPONSE;
  }
  if (status === "clarification") {
    return language === "fil"
      ? "Aling proyekto o paksa sa portfolio ang tinutukoy mo? Banggitin ito para mahanap ko ang tamang detalye."
      : "Aling project o topic sa portfolio ang tinutukoy mo? Banggitin ito para mahanap ko ang relevant details.";
  }
  return LOCALIZED_FALLBACKS[language][
    status === "unknown" ? "unknown" : "outOfScope"
  ];
}

function localizedHeading(heading: string, language: LenjiPTLanguage) {
  return language === "en"
    ? heading
    : LOCALIZED_HEADINGS[language][heading] ?? heading;
}

export function tokenize(value: string) {
  return normalizeText(value)
    .split(" ")
    .filter(Boolean)
    .map((token) => SYNONYMS[token] ?? token)
    .filter((token) => !STOP_WORDS.has(token));
}

function editDistance(left: string, right: string) {
  if (left === right) return 0;
  if (Math.abs(left.length - right.length) > 2) return 3;

  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];
    for (let column = 1; column <= right.length; column += 1) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] +
          (left[row - 1] === right[column - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[right.length];
}

function tokensMatch(queryToken: string, recordToken: string) {
  if (queryToken === recordToken) return true;
  if (queryToken.length < 4 || recordToken.length < 4) return false;
  const maxDistance = Math.min(queryToken.length, recordToken.length) >= 8 ? 2 : 1;
  return editDistance(queryToken, recordToken) <= maxDistance;
}

function recordFields(record: KnowledgeRecord) {
  return {
    title: tokenize(record.title),
    aliases: tokenize((record.aliases ?? []).join(" ")),
    keywords: tokenize((record.keywords ?? []).join(" ")),
    questionExamples: tokenize((record.questionExamples ?? []).join(" ")),
    summary: tokenize(record.summary),
    text: tokenize(record.text),
  };
}

const SEARCH_FIELD_NAMES = [
  "title",
  "aliases",
  "keywords",
  "questionExamples",
  "summary",
  "text",
] as const;
type SearchFieldName = (typeof SEARCH_FIELD_NAMES)[number];
type KnowledgeSearchIndex = {
  fieldFrequencies: Array<Record<SearchFieldName, Map<string, number>>>;
  fieldLengths: Array<Record<SearchFieldName, number>>;
  averageLengths: Record<SearchFieldName, number>;
  documentFrequency: Map<string, number>;
  termsByLength: Map<number, string[]>;
};

const knowledgeSearchIndexCache = new WeakMap<
  KnowledgeRecord[],
  KnowledgeSearchIndex
>();

function getKnowledgeSearchIndex(records: KnowledgeRecord[]) {
  const cached = knowledgeSearchIndexCache.get(records);
  if (cached) return cached;

  const tokenFields = records.map(recordFields);
  const averageLengths: Record<SearchFieldName, number> = {
    title: 0,
    aliases: 0,
    keywords: 0,
    questionExamples: 0,
    summary: 0,
    text: 0,
  };
  const documentFrequency = new Map<string, number>();
  const termsByLength = new Map<number, string[]>();
  const fieldFrequencies = tokenFields.map((fields) => {
    const frequencies = {} as Record<SearchFieldName, Map<string, number>>;
    const recordTokens = new Set<string>();
    for (const fieldName of SEARCH_FIELD_NAMES) {
      const tokens = fields[fieldName];
      const termFrequencies = new Map<string, number>();
      averageLengths[fieldName] += tokens.length;
      tokens.forEach((token) => {
        termFrequencies.set(
          token,
          (termFrequencies.get(token) ?? 0) + 1,
        );
        recordTokens.add(token);
      });
      frequencies[fieldName] = termFrequencies;
    }
    recordTokens.forEach((token) => {
      documentFrequency.set(
        token,
        (documentFrequency.get(token) ?? 0) + 1,
      );
      if (!termsByLength.has(token.length)) {
        termsByLength.set(token.length, []);
      }
      termsByLength.get(token.length)?.push(token);
    });
    return frequencies;
  });
  SEARCH_FIELD_NAMES.forEach((fieldName) => {
    averageLengths[fieldName] /= Math.max(records.length, 1);
  });

  const index = {
    fieldFrequencies,
    fieldLengths: tokenFields.map((fields) => ({
      title: fields.title.length,
      aliases: fields.aliases.length,
      keywords: fields.keywords.length,
      questionExamples: fields.questionExamples.length,
      summary: fields.summary.length,
      text: fields.text.length,
    })),
    averageLengths,
    documentFrequency,
    termsByLength,
  };
  knowledgeSearchIndexCache.set(records, index);
  return index;
}

export function rankKnowledge(
  query: string,
  records: KnowledgeRecord[],
): { record: KnowledgeRecord; score: number }[] {
  const queryTokens = [...new Set(tokenize(query))];
  if (!queryTokens.length) return [];
  const queryWeights = new Map(queryTokens.map((token) => [token, 1]));
  queryTokens.forEach((token) => {
    (SEMANTIC_EXPANSIONS[token] ?? []).forEach((concept) => {
      if (!queryWeights.has(concept)) queryWeights.set(concept, 0.58);
    });
  });

  const searchIndex = getKnowledgeSearchIndex(records);
  const fuzzyMatchesByQueryTerm = new Map<string, string[]>();
  queryWeights.forEach((_, queryToken) => {
    const fuzzyTokens =
      queryToken.length < 4
        ? []
        : [
            ...(searchIndex.termsByLength.get(queryToken.length - 2) ?? []),
            ...(searchIndex.termsByLength.get(queryToken.length - 1) ?? []),
            ...(searchIndex.termsByLength.get(queryToken.length) ?? []),
            ...(searchIndex.termsByLength.get(queryToken.length + 1) ?? []),
            ...(searchIndex.termsByLength.get(queryToken.length + 2) ?? []),
          ].filter((token) => tokensMatch(queryToken, token));
    fuzzyMatchesByQueryTerm.set(queryToken, fuzzyTokens);
  });
  const fieldWeights: Record<SearchFieldName, number> = {
    title: 3.8,
    aliases: 3.5,
    keywords: 1.8,
    questionExamples: 1.5,
    summary: 1.3,
    text: 0.75,
  };

  return records
    .map((record, recordIndex) => {
      let score = 0;
      const field = searchIndex.fieldFrequencies[recordIndex];
      queryWeights.forEach((queryWeight, queryToken) => {
        const frequency = searchIndex.documentFrequency.get(queryToken) ?? 0;
        const inverseDocumentFrequency = Math.log(
          1 + (records.length - frequency + 0.5) / (frequency + 0.5),
        );
        const fuzzyTokens =
          fuzzyMatchesByQueryTerm.get(queryToken) ?? [];
        const fieldScore = SEARCH_FIELD_NAMES.reduce((total, fieldName) => {
          const termCounts = field[fieldName];
          const exactFrequency = termCounts.get(queryToken) ?? 0;
          const fuzzyFrequency = exactFrequency
            ? 0
            : fuzzyTokens.reduce(
                (sum, token) => sum + (termCounts.get(token) ?? 0),
                0,
              );
          const termFrequency = exactFrequency || fuzzyFrequency * 0.55;
          if (!termFrequency) return total;

          const averageLength = Math.max(
            searchIndex.averageLengths[fieldName],
            1,
          );
          const fieldLength = searchIndex.fieldLengths[recordIndex][fieldName];
          const normalizedFrequency =
            (termFrequency * 2.2) /
            (termFrequency +
              1.2 *
                (1 -
                  0.75 +
                  0.75 * (fieldLength / averageLength)));
          return total + fieldWeights[fieldName] * normalizedFrequency;
        }, 0);
        score += inverseDocumentFrequency * queryWeight * fieldScore;
      });

      const normalizedQuery = normalizeText(query);
      (record.aliases ?? []).forEach((alias) => {
        const normalizedAlias = normalizeText(alias);
        if (
          normalizedAlias.length > 2 &&
          normalizedQuery.includes(normalizedAlias)
        ) {
          score += normalizedAlias.includes(" ") ? 6 : 4;
        }
      });

      return {
        record,
        score: score / Math.sqrt(queryTokens.length),
      };
    })
    .sort((left, right) => right.score - left.score);
}

export function classifyIntent(query: string): LenjiPTIntent {
  const normalized = normalizeText(query);
  const tokens = tokenize(query);
  const contains = (pattern: RegExp) => pattern.test(normalized);
  const hasToken = (...values: string[]) =>
    values.some((value) => tokens.includes(value));

  const mentionsProject =
    /\b(docugraph|mayari|red warriors|cs expo|fritz|princess|wedding|invitation)\b/.test(
      normalized,
    ) || hasToken("project", "aos", "pos");
  if (
    mentionsProject &&
    (contains(/\b(tell me about|describe|overview)\b/) ||
      /^\s*what is (?:the )?(?:docugraph|mayari|red warriors|cs expo(?: 2026)?|fritz and princess)(?: project)?[?.!]*\s*$/.test(
        normalized,
      ))
  ) {
    return "overview";
  }
  if (
    (contains(
      /\b(compare|comparison|difference|differences|different|differ|differs|versus|vs)\b/,
    ) ||
      hasToken("comparison")) &&
    (mentionsProject ||
      hasToken("project") ||
      /\b(it|them|these|those|both)\b/.test(normalized))
  ) {
    return "comparison";
  }
  const asksForDestination =
    /\b(show|open|view|navigate|take me|go to|jump|find|where can i|where is|where's|saan|ipakita|dalhin|pumunta|tingnan|makita|pwede|puwede|buksan)\b/.test(
      normalized,
    ) &&
    (mentionsProject ||
      /\b(section|page|case study|write up|gallery|overview)\b/.test(
        normalized,
      )) &&
    !/\b(demo|try|live.{0,24}(?:site|website|project)|repository)\b/.test(
      normalized,
    );
  if (asksForDestination) return "navigation";
  if (hasToken("resume")) return "resume";
  if (
    contains(/\b(github|linkedin)\b/) &&
    !mentionsProject &&
    !hasToken("repository", "repo", "source", "certification", "credential")
  ) {
    return "contact";
  }
  if (contains(/\b(phone number|personal address|home address)\b/)) {
    return "contact";
  }
  if (
    hasToken("contact", "email") ||
    hasToken("profile") ||
    contains(
      /\b(reach|message|recruiter|hiring manager|get in touch|public profiles?|professional profiles?|social profiles?)\b/,
    )
  ) {
    return "contact";
  }
  if (hasToken("repository", "repo", "source") || contains(/\bgithub\b/)) {
    return "repository";
  }
  if (
    contains(/\b(firebase|authentication|authentication settings|auth settings)\b/)
  ) {
    return "technology";
  }
  if (
    contains(/\b(?:data|backend|database) platform\b|\btech stack\b/)
  ) {
    return "technology";
  }
  if (hasToken("certification", "credential")) return "certifications";
  if (
    contains(
      /\b(when|kailan|ano|what).{0,48}\b(issued|inisyu|issuance|issue date|date of issue)\b|\b(issue date|date of issue)\b/,
    )
  ) {
    return "certifications";
  }
  if (
    contains(
      /\b(how many|ilang|bilang|inilathala|count|counts|adoption|active users|user counts|metrics?|usage|downloads|transactions?|attendance|attendees|visitors|engagement|payments?|bayad|sales processing|kumpiyansa|katumpakan|sukat)\b/,
    )
  ) {
    return "outcome";
  }
  if (
    contains(/\b(form service|rsvp provider|form.{0,24}service|service.{0,24}form)\b/)
  ) {
    return "approach";
  }
  if (
    mentionsProject &&
    contains(/\b(browser simulation|browser demo|portfolio demo|live demo)\b/) &&
    contains(/\b(represent|represents|same|original|integration|connected|magkaugnay|magkakonekta)\b/)
  ) {
    return "approach";
  }
  if (
    contains(
      /\b(save|submit|persist|rsvp|naiimbak|imbak).{0,48}(response|form|answer|guest|submission|preview|sagot)?\b|\b(?:response|form|answer|sagot).{0,48}\b(?:save|submit|persist|store|naiimbak|imbak)\b|\b(accessibility|reduced motion|keyboard access|motion preference|kagustuhan sa galaw|paggamit para sa lahat)\b/,
    )
  ) {
    return "approach";
  }
  if (
    hasToken("demo", "try", "visit") ||
    contains(
      /\b(play|subukan|subukan ko|live link|browser simulation|browser demo|portfolio demo|preview|\b(?:live|public)\b.{0,40}\b(?:site|website|demo)\b)/,
    )
  ) {
    return "demo";
  }
  if (
    contains(/\b(experience|karanasan).{0,40}\b(?:android|mobile|application|app|aplikasyon|software|paggawa)\b|\b(?:android|mobile|application|app|aplikasyon|software).{0,40}\b(?:experience|karanasan)\b/)
  ) {
    return "role";
  }
  if (
    contains(/\b(responsib(?:le|ility)|ownership|owner|naiambag|nakatalag\w*|contribut\w*)\b/) ||
    hasToken("role", "contribution", "ambag", "contribute")
  ) {
    return "role";
  }
  if (
    mentionsProject &&
    contains(/\b(help|helps|support|supports|nakatutulong|tumutulong)\b/)
  ) {
    return "approach";
  }
  if (
    contains(/\b(implemented|implementation|interactions?|functionality|currently do|how .* (?:order|arrange|sort|organize)|(?:bahagi|bahaging).{0,32}(?:data|datos|canvas)|(?:data|datos|canvas).{0,32}(?:kinukuha|kumukuha))\b/) ||
    contains(/\b(?:what|which|ano|anong) .*data .* (?:retrieve|fetch|collect|kinukuha|kumukuha)\b/) ||
    contains(/\b(?:service|serbisyo).{0,32}(?:handles?|receives?|responses?|rsvp|tumatanggap|sagot)\b/)
  ) {
    return "approach";
  }
  if (
    contains(
      /\b(connect|connected|synchroni[sz]e|sync|integration|integrated|production|released|inilabas|inilathala|deployed|submit|submissions|save|persist|reminder|reminders|notifications?|configure|configuration|install(?:ing)?|access token|access details|url|set up|deadline filters?)\b/,
    )
  ) {
    return "approach";
  }
  if (
    contains(
      /\b(share|same|separate|magkaugnay|magkakonekta).{0,36}(service|backend|integration|sistema|ordering)\b|\b(?:what|which|ano|anong) .*data .* (?:retrieve|fetch|collect|kinukuha|kumukuha)\b/,
    )
  ) {
    return "approach";
  }
  if (
    contains(
      /\b(trained|training|learned weights|limitations?|weaknesses?|how .* trained|natututo|pagsasanay|bigat)\b/,
    )
  ) {
    return "approach";
  }
  if (
    hasToken(
      "education",
      "school",
      "university",
      "college",
      "degree",
      "program",
      "strand",
      "kurso",
      "kursong",
      "gpa",
      "grade",
    ) ||
    contains(/\b(before college|undergraduate|studied before|pinag aralan|magkolehiyo|kolehiyo|nag aaral)\b/)
  ) {
    return "education";
  }
  if (
    !mentionsProject &&
    ((hasToken("skill", "programming", "list", "listed") &&
      hasToken("tool", "language", "technology", "skill", "programming")) ||
      (hasToken("query", "database") && hasToken("language")) ||
      (/\b(?:ai|machine learning)\b/i.test(normalized) &&
        hasToken("tool", "list", "listed")))
  ) {
    return "skills";
  }
  if (
    hasToken("role", "contribution", "ambag", "contribute") ||
    contains(/\b(contribut\w*|what part did .* do)\b/)
  ) return "role";
  if (
    contains(/\b(payments?|sales processing|transactions?|usage figures?)\b/)
  ) {
    return "outcome";
  }
  if (
    hasToken("technology", "framework", "language", "tool") ||
    contains(/\b(tech stack|what .* built with|gamit ni|ginamit)\b/)
  ) {
    return "technology";
  }
  if (hasToken("problem", "challenge", "issue", "suliranin")) return "problem";
  if (
    contains(/\b(payments?|sales processing|transactions?|usage figures?)\b/)
  ) {
    return "outcome";
  }
  if (
    hasToken(
      "approach",
      "architecture",
      "method",
      "research",
      "workflow",
      "function",
    ) ||
    contains(
      /\b(how .* work|how .* work|paano .* gumana|how was .* built|what .* (?:do|does|implement|include|offer)|trained|training|learned weights|limitations?|weaknesses?)\b/,
    ) ||
    contains(/\b(connect|connected|synchroni[sz]e|integration|integrated|production|released|deployed)\b/) ||
    contains(/\b(aos|pos)\b.*\b(does|do|implement|work|function)\b/)
  ) {
    return "approach";
  }
  if (
    hasToken("outcome", "result", "impact", "achievement", "metric") ||
    contains(
      /\b(how many|ilang|count|counts|adoption|active users|user counts|metrics?|usage|downloads|transactions?|attendance|attendees|visitors|engagement)\b/,
    ) ||
    contains(
      /\b(different|unique|successful|improve|improvement|payments?|sales processing|transactions?|usage figures?|metrics?)\b/,
    )
  ) {
    return "outcome";
  }
  if (hasToken("internship", "availability")) return "internship";
  if (hasToken("certification", "credential")) return "certifications";
  if (hasToken("skill", "technology", "programming")) return "skills";
  if (hasToken("activity", "hackathon", "event", "paligsahan")) return "activity";
  if (
    hasToken("profile", "background", "kaligiran", "career", "student") ||
    contains(/\b(software engineering|professional background)\b/)
  ) return "profile";
  if (hasToken("project", "work", "proyekto")) return "projects";
  if (
    contains(
      /\b(show|open|view|find|navigate|take me|go to|where can i|ipakita|dalhin)\b/,
    )
  ) {
    return "navigation";
  }
  return "overview";
}

function isExplicitlyOutOfScope(query: string) {
  return OUT_OF_SCOPE_PATTERNS.some((pattern) => pattern.test(query));
}

function isPortfolioRelated(query: string, contextId?: string | null) {
  if (
    /\b(?:without mentioning|without reference to|unrelated to|not about)\b.{0,40}\b(?:portfolio|lenj|project|resume|career)\b/i.test(
      query,
    )
  ) {
    return false;
  }
  return Boolean(
    contextId &&
      hasFollowUpReference(query),
  ) ||
    PORTFOLIO_SIGNAL_PATTERN.test(query) ||
    (/\b(proficiency|skill level)\b/i.test(query) &&
      /\b(niya|his|her|lenj)\b/i.test(query)) ||
    (/\b(?:ai|machine learning)\b/i.test(query) &&
      /\b(listed|portfolio|lenj|tools?|skills?)\b/i.test(query));
}

function findMentionedRecord(query: string, records: KnowledgeRecord[]) {
  const normalizedQuery = ` ${normalizeText(query)} `;
  const exactMatch = records
    .flatMap((record) =>
      [record.title, ...(record.aliases ?? [])].map((alias) => ({
        record,
        alias: normalizeText(alias),
      })),
    )
    .filter(
      ({ alias }) =>
        alias.length > 2 && normalizedQuery.includes(` ${alias} `),
    )
    .sort((left, right) => {
      const leftIsIndex = left.record.kind.endsWith("-index");
      const rightIsIndex = right.record.kind.endsWith("-index");
      return (
        Number(leftIsIndex) - Number(rightIsIndex) ||
        right.alias.length - left.alias.length
      );
    })[0]?.record;
  if (exactMatch) return exactMatch;

  const queryTokens = tokenize(query).filter((token) => token.length >= 6);
  const fuzzyCandidates = records
    .filter((record) => record.kind === "project")
    .map((record) => {
      const titleTokens = tokenize(record.title);
      const distances = queryTokens.flatMap((queryToken) =>
        titleTokens
          .filter((titleToken) => queryToken !== titleToken)
          .map((titleToken) => editDistance(queryToken, titleToken))
          .filter(
            (distance) =>
              distance <= (queryToken.length >= 8 ? 2 : 1),
          ),
      );
      return { record, distance: Math.min(...distances) };
    })
    .filter(({ distance }) => Number.isFinite(distance))
    .sort((left, right) => left.distance - right.distance);
  if (
    fuzzyCandidates.length === 1 ||
    (fuzzyCandidates.length > 1 &&
      fuzzyCandidates[0].distance < fuzzyCandidates[1].distance)
  ) {
    return fuzzyCandidates[0].record;
  }
  return undefined;
}

function findMentionedProjects(query: string, records: KnowledgeRecord[]) {
  const normalizedQuery = ` ${normalizeText(query)} `;
  const mentioned = records
    .filter((record) => record.kind === "project")
    .map((record) => {
      const positions = [record.title, ...(record.aliases ?? [])]
        .map((alias) => normalizeText(alias))
        .filter((alias) => alias.length > 2)
        .map((alias) => ({
          position: normalizedQuery.indexOf(` ${alias} `),
          length: alias.length,
        }))
        .filter(({ position }) => position >= 0)
        .sort(
          (left, right) =>
            left.position - right.position || right.length - left.length,
        );
      return { record, position: positions[0]?.position ?? -1 };
    })
    .filter(({ position }) => position >= 0)
    .sort((left, right) => left.position - right.position)
    .map(({ record }) => record);
  const comparesRedWarriorsApps =
    /\b(aos|advanced ordering system)\b/.test(normalizedQuery) &&
    /\b(pos|point of sale)\b/.test(normalizedQuery);
  if (
    comparesRedWarriorsApps &&
    !mentioned.some((record) => record.id === "project:red-warriors")
  ) {
    const redWarriors = records.find(
      (record) => record.id === "project:red-warriors",
    );
    if (redWarriors) mentioned.push(redWarriors);
  }
  return mentioned;
}

function hasFuzzyProjectMention(query: string, records: KnowledgeRecord[]) {
  const queryTokens = tokenize(query);
  return records
    .filter((record) => record.kind === "project")
    .some((record) =>
      tokenize(record.title).some((titleToken) =>
        queryTokens.some(
          (queryToken) =>
            queryToken !== titleToken &&
            queryToken.length >= 5 &&
            tokensMatch(queryToken, titleToken),
        ),
      ),
    );
}

function hasFollowUpReference(query: string) {
  return (
    FOLLOW_UP_PATTERN.test(query) ||
    /\b(what about|how about)\b/i.test(query) ||
    /\b(previous|earlier|the other one|other project|other app|same project|the project|the demo|the app|the website|the case study)\b/i.test(
      query,
    )
  );
}

function needsContextClarification(query: string) {
  const normalized = normalizeText(query);
  return /^(?:(?:what|how|where|when|does|do|is|are|can|could|did)\s+(?:it|that|this|they|them|those|these|one)\b|(?:what|how) about (?:it|that|this|them|those|the other one|the other app|the earlier project)\b|(?:paano|ano|saan|kailan|may|pwede|puwede)\s+(?:ito|iyan|iyon|yon|niya|nila)\b|may (?:demo|live demo) ba siya\b)/.test(
    normalized,
  );
}

function resolveOrdinalReference(
  query: string,
  contextId: string | null | undefined,
  records: KnowledgeRecord[],
) {
  if (contextId?.startsWith("comparison:")) {
    const ordinal = normalizeText(query).match(
      /\b(first|second|third|1st|2nd|3rd|1|2|3)\b/,
    )?.[0];
    if (!ordinal) return null;
    const positions: Record<string, number> = {
      first: 0,
      "1st": 0,
      "1": 0,
      second: 1,
      "2nd": 1,
      "2": 1,
      third: 2,
      "3rd": 2,
      "3": 2,
    };
    const id = contextId
      .slice("comparison:".length)
      .split("|")[positions[ordinal]];
    return records.find((record) => record.id === id) ?? null;
  }

  const listKind: Record<string, KnowledgeKind> = {
    "projects-index": "project",
    "certifications-index": "certification",
    "education-index": "education",
  };
  const kind = contextId ? listKind[contextId] : undefined;
  if (!kind) return null;
  const ordinal = normalizeText(query).match(
    /\b(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|1st|2nd|3rd|4th|5th|6th|7th|8th|9th|10th|\d+(?:st|nd|rd|th))\b/,
  )?.[0];
  if (!ordinal) return null;
  const positions: Record<string, number> = {
    first: 0,
    "1st": 0,
    second: 1,
    "2nd": 1,
    third: 2,
    "3rd": 2,
    fourth: 3,
    "4th": 3,
    fifth: 4,
    "5th": 4,
    sixth: 5,
    "6th": 5,
    seventh: 6,
    "7th": 6,
    eighth: 7,
    "8th": 7,
    ninth: 8,
    "9th": 8,
    tenth: 9,
    "10th": 9,
  };
  const numericPosition = Number.parseInt(ordinal, 10);
  const position =
    positions[ordinal] ??
    (Number.isNaN(numericPosition) ? -1 : numericPosition - 1);
  return records.filter((record) => record.kind === kind)[position];
}

function resolveQuery(
  query: string,
  intent: LenjiPTIntent,
  contextId: string | null | undefined,
  records: KnowledgeRecord[],
  recentRecordIds: string[] = [],
) {
  const mentioned = findMentionedRecord(query, records);
  if (mentioned && !mentioned.kind.endsWith("-index")) return query;
  const ordinalRecord = resolveOrdinalReference(query, contextId, records);
  if (ordinalRecord) return `${query} ${ordinalRecord.title}`;
  if (!hasFollowUpReference(query)) {
    const projectContext = records.find(
      (record) => record.id === contextId && record.kind === "project",
    );
    const projectContextIntents: LenjiPTIntent[] = [
      "overview",
      "technology",
      "problem",
      "approach",
      "role",
      "outcome",
      "demo",
      "repository",
    ];
    if (
      projectContext &&
      projectContextIntents.includes(intent)
    ) {
      return `${query} ${projectContext.title}`;
    }
    return query;
  }
  const refersToPrevious =
    /\b(previous|earlier|the other one|other project)\b/i.test(query);
  const context =
    (refersToPrevious && recentRecordIds.length > 1
      ? records.find((record) => record.id === recentRecordIds[1])
      : undefined) ??
    records.find((record) => record.id === contextId) ??
    recentRecordIds
      .map((id) => records.find((record) => record.id === id))
      .find((record): record is KnowledgeRecord => Boolean(record));
  return context ? `${query} ${context.title}` : query;
}

function hasContextualProjectEvidence(
  query: string,
  contextId: string | null | undefined,
  intent: LenjiPTIntent,
  records: KnowledgeRecord[],
) {
  const project = records.find(
    (record) => record.id === contextId && record.kind === "project",
  );
  const projectIntents: LenjiPTIntent[] = [
    "overview",
    "technology",
    "problem",
    "approach",
    "role",
    "outcome",
    "demo",
    "repository",
    "navigation",
  ];
  if (!project || !projectIntents.includes(intent)) return false;
  return (rankKnowledge(query, [project])[0]?.score ?? 0) >= 0.9;
}

function chooseRecord(
  query: string,
  intent: LenjiPTIntent,
  ranking: { record: KnowledgeRecord; score: number }[],
  records: KnowledgeRecord[],
) {
  const mentioned = findMentionedRecord(query, records);
  if (intent === "certifications") {
    const normalizedQuery = normalizeText(query);
    const explicitlyNamedCredential =
      mentioned?.kind === "certification" &&
      normalizedQuery.includes(normalizeText(mentioned.title));
    if (explicitlyNamedCredential) return mentioned;

    const issuingOrganizations = records.filter(
      (record) =>
        record.kind === "certification" &&
        typeof record.facts?.issuer === "string" &&
        normalizeText(record.facts.issuer).length > 2 &&
        normalizedQuery.includes(normalizeText(record.facts.issuer)),
    );
    if (issuingOrganizations.length === 1) return issuingOrganizations[0];

    const asksForCertificationCollection =
      /\b(certifications|certificates|credentials)\b/.test(normalizedQuery) ||
      /\b(how many|ilang|ilan|all certifications|list (?:the )?certifications)\b/.test(
        normalizedQuery,
      );
    if (asksForCertificationCollection) {
      const groupRecord = ranking.find(({ record }) => {
        if (
          record.kind !== "certification-index" ||
          !record.id.startsWith("certifications-group:")
        ) {
          return false;
        }
        const aliasMatches = (record.aliases ?? []).some((alias) => {
          const normalizedAlias = normalizeText(alias);
          return (
            normalizedAlias.length > 3 &&
            normalizedQuery.includes(normalizedAlias)
          );
        });
        return aliasMatches;
      })?.record;
      if (groupRecord) return groupRecord;
      const certificationIndex = records.find(
        (record) => record.id === "certifications-index",
      );
      if (certificationIndex) return certificationIndex;
    } else {
      if (mentioned?.kind === "certification") return mentioned;
      const rankedCertification = ranking.find(
        ({ record }) => record.kind === "certification",
      )?.record;
      if (rankedCertification) return rankedCertification;
    }
  }
  if (intent === "skills") {
    const normalizedQuery = normalizeText(query);
    const asksForToolCollection =
      /\b(?:ai|machine learning).{0,32}tools?|tools?.{0,32}(?:ai|machine learning)\b/i.test(
        normalizedQuery,
      );
    const namedSkill =
      mentioned?.kind === "skill" &&
      normalizedQuery.includes(normalizeText(mentioned.title));
    const asksForSkillCollection =
      /\b(programming languages|skill list|skills listed|database query language)\b/i.test(
        normalizedQuery,
      ) || asksForToolCollection;
    if (asksForSkillCollection && (!namedSkill || asksForToolCollection)) {
      const skillIndex = records.find((record) => record.id === "skills-index");
      if (skillIndex) return skillIndex;
    }
  }
  const mentionedProject = findMentionedProjects(query, records)[0];
  if (
    mentionedProject &&
    [
      "overview",
      "technology",
      "problem",
      "approach",
      "role",
      "outcome",
      "demo",
      "repository",
      "navigation",
      "projects",
    ].includes(intent)
  ) {
    return mentionedProject;
  }
  if (mentioned) return mentioned;

  if (intent === "navigation") {
    const normalized = normalizeText(query);
    const sectionRecordId =
      /\b(certification|credential|badge|sertipiko|sertipikasyon)\b/.test(normalized)
        ? "certifications-index"
        : /\b(education|school|university|degree)\b/.test(normalized)
          ? "education-index"
          : /\b(skill|technology|technologies)\b/.test(normalized)
            ? "skills-index"
            : /\b(contact|email)\b/.test(normalized)
              ? "contact"
              : null;
    const sectionRecord = records.find(
      (record) => record.id === sectionRecordId,
    );
    if (sectionRecord) return sectionRecord;
  }

  const indexKind: Partial<Record<LenjiPTIntent, KnowledgeKind>> = {
    skills: "skill-index",
    certifications: "certification-index",
    education: "education-index",
    activity: "activity",
    profile: "profile",
    internship: "internship",
    contact: "contact",
    resume: "contact",
    projects: "project-index",
    demo: "project-index",
    repository: "project-index",
    navigation: "project-index",
  };
  const kind = indexKind[intent];
  if (kind) {
    const indexRecord = records.find((record) => record.kind === kind);
    if (indexRecord) return indexRecord;
  }
  return ranking[0]?.record;
}

function answerForRecord(
  record: KnowledgeRecord,
  intent: LenjiPTIntent,
  question = "",
) {
  const facts = record.facts ?? {};
  if (record.kind === "project") {
    if (
      facts.technologyNotes &&
      /\b(firebase|authentication|auth)\b/i.test(normalizeText(question))
    ) {
      return `${record.title}: ${facts.technologyNotes}`;
    }
    if (
      record.id === "project:docugraph" &&
      /\b(accuracy|confidence|benchmark|performance metric)\b/i.test(
        normalizeText(question),
      ) &&
      facts.researchEvidence
    ) {
      return `${record.title}: ${facts.researchEvidence}`;
    }
    const asksAboutRsvp =
      /\b(rsvp|submission|submissions|save|submit|naiimbak|imbak)\b/i.test(
        normalizeText(question),
      ) || /\bsagot.{0,32}bisita\b/i.test(normalizeText(question));
    const specificFact: Partial<Record<LenjiPTIntent, string>> = {
      technology: facts.technologies,
      problem: facts.problem,
        approach: /\b(trained|training|learned weights|graph neural network)\b/i.test(
          normalizeText(question),
        )
          ? facts.modelStatus ?? facts.approach
          : asksAboutRsvp
            ? facts.rsvpBehavior ?? facts.approach
            : facts.approach,
      role: facts.role,
        outcome: facts.outcome,
      repository: facts.repository,
      demo: facts.demo,
    };
    if (specificFact[intent]) {
      return `${record.title}: ${specificFact[intent]}`;
    }
    return [
      `${record.title} — ${record.summary}`,
      facts.role ? `Role: ${facts.role}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
  }
  if (record.kind === "skill") {
    return `${record.title} is listed in Lenj's ${facts.category ?? "technical"} skills.`;
  }
  if (record.kind === "certification") {
    const asksForCredentialId =
      /\b(credential id|credential number|certificate id|certificate number)\b/i.test(
        normalizeText(question),
      );
    return [
      `${record.title} — issued by ${facts.issuer ?? "the listed organization"}${facts.issued ? ` on ${facts.issued}` : ""}.`,
      facts.expires ? `Expiration: ${facts.expires}.` : "",
      facts.skills ? `Related skills: ${facts.skills}.` : "",
      asksForCredentialId
        ? `Credential ID: ${facts.credentialId || "not listed"}.`
        : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
  if (record.kind === "education") {
    return [
      `${record.title}: ${facts.program ?? record.summary}`,
      facts.status ? `Status: ${facts.status}.` : "",
      facts.dates ? `Dates: ${facts.dates}.` : "",
      facts.expectedGraduation
        ? `Expected graduation: ${facts.expectedGraduation}.`
        : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
  if (record.kind === "contact" && intent === "resume") {
    return facts.resume ?? UNKNOWN_RESPONSE;
  }
  if (record.kind === "project-index") {
    if (intent === "demo") {
      return facts.demo ?? record.summary;
    }
    if (intent === "repository") {
      return facts.repository ?? record.summary;
    }
    if (intent === "navigation") {
      return "Here are Lenj's featured projects. Choose a case study to explore the documented challenge, role, approach, outcome, and interactive portfolio demonstration.";
    }
  }
  return [record.summary, record.text].filter(Boolean).join("\n\n");
}

export function isSafeActionHref(href: string) {
  if (ALLOWED_SECTION_HREFS.has(href)) return true;
  if (/^\/projects\/[a-z0-9-]+$/.test(href)) return true;
  if (href === "/resume/lenj-magsino.pdf") return true;
  if (href === "/recruiter") return true;
  if (/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/.test(href)) return true;
  try {
    const url = new URL(href);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      ALLOWED_EXTERNAL_HOSTS.has(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

function actionsFor(
  record: KnowledgeRecord,
  intent: LenjiPTIntent,
): LenjiPTAction[] {
  const actions = (record.actions ?? []).filter((action) =>
    isSafeActionHref(action.href),
  );
  if (intent === "demo") {
    return actions.filter(
      (action) =>
        action.purpose === "demo" || action.purpose === "case-study",
    );
  }
  if (intent === "repository") {
    return actions.filter(
      (action) =>
        action.purpose === "repository" || action.purpose === "case-study",
    );
  }
  if (intent === "resume") {
    const resumeActions = actions.filter(
      (action) => action.purpose === "resume",
    );
    return resumeActions.length
      ? resumeActions
      : actions.filter((action) => action.purpose === "contact").slice(0, 1);
  }
  if (record.kind === "contact" && intent === "contact") {
    return actions.filter((action) => action.purpose === "contact").slice(0, 3);
  }
  return actions.slice(0, 3);
}

function fallbackResponse(
  title: string,
  summary: string,
  actions: LenjiPTAction[] = [],
  followUps: string[] = [],
  language: LenjiPTLanguage = "en",
): LenjiPTResponse {
  return {
    title,
    summary,
    language,
    sections: [],
    sources: [],
    actions,
    followUps,
  };
}

function responseSectionsForRecord(
  record: KnowledgeRecord,
  intent: LenjiPTIntent,
  records: KnowledgeRecord[],
  question: string,
): LenjiPTResponseSection[] {
  const facts = record.facts ?? {};
  if (record.kind === "project") {
    if (intent === "technology") {
      const asksAboutFirebase =
        /\b(firebase|authentication|auth)\b/.test(normalizeText(question));
      return [
        {
          heading: "Technology stack",
          chips: record.technologies ?? [],
          paragraphs:
            asksAboutFirebase && facts.technologyNotes
              ? [facts.technologyNotes]
              : [],
        },
      ];
    }
    if (intent === "problem") {
      return facts.problem
        ? [{ heading: "Problem addressed", paragraphs: [facts.problem] }]
        : [];
    }
    if (intent === "approach") {
      const normalizedQuestion = normalizeText(question);
      if (
        /\b(rsvp|submission|submissions|save|submit)\b/.test(
          normalizedQuestion,
        ) &&
        facts.rsvpBehavior
      ) {
        return [
          { heading: "Implementation details", paragraphs: [facts.rsvpBehavior] },
        ];
      }
      const relevantDetail =
        /\b(trained|training|learned weights|gnn|gat|graph)\b/.test(
          normalizedQuestion,
        ) && facts.modelStatus
          ? [facts.modelStatus]
          : /\b(baseline|cnn)\b/.test(normalizedQuestion) &&
              facts.baselineBehavior
            ? [facts.baselineBehavior]
            : /\b(accuracy|confidence|evidence|benchmark|metric)\b/.test(
                  normalizedQuestion,
                ) && facts.researchEvidence
              ? [facts.researchEvidence]
              : record.technicalDetails?.length
                ? record.technicalDetails
                : facts.approach
                  ? [facts.approach]
                  : [];
      return [
        ...(relevantDetail.length
          ? [{ heading: "Implementation details", paragraphs: relevantDetail }]
          : []),
        ...(record.features?.length
          ? [{ heading: "Key features", bullets: record.features }]
          : []),
      ];
    }
    if (intent === "role") {
      if (!facts.role) return [];
      const asksAboutDevelopmentExperience =
        /\b(experience|experienced|mobile|android|application|applications)\b/.test(
          normalizeText(question),
        );
      return [
        { heading: "Contribution", paragraphs: [facts.role] },
        ...(asksAboutDevelopmentExperience && record.technologies?.length
          ? [{ heading: "Technology stack", chips: record.technologies }]
          : []),
      ];
    }
    if (intent === "outcome") {
      return facts.outcome
        ? [{ heading: "Outcome and evidence", paragraphs: [facts.outcome] }]
        : [];
    }
    if (intent === "repository" || intent === "demo") {
      const label = intent === "repository" ? "Repository status" : "Demo status";
      const detail = intent === "repository" ? facts.repository : facts.demo;
      return detail ? [{ heading: label, paragraphs: [detail] }] : [];
    }
    return [
      ...(facts.problem
        ? [{ heading: "Project focus", paragraphs: [facts.problem] }]
        : []),
      ...(record.features?.length
        ? [{ heading: "Key features", bullets: record.features }]
        : []),
      ...(record.technologies?.length
        ? [{ heading: "Technologies", chips: record.technologies }]
        : []),
      ...(facts.role
        ? [{ heading: "Contribution", paragraphs: [facts.role] }]
        : []),
    ];
  }

  if (record.kind.endsWith("-index")) {
    if (
      record.kind === "project-index" &&
      (intent === "demo" || intent === "repository")
    ) {
      const field = intent === "demo" ? "demo" : "repository";
      const heading = intent === "demo" ? "Demo availability" : "Repository availability";
      const items = records
        .filter((item) => item.kind === "project")
        .map((item) => {
          const itemActions = actionsFor(item, intent);
          return {
            title: item.title,
            summary: item.facts?.[field] ?? item.summary,
            action:
              itemActions.find((action) => action.purpose === field) ??
              itemActions[0],
          };
        });
      return [{ heading, items }];
    }
    if (record.items?.length) {
      return [
        {
          heading: record.kind === "project-index" ? "Featured projects" : record.title,
          items: record.items,
        },
      ];
    }
    const items = records
      .filter(
        (item) =>
          (record.kind === "skill-index" && item.kind === "skill") ||
          (record.kind === "education-index" && item.kind === "education") ||
          (record.kind === "certification-index" &&
            item.kind === "certification"),
      )
      .map((item) => ({
        title: item.title,
        summary: item.summary,
        chips: item.kind === "certification" ? item.facts?.skills?.split(", ") : [],
      }));
    return items.length
      ? [{ heading: record.title, items }]
      : [{ heading: record.title, paragraphs: [record.summary] }];
  }

  if (record.kind === "skill") {
    const relatedProjects = records
      .filter(
        (item) =>
          item.kind === "project" &&
          record.relatedProjectIds?.includes(item.id.replace("project:", "")),
      )
      .map((item) => ({
        title: item.title,
        summary: item.summary,
        action: item.actions?.find((action) => action.purpose === "case-study"),
      }));
    return [
      {
        heading: facts.category ?? "Skill",
        chips: [record.title],
      },
      ...(relatedProjects.length
        ? [{ heading: "Related projects", items: relatedProjects }]
        : []),
    ];
  }
  if (record.kind === "education") {
    return [
      {
        heading: "Education details",
        paragraphs: [
          [facts.program, facts.status, facts.dates]
            .filter(Boolean)
            .join(" · "),
          ...(facts.expectedGraduation
            ? [`Expected graduation: ${facts.expectedGraduation}.`]
            : []),
        ],
      },
    ];
  }
  if (record.kind === "certification") {
    const asksForCredentialId =
      /\b(credential id|credential number|certificate id|certificate number)\b/i.test(
        normalizeText(question),
      );
    return [
      {
        heading: "Credential details",
        paragraphs: [
          `Issuer: ${facts.issuer ?? "Listed in the portfolio"}.`,
          ...(facts.issued ? [`Issued: ${facts.issued}.`] : []),
          ...(facts.expires ? [`Expiration: ${facts.expires}.`] : []),
          ...(asksForCredentialId
            ? [`Credential ID: ${facts.credentialId || "Not listed"}.`]
            : []),
        ],
        chips: facts.skills?.split(", "),
      },
    ];
  }
  if (record.kind === "assistant") {
    return [{ heading: "How it works and its limits", paragraphs: [record.text] }];
  }
  if (record.kind === "contact") {
    if (intent === "resume") {
      return [
        {
          heading: "Résumé availability",
          paragraphs: [facts.resume ?? UNKNOWN_RESPONSE],
        },
      ];
    }
    return [{ heading: "Contact options", paragraphs: [record.summary] }];
  }
  return [
    {
      heading: record.kind === "internship" ? "Current availability" : "Details",
      paragraphs: [record.text || record.summary],
    },
  ];
}

const LOCALIZED_PROJECT_OVERVIEWS: Record<
  Exclude<LenjiPTLanguage, "en">,
  Record<string, string>
> = {
  fil: {
    "project:docugraph":
      "Ang DocuGraph ay platform para sa pagsusuri ng dokumento na pinagsasama ang OCR at pag-unawa sa layout upang gawing structured digital content ang mga research document.",
    "project:mayari":
      "Ang Mayari ay Chrome extension na tumutulong mag-track ng Canvas assignments, deadlines, course updates, at class information.",
    "project:red-warriors":
      "Dalawang magkahiwalay na Android prototype ito: customer-side ordering system at canteen-side POS navigation app.",
    "project:cs-expo-2026":
      "Ang CS Expo 2026 ay event platform para sa Computer Science capstone showcase; ang production release at browser-only demos ay magkaiba ang saklaw.",
    "project:wedding":
      "Responsive digital wedding invitation ito na may personalized greeting, journey-themed visuals, story timeline, event details, at RSVP form.",
  },
  taglish: {
    "project:docugraph":
      "Ang DocuGraph ay document-analysis platform na pinagsasama ang OCR at layout understanding para gawing structured digital content ang research documents.",
    "project:mayari":
      "Ang Mayari ay Chrome extension para i-track ang Canvas assignments, deadlines, course updates, at class information sa isang dashboard.",
    "project:red-warriors":
      "Dalawang separate Android prototypes ito: customer-side ordering system at canteen-side POS navigation app.",
    "project:cs-expo-2026":
      "Ang CS Expo 2026 ay event platform para sa Computer Science capstone showcase; separate ang production release at browser-only demos.",
    "project:wedding":
      "Responsive wedding invitation website ito na may personalized greeting, journey-themed visuals, story timeline, event details, at RSVP form.",
  },
};

function localizedResponseSummary(
  record: KnowledgeRecord,
  intent: LenjiPTIntent,
  defaultSummary: string,
  language: LenjiPTLanguage,
) {
  if (language === "en") return defaultSummary;
  const isTaglish = language === "taglish";
  if (record.kind === "project") {
    if (intent === "overview") {
      return (
        LOCALIZED_PROJECT_OVERVIEWS[language][record.id] ??
        `${record.title}: ${isTaglish ? "mga documented details" : "mga dokumentadong detalye"} mula sa portfolio.`
      );
    }
    const phrases: Partial<Record<LenjiPTIntent, string>> = isTaglish
      ? {
          technology: `Tech stack ng ${record.title} ayon sa portfolio.`,
          problem: `Problem na tinutugunan ng ${record.title}.`,
          approach: `Documented implementation details ng ${record.title}.`,
          role: `Contribution ni Lenj sa ${record.title}, ayon sa portfolio.`,
          outcome: `Reported results at evidence para sa ${record.title}.`,
          demo: `Demo information para sa ${record.title}.`,
          repository: `Repository information para sa ${record.title}.`,
        }
      : {
          technology: `Mga teknolohiyang nakatala para sa ${record.title}.`,
          problem: `Problemang tinutugunan ng ${record.title}.`,
          approach: `Mga dokumentadong detalye ng implementasyon ng ${record.title}.`,
          role: `Ambag ni Lenj sa ${record.title}, ayon sa portfolio.`,
          outcome: `Mga naiulat na resulta at ebidensya para sa ${record.title}.`,
          demo: `Impormasyon tungkol sa demo ng ${record.title}.`,
          repository: `Impormasyon tungkol sa repository ng ${record.title}.`,
        };
    return phrases[intent] ?? `${record.title}: ${record.summary}`;
  }
  if (record.kind === "internship") {
    return isTaglish
      ? "Open si Lenj sa internship opportunities at software-development collaborations."
      : "Bukas si Lenj sa mga oportunidad sa internship at pakikipagtulungan sa software development.";
  }
  if (record.kind === "activity") {
    return isTaglish
      ? "Lumahok si Lenj sa 2026 ACM Developers Week Hackathon sa FEU Institute of Technology."
      : "Lumahok si Lenj sa 2026 ACM Developers Week Hackathon sa FEU Institute of Technology.";
  }
  if (record.kind === "education-index") {
    return isTaglish
      ? "Narito ang education details na nakalista sa portfolio ni Lenj."
      : "Narito ang mga detalye ng edukasyong nakalista sa portfolio ni Lenj.";
  }
  if (record.kind === "certification-index") {
    return isTaglish
      ? "Narito ang mga certification na nakalista sa portfolio ni Lenj."
      : "Narito ang mga sertipikasyong nakalista sa portfolio ni Lenj.";
  }
  return defaultSummary;
}

function responseForRecord(
  record: KnowledgeRecord,
  intent: LenjiPTIntent,
  actions: LenjiPTAction[],
  records: KnowledgeRecord[],
  question: string,
  answer: string,
  language: LenjiPTLanguage,
): LenjiPTResponse {
  const facts = record.facts ?? {};
  const summaries: Partial<Record<LenjiPTIntent, string>> = {
    technology: `Technologies listed for ${record.title}.`,
    problem: `The problem addressed by ${record.title}.`,
    approach: `Documented implementation details for ${record.title}.`,
    role: `Lenj's listed contribution to ${record.title}.`,
    outcome: `Reported outcomes and evidence for ${record.title}.`,
    demo: `Demo availability for ${record.title}.`,
    repository: `Repository availability for ${record.title}.`,
  };
  const summary =
    record.kind === "contact" && intent === "resume"
      ? facts.resume ?? answer
      : record.kind === "project-index" && intent === "demo"
        ? "Here is the documented live-demo availability for each featured project."
        : record.kind === "project-index" && intent === "repository"
          ? "Repository links are listed where the portfolio provides one."
          :           summaries[intent] ?? record.summary;
  return {
    title: record.title,
    summary: localizedResponseSummary(record, intent, summary, language),
    language,
    evidenceStatus: record.evidenceStatus,
    sections: responseSectionsForRecord(record, intent, records, question).map(
      (section) => ({
        ...section,
        heading: localizedHeading(section.heading, language),
      }),
    ),
    sources: record.sources ?? [{ label: "Portfolio knowledge records" }],
    actions,
    followUps: getSuggestions(record.id, records, language).slice(0, 3),
  };
}

function concise(value: string, maximumLength = 220) {
  const firstSentence = value.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? value;
  return firstSentence.length <= maximumLength
    ? firstSentence
    : `${firstSentence.slice(0, maximumLength - 1).trimEnd()}…`;
}

function comparisonSources(projects: KnowledgeRecord[]) {
  return projects.flatMap((project) =>
    (project.sources ?? []).map((source) => ({
      ...source,
      label: `${project.title}: ${source.label}`,
    })),
  );
}

function fallbackResult(
  status: "unknown" | "out-of-scope" | "clarification",
  intent: LenjiPTIntent,
  records: KnowledgeRecord[],
  contextId: string | null,
  language: LenjiPTLanguage,
  matchedId: string | null = null,
): LenjiPTResult {
  const isUnknown = status === "unknown";
  const title =
    language === "en"
      ? isUnknown
        ? "Not in the verified portfolio details"
        : status === "clarification"
          ? "Which topic do you mean?"
          : "Outside LenjiPT scope"
      : language === "fil"
        ? isUnknown
          ? "Wala sa Beripikadong Detalye"
          : status === "clarification"
            ? "Aling Paksa ang Tinutukoy Mo?"
            : "Hindi Saklaw ng LenjiPT"
        : isUnknown
          ? "Wala sa Verified Portfolio Details"
          : status === "clarification"
            ? "Aling Topic ang Tinutukoy Mo?"
            : "Outside LenjiPT Scope";
  const answer = localizedFallback(status, language);
  return {
    status,
    intent,
    language,
    answer,
    response: fallbackResponse(
      title,
      answer,
      [],
      getSuggestions(contextId, records, language).slice(0, 3),
      language,
    ),
    actions: [],
    contextId,
    matchedId,
  };
}

function comparisonResult(
  question: string,
  projects: KnowledgeRecord[],
  records: KnowledgeRecord[],
): LenjiPTResult {
  const language = detectQueryLanguage(question, records);
  const namedProjects = projects.slice(0, 3);
  const redWarriors = namedProjects.find(
    (project) => project.id === "project:red-warriors",
  );
  const docugraph = namedProjects.find(
    (project) => project.id === "project:docugraph",
  );
  const normalizedQuestion = ` ${normalizeText(question)} `;
  const comparesAosAndPos =
    /\b(aos|advanced ordering system)\b/.test(normalizedQuestion) &&
    /\b(pos|point of sale)\b/.test(normalizedQuestion);
  const comparesDocuGraphBaseline =
    /\b(cnn|baseline)\b/.test(normalizedQuestion) &&
    /\b(docugraph|proposed|graph)\b/.test(normalizedQuestion);
  const internalComparison:
    | {
        record: KnowledgeRecord;
        title: string;
        summary: string;
        headers: string[];
        rows: string[][];
      }
    | undefined = redWarriors &&
    redWarriors.facts?.aosBehavior &&
    redWarriors.facts?.posBehavior &&
    comparesAosAndPos
      ? {
          record: redWarriors,
          title: "Comparing Red Warriors AOS and POS",
          summary:
            language === "en"
              ? "The recovered source describes two separate Android prototypes, not one connected canteen-ordering system."
              : language === "fil"
                ? "Ayon sa source code, dalawang magkahiwalay na Android prototype ito, hindi iisang connected canteen-ordering system."
                : "Ayon sa source code, dalawang separate Android prototypes ito, hindi isang connected canteen-ordering system.",
          headers:
            language === "en"
              ? ["Prototype", "What the source implements"]
              : language === "fil"
                ? ["Prototype", "Ano ang ipinatutupad sa source"]
                : ["Prototype", "Ano ang implemented sa source"],
          rows: [
            ["AOS · customer side", redWarriors.facts.aosBehavior],
            ["POS · canteen side", redWarriors.facts.posBehavior],
          ],
        }
      : docugraph &&
          docugraph.facts?.baselineBehavior &&
          docugraph.facts?.proposedBehavior &&
          comparesDocuGraphBaseline
        ? {
            record: docugraph,
            title: "Comparing the DocuGraph baseline and proposed workflow",
            summary:
              language === "en"
                ? "The case study documents an independent CNN-only baseline alongside a separate graph-style analysis workflow."
                : language === "fil"
                  ? "Inilalarawan ng case study ang hiwalay na CNN-only baseline at ang graph-style analysis workflow."
                  : "Naka-document sa case study ang independent CNN-only baseline at hiwalay na graph-style analysis workflow.",
            headers:
              language === "en"
                ? ["System", "What the source implements"]
                : language === "fil"
                  ? ["System", "Ano ang ipinatutupad sa source"]
                  : ["System", "Ano ang implemented sa source"],
            rows: [
              ["CNN-only baseline", docugraph.facts.baselineBehavior],
              ["Proposed DocuGraph", docugraph.facts.proposedBehavior],
            ],
          }
        : undefined;
  const contextId = internalComparison
    ? internalComparison.record.id
    : namedProjects.length > 1
      ? `comparison:${namedProjects.map((project) => project.id).join("|")}`
      : "projects-index";
  const clarification =
    namedProjects.length < 2 && !internalComparison
      ? namedProjects.length === 1
        ? `Which other project should I compare with ${namedProjects[0].title}?`
        : "Which two featured projects would you like to compare?"
      : "";
  if (!internalComparison && namedProjects.length < 2) {
    return fallbackResult(
      "clarification",
      "comparison",
      records,
      namedProjects[0]?.id ?? null,
      language,
      namedProjects[0]?.id ?? null,
    );
  }
  const actions = internalComparison
    ? actionsFor(internalComparison.record, "overview")
    : namedProjects.length
      ? namedProjects.flatMap((project) =>
        actionsFor(project, "overview").filter(
          (action) =>
            action.purpose === "case-study" || action.purpose === "demo",
        ),
      )
      : [{ label: "View selected work", href: "#projects", purpose: "section" as const }];
  const response: LenjiPTResponse = internalComparison
    ? {
        title: internalComparison.title,
        summary: internalComparison.summary,
        language,
        evidenceStatus: "source-reviewed",
        sections: [
          {
            heading: localizedHeading("Implementation comparison", language),
            table: {
              headers: internalComparison.headers,
              rows: internalComparison.rows,
            },
          },
        ],
        sources: internalComparison.record.sources ?? [],
        actions,
        followUps: getSuggestions(internalComparison.record.id, records, language).slice(0, 3),
      }
    : namedProjects.length > 1
      ? {
          title: `Comparing ${namedProjects.map((project) => project.title).join(" and ")}`,
          summary:
            language === "en"
              ? "This is a descriptive comparison of documented project scope, not a measured performance benchmark."
              : language === "fil"
                ? "Paglalarawang paghahambing ito ng dokumentadong saklaw ng mga proyekto, hindi performance benchmark."
                : "Descriptive comparison ito ng documented project scope, hindi measured performance benchmark.",
          language,
          evidenceStatus: "source-reviewed",
          sections: [
            {
              heading: localizedHeading("At a glance", language),
              table: {
                headers:
                  language === "en"
                    ? ["Project", "Focus", "Verified implementation"]
                    : language === "fil"
                      ? ["Proyekto", "Pokus", "Beripikadong implementasyon"]
                      : ["Project", "Focus", "Verified Implementation"],
                rows: namedProjects.map((project) => [
                  project.title,
                  concise(project.facts?.problem ?? project.summary),
                  concise(project.facts?.approach ?? project.summary),
                ]),
              },
            },
          ],
          sources: comparisonSources(namedProjects),
          actions,
          followUps: getSuggestions(contextId, records, language).slice(0, 3),
        }
        : {
          ...fallbackResponse(
            "Compare featured projects",
            clarification,
            actions,
            getSuggestions("projects-index", records, language).slice(0, 3),
            language,
          ),
          sources: comparisonSources(namedProjects),
        };
  return {
    status: "answer",
    intent: "comparison",
    language,
    answer:
      namedProjects.length > 1 || internalComparison
        ? response.summary
        : clarification,
    response,
    actions,
    contextId,
    matchedId: internalComparison?.record.id ?? namedProjects[0]?.id ?? null,
  };
}

function detectConversationIntent(
  question: string,
): LenjiPTConversationIntent | null {
  const normalized = normalizeText(question);
  if (
    /^(?:(?:hello|hi|hey)(?: there)?(?: po)?|good morning|good afternoon|good evening|kamusta(?: ka)?|kumusta(?: ka)?|thanks?|thank you|salamat(?: po)?) (?:how are you|how it going|what up|kumusta(?: ka)?)$/.test(
      normalized,
    )
  ) {
    return "small-talk";
  }
  if (
    /^(?:hello|hi|hey|yo|sup)(?: there)?(?: po)?$/.test(normalized) ||
    /^(?:good morning|good afternoon|good evening)$/.test(normalized) ||
    /^(?:kamusta|kumusta)(?: ka)?(?: po)?$/.test(normalized)
  ) {
    return "greeting";
  }
  if (
    /^(?:bye|bye for now|goodbye|see you|see ya|talk later|paalam)$/.test(
      normalized,
    )
  ) {
    return "farewell";
  }
  if (
    /^(?:thanks?|thank you|thank you so much|thanks a lot|many thanks|salamat|salamat po|maraming salamat)$/.test(
      normalized,
    )
  ) {
    return "gratitude";
  }
  if (
    /^(?:nice|cool|great|awesome|perfect|okay|ok|sige|ang galing|mahusay|nice to meet you)$/.test(
      normalized,
    )
  ) {
    return "appreciation";
  }
  if (
    /^(?:who are you|what are you|what is your name|what your name|whats your name|your name|are you an ai|are you ai|are you a bot|are you chatgpt|are you real|are you a real person|are you human|are you a human|is this a real person)$/.test(
      normalized,
    )
  ) {
    return "identity";
  }
  if (
    /^(?:what can you do|what do you do|what is your purpose|what your purpose|what are you for|how can you help|can you help(?: me)?|help me|ano ang kaya mong gawin|paano ka makakatulong)$/.test(
      normalized,
    )
  ) {
    return "capabilities";
  }
  if (
    /^(?:how are you|how are things|how is your day|how your day|hows your day|how is it going|how it going|hows it going|what is up|what up|whats up|how have you been)$/.test(
      normalized,
    )
  ) {
    return "small-talk";
  }
  if (/^(?:im|i am|i m) (?:good|great|fine|doing well)(?: how are you)?$/.test(normalized)) {
    return "small-talk";
  }
  return null;
}

function conversationalReply(
  intent: LenjiPTConversationIntent,
  question: string,
  language: LenjiPTLanguage,
  conversationTurn: number,
): string {
  const normalized = normalizeText(question);
  if (intent === "greeting") {
    const timeOfDay =
      normalized === "good morning"
        ? language === "fil"
          ? "Magandang umaga!"
          : "Good morning!"
        : normalized === "good afternoon"
          ? language === "fil"
            ? "Magandang hapon!"
            : "Good afternoon!"
          : normalized === "good evening"
            ? language === "fil"
              ? "Magandang gabi!"
              : "Good evening!"
            : null;
    if (timeOfDay) {
      return language === "taglish"
        ? `${timeOfDay} 👋 Gusto mo bang mag-explore ng projects o magtanong tungkol sa portfolio ni Lenj?`
        : language === "fil"
          ? `${timeOfDay} 👋 Ano ang gusto mong malaman tungkol sa portfolio ni Lenj?`
          : `${timeOfDay} 👋 What would you like to explore in Lenj’s portfolio?`;
    }
    const replies = {
      en: [
        "Hi there! 👋 I’m LenjiPT. What would you like to explore in Lenj’s portfolio?",
        "Hello! 👋 I can help you explore Lenj’s projects, skills, and experience. What are you curious about?",
        "Hey! 👋 Ask me about Lenj’s projects, education, skills, or certifications.",
      ],
      fil: [
        "Kamusta! 👋 Ako si LenjiPT. Ano ang gusto mong malaman tungkol sa portfolio ni Lenj?",
        "Hello! 👋 Matutulungan kitang alamin ang tungkol sa mga proyekto, kasanayan, at karanasan ni Lenj.",
        "Hi! 👋 Magtanong ka tungkol sa mga proyekto, edukasyon, kasanayan, o sertipikasyon ni Lenj.",
      ],
      taglish: [
        "Hi! 👋 Ako si LenjiPT. Anong gusto mong i-explore sa portfolio ni Lenj?",
        "Hello! 👋 I can help you explore Lenj’s projects, skills, and experience. Ano’ng curious kang malaman?",
        "Hey! 👋 Ask me about Lenj’s projects, education, skills, or certifications.",
      ],
    };
    const variants = replies[language];
    return variants[Math.abs(conversationTurn) % variants.length];
  }

  if (intent === "farewell") {
    return language === "fil"
      ? "Paalam! Salamat sa pagbisita sa portfolio ni Lenj. 👋"
      : language === "taglish"
        ? "Bye! Salamat sa pag-explore ng portfolio ni Lenj. 👋"
        : "Goodbye! Thanks for exploring Lenj’s portfolio. 👋";
  }
  if (intent === "gratitude") {
    return language === "fil"
      ? "Walang anuman! Sabihin mo lang kung may iba ka pang gustong malaman."
      : language === "taglish"
        ? "You’re welcome! Sabihin mo lang kung may iba ka pang gustong malaman."
        : "You’re welcome! Let me know what else you’d like to know.";
  }
  if (intent === "appreciation") {
    return language === "fil"
      ? "Salamat! Ano pa ang gusto mong malaman tungkol sa portfolio ni Lenj?"
      : language === "taglish"
        ? "Thanks! Ano pa ang gusto mong i-explore sa portfolio ni Lenj?"
        : "Thanks! What else would you like to explore in Lenj’s portfolio?";
  }
  if (intent === "small-talk") {
    return language === "fil"
      ? "Handa akong tumulong sa pag-explore ng portfolio ni Lenj. Ano ang gusto mong malaman?"
      : language === "taglish"
        ? "I’m ready to help you explore Lenj’s portfolio. Ano’ng gusto mong malaman?"
        : "I’m here and ready to help you explore Lenj’s portfolio. What would you like to know?";
  }
  if (intent === "capabilities" || intent === "help") {
    return language === "fil"
      ? "Makakasagot ako tungkol sa mga proyekto, teknolohiya, kasanayan, edukasyon, sertipikasyon, at karanasan ni Lenj. Kung may detalyeng hindi nakatala, sasabihin ko iyon."
      : language === "taglish"
        ? "I can help with Lenj’s projects, tech, skills, education, certifications, and experience. Kapag walang verified detail, sasabihin ko rin."
        : "I can help with Lenj’s projects, technologies, skills, education, certifications, and experience. If a detail isn’t documented, I’ll say so.";
  }
  if (intent === "identity") {
    if (/^(?:are you an ai|are you ai|are you a bot|are you chatgpt|are you real|are you a real person|are you human|are you a human|is this a real person)$/.test(normalized)) {
      return language === "fil"
        ? "Ako si LenjiPT, isang digital assistant para sa portfolio ni Lenj—hindi ako tao. Gumagamit ako ng lokal na paghahanap sa impormasyong nakatala sa portfolio."
        : language === "taglish"
          ? "I’m LenjiPT, a digital portfolio assistant—not a person. Local retrieval ang gamit ko para maghanap sa documented portfolio info."
          : "I’m LenjiPT, a digital portfolio assistant—not a person. I use local retrieval over information documented in Lenj’s portfolio.";
    }
    return language === "fil"
      ? "Ako si LenjiPT, ang portfolio assistant ni Lenj. Maaari kang magtanong tungkol sa kanyang mga proyekto, kasanayan, at karanasan."
      : language === "taglish"
        ? "I’m LenjiPT, Lenj’s portfolio assistant. Ask me about his projects, skills, education, or experience."
        : "I’m LenjiPT, Lenj’s portfolio assistant. Ask me about his projects, skills, education, or experience.";
  }
  return "";
}

function conversationalResult(
  question: string,
  intent: LenjiPTConversationIntent,
  records: KnowledgeRecord[],
  contextId: string | null,
  recentRecordIds: string[],
  conversationTurn: number,
): LenjiPTResult {
  const language = detectQueryLanguage(question, records);
  const activeContextId = contextId ?? recentRecordIds[0] ?? null;
  const answer = conversationalReply(
    intent,
    question,
    language,
    conversationTurn,
  );
  return {
    status: "answer",
    intent: "conversation",
    language,
    answer,
    response: {
      title: "LenjiPT",
      summary: answer,
      language,
      presentation: "conversational",
      sections: [],
      sources: [],
      actions: [],
      followUps: [],
    },
    actions: [],
    contextId: activeContextId,
    matchedId: null,
  };
}

function mixedQuestionPrefix(question: string) {
  const patterns = [
    /^(?:hello(?:\s+there)?|hi(?:\s+there)?|hey|yo|sup|good morning|good afternoon|good evening|kamusta(?:\s+ka)?|kumusta(?:\s+ka)?|thank you(?:\s+so much)?|thanks|many thanks|salamat(?:\s+po)?|how are you|how(?:['’]s| is)\s+it going|what(?:['’]s| is)\s+up)[\s,!.?;:—-]+/i,
  ];
  let remainder = question.trim();
  let firstPrefix = "";
  for (let count = 0; count < 3; count += 1) {
    const match = patterns[0].exec(remainder);
    if (!match) break;
    firstPrefix ||= match[0].trim();
    remainder = remainder.slice(match[0].length).trim();
  }
  return remainder && firstPrefix ? { prefix: firstPrefix, question: remainder } : null;
}

function mixedAcknowledgment(
  prefix: string,
  language: LenjiPTLanguage,
  conversationTurn: number,
) {
  const normalized = normalizeText(prefix);
  if (/\b(thanks?|thank you|many thanks|salamat)\b/.test(normalized)) {
    return language === "fil"
      ? "Walang anuman! "
      : language === "taglish"
        ? "You’re welcome! "
        : "You’re welcome! ";
  }
  if (/^(?:good morning|good afternoon|good evening)/.test(normalized)) {
    const greeting = normalized.startsWith("good morning")
      ? language === "fil"
        ? "Magandang umaga!"
        : "Good morning!"
      : normalized.startsWith("good afternoon")
        ? language === "fil"
          ? "Magandang hapon!"
          : "Good afternoon!"
        : language === "fil"
          ? "Magandang gabi!"
          : "Good evening!";
    return `${greeting} `;
  }
  const variants = {
    en: ["Hi! ", "Hello! ", "Hey! "],
    fil: ["Kamusta! ", "Hello! ", "Hi! "],
    taglish: ["Hi! ", "Hello! ", "Hey! "],
  };
  const choices = variants[language];
  return choices[Math.abs(conversationTurn) % choices.length];
}

export function answerPortfolioQuestion(
  question: string,
  records: KnowledgeRecord[],
  contextId: string | null = null,
  recentRecordIds: string[] = [],
  conversationTurn = 0,
): LenjiPTResult {
  const trimmedQuestion = question.trim().slice(0, 500);
  if (!trimmedQuestion) {
    return answerPortfolioQuestionCore(
      trimmedQuestion,
      records,
      contextId,
      recentRecordIds,
    );
  }

  const conversationIntent = detectConversationIntent(trimmedQuestion);
  if (conversationIntent) {
    return conversationalResult(
      trimmedQuestion,
      conversationIntent,
      records,
      contextId,
      recentRecordIds,
      conversationTurn,
    );
  }

  const prefix = mixedQuestionPrefix(trimmedQuestion);
  if (prefix) {
    const result = answerPortfolioQuestionCore(
      prefix.question,
      records,
      contextId,
      recentRecordIds,
    );
    const acknowledgment = mixedAcknowledgment(
      prefix.prefix,
      result.language,
      conversationTurn,
    );
    return {
      ...result,
      answer: `${acknowledgment}${result.answer}`,
      response: {
        ...result.response,
        summary: `${acknowledgment}${result.response.summary}`,
      },
    };
  }

  return answerPortfolioQuestionCore(
    trimmedQuestion,
    records,
    contextId,
    recentRecordIds,
  );
}

function answerPortfolioQuestionCore(
  question: string,
  records: KnowledgeRecord[],
  contextId: string | null = null,
  recentRecordIds: string[] = [],
): LenjiPTResult {
  const trimmedQuestion = question.trim().slice(0, 500);
  const intent = classifyIntent(trimmedQuestion);
  const language = detectQueryLanguage(trimmedQuestion, records);
  const activeContextId = contextId ?? recentRecordIds[0] ?? null;
  const mentionedRecord = findMentionedRecord(trimmedQuestion, records);
  if (!trimmedQuestion) {
    return fallbackResult(
      "out-of-scope",
      intent,
      records,
      activeContextId,
      language,
    );
  }
  if (
    isExplicitlyOutOfScope(trimmedQuestion) &&
    !mentionedRecord &&
    !findMentionedProjects(trimmedQuestion, records).length &&
    !isPortfolioRelated(trimmedQuestion, activeContextId)
  ) {
    return fallbackResult(
      "out-of-scope",
      intent,
      records,
      activeContextId,
      language,
    );
  }
  if (
    !activeContextId &&
    needsContextClarification(trimmedQuestion) &&
    !mentionedRecord
  ) {
    return fallbackResult(
      "clarification",
      intent,
      records,
      null,
      language,
    );
  }

  if (
    /\b(proficien(?:t|cy)|skill level|gaano kahusay)\b/i.test(
      trimmedQuestion,
    ) &&
    !findMentionedProjects(trimmedQuestion, records).length
  ) {
    return fallbackResult(
      "unknown",
      intent,
      records,
      activeContextId,
      language,
      "skills-index",
    );
  }

  if (intent === "comparison") {
    let mentionedProjects = findMentionedProjects(trimmedQuestion, records);
    if (
      !mentionedProjects.length &&
      activeContextId?.startsWith("comparison:")
    ) {
      mentionedProjects = activeContextId
        .slice("comparison:".length)
        .split("|")
        .map((id) => records.find((record) => record.id === id))
        .filter((record): record is KnowledgeRecord => Boolean(record));
    } else if (!mentionedProjects.length) {
      const contextualProject = records.find(
        (record) => record.id === activeContextId && record.kind === "project",
      );
      if (contextualProject) mentionedProjects = [contextualProject];
    } else if (mentionedProjects.length === 1 && activeContextId) {
      const contextualProject = records.find(
        (record) => record.id === activeContextId && record.kind === "project",
      );
      if (
        contextualProject &&
        contextualProject.id !== mentionedProjects[0].id
      ) {
        mentionedProjects = [contextualProject, ...mentionedProjects];
      }
    }
    if (
      mentionedProjects.length ||
      isPortfolioRelated(trimmedQuestion, activeContextId)
    ) {
      return comparisonResult(
        `${trimmedQuestion} ${mentionedProjects
          .map((project) => project.title)
          .join(" ")}`,
        mentionedProjects,
        records,
      );
    }
    return fallbackResult(
      "out-of-scope",
      intent,
      records,
      activeContextId,
      language,
    );
  }

  const resolvedQuery = resolveQuery(
    trimmedQuestion,
    intent,
    activeContextId,
    records,
    recentRecordIds,
  );
  const ranking = rankKnowledge(resolvedQuery, records);
  const selected = chooseRecord(resolvedQuery, intent, ranking, records);
  const mentioned = findMentionedRecord(trimmedQuestion, records);
  const selectedScore =
    ranking.find(({ record }) => record.id === selected?.id)?.score ?? 0;
  const hasNamedPortfolioRecord = Boolean(
    mentioned &&
      [
        "project",
        "education",
        "certification",
        "activity",
        "internship",
        "contact",
        "assistant",
      ].includes(mentioned.kind),
  );
  const hasTopicSignal =
    isPortfolioRelated(trimmedQuestion, activeContextId) ||
    hasNamedPortfolioRecord ||
    /\b(docu ?graph|mayari|red warriors|cs expo|fritz|princess|wedding)\b/i.test(
      trimmedQuestion,
    ) ||
    hasFuzzyProjectMention(trimmedQuestion, records) ||
    hasContextualProjectEvidence(
      trimmedQuestion,
      activeContextId,
      intent,
      records,
    );

  if (!hasTopicSignal) {
    return fallbackResult(
      "out-of-scope",
      intent,
      records,
      activeContextId,
      language,
    );
  }

  if (
    !selected ||
    (selectedScore < 0.8 &&
      !mentioned &&
      !selected.kind.endsWith("-index"))
  ) {
    return fallbackResult(
      "unknown",
      intent,
      records,
      activeContextId,
      language,
      selected?.id ?? null,
    );
  }

  if (
    /\b(gpa|grade point average|salary|age|old|birthday|date of birth|home address|phone number|personal address|personal phone number|awards?|teammates?|team members|team size|collaborators?|professional employment|professional work experience|work experience|employment experience|employment history|employment dates|work history|years of professional experience|nagtatrabaho|career path|target industry|industry.{0,48}(?:plan|target|want|speciali[sz]|work)|(?:plan|target|want|speciali[sz]).{0,48}industry|industriya.{0,48}(?:trabaho|gustong)|specialize after graduation|proficien(?:t|cy)|proficient|skill level|gaano kahusay|karanasan.{0,32}trabaho|graduation month|graduation term|exact graduation date|start date|available date|next month)\b/i.test(
      trimmedQuestion,
    )
  ) {
    return fallbackResult(
      "unknown",
      intent,
      records,
      activeContextId,
      language,
      selected.id,
    );
  }

  const answer = answerForRecord(selected, intent, trimmedQuestion);
  const actions = actionsFor(selected, intent);
  return {
    status: "answer",
    intent,
    language,
    answer,
    response: responseForRecord(
      selected,
      intent,
      actions,
      records,
      trimmedQuestion,
      answer,
      language,
    ),
    actions,
    contextId: selected.id,
    matchedId: selected.id,
  };
}

export function getSuggestions(
  contextId: string | null,
  records: KnowledgeRecord[],
  language: LenjiPTLanguage = "en",
) {
  if (language !== "en") {
    const taglish = language === "taglish";
    const project = records.find(
      (record) => record.id === contextId && record.kind === "project",
    );
    if (project) {
      return taglish
        ? [
            `Anong problem ang sinosolve ng ${project.title}?`,
            `Ano yung tech stack ng ${project.title}?`,
            `May live demo ba ang ${project.title}?`,
          ]
        : [
            `Anong problema ang tinutugunan ng ${project.title}?`,
            `Anong mga teknolohiya ang ginamit sa ${project.title}?`,
            `May live demo ba ang ${project.title}?`,
          ];
    }
    if (contextId === "certifications-index") {
      return taglish
        ? ["Anong AI certifications ang meron si Lenj?", "Ano ang issue date ng PMI certification?"]
        : ["Anong AI certifications ang mayroon si Lenj?", "Kailan inisyu ang PMI certification?"];
    }
    if (contextId === "education-index") {
      return taglish
        ? ["Ano ang current degree program ni Lenj?", "Kailan siya inaasahang mag-graduate?"]
        : ["Ano ang programang pinag-aaralan ni Lenj?", "Kailan siya inaasahang magtatapos?"];
    }
    return taglish
      ? ["Ano ang DocuGraph?", "Ano yung tech stack ni Lenj?", "Open ba si Lenj sa internship?"]
      : ["Ano ang DocuGraph?", "Anong mga teknolohiya ang gamit ni Lenj?", "Bukas ba si Lenj sa internship?"];
  }

  const projectSuggestions: Record<string, string[]> = {
    "project:docugraph": [
      "How does DocuGraph's CNN-only baseline compare with its proposed workflow?",
      "Does DocuGraph use a trained graph neural network?",
      "Are the reported percentages validated accuracy?",
      "Can I try the DocuGraph demo?",
    ],
    "project:mayari": [
      "How does Mayari sync Canvas assignments?",
      "What reminders and course features does Mayari include?",
      "What do I need to configure to use Mayari?",
      "Can I try the Mayari demo?",
    ],
    "project:red-warriors": [
      "What does the AOS prototype actually implement?",
      "Are the AOS and POS apps connected?",
      "Does Red Warriors submit real orders or payments?",
      "Can I try the Red Warriors demonstration?",
    ],
    "project:cs-expo-2026": [
      "What was Lenj's contribution to CS Expo?",
      "Which CS Expo features are in production?",
      "Which sections are browser-only demos?",
      "Can I view the CS Expo website?",
    ],
    "project:wedding": [
      "How does the wedding invitation work?",
      "How does the wedding RSVP work?",
      "Does the portfolio wedding demo submit an RSVP?",
      "What accessibility and motion features are documented?",
    ],
  };
  if (contextId?.startsWith("comparison:")) {
    const titles = contextId
      .slice("comparison:".length)
      .split("|")
      .map((id) => records.find((record) => record.id === id)?.title)
      .filter((title): title is string => Boolean(title));
    if (titles.length > 1) {
      return [
        `What problem does ${titles[0]} address?`,
        `What does ${titles[1]} implement?`,
        `Compare the technologies used in ${titles[0]} and ${titles[1]}.`,
      ];
    }
  }
  const contextual = contextId ? projectSuggestions[contextId] : undefined;
  if (contextual) return contextual;
  if (contextId === "projects-index") {
    return [
      "Which project did Lenj lead?",
      "What is Mayari?",
      "How does DocuGraph analyze documents?",
      "Can I view the live project demos?",
    ];
  }
  if (contextId === "certifications-index") {
    return [
      "What AI certifications does Lenj have?",
      "Which SAP certifications are listed?",
      "What is Lenj's most recent certification?",
    ];
  }
  if (contextId === "education-index") {
    return [
      "What is Lenj studying?",
      "When does Lenj expect to graduate?",
      "What school did Lenj attend before college?",
    ];
  }
  const context = records.find((record) => record.id === contextId);
  if (context?.kind === "assistant") {
    return [
      "How does local portfolio retrieval work?",
      "Does LenjiPT send questions to an AI provider?",
      "What can LenjiPT not answer?",
    ];
  }
  if (context?.kind === "certification") {
    return [
      `What skills does ${context.title} cover?`,
      "What other AI certifications does Lenj have?",
      "How can I view the full certification list?",
    ];
  }
  return [
    "What is DocuGraph?",
    "What technologies does Lenj use?",
    "Tell me about Red Warriors AOS & POS.",
    "What certifications does Lenj have?",
    "Is Lenj available for an internship?",
    "How can I contact Lenj?",
  ];
}

export function getAutocompleteSuggestions(
  value: string,
  suggestions: string[],
  records: KnowledgeRecord[],
  language: LenjiPTLanguage = "en",
) {
  const normalizedValue = normalizeText(value);
  if (normalizedValue.length < 3) return [];
  const exactMatches = suggestions.filter((suggestion) =>
    normalizeText(suggestion).includes(normalizedValue),
  );
  const queryTokens = new Set(tokenize(value));
  const knowledgeMatches = records
    .flatMap((record) => [record.title, ...(record.aliases ?? [])])
    .filter((title) => {
      const titleTokens = tokenize(title);
      return (
        titleTokens.length > 0 &&
        [...queryTokens].some((queryToken) =>
          titleTokens.some((titleToken) => tokensMatch(queryToken, titleToken)),
        )
      );
    })
    .map((title) =>
      language === "fil" ? `Ikuwento ang ${title}` : `Tell me about ${title}`,
    );
  return [...new Set([...exactMatches, ...knowledgeMatches])].slice(0, 3);
}
