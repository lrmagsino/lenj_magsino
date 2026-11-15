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
import AskLjmAssistant from "@/components/AskLjmAssistant";
import LenjiPTSection from "@/components/LenjiPTSection";
import { LenjiPTProvider } from "@/components/LenjiPTProvider";
import ProjectScrollIndicator from "@/components/ProjectScrollIndicator";

export default function PortfolioExperience({
  resumeAvailable,
}: {
  resumeAvailable: boolean;
}) {
  const { phase } = useExperience();
  const mainActive = phase === "main-entering" || phase === "ready";

  return (
    <LenjiPTProvider resumeAvailable={resumeAvailable}>
      <>
      <Nav resumeAvailable={resumeAvailable} />
      <PortfolioIntro />
      <Motion />
      {mainActive && (
        <>
          <AskLjmAssistant />
          <ProjectScrollIndicator />
        </>
      )}
      <main
        id="main"
        data-experience-phase={phase}
        aria-hidden={!mainActive}
        inert={!mainActive}
        className="experience-main theme-aware-content relative isolate"
        style={{ visibility: mainActive ? "visible" : "hidden" }}
      >
        <Hero resumeAvailable={resumeAvailable} />
        <About />
        <Skills />
        <Projects />
        <LenjiPTSection />
        <EducationTimeline />
        <ExperienceActivities />
        <CertificationGallery />
        <Contact />
      </main>
      </>
    </LenjiPTProvider>
  );
}
