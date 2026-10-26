export default function CardInteractionHint({
  desktopLabel = "CLICK TO EXPLORE",
  mobileLabel = "TAP TO VIEW",
  className = "",
}: {
  desktopLabel?: string;
  mobileLabel?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`card-open-hint pointer-events-none absolute z-10 inline-flex items-center gap-2 rounded-full border border-cyan/35 bg-charcoal/85 px-3 py-2 font-mono text-[9px] tracking-[0.12em] text-cyan shadow-lg backdrop-blur-md transition duration-200 sm:text-[10px] ${className}`}
    >
      <span className="hidden sm:inline">{desktopLabel}</span>
      <span className="sm:hidden">{mobileLabel}</span>
      <span aria-hidden="true">↗</span>
    </span>
  );
}
