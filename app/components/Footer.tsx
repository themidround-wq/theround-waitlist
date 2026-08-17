"use client";

import { useEffect, useState } from "react";
import { ArrowIcon, ArrowUpIcon } from "./icon";
import { Reveal } from "./motion";
import Logo from "../../public/Logo-on-whitebg.png";
import Image from "next/image";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Africa/Lagos",
        }).format(new Date()),
      );
    }
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return <span>{time ?? "--:--"}</span>;
}

export function Footer() {
  return (
    <footer className="relative z-40 border-t border-cream bg-white px-4 py-16 text-ink sm:px-6 lg:px-[6.32%] lg:py-24">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
        <Reveal>
          <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate">
            That&apos;s one round.
          </span>

          <h2 className="mt-6 text-[54px] font-medium leading-[0.95] tracking-tight sm:text-[72px] lg:text-[96px]">
            Ready for
            <br />
            <span className="relative inline-block text-moss">
              another?
              <svg
                viewBox="0 0 200 16"
                className="absolute -bottom-2 left-0 h-3 w-full text-lime"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 10 Q 26 2 50 10 T 98 10 T 146 10 T 198 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-8 max-w-sm text-base text-slate lg:text-lg">
            Built between lectures, placements, and brave first attempts.
          </p>
        </Reveal>

        <Reveal
          delay={0.15}
          className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80 lg:ml-auto lg:mr-8 lg:h-96 lg:w-96"
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-ink/10" />

          <div className="absolute left-[9%] top-[26%] z-10 -rotate-6 whitespace-nowrap rounded-lg bg-lime px-3 py-2 text-center text-[10px] font-bold uppercase leading-tight tracking-[0.06em] text-ink shadow-lg">
            Spin back
            <br />
            to the top
          </div>

          <div className="absolute inset-8 rounded-full bg-ink shadow-2xl sm:inset-10 lg:inset-12">
            <span
              className="absolute left-1/2 -top-2 z-10 h-0 w-0 -translate-x-1/2"
              style={{
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "9px solid #caff79",
              }}
            />

            <span className="absolute left-1/2 top-6 -translate-x-1/2 text-[11px] font-bold uppercase tracking-[0.14em] text-cream/90">
              Spin
            </span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[11px] font-bold uppercase tracking-[0.14em] text-cream/90">
              Speak
            </span>
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-[0.14em] text-cream/90">
              Listen
            </span>
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[11px] font-bold uppercase tracking-[0.14em] text-cream/90">
              Save
            </span>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute h-28 w-28 rounded-full bg-white" />
              <a
                href="#top"
                aria-label="Back to top"
                className="relative flex h-24 w-24 items-center justify-center rounded-full bg-lime text-ink shadow-lg transition-transform hover:scale-105"
              >
                <ArrowUpIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 flex flex-col items-center gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:justify-between lg:mt-28">
        <div className="sm:block hidden">
          <Image src={Logo} alt="The Round Logo" width={120} />
        </div>

        <div className="flex items-center sm:justify-normal justify-between sm:w-auto w-[97%] sm:border-0 border-ink/10 border-b sm:gap-6 pb-4 sm:py-0 text-sm text-slate">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-start sm:items-center gap-1 transition-colors hover:text-ink"
            >
              {link.label}
              <ArrowIcon className="h-3 w-3" />
            </a>
          ))}
        </div>

        <span className="sm:block hidden text-[13px] font-bold uppercase tracking-[0.14em] text-moss">
          &copy; 2026 &middot; Nigeria &middot; <LiveClock />
        </span>

        {/* Mobile */}
        <div className="sm:hidden flex items-center justify-between w-[97%]">
          <div className="block">

            <Image src={Logo} alt="The Round Logo" width={100} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8B9187]">
              &copy; 2026 &middot; Nigeria &middot; <span className="text-moss"><LiveClock /></span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
