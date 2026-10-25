"use client";

import { useExperience } from "@/components/Experience";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Motion from "@/components/Motion";
import PortfolioIntro from "@/components/PortfolioIntro";
import EducationTimeline from "@/components/EducationTimeline";
import ExperienceActivities from "@/components/ExperienceActivities";
import CertificationGallery from "@/components/CertificationGallery";
import { About, Skills, Projects, Contact } from "@/components/Sections";

export default function PortfolioExperience({
  resumeAvailable,
}: {
  resumeAvailable: boolean;
}) {
  const { phase } = useExperience();
  const mainActive = phase === "main-entering" || phase === "ready";
  const motionActive = phase === "main-entering" || phase === "ready";

  return (
    <>
      <Nav resumeAvailable={resumeAvailable} />
      <PortfolioIntro />
      <main
        id="main"
        data-experience-phase={phase}
        aria-hidden={!mainActive}
        inert={!mainActive}
        className="experience-main relative isolate"
        style={{ visibility: mainActive ? "visible" : "hidden" }}
      >
        <Hero resumeAvailable={resumeAvailable} />
        <About />
        <Skills />
        <Projects />
        <EducationTimeline />
        <ExperienceActivities />
        <CertificationGallery />
        <Contact />
        {motionActive && <Motion />}
      </main>
    </>
  );
}
