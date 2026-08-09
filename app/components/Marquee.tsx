import { Sparkle } from "./icon";

const TICKER_ITEMS = [
  "Antenatal care",
  "Labour & birth",
  "Newborn care",
  "Clinical ethics",
  "High-risk pregnancy",
];

export function Marquee() {
  return (
    <div className="relative mt-auto overflow-hidden border-t border-white/10 py-3 lg:py-4">
      <div className="flex w-max animate-marquee gap-10">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.18em] text-white/45"
          >
            {item}
            <Sparkle className="h-3 w-3 text-lime/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
