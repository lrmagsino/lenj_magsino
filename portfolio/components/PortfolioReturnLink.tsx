"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasPendingPortfolioReturn } from "@/lib/portfolioNavigation";

export default function PortfolioReturnLink() {
  const pathname = usePathname();

  return (
    <Link
      href="/#projects"
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        const savedProject = pathname.split("/").at(-1);
        if (savedProject && hasPendingPortfolioReturn(savedProject)) {
          event.preventDefault();
          window.history.back();
        }
      }}
      className="text-cyan hover:underline"
    >
      ← Back to portfolio
    </Link>
  );
}
