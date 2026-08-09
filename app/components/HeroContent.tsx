"use client";

import { useState, type SubmitEvent } from "react";
import { ArrowIcon } from "./icon";
import { SuccessModal } from "./SuccessModal";

export function HeroContent() {
  const [open, setOpen] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setQueuePosition(1000 + Math.floor(Math.random() * 9000));
    setOpen(true);
    event.currentTarget.reset();
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
        Random topic · Timed response
      </p>

      <h1 className="mt-3 text-[44px] font-medium leading-[0.94] tracking-tight text-cream sm:text-[56px] lg:mt-5 lg:text-[86px]">
        Find the words
        <span className="text-lime">.</span>
        <br />
        One <span className="text-lime">round</span> at a
        <br />
        time
        <span className="text-lime">.</span>
      </h1>

      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55 lg:mt-6">
        Get a clinical topic you didn&apos;t choose and answer it against the
        clock. Replay what you said, notice what needs work, and go again —{" "}
        <span className="font-medium text-cream">
          until the words come easier.
        </span>
      </p>

      <form
        id="waitlist"
        onSubmit={handleSubmit}
        className="mt-5 flex w-full max-w-md items-center gap-2 rounded-full border border-white/10 bg-black/25 p-1.5 pl-4 backdrop-blur-sm lg:mt-8"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lime/50 text-[11px] text-lime">
          @
        </span>
        <input
          type="email"
          required
          placeholder="Your email address"
          className="w-full bg-transparent py-2 text-sm text-cream placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center gap-2 rounded-full bg-lime py-2.5 pl-4 pr-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#101a12] transition-transform hover:scale-[1.02]"
        >
          Join the waitlist
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#101a12] text-lime">
            <ArrowIcon className="h-3 w-3" />
          </span>
        </button>
      </form>

      <SuccessModal
        open={open}
        onClose={() => setOpen(false)}
        queuePosition={queuePosition}
      />
    </div>
  );
}
