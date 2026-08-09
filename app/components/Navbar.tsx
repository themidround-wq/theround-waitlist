import { ArrowIcon, WaveformIcon } from "./icon";

export function Navbar() {
  return (
    <header className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-[9.72%]">
      <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/15 py-2 pl-2 pr-2 backdrop-blur-sm sm:pl-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-lime/40 text-lime">
            <WaveformIcon className="h-5 w-5" />
          </span>
          <span className="flex items-start gap-0.5 text-[16px] lg:text-xl font-medium text-cream">
            the round
            <sup className="mt-0.5 text-[10px] font-normal text-lime">®</sup>
          </span>
        </div>

        <div className="hidden items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] md:flex">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
          <span className="text-cream/95">Clinical speaking practice</span>
          <span className="h-3.5 w-px bg-white/25" />
          <span className="font-medium tracking-[0.14em] text-white/45">
            For student midwives
          </span>
        </div>

        <a
          href="#waitlist"
          className="relative flex items-center gap-3 rounded-md rounded-tr-none rounded-bl-none bg-cream py-1.5 pl-5 pr-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#101a12] transition-transform hover:scale-[1.02]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-2 w-2 bg-ink"
            style={{ clipPath: "polygon(100% 0%, 0% 0%, 100% 100%)" }}
          />
          <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-2 w-2">
            <span
              className="absolute inset-0 bg-lime"
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 0% 0%)" }}
            />
            <span
              className="absolute inset-0 bg-ink"
              style={{ clipPath: "polygon(0% 100%, 70% 0%, 0% 0%)" }}
            />
          </span>
          Join the waitlist
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#101a12] text-cream">
            <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </header>
  );
}
