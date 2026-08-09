export function CertaintyBadge() {
  return (
    <div className="pointer-events-none absolute right-6 bottom-6 hidden flex-col items-center gap-3 xl:flex">
      <span className="rotate-90 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
        Speak with certainty
      </span>
      <span className="h-8 w-px bg-linear-to-b from-lime to-white/20" />
    </div>
  );
}
