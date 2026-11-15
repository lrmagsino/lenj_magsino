"use client";

import dynamic from "next/dynamic";

const LoadingDemo = () => (
  <div role="status" className="rounded-2xl border border-white/10 bg-charcoal/50 p-6 text-sm text-white/65">
    Loading this project’s interactive demonstration…
  </div>
);

const demos = {
  docugraph: dynamic(() => import("@/components/demos/DocuGraphDemo"), {
    ssr: false,
    loading: LoadingDemo,
  }),
  mayari: dynamic(() => import("@/components/demos/MayariDemo"), {
    ssr: false,
    loading: LoadingDemo,
  }),
  "red-warriors": dynamic(() => import("@/components/demos/RedWarriorsDemo"), {
    ssr: false,
    loading: LoadingDemo,
  }),
  "cs-expo-2026": dynamic(() => import("@/components/demos/CSExpoDemo"), {
    ssr: false,
    loading: LoadingDemo,
  }),
  wedding: dynamic(() => import("@/components/demos/WeddingDemo"), {
    ssr: false,
    loading: LoadingDemo,
  }),
};

type DemoId = keyof typeof demos;

export default function ProjectDemo({ projectId }: { projectId: string }) {
  if (!(projectId in demos)) return null;
  const Demo = demos[projectId as DemoId];
  return <Demo />;
}
