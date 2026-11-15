import { certifications } from "./certifications.ts";
import { links, profile, projects, skills } from "./content.ts";
import { education } from "./education.ts";
import type { KnowledgeRecord, LenjiPTAction } from "./lenjiptCore.ts";
import {
  projectEngineeringFact,
  projectEngineeringNotes,
} from "./projectEngineeringNotes.ts";

const projectAliases: Record<string, string[]> = {
  docugraph: [
    "docu graph",
    "document analysis",
    "document layout analysis",
    "ocr research project",
    "cnn gnn",
    "graph attention network",
    "graph based document analysis",
  ],
  mayari: [
    "canvas lms",
    "assignment tracker",
    "deadline tracker",
    "study companion",
    "canvas extension",
    "chrome extension",
  ],
  "red-warriors": [
    "red warriors aos",
    "red warriors pos",
    "android",
    "android work",
    "mobile work",
    "mobile app",
    "mobile apps",
    "mobile applications",
    "android app",
    "android applications",
    "android development",
    "advanced ordering system",
    "point of sale",
    "canteen ordering",
    "canteen operations",
    "android ordering prototype",
    "customer ordering app",
    "customer ordering system",
    "canteen operator app",
    "canteen operator apps",
    "operator side app",
    "two separate android apps",
  ],
  "cs-expo-2026": [
    "cs expo",
    "mission tomorrow",
    "computer science showcase",
    "capstone showcase",
    "event platform",
  ],
  wedding: [
    "fritz and princess",
    "fritz princess",
    "fritz",
    "princess",
    "invitation",
    "kasal",
    "wedding",
    "wedding website",
    "wedding invitation",
    "digital invitation",
    "imbitasyon sa kasal",
    "paanyaya sa kasal",
  ],
};

function relatedProjectIdsForSkill(skill: string) {
  const normalizedSkill = skill.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  return projects
    .filter((project) =>
      project.stack.some((technology) =>
        technology
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, " ")
          .trim()
          .includes(normalizedSkill),
      ),
    )
    .map((project) => project.id);
}

const sectionAction = (
  label: string,
  href: string,
): LenjiPTAction => ({ label, href, purpose: "section" });

function projectActions(
  project: (typeof projects)[number],
): LenjiPTAction[] {
  const actions: LenjiPTAction[] = [
    {
      label: `Explore ${project.name}`,
      href: `/projects/${project.id}`,
      purpose: "case-study",
    },
  ];
  if (project.demo) {
    actions.push({
      label: `Open ${project.name} live demo`,
      href: project.demo,
      external: true,
      purpose: "demo",
    });
  }
  if (project.repo) {
    actions.push({
      label: `View ${project.name} repository`,
      href: project.repo,
      external: true,
      purpose: "repository",
    });
  }
  return actions;
}

export function buildLenjiPTKnowledge(
  resumeAvailable: boolean,
): KnowledgeRecord[] {
  const projectRecords: KnowledgeRecord[] = projects.map((project) => {
    const notes = projectEngineeringNotes[project.id];
    const engineeringFacts = notes?.facts ?? [];
    const facts = (factId: string) =>
      projectEngineeringFact(project.id, factId)?.detail ?? "";
    const usageMetrics = facts("usageMetrics");

    return {
      id: `project:${project.id}`,
      kind: "project",
      title: project.name,
      evidenceStatus: "source-reviewed",
      aliases: [
        ...(projectAliases[project.id] ?? []),
        project.fullTitle ?? "",
        project.id.replace(/-/g, " "),
      ].filter(Boolean),
      questionExamples: notes?.questionExamples ?? [],
      features: engineeringFacts
        .filter((fact) => fact.category === "feature")
        .map((fact) => fact.summary),
      technologies: project.stack,
      technicalDetails: engineeringFacts.map((fact) => fact.detail),
      keywords: [
        project.tag,
        project.role,
        project.stack.join(" "),
        project.problem,
        project.approach,
        project.outcome,
        ...engineeringFacts.map((fact) => `${fact.summary} ${fact.detail}`),
      ],
      summary: `${project.tag}. ${project.desc}`,
      text: [
        project.problem,
        `Role: ${project.role}`,
        `Approach: ${project.approach}`,
        `Outcome: ${project.outcome}`,
        ...engineeringFacts.map((fact) => fact.detail),
      ].join(" "),
      facts: {
        role: project.role,
        problem: project.problem,
        approach: project.approach,
        outcome: [
          project.outcome,
          usageMetrics && !/\bmetrics\b/i.test(project.outcome)
            ? usageMetrics
            : "",
        ]
          .filter(Boolean)
          .join(" "),
        technologies:
          project.stack.join(", ") || "No technologies have been documented.",
        repository: project.repo
          ? `The repository is available at ${project.repo}.`
          : "No repository link is currently listed in the portfolio.",
        demo: project.demo
          ? `A public live demo is available at ${project.demo}.`
          : "No public hosted demo is listed. The case study contains an interactive portfolio demonstration using sample data.",
        technologyNotes: facts("technologyNotes"),
        aosBehavior: facts("aosBehavior"),
        posBehavior: facts("posBehavior"),
        baselineBehavior: facts("baselineBehavior"),
        proposedBehavior: facts("proposedBehavior"),
        modelStatus: facts("modelStatus"),
        researchEvidence: facts("researchEvidence"),
        rsvpBehavior: facts("rsvpBehavior"),
      },
      sources: [
        { label: "Portfolio case study", href: `/projects/${project.id}` },
        ...(project.repo
          ? [{ label: "Public project repository", href: project.repo }]
          : []),
      ],
      actions: projectActions(project),
    };
  });

  const skillRecords: KnowledgeRecord[] = skills.flatMap((group) =>
    group.items.map((skill) => ({
      id: `skill:${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      kind: "skill" as const,
      title: skill,
      evidenceStatus: "portfolio-listed" as const,
      aliases: [
        skill.replace(/\([^)]*\)/g, "").trim(),
        ...(skill.toLowerCase() === "sql"
          ? ["database query language", "query language"]
          : []),
      ],
      keywords: [group.title, ...group.items],
      questionExamples: [
        `Is ${skill} listed among Lenj's skills?`,
        `What projects use ${skill}?`,
      ],
      summary: `${skill} is listed in the ${group.title} skill group.`,
      text: `${group.title}: ${group.items.join(", ")}.`,
      facts: { category: group.title },
      relatedProjectIds: relatedProjectIdsForSkill(skill),
      sources: [{ label: "Portfolio skills list", href: "#skills" }],
      actions: [sectionAction("View technical skills", "#skills")],
    })),
  );

  const educationRecords: KnowledgeRecord[] = education.map((item) => ({
    id: `education:${item.id}`,
    kind: "education",
    title: item.institution,
    evidenceStatus: "portfolio-listed",
    aliases: [item.program, item.level, item.id.replace(/-/g, " ")],
    questionExamples: [
      `What did Lenj study at ${item.institution}?`,
      `When did Lenj attend ${item.institution}?`,
    ],
    keywords: [item.status, item.dates, item.expectedGraduation ?? ""],
    summary: `${item.level}: ${item.program}`,
    text: `${item.status}. Dates: ${item.dates}. ${
      item.expectedGraduation
        ? `Expected graduation: ${item.expectedGraduation}.`
        : ""
    }`,
    facts: {
      program: item.program,
      status: item.status,
      dates: item.dates,
      expectedGraduation: item.expectedGraduation ?? "",
    },
    sources: [{ label: "Portfolio education timeline", href: "#education" }],
    actions: [sectionAction("View education", "#education")],
  }));

  const certificationRecords: KnowledgeRecord[] = certifications.map(
    (certification) => ({
      id: `certification:${certification.id}`,
      kind: "certification",
      title: certification.title,
      evidenceStatus: "portfolio-listed",
      aliases: [
        certification.title.replace(/^SAP Certified\s*[–-]\s*/i, ""),
        ...(certifications.filter(
          (item) => item.issuer === certification.issuer,
        ).length === 1
          ? [
              certification.issuer,
              ...(certification.issuer.split(/[–—-]/)[0].trim() !==
              certification.issuer
                ? [certification.issuer.split(/[–—-]/)[0].trim()]
                : []),
            ]
          : []),
        ...certification.categories,
        ...(certification.id === "pmi-project-management"
          ? ["PMI", "PMI certification"]
          : []),
      ],
      questionExamples: [
        `What does ${certification.title} cover?`,
        `When was ${certification.title} issued?`,
      ],
      keywords: [
        ...certification.skills,
        certification.issueDate,
        certification.expirationDate ?? "",
        certification.credentialId ?? "",
      ],
      summary: `${certification.issuer}. ${certification.categories.join(", ")}.`,
      text: [
        `Issued ${certification.issueDate}.`,
        certification.expirationDate
          ? `Expires ${certification.expirationDate}.`
          : "",
        `Skills: ${certification.skills.join(", ")}.`,
        `Credential ID: ${certification.credentialId ?? "not listed"}.`,
      ]
        .filter(Boolean)
        .join(" "),
      facts: {
        issuer: certification.issuer,
        issued: certification.issueDate,
        expires: certification.expirationDate ?? "",
        credentialId: certification.credentialId ?? "",
        skills: certification.skills.join(", "),
      },
      sources: [
        { label: "Portfolio certification entry", href: "#certifications" },
      ],
      actions: [
        sectionAction("View certifications", "#certifications"),
        ...(certification.verificationUrl
          ? [
              {
                label: "Verify this credential",
                href: certification.verificationUrl,
                external: true,
                purpose: "verification" as const,
              },
            ]
          : []),
      ],
    }),
  );

  const projectIndex: KnowledgeRecord = {
    id: "projects-index",
    kind: "project-index",
    title: "Featured projects",
    evidenceStatus: "source-reviewed",
    aliases: ["projects", "selected work", "project list", "all projects"],
    questionExamples: [
      "What projects has Lenj built?",
      "Compare DocuGraph and Mayari",
      "What are Lenj's most notable projects?",
      "Can I browse the case studies?",
    ],
    keywords: ["portfolio work", "case studies", ...projects.map((item) => item.name)],
    summary: `${projects.length} featured case studies cover document analysis, a Canvas study companion, Android prototypes, an event platform, and a wedding invitation.`,
    text: projects.map((item) => `${item.name}: ${item.tag}. ${item.desc}`).join(" "),
    items: projectRecords.map((record) => ({
      title: record.title,
      summary: record.summary,
      chips: record.technologies?.slice(0, 5),
      action: record.actions?.find((action) => action.purpose === "case-study"),
    })),
    facts: {
      demo: projects
        .map(
          (item) =>
            `${item.name}: ${item.demo ? `public live demo at ${item.demo}` : "no public hosted demo is listed; an interactive case-study demo is available"}.`,
        )
        .join(" "),
      repository: projects
        .map(
          (item) =>
            `${item.name}: ${item.repo ? `repository at ${item.repo}` : "no repository link is currently listed"}.`,
        )
        .join(" "),
    },
    sources: [{ label: "Selected work section", href: "#projects" }],
    actions: [sectionAction("View selected work", "#projects")],
  };

  const skillIndex: KnowledgeRecord = {
    id: "skills-index",
    kind: "skill-index",
    title: "Technical skills",
    evidenceStatus: "portfolio-listed",
    aliases: [
      "skills",
      "technologies",
      "tech stack",
      "programming tools",
      "ai and machine learning tools",
    ],
    questionExamples: [
      "Which skills are listed in Lenj's portfolio?",
      "What tools does Lenj know?",
      "Anong mga kasanayan ang nakalista?",
    ],
    keywords: skills.flatMap((group) => [group.title, ...group.items]),
    summary: "The portfolio groups Lenj's skills into programming, frontend, database and APIs, AI and machine learning, cloud and data, and additional areas.",
    text: skills
      .map((group) => `${group.title}: ${group.items.join(", ")}.`)
      .join(" "),
    items: skills.map((group) => ({
      title: group.title,
      summary: `${group.items.length} listed skills`,
      chips: group.items,
    })),
    sources: [{ label: "Portfolio skills list", href: "#skills" }],
    actions: [sectionAction("View technical skills", "#skills")],
  };

  const educationIndex: KnowledgeRecord = {
    id: "education-index",
    kind: "education-index",
    title: "Education",
    evidenceStatus: "portfolio-listed",
    aliases: [
      "education",
      "academic background",
      "schools",
      "degree",
      "kolehiyo",
      "kurso",
      "pag-aaral",
      "academic studies",
    ],
    questionExamples: [
      "Where does Lenj study?",
      "What did Lenj study before college?",
      "What has Lenj studied?",
      "Anong edukasyon ni Lenj?",
    ],
    keywords: education.flatMap((item) => [
      item.institution,
      item.program,
      item.level,
      item.status,
      "kolehiyo",
      "kurso",
      "pag-aaral",
      "pinag-aralan",
    ]),
    summary: education
      .map((item) => `${item.institution}: ${item.program} (${item.dates})`)
      .join(". "),
    text: education
      .map(
        (item) =>
          `${item.level}. ${item.status}. ${item.expectedGraduation ? `Expected graduation ${item.expectedGraduation}.` : ""}`,
      )
      .join(" "),
    items: education.map((item) => ({
      title: item.institution,
      summary: `${item.program} · ${item.status} · ${item.dates}`,
      chips: item.expectedGraduation
        ? [`Expected graduation ${item.expectedGraduation}`]
        : [],
    })),
    sources: [{ label: "Portfolio education timeline", href: "#education" }],
    actions: [sectionAction("View education", "#education")],
  };

  const certificationIndex: KnowledgeRecord = {
    id: "certifications-index",
    kind: "certification-index",
    title: "Certifications",
    evidenceStatus: "portfolio-listed",
    aliases: ["certifications", "certificates", "credentials", "certs", "badges"],
    questionExamples: [
      "What certifications are listed?",
      "Which AI certifications does Lenj have?",
      "How many credentials appear in the portfolio?",
    ],
    keywords: certifications.flatMap((item) => [
      item.title,
      item.issuer,
      ...item.skills,
      ...item.categories,
    ]),
    summary: `The portfolio lists ${certifications.length} certifications across AI and machine learning, software development, cloud and data, APIs and development tools, and project management.`,
    text: certifications
      .map(
        (item) =>
          `${item.title}, issued by ${item.issuer} on ${item.issueDate}. Related skills: ${item.skills.join(", ")}.`,
      )
      .join(" "),
    items: certifications.map((item) => ({
      title: item.title,
      summary: `${item.issuer} · ${item.issueDate}`,
      chips: item.categories,
    })),
    sources: [{ label: "Portfolio certification gallery", href: "#certifications" }],
    actions: [sectionAction("View all certifications", "#certifications")],
  };

  const certificationGroups: KnowledgeRecord[] = [
    ...new Set<string>(certifications.flatMap((item) => item.categories)),
    ...new Set(certifications.map((item) => item.issuer)),
  ].map((group) => {
    const matches = certifications.filter(
      (item) =>
        item.issuer === group ||
        item.categories.some((category) => category === group),
    );
    const isIssuer = matches.some((item) => item.issuer === group);
    const shortGroup = group.split(" & ")[0];
    return {
      id: `certifications-group:${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      kind: "certification-index" as const,
      title: `${group} certifications`,
      evidenceStatus: "portfolio-listed" as const,
      aliases: [
        group,
        `${group} certifications`,
        `${group} certificates`,
        `${group} credentials`,
        `${shortGroup} certifications`,
        ...(group === "AI & Machine Learning"
          ? [
              "AI certifications",
              "AI certificates",
              "AI credentials",
              "machine learning certifications",
            ]
          : []),
      ],
      questionExamples: [
        `Which ${group} credentials are listed?`,
        `How many ${group} certifications does Lenj have?`,
      ],
      keywords: matches.flatMap((item) => [item.title, ...item.skills]),
      summary: `${matches.length} listed credential${matches.length === 1 ? "" : "s"} ${isIssuer ? `issued by ${group}` : `are in ${group}`}.`,
      text: matches
        .map(
          (item) =>
            `${item.title}, issued by ${item.issuer} on ${item.issueDate}. Related skills: ${item.skills.join(", ")}.`,
        )
        .join(" "),
      items: matches.map((item) => ({
        title: item.title,
        summary: `${item.issuer} · ${item.issueDate}`,
        chips: item.skills,
      })),
      sources: [{ label: "Portfolio certification gallery", href: "#certifications" }],
      actions: [sectionAction("View all certifications", "#certifications")],
    };
  });

  const contactActions: LenjiPTAction[] = [
    {
      label: "Email Lenj",
      href: links.email,
      purpose: "contact",
    },
    {
      label: "GitHub profile",
      href: links.github,
      external: true,
      purpose: "contact",
    },
    sectionAction("Open the contact section", "#contact"),
    {
      label: "LinkedIn profile",
      href: links.linkedin,
      external: true,
      purpose: "contact",
    },
    ...(resumeAvailable
      ? [
          {
            label: "Download résumé",
            href: links.resume,
            download: true,
            purpose: "resume" as const,
          },
        ]
      : []),
  ];

  const activity: KnowledgeRecord = {
    id: "activity:acm-developers-week",
    kind: "activity",
    title: "ACM Developers Week Hackathon",
    evidenceStatus: "portfolio-listed",
    aliases: [
      "acm hackathon",
      "developers week",
      "hackathon participant",
      "paligsahan",
    ],
    questionExamples: [
      "Which hackathon did Lenj participate in?",
      "Has Lenj won a hackathon award?",
      "Anong paligsahan ang sinalihan ni Lenj?",
    ],
    keywords: [
      "participant",
      "2026",
      "FEU Institute of Technology",
      "paligsahan",
      "sinalihan",
    ],
    summary:
      "Lenj participated in the 2026 ACM Developers Week Hackathon at FEU Institute of Technology.",
    text: "The portfolio presents this as a participant activity; it does not claim a competition award.",
    sources: [{ label: "Portfolio activities section", href: "#activities" }],
    actions: [sectionAction("View academic activities", "#activities")],
  };

  const internship: KnowledgeRecord = {
    id: "internship",
    kind: "internship",
    title: "Internship availability",
    evidenceStatus: "portfolio-listed",
    aliases: ["internship", "intern", "ojt", "on the job training", "work placement"],
    questionExamples: [
      "Is Lenj open to internship opportunities?",
      "Is Lenj currently looking for an internship?",
      "May internship ba si Lenj?",
    ],
    keywords: ["available", "opportunity", "software development", "collaboration"],
    summary:
      "Lenj is open to internship opportunities, software development collaborations, and projects where he can contribute, learn, and grow.",
    text: "No completed internship or employment details have been provided in the portfolio.",
    sources: [{ label: "Portfolio contact section", href: "#contact" }],
    actions: [
      sectionAction("Contact Lenj", "#contact"),
      { label: "Email Lenj", href: links.email, purpose: "contact" },
    ],
  };

  const profileRecord: KnowledgeRecord = {
    id: "profile",
    kind: "profile",
    title: profile.name,
    evidenceStatus: "portfolio-listed",
    aliases: [
      "personal background",
      "career journey",
      "developer background",
      "recruiter view",
      "recruiter overview",
    ],
    questionExamples: [
      "Who is Lenj?",
      "What is Lenj studying?",
      "Tell me about Lenj's developer background.",
    ],
    keywords: [profile.headline, profile.tagline, "computer science", "software engineering"],
    summary: `${profile.headline}. ${profile.tagline}`,
    text: "Lenj is a Computer Science student specializing in Software Engineering. The portfolio features projects spanning document analysis, assignment tracking, Android prototypes, event experiences, and a wedding invitation. No employment history has been supplied.",
    sources: [
      { label: "Portfolio About section", href: "#about" },
      { label: "Portfolio education timeline", href: "#education" },
    ],
    actions: [
      sectionAction("Read about Lenj", "#about"),
      sectionAction("View education", "#education"),
      { label: "Open recruiter view", href: "/recruiter", purpose: "section" },
    ],
  };

  const contact: KnowledgeRecord = {
    id: "contact",
    kind: "contact",
    title: "Contact Lenj",
    evidenceStatus: "portfolio-listed",
    aliases: ["contact", "email", "reach Lenj", "social media"],
    questionExamples: [
      "How can I contact Lenj?",
      "What is Lenj's email address?",
      "Can I connect with Lenj on LinkedIn?",
    ],
    keywords: [profile.email, "github", "linkedin", "resume"],
    summary: `Email ${profile.email}. Lenj's public profiles are available on GitHub and LinkedIn.`,
    text: `GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}.`,
    facts: {
      resume: resumeAvailable
        ? "The résumé PDF is available to download."
        : `The résumé PDF is not available on the site yet. You can request a copy at ${profile.email}.`,
    },
    sources: [{ label: "Portfolio contact links", href: "#contact" }],
    actions: contactActions,
  };

  const assistant: KnowledgeRecord = {
    id: "assistant",
    kind: "assistant",
    title: "LenjiPT",
    evidenceStatus: "source-reviewed",
    aliases: ["LenjiPT", "portfolio assistant", "portfolio guide", "chatbot"],
    questionExamples: [
      "Does LenjiPT use a hosted AI model?",
      "Does LenjiPT send questions to an external provider?",
      "How does LenjiPT find portfolio answers?",
      "Is LenjiPT free to use?",
    ],
    keywords: [
      "local retrieval",
      "verified knowledge",
      "no external AI service",
      "no API key",
      "no paid inference",
      "privacy",
      "limitations",
      "model",
    ],
    summary:
      "LenjiPT is a portfolio-focused guide that searches verified local portfolio information and returns grounded, templated answers with fixed, safe links.",
    text: "No hosted generative model is connected. Questions are processed in the browser against the portfolio knowledge base; the system does not send questions to an AI provider, require an API key, or incur inference charges. Search uses token weighting, aliases, intent rules, and typo tolerance. It can miss meanings not covered by its local vocabulary and is under active development.",
    sources: [{ label: "LenjiPT implementation", href: "#lenjipt" }],
    actions: [sectionAction("Meet LenjiPT", "#lenjipt")],
  };

  return [
    profileRecord,
    assistant,
    internship,
    contact,
    projectIndex,
    ...projectRecords,
    skillIndex,
    ...skillRecords,
    educationIndex,
    ...educationRecords,
    certificationIndex,
    ...certificationRecords,
    ...certificationGroups,
    activity,
  ];
}
