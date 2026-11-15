import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import EngineeringChallenges from "@/components/EngineeringChallenges";
import PortfolioReturnLink from "@/components/PortfolioReturnLink";
import ProjectImage from "@/components/ProjectImage";
import ProjectDemo from "@/components/demos/ProjectDemo";
import RedWarriorsExplorer from "@/components/RedWarriorsExplorer";
import BlueFutureWorld from "@/components/BlueFutureWorld";
import ProjectWorldMotion from "@/components/ProjectWorldMotion";
import { projects } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export const generateStaticParams = () =>
  projects.map((project) => ({ slug: project.id }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  return project
    ? {
        title: `${project.name} — Case study | Lenj Jesther R. Magsino`,
        description: `${project.tag}. ${project.desc}`,
      }
    : {};
}

function CaseStudySection({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  return (
    <section className="mt-12">
      <h2 className="eyebrow mb-3">{heading}</h2>
      <p className="max-w-3xl text-lg leading-relaxed text-white/80">{content}</p>
    </section>
  );
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.id === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <>
      <BlueFutureWorld />
      <ProjectWorldMotion />
      <main className="case-study-page theme-aware-content relative z-10 mx-auto max-w-6xl px-5 py-16">
        <PortfolioReturnLink />
        <p className="eyebrow mt-10">
          {project.flagship ? "Flagship case study" : "Case study"}
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold md:text-7xl">
          {project.name}
        </h1>
        {project.fullTitle && (
          <p className="mt-3 max-w-4xl text-lg text-white/60">{project.fullTitle}</p>
        )}
        <p className="mt-3 text-xl text-violet">{project.tag}</p>
        <p className="mt-4 max-w-2xl text-white/70">{project.desc}</p>

        <div className="mt-10">
          <ProjectImage project={project} preload />
        </div>

        <CaseStudySection heading="Problem" content={project.problem} />
        <CaseStudySection heading="My role" content={project.role} />
        <CaseStudySection heading="Approach" content={project.approach} />
        <EngineeringChallenges project={project} />

        <section className="mt-12">
          <h2 className="eyebrow mb-3">Technologies & platforms</h2>
          {project.stack.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((technology) => (
                <li
                  key={technology}
                  className="technology-chip rounded-md border border-electric/30 px-3 py-1.5"
                >
                  {technology}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/60">
              Implementation technologies have not yet been provided.
            </p>
          )}
        </section>

        <section
          aria-labelledby="project-demo-title"
          className="mt-14 scroll-mt-24"
        >
          <p className="eyebrow">Interactive portfolio demonstration</p>
          <h2
            id="project-demo-title"
            className="mt-2 font-display text-3xl font-bold sm:text-4xl"
          >
            Try the experience.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
            Interact with a browser-based demonstration of this project’s documented workflows.
            Demo data stays in this page; no real accounts, production systems, or transactions are used.
          </p>
          <div className="mt-6">
            <ProjectDemo projectId={project.id} />
          </div>
        </section>

        {project.id === "red-warriors" && <RedWarriorsExplorer />}

        <CaseStudySection heading="Outcome" content={project.outcome} />

        <div className="mt-12 flex flex-wrap gap-4">
          {project.demo && (
            <a
              className="rounded-full bg-electric px-6 py-3 text-text-on-accent"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              Visit website ↗
            </a>
          )}
          {project.repo && (
            <a
              className="rounded-full border border-white/25 px-6 py-3"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
            >
              GitHub repository ↗
            </a>
          )}
        </div>

        <Link
          href={`/projects/${nextProject.id}`}
          className="mt-16 block border-t border-white/10 pt-6 hover:text-cyan"
        >
          Next project: {nextProject.name} →
        </Link>
      </main>
    </>
  );
}
