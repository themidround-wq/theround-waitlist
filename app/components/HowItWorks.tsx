import { ArrowDownIcon } from "./icon";
import { Reveal } from "./motion";

export function HowItWorks() {
  return (
    <section className="bg-white px-4 py-16 text-ink sm:px-6 lg:px-[6.32%] lg:py-24">
      <div className="flex items-center justify-between gap-4 border-b border-cream pb-4">
        <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate">
          How one round works
        </span>
        <span className="text-[13px] font-medium text-slate/60">01—04</span>
      </div>

      <Reveal>
        <h2
          className="mt-16 font-medium text-[54px] leading-[47.2px] tracking-[-4.22px]
          sm:text-[84px] sm:leading-[70.8px] sm:tracking-[-6.33px]
          md:mt-24 md:text-[110px] md:leading-[92.7px] md:tracking-[-8.28px]
          lg:mt-32 lg:text-[132px] lg:leading-[111.28px] lg:tracking-[-9.94px]"
        >
          You don&apos;t choose
          <br />
          the topic.
          <br />
          <span className="font-serif-italic font-normal italic text-moss tracking-normal">
            That&apos;s the point.
          </span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-16 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end lg:mt-24">
          <p className="max-w-md text-base leading-relaxed text-slate lg:text-[20px]">
            Comfortable topics hide the gaps. The Round finds them—and gives
            you a way to work through them.
          </p>

          <div className="flex shrink-0 items-center gap-4">
            <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
              Scroll to begin
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white">
              <ArrowDownIcon className="h-5 w-5" />
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
