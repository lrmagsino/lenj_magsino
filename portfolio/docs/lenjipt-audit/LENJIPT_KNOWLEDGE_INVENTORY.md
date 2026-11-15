# LenjiPT Knowledge Inventory

## Evidence conventions

**Portfolio-listed** facts come from current portfolio data or the public résumé. **Source-reviewed** facts are supported by local implementation/engineering notes. **Inferred** facts are explicitly marked. Absence of a claim is not proof that the real-world fact is false. External demos and repositories below are URLs listed in portfolio data; link availability was not re-tested in this audit.

## A. Personal and professional knowledge

| Topic | Canonical fact | Evidence/source |
|---|---|---|
| Name | Lenj Jesther R. Magsino | Portfolio-listed: [content.ts](../../lib/content.ts); [résumé](../../public/resume/lenj-magsino.pdf) |
| Headline | Full-Stack Developer \| Computer Science Student | Portfolio-listed: [content.ts](../../lib/content.ts) |
| Summary | “Building Intelligent Systems. Creating Meaningful Digital Experiences.” The résumé further describes a Computer Science undergraduate specializing in Software Engineering with hands-on academic project experience in full-stack development, Android apps, document analysis, and interactive web interfaces. | Portfolio-listed: [content.ts](../../lib/content.ts); [résumé](../../public/resume/lenj-magsino.pdf) |
| Career direction | Seeking/open to software engineering or development internship opportunities. No completed professional employment or formal internship is claimed. | Portfolio-listed: [recruiter page](../../app/recruiter/page.tsx), [content.ts](../../lib/content.ts), [résumé](../../public/resume/lenj-magsino.pdf) |
| Contact | `lenjmagsino@gmail.com`; [GitHub](https://github.com/lrmagsino); [LinkedIn](https://www.linkedin.com/in/lenj-jesther-magsino-a69824396/). | Portfolio-listed: [content.ts](../../lib/content.ts), [recruiter page](../../app/recruiter/page.tsx) |
| Résumé | Public file at `/resume/lenj-magsino.pdf`. The local portfolio detects whether the file exists before showing download actions. | Source-reviewed: [home page](../../app/page.tsx), [recruiter page](../../app/recruiter/page.tsx) |
| Languages | Filipino and English are listed in the résumé. | Portfolio-listed: [résumé](../../public/resume/lenj-magsino.pdf) |
| Work/achievement claims | The portfolio states no formal internship or professional employment. The 2026 ACM Developers Week Hackathon is participation only; no award or placement is claimed. | Portfolio-listed: [recruiter page](../../app/recruiter/page.tsx), [activities component](../../components/ExperienceActivities.tsx) |

The résumé contains a phone number and city that are not in the portfolio profile/contact data. Their values are intentionally omitted here; confirm separately before deciding whether LenjiPT should expose them.

## B. Education knowledge

| Institution | Program | Dates/status | Additional detail | Evidence |
|---|---|---|---|---|
| FEU Institute of Technology | Bachelor of Science in Computer Science with Specialization in Software Engineering | 2023–Present; currently studying | Expected graduation: 2027 | [education.ts](../../lib/education.ts), [recruiter page](../../app/recruiter/page.tsx) |
| University of the East – Caloocan | Information and Communications Technology (ICT), Senior High School | 2021–2023; completed | Résumé specifies Aug 2021–June 2023 | [education.ts](../../lib/education.ts), [résumé](../../public/resume/lenj-magsino.pdf) |

No GPA, honors, grades, exact FEU completion term, or other academic milestones are listed in the reviewed portfolio sources.

## C. Technical knowledge

### Portfolio skill groups

These are listed skills, not independently measured proficiency levels.

- **Programming:** Python, JavaScript, TypeScript, Kotlin, HTML
- **Frontend:** React, Next.js, Tailwind CSS
- **Database & APIs:** SQL, REST APIs, Postman, API Integration
- **AI & Machine Learning:** Artificial Intelligence, Machine Learning, Generative AI, CNN (Detectron2), Graph attention (JavaScript)
- **Cloud & Data:** Microsoft Azure, Apache Kafka, Stream Processing, SAP Business Data Cloud
- **Additional:** Android Development, MATLAB, UI/UX Design, Agile Software Development, Project Management

Source: [content.ts](../../lib/content.ts), surfaced in [recruiter page](../../app/recruiter/page.tsx).

The résumé additionally lists Java, C++, Flutter, Android Studio, MySQL, SQLite, and Firebase. These are résumé-listed skills, not project-specific evidence. The résumé and portfolio skill lists are not identical; see [missing and conflicting information](./LENJIPT_MISSING_INFORMATION.md).

## D. Certification knowledge

The portfolio records 13 credentials. IDs below are the public credential identifiers already rendered by the portfolio’s certification cards. A missing verification URL means the source does not provide a direct verification link; it does not establish the credential is invalid. All rows are **portfolio-listed**, not independently verified with the issuer.

| Exact title | Issuer | Issued | Expires | Credential ID | Skills | Verification |
|---|---|---|---|---|---|---|
| Data Streaming Engineer Foundations | Confluent, an IBM Company | September 22, 2026 | September 22, 2028 | `194851058` | Apache Kafka; Stream Processing | No URL listed |
| Microsoft Artificial Intelligence Course: Azure AI Fundamentals | TESDA – Technical Education and Skills Development Authority | August 23, 2026 | Not specified | `TbhZobWnjY` | Artificial Intelligence; Machine Learning | No URL listed |
| Certificate of Completion: AI Fluency Framework & Foundations | Anthropic | July 2026 | Not specified | `i9p8vyvuvta2` | Artificial Intelligence | No URL listed |
| AI Engineer for Developers Associate | DataCamp | July 21, 2026 | July 2028 | `AIEDA0013532806796` | Artificial Intelligence | No URL listed |
| SAP Certified – Data Architect – SAP Business Data Cloud | SAP | July 14, 2026 | July 15, 2027 | `323c59d6-c42b-4548-a436-1b747f4baca1` | Business Architecture; Analytics | [Credly](https://www.credly.com/badges/323c59d6-c42b-4548-a436-1b747f4baca1) |
| SAP Certified – SAP Generative AI Developer | SAP | July 11, 2026 | July 12, 2027 | `56b9df1a-eb09-4522-aabe-45ba3b66b57e` | Artificial Intelligence; Cloud Application Development | [Credly](https://www.credly.com/badges/56b9df1a-eb09-4522-aabe-45ba3b66b57e) |
| Postman Essential Training | LinkedIn Learning | November 2025 | Not specified | `adffc0393c19a19cdbbe7218be731164f05f51790a06244e8a3db9263af0bd34` | API Testing; Postman API | No URL listed |
| Programming Foundations: APIs and Web Services | LinkedIn Learning | November 2025 | Not specified | `7b1c79f6785aa340b9d90e65fe1361ae965244c821e9ddef5bf023fcbe722c24` | REST APIs; Programming Foundations | No URL listed |
| MATLAB Onramp | MathWorks | November 2025 | Not specified | Not provided | MATLAB | No URL listed |
| PMI Project Management Ready | Project Management Institute | March 18, 2026 | March 2031 | `L33D-s4kd` | Project Management | No URL listed |
| Information Technology Specialist in Python | Certiport – A Pearson VUE Business | July 31, 2025 | July 31, 2030 | `wnAp3-48J9` | Python Programming | No URL listed |
| Develop Your Skills as a Software Project Manager | LinkedIn Learning | November 2025 | Not specified | `2a62509679cc5bfdf99d84b4f414e0969913b02bdfa4dc19b73ec487002ed642` | Agile Project Management; Agile Software Development | No URL listed |
| Complete Guide to Android Development with Kotlin for Beginners | LinkedIn Learning | November 2025 | Not specified | `d0f341de21299c1be3272528208a741f8d352e7a7a4919ae99b434eb55ec9bb4` | Android Development; Kotlin | No URL listed |

Source for all metadata: [certifications.ts](../../lib/certifications.ts). Display behavior and preview/download links: [CertificationGallery.tsx](../../components/CertificationGallery.tsx). Image/PDF evidence files are under [public/certificates](../../public/certificates).

## E. Project knowledge

The shared case-study route is `/projects/<project-id>`. It displays the stored problem, role, approach, engineering notes, technology stack, demo, and outcome. Local embedded demos use sample/local state; they are not proof that a production service or external project backend is connected. Sources include [project records](../../lib/content.ts), [canonical engineering facts](../../lib/projectEngineeringNotes.ts), [shared case-study route](../../app/projects/%5Bslug%5D/page.tsx), [engineering-notes renderer](../../components/EngineeringChallenges.tsx), and the linked demo components.

### 1. DocuGraph — `/projects/docugraph`

- **Problem/objective — portfolio-listed:** Complex research papers, forms, reports, and diagrams contain layout relationships that linear OCR may lose. The project aims to preserve document structure and produce structured content.
- **Features/implementation — local source-reviewed notes:** Browser-side region analysis, OCR, shape/connector analysis, and structured export. The portfolio distinguishes an independent CNN-only baseline from the proposed graph-style workflow.
- **Architecture/technology — portfolio-listed:** Python, Flask, EasyOCR, Tesseract, LayoutParser/Detectron2, JavaScript graph-attention-named code, and Firebase Authentication are listed. The baseline uses LayoutParser/Detectron2 with a PubLayNet Faster R-CNN ResNeSt-50 FPN configuration and 0.5 score threshold; OCR is separate and reading order is sorted geometrically. The proposed graph-style neighbor aggregation uses fixed spatial heuristics; inspected local notes found no learned weights or training procedure.
- **Research/evidence limits:** Thesis confidence percentages are not validated accuracy. The aggregation method is undocumented; some reported values conflict with screenshots. No ground-truth reading-order accuracy or processing-time benchmark is established. Some invoice/receipt evidence is withheld because it contains personal or financial identifiers.
- **Role/team/outcome:** Portfolio role is “Full-Stack Developer.” Specific individual tasks, team size, and measured outcome are missing.
- **Demo/repository:** Listed live site `https://docugraph.site/`; repository `https://github.com/lenjimagsino/DOCUGRAPH_WEBSITE`. The portfolio demo replays saved evidence; it does not upload documents, call the backend, run models, or produce fresh OCR results.
- **Lessons learned:** No explicit lessons-learned statement or validated result is listed.
- **Sources:** [project data](../../lib/content.ts), [canonical engineering facts](../../lib/projectEngineeringNotes.ts), [research explorer](../../components/DocuGraphResearchLab.tsx), [engineering-notes renderer](../../components/EngineeringChallenges.tsx), [portfolio demo](../../components/demos/DocuGraphDemo.tsx).

### 2. Mayari — `/projects/mayari`

- **Problem/objective — portfolio-listed:** Help students manage Canvas assignments, due dates, course updates, and class information in one study companion.
- **Features/architecture — portfolio-listed/local notes:** Manifest V3 extension with popup and background service worker; Canvas REST API access; Chrome storage; assignment/deadline filters; alarms/notifications; announcements; class/meeting links. User setup requires a Canvas instance URL and access token configured locally.
- **Demo limits:** The portfolio demo has sample assignments, filters/completion state, local reminder preferences, sample updates, and editable class entries. It does not connect to Canvas or account data; reminder preferences do not schedule browser notifications.
- **Role/team/outcome:** Listed as lead developer. Exact personal implementation tasks, team size, adoption, and usage metrics are missing. The extension is distributed as an unpacked extension; no public hosted demo is listed.
- **Demo/repository:** No hosted demo; repository listed as `https://github.com/ostol-uriel/Computahhh`.
- **Lessons learned:** No explicit lessons-learned statement or measured outcome is listed.
- **Sources:** [project data](../../lib/content.ts), [canonical engineering facts](../../lib/projectEngineeringNotes.ts), [engineering-notes renderer](../../components/EngineeringChallenges.tsx), [portfolio demo](../../components/demos/MayariDemo.tsx).

### 3. Red Warriors AOS & POS — `/projects/red-warriors`

- **Problem/objective — portfolio-listed:** Explore customer-facing canteen ordering and canteen-side operations. No transaction or user-study results are reported.
- **Recovered-app distinction in local engineering notes:** Two separate Java 8 Android applications with XML layouts. The AOS uses sample menu navigation, process-local cart state, and an on-device randomly generated queue number. Its displayed email/order message is not backed by email or remote order submission. The POS has local login/navigation, and its operation destinations show a no-records placeholder.
- **Not established for the original apps:** Shared API/database, persistent orders, real order submission, payment, sales/transaction processing, or AOS/POS synchronization.
- **Portfolio demo distinction:** The browser-only demo uses one in-memory state to simulate AOS orders, POS status changes, inventory, and a shared queue. It places no real orders. The local README explicitly describes this as a synchronized **sample** flow and says demos do not connect to production services.
- **Role/team/outcome:** “Full-Stack Developer · Academic Project” is listed; individual responsibilities, team size, and usage/performance outcomes are missing.
- **Demo/repository:** No external demo or repository link is currently listed.
- **Lessons learned:** No explicit lessons-learned statement is listed.
- **Sources:** [project data](../../lib/content.ts), [canonical engineering facts](../../lib/projectEngineeringNotes.ts), [engineering-notes renderer](../../components/EngineeringChallenges.tsx), [recovered-app explorer notes](../../components/RedWarriorsExplorer.tsx), [portfolio demo](../../components/demos/RedWarriorsDemo.tsx), [README](../../README.md).

### 4. CS Expo 2026 — Mission: Tomorrow — `/projects/cs-expo-2026`

- **Problem/objective — portfolio-listed:** Present event information for FEU Tech’s Computer Science showcase and enable controlled publishing.
- **Production scope:** The first production release serves schedule, speakers, sponsors, and publications, with an admin CMS. Remaining sections are browser-only demos behind a production release gate.
- **Technology/architecture — portfolio-listed/local notes:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Supabase (Postgres/Auth/Storage), Zod, Vercel, CSS springs, Web Animations API, Lenis, and SVG parallax. Engineering notes describe validation, server-side role checks, and row-level security for CMS writes; backend source was not independently inspected here.
- **Lenj’s role/team:** Frontend team member; documented contributions are registration validation, error handling, and responsive improvements. Backend ownership belongs to the backend team. The exact production sections personally implemented are not specified.
- **Demo/outcome:** Live site listed as `https://cs-expo-main-website.vercel.app/`; no repository link listed. Portfolio demo has locally validated registration preview and does not reserve a pass or send/save form data. Registration, usage, and conversion metrics are missing.
- **Lessons learned:** No explicit lessons-learned statement or outcome metric is listed.
- **Sources:** [project data](../../lib/content.ts), [canonical engineering facts](../../lib/projectEngineeringNotes.ts), [engineering-notes renderer](../../components/EngineeringChallenges.tsx), [portfolio demo](../../components/demos/CSExpoDemo.tsx).

### 5. Fritz & Princess Wedding Website — `/projects/wedding`

- **Problem/objective — portfolio-listed:** Present a personalized, responsive wedding invitation and event details.
- **Features:** Personalized greeting, journey-themed visuals, story timeline, event details, and RSVP.
- **Technology — portfolio-listed:** Next.js, React, TypeScript, Tailwind CSS, Lenis, SVG parallax, Web Animations API, Supabase, and Google Forms. Local engineering notes describe reduced-motion and keyboard-accessibility support. The exact role of Supabase is not established; RSVP is documented as Google Forms.
- **Role/team/outcome:** “Full-Stack Developer” is listed. Specific tasks, team size, and engagement metrics are missing.
- **Demo/repository:** Live invitation listed as `https://lrmagsino.github.io/FritzAndPrincess_Wedding2027/`; repository `https://github.com/lrmagsino/FritzAndPrincess_Wedding2027`. Portfolio RSVP preview is local-only and does not send/store RSVP data.
- **Lessons learned:** No explicit lessons-learned statement or measured outcome is listed.
- **Sources:** [project data](../../lib/content.ts), [canonical engineering facts](../../lib/projectEngineeringNotes.ts), [engineering-notes renderer](../../components/EngineeringChallenges.tsx), [portfolio demo](../../components/demos/WeddingDemo.tsx).

## F. Other portfolio content

- **Academic activity:** Participant at the 2026 ACM Developers Week Hackathon at FEU Institute of Technology; no prize/placement is claimed. [activities component](../../components/ExperienceActivities.tsx), [recruiter page](../../app/recruiter/page.tsx)
- **Developer journey:** UE–Caloocan ICT (2021–2023), FEU Tech BS Computer Science with Software Engineering specialization (2023–present), credentials and the hackathon (2025–2026), expected FEU graduation in 2027. Project dates are intentionally not inferred. [DeveloperJourney.tsx](../../components/DeveloperJourney.tsx)
- **Recruiter information:** concise overview of education, skills, projects, certifications, public GitHub activity, terminal, and internship availability. It explicitly says no formal internship or professional employment is claimed. [recruiter page](../../app/recruiter/page.tsx)
- **Interactive terminal:** predefined read-only commands only (`help`, `about`, `projects`, `skills`, `education`, `certifications`, `contact`, `clear`); it does not execute a shell or arbitrary command. [DeveloperTerminal.tsx](../../components/DeveloperTerminal.tsx)
- **Portfolio assistant:** local retrieval guide, no external inference provider. [LenjiPTSection.tsx](../../components/LenjiPTSection.tsx), [assistant source](../../lib/lenjiptCore.ts)

## G. Navigation inventory

- Main route `/`; anchors: `#home`, `#about`, `#skills`, `#projects`, `#lenjipt`, `#education`, `#activities`, `#certifications`, `#contact`.
- Recruiter route `/recruiter`; its sections include education, journey, achievements, skills, projects, certifications, GitHub activity, terminal, and availability.
- Case studies: `/projects/docugraph`, `/projects/mayari`, `/projects/red-warriors`, `/projects/cs-expo-2026`, `/projects/wedding`.
- Résumé download: `/resume/lenj-magsino.pdf`.
- Public profile contact destinations: `mailto:lenjmagsino@gmail.com`, [GitHub](https://github.com/lrmagsino), [LinkedIn](https://www.linkedin.com/in/lenj-jesther-magsino-a69824396/).
- Project demo/repository URLs are listed per project above. SAP credential verification links are the two Credly URLs in the certification table.
- Source: [navigation component](../../components/Nav.tsx), [portfolio data](../../lib/content.ts), [LenjiPT action allowlist](../../lib/lenjiptCore.ts).

## H. LenjiPT topic inventory

| Canonical topic IDs | Supported facts | Source/evidence | Useful follow-ups or actions |
|---|---|---|---|
| `profile`, `contact`, `internship` | Name, headline/tagline, email/social profiles, résumé availability, internship interest | Portfolio-listed: [content.ts](../../lib/content.ts), [recruiter page](../../app/recruiter/page.tsx) | About, education, résumé, contact |
| `education-index`, `education:<id>` | Two institutions, programs, dates/status, expected graduation | Portfolio-listed: [education.ts](../../lib/education.ts) | Current program, earlier school, graduation |
| `skills-index`, `skill:<slug>` | Six skill groups; listed skill-to-project relations | Portfolio-listed: [content.ts](../../lib/content.ts) | List skills, ask which projects use a skill |
| `certifications-index`, `certifications-group:<slug>`, `certification:<id>` | 13 credentials, issuer, dates, skills, public IDs; SAP verification links | Portfolio-listed: [certifications.ts](../../lib/certifications.ts) | Filter/group by issuer/category; view gallery |
| `project-index`, `project:<id>` | Five project records; descriptions, stack, selected implementation notes, roles and links | Portfolio-listed plus local source notes: [content.ts](../../lib/content.ts), [canonical engineering facts](../../lib/projectEngineeringNotes.ts) | Case studies, demos, repositories, project comparison |
| `activity:acm-developers-week` | Hackathon participation in 2026 | Portfolio-listed: [ExperienceActivities.tsx](../../components/ExperienceActivities.tsx) | Activity details; award status is not claimed |
| `assistant` | Local retrieval architecture and limitations | Source-reviewed: [lenjiptCore.ts](../../lib/lenjiptCore.ts), [LenjiPTProvider.tsx](../../components/LenjiPTProvider.tsx) | How retrieval works; whether data leaves the browser |

