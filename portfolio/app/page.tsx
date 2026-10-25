import { existsSync } from "node:fs";
import { join } from "node:path";
import { ExperienceProvider } from "@/components/Experience";
import PortfolioExperience from "@/components/PortfolioExperience";

export default function Page() {
  const resumeAvailable = existsSync(join(process.cwd(), "public", "resume", "lenj-magsino.pdf"));
  return (
    <ExperienceProvider>
      <PortfolioExperience resumeAvailable={resumeAvailable} />
    </ExperienceProvider>
  );
}
