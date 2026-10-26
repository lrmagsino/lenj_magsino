import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { certifications } from "@/lib/certifications";
import { education } from "@/lib/education";
import { links, profile, projects, skills } from "@/lib/content";
import DeveloperTerminal from "@/components/DeveloperTerminal";
import DeveloperJourney from "@/components/DeveloperJourney";
import GitHubActivity from "@/components/GitHubActivity";

export const metadata: Metadata = {
  title: `Recruiter View — ${profile.name}`,
  description: `A concise overview of ${profile.name}'s education, skills, projects, certifications, public GitHub activity, and internship goals.`,
};

const sectionClass = "rounded-2xl border border-white/10 bg-charcoal/70 p-5 sm:p-7";

export default function RecruiterPage() {
  const resumeAvailable = existsSync(
    join(process.cwd(), "public", "resume", "lenj-magsino.pdf"),
  );

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:pt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="holo-link min-h-11 inline-flex items-center text-sm text-cyan hover:underline">
          ← Portfolio home
        </Link>
        <p className="eyebrow">Recruiter quick view · minimal motion</p>
      </div>

      <header className="mt-10 rounded-3xl border border-cyan/25 bg-gradient-to-br from-charcoal via-midnight to-charcoal p-6 sm:p-10">
        <p className="eyebrow">Software engineering internship candidate</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75">
          Computer Science student at FEU Institute of Technology, specializing in Software
          Engineering. I build academic and collaborative projects across document analysis,
          browser extensions, Android applications, and responsive web experiences.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={links.email}
            className="holo-link inline-flex min-h-11 items-center rounded-full bg-electric px-5 text-sm font-medium"
          >
            Contact me
          </a>
          {resumeAvailable ? (
            <a
              href={links.resume}
              download
              className="holo-link inline-flex min-h-11 items-center rounded-full border border-white/25 px-5 text-sm hover:border-cyan hover:text-cyan"
            >
              Download résumé
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm text-white/45"
            >
              Résumé not currently available
            </span>
          )}
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="holo-link inline-flex min-h-11 items-center rounded-full border border-white/25 px-5 text-sm hover:border-cyan hover:text-cyan"
          >
            GitHub ↗
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="holo-link inline-flex min-h-11 items-center rounded-full border border-white/25 px-5 text-sm hover:border-cyan hover:text-cyan"
          >
            LinkedIn ↗
          </a>
        </div>
      </header>

      <nav aria-label="Recruiter view sections" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {[
          ["Education", "#education"],
          ["Journey", "#journey"],
          ["Achievements", "#achievements"],
          ["Skills", "#skills"],
          ["Projects", "#projects"],
          ["Certifications", "#certifications"],
          ["GitHub activity", "#github"],
          ["Terminal", "#terminal"],
          ["Availability", "#availability"],
        ].map(([label, href]) => (
          <a key={href} href={href} className="holo-link min-h-10 inline-flex items-center text-white/65 hover:text-cyan">
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section id="education" className={sectionClass}>
          <p className="eyebrow">Education</p>
          <h2 className="mt-2 font-display text-2xl font-bold">Academic background</h2>
          <ol className="mt-5 space-y-4">
            {education.map((school) => (
              <li key={school.id} className="border-l-2 border-cyan/50 pl-4">
                <h3 className="font-display text-lg font-semibold">{school.institution}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{school.program}</p>
                <p className="mt-2 font-mono text-xs text-cyan">
                  {school.dates}
                  {school.expectedGraduation
                    ? ` · Expected graduation ${school.expectedGraduation}`
                    : ""}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="availability" className={`${sectionClass} border-cyan/25`}>
          <p className="eyebrow">Availability</p>
          <h2 className="mt-2 font-display text-2xl font-bold">
            Open to software engineering internships
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Seeking an opportunity to contribute to software development and continue learning.
            No formal internship or professional employment experience is claimed.
          </p>
          <a href={links.email} className="holo-link mt-4 inline-flex min-h-11 items-center text-sm text-cyan hover:underline">
            {profile.email} →
          </a>
        </section>
      </div>

      <div className="mt-5">
        <DeveloperJourney />
      </div>

      <section id="achievements" className={`${sectionClass} mt-5`}>
        <p className="eyebrow">Achievements &amp; academic activities</p>
        <h2 className="mt-2 font-display text-2xl font-bold">Documented milestones</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <article className="rounded-xl border border-white/10 bg-midnight/50 p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-violet">Academic activity</p>
            <h3 className="mt-2 font-display font-semibold">ACM Developers Week Hackathon</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Participant at FEU Institute of Technology in 2026. Participation only; no award or
              placement is claimed.
            </p>
            <Link
              href="/#activities"
              className="holo-link mt-3 inline-flex min-h-10 items-center text-sm text-cyan hover:underline"
            >
              View activity details →
            </Link>
          </article>
          <article className="rounded-xl border border-white/10 bg-midnight/50 p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-violet">Credentials</p>
            <h3 className="mt-2 font-display font-semibold">{certifications.length} documented certifications</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Credential records and supplied certificate evidence are available in the portfolio.
              This summary does not imply awards beyond those credentials.
            </p>
            <Link
              href="#certifications"
              className="holo-link mt-3 inline-flex min-h-10 items-center text-sm text-cyan hover:underline"
            >
              View featured credentials →
            </Link>
          </article>
          <article className="rounded-xl border border-white/10 bg-midnight/50 p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-violet">Project work</p>
            <h3 className="mt-2 font-display font-semibold">Academic &amp; collaborative development</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              The case studies distinguish independent project roles from team contributions and
              describe outcomes only where supporting evidence is available.
            </p>
            <Link
              href="#projects"
              className="holo-link mt-3 inline-flex min-h-10 items-center text-sm text-cyan hover:underline"
            >
              Browse selected projects →
            </Link>
          </article>
        </div>
      </section>

      <section id="skills" className={`${sectionClass} mt-5`}>
        <p className="eyebrow">Technical skills</p>
        <h2 className="mt-2 font-display text-2xl font-bold">Tools and areas of practice</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.title}>
              <h3 className="font-display font-semibold text-cyan">{group.title}</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill} className="rounded-full border border-white/10 bg-midnight/60 px-3 py-1.5 text-xs text-white/70">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className={`${sectionClass} mt-5`}>
        <p className="eyebrow">Selected projects</p>
        <h2 className="mt-2 font-display text-2xl font-bold">Academic and collaborative work</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id} className="rounded-xl border border-white/10 bg-midnight/50 p-4">
              <h3 className="font-display text-lg font-semibold">{project.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/65">{project.tag}</p>
              <p className="mt-3 text-xs leading-relaxed text-white/55">{project.role}</p>
              <Link
                href={`/projects/${project.id}`}
                className="holo-link mt-3 inline-flex min-h-10 items-center text-sm text-cyan hover:underline"
              >
                Read case study →
              </Link>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="holo-link min-h-10 inline-flex items-center text-white/60 hover:text-cyan"
                  >
                    Public repository ↗
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="holo-link min-h-10 inline-flex items-center text-white/60 hover:text-cyan"
                  >
                    Live demo ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="certifications" className={`${sectionClass} mt-5`}>
        <p className="eyebrow">Certifications</p>
        <h2 className="mt-2 font-display text-2xl font-bold">Featured credentials</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {certifications
            .filter((certification) => certification.featured)
            .map((certification) => (
              <li key={certification.id} className="rounded-xl border border-white/10 bg-midnight/50 p-4">
                <h3 className="font-medium text-white/85">{certification.title}</h3>
                <p className="mt-1 text-sm text-white/55">
                  {certification.issuer} · {certification.issueDate}
                </p>
              </li>
            ))}
        </ul>
        <Link href="/#certifications" className="holo-link mt-4 inline-flex min-h-10 items-center text-sm text-cyan hover:underline">
          View all certifications →
        </Link>
      </section>
      <div className="mt-5">
        <GitHubActivity />
      </div>
      <div className="mt-5">
        <DeveloperTerminal />
      </div>
    </main>
  );
}
