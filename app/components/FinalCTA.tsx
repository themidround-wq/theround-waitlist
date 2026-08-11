"use client";

import { useState, type SubmitEvent } from "react";
import { ArrowIcon } from "./icon";
import { Reveal } from "./motion";
import { SuccessModal } from "./SuccessModal";

export function FinalCTA() {
  const [open, setOpen] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setQueuePosition(1000 + Math.floor(Math.random() * 9000));
    setOpen(true);
    event.currentTarget.reset();
  }

  return (
    <section className="relative z-30 overflow-hidden bg-lime px-4 py-20 sm:px-6 lg:px-[6.32%] lg:py-28">
      <div className="pointer-events-none absolute inset-6 rounded-[56px] border border-dashed border-ink/25 " />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <div className="w-fit rounded-full border border-white/40 bg-white/25 px-6 py-2.5">
            <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
              Your invitation to practice
            </span>
          </div>

          <h2 className="mt-10 text-[40px] leading-[0.95] font-medium tracking-tight text-ink sm:text-[64px] md:mt-12 md:text-[96px] lg:mt-14 lg:text-[106px]">
            Your first round starts
            <br />
            <span className="font-serif-italic font-normal italic">
              before the room is
            </span>
            <br />
            <span className="font-serif-italic font-normal italic">
              listening.
            </span>
          </h2>

          <p className="mt-6 w-[93%] sm:max-w-xl text-base text-ink/65 lg:text-xl">
            Join the founding waitlist. We&apos;ll let you know when
            it&apos;s time to spin.
          </p>
        </Reveal>

        <Reveal
          delay={0.15}
          className="relative mt-10 w-[92%] md:w-full max-w-186.5 rounded-[15px]  bg-white text-left shadow-xl lg:mt-14"
        >

          <div className="pointer-events-none absolute top-0 rounded-[15px] right-0 h-4 w-4">
            <div
              className="absolute inset-0 bg-gray-300 rotate-180"
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%)" }}
            />
          </div>




          <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-4 sm:px-7">
            <span className="flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink/5">
                <span className="h-2 w-2 rounded-full bg-moss" />
              </span>
              Private beta
            </span>
            <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-gray-400">
              Reserve your place
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 border-b border-black/10 px-5 py-4 sm:px-7"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/5 text-sm text-ink">
              @
            </span>
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full bg-transparent text-sm text-ink placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-full bg-ink py-2 pl-4 pr-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-transform hover:scale-[1.02]"
            >
              <span className="sm:block hidden">
                Join the waitlist</span>
              <span className="block sm:hidden">
                Join</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime text-ink">
                <ArrowIcon className="h-3 w-3" />
              </span>
            </button>
          </form>

          <div className="px-5 py-3.5 sm:px-7">
            <span className="text-sm text-gray-400">
              One useful email when your invitation is ready.
            </span>
          </div>
        </Reveal>
      </div>

      <SuccessModal
        open={open}
        onClose={() => setOpen(false)}
        queuePosition={queuePosition}
      />
    </section>
  );
}
