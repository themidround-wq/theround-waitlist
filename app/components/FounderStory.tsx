import { PauseIcon } from "./icon";
import { Reveal, RevealGroup, RevealItem } from "./motion";

const WAVEFORM_BARS = [
  6.6, 10.7, 19.3, 17.6, 22.3, 19.7, 13.9, 12.7, 5.1, 13.7, 15.2, 18.0, 21.3,
  23.0, 13.8, 9.7, 10.7, 18.5, 19.7, 20.7, 25.7, 16.3, 19.1, 9.4, 7.6, 12.6,
  18.1, 24.3, 19.2, 20.2, 16.6, 9.3, 11.6, 12.8, 16.5, 19.5, 23.0, 18.5, 13.3,
  10.2, 11.7, 15.3, 22.8, 23.5,
];

const STUDENT_NOTES = [
  {
    number: "01",
    quote: "“I loved that there was no stressful onboarding. I could just start.”",
    tag: "Ease",
  },
  {
    number: "02",
    quote:
      "“It should let you submit your answer, not just hear the topic and walk away.”",
    tag: "Completion",
  },
  {
    number: "03",
    quote:
      "“Something that listens to how I actually speak would help me get louder and clearer.”",
    tag: "Confidence",
  },
];

const STATS = [
  { value: "5/5", label: "Would use it" },
  { value: "5/5", label: "Would recommend it" },
  { value: "48", label: "Clinical topics written" },
  { value: "8", label: "Midwifery categories" },
];

export function FounderStory() {
  return (
    <section className="relative z-20 bg-ink px-4 py-16 text-cream sm:px-6 lg:px-[6.32%] lg:py-24">
      <div className="flex items-center justify-between gap-4 border-b border-cream/10 pb-4">
        <span className="sm:text-[13px] text-[10px] font-bold uppercase tracking-[0.2em] text-cream/55">
          03 · Why the round exists
        </span>
        <span className="text-[13px] md:block hidden font-bold uppercase tracking-[0.14em] text-lime">
          Built with students, not around them
        </span>
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 lg:mt-14">
        <span className="sm:text-xs text-[8px] font-bold uppercase tracking-[0.2em] text-cream/50">
          A note from the founder
        </span>
        <span className="sm:block hidden text-xs font-bold uppercase tracking-[0.2em] text-cream/40">
          Enugu, Nigeria
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
        <Reveal>
          <h2 className="text-[49px] font-medium md:font-bold leading-[0.92] tracking-tight sm:text-[64px] lg:text-[121px]">
            I built the practice tool I kept looking for.
          </h2>

          <p className="mt-6 max-w-xl text-sm sm:text-base text-cream/60 lg:mt-8 lg:text-lg">
            Midwifery school gave me plenty of ways to study quietly, but
            almost no way to practise answering out loud. So I built the
            first version of The Round, gave it to five students, and
            listened to what happened next.
          </p>

          <div className="mt-8 flex items-center gap-4 lg:mt-10">
            <span className="-rotate-6 font-serif-italic text-3xl italic text-lime">
              Nkem
            </span>
            <span className="h-8 w-px bg-cream/20" />
            <span className="text-xs leading-tight font-bold tracking-[0.14em] text-cream/50 uppercase">
              Founder
              <br />
              Midwifery student
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="w-full max-w-md justify-self-center lg:justify-self-end">
          <div className="relative overflow-hidden rounded-4xl bg-lime p-6 text-ink shadow-2xl sm:p-8 rotate-[1.5deg]">
            <div
              className="absolute top-0 right-0 h-10 w-10 bg-ink"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />

            <div className="flex items-center justify-between gap-4 text-[13px] font-bold uppercase tracking-[0.14em]">
              <span>Voice note · 00:24</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                Playing
              </span>
            </div>

            <div className="mt-4 border-t border-ink/15" />

            <p className="mt-6 text-2xl leading-snug font-medium lg:text-[28px]">
              &ldquo;Study tools trained my memory. I needed something that
              trained me to say what I knew.&rdquo;
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-lime">
                <PauseIcon className="h-4 w-4" />
              </span>
              <div className="flex h-8 flex-1 items-center gap-0.75 overflow-hidden">
                {WAVEFORM_BARS.map((h, i) => (
                  <span
                    key={i}
                    className={`w-0.75 shrink-0 rounded-full ${i < 24 ? "bg-ink/80" : "bg-white"
                      }`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-24 flex flex-col gap-6 lg:mt-32 lg:flex-row lg:items-end lg:justify-between">
          <h3 className="text-[32px] leading-[0.95] font-medium tracking-tight sm:text-[48px] lg:text-[83px]">
            Then I handed it to five
            <br />
            students.
          </h3>
          <p className="max-w-sm text-sm text-cream/50 lg:text-base">
            Not polished praise. Specific feedback that changed what The
            Round became.
          </p>
        </div>
      </Reveal>

      <RevealGroup className="mt-12 grid w-full grid-flow-col auto-cols-[81%] overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 sm:auto-cols-[calc(50%-0.75rem)] sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:mt-16">
        {STUDENT_NOTES.map((note) => (
          <RevealItem
            key={note.number}
            className="relative bg-no-repeat px-6 py-10 text-ink sm:px-7 sm:py-11 snap-start"
            style={{
              backgroundImage: "url(/review-card-bg.png)",
              backgroundSize: "100% 100%",
            }}
          >
            <span className="text-[11px] font-bold tracking-[0.14em] text-ink/50 uppercase">
              Student {note.number}
            </span>
            <p className="mt-6 text-xl leading-snug sm:text-2xl">
              {note.quote}
            </p>
            <span className="mt-8 inline-block rounded-full bg-moss/15 px-4 py-1.5 text-[11px] font-bold tracking-widest text-moss uppercase">
              {note.tag}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-16 grid grid-cols-2 border-t border-b border-cream/15 sm:grid-cols-4 lg:mt-20">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="border-cream/15 py-8 pr-6  border-b not-nth-[2n+1]:border-l not-nth-[2n+1]:pl-6 sm:not-nth-[4n+1]:border-l sm:not-nth-[4n+1]:pl-11"
          >
            <p className="text-5xl font-medium text-cream lg:text-6xl">
              {stat.value}
            </p>
            <p className="mt-6 text-xs font-bold tracking-[0.14em] text-cream/50 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
