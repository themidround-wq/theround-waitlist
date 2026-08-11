"use client";

import { useRef, useState, type TransitionEvent } from "react";
import { PauseIcon } from "./icon";
import { Reveal } from "./motion";

const TOTAL_STEPS = 4;

type WheelTopic = { title: string; question: string };

type WheelSegment = {
  label: string;
  /** Relative odds of landing on this segment on any given spin. Does not need to sum to 100 — it's normalized at pick time. */
  weight: number;
  topics: WheelTopic[];
};

// Position around the wheel matches array order (index 0 = top, clockwise
// in 45deg steps). Weight reflects how often each category should come up —
// higher-yield/higher-frequency clinical areas are weighted heavier so the
// spin leans toward what students most need reps on, without ever excluding
// the rarer categories.
const WHEEL_SEGMENTS: WheelSegment[] = [
  {
    label: "Labour & delivery",
    weight: 20,
    topics: [
      {
        title: "Postpartum haemorrhage",
        question:
          "What are your first three actions when the uterus won't contract after delivery?",
      },
      {
        title: "Cord prolapse",
        question:
          "Talk through your immediate response to a prolapsed cord in second stage.",
      },
      {
        title: "Shoulder dystocia",
        question:
          "Walk through the manoeuvres you'd attempt, in order, for shoulder dystocia.",
      },
    ],
  },
  {
    label: "Ethics",
    weight: 8,
    topics: [
      {
        title: "Informed refusal",
        question:
          "A client declines a recommended intervention. Walk through your response.",
      },
    ],
  },
  {
    label: "Antenatal",
    weight: 15,
    topics: [
      {
        title: "Pre-eclampsia",
        question:
          "What symptoms would prompt you to escalate a routine antenatal check?",
      },
      {
        title: "Gestational diabetes",
        question:
          "Explain how you'd counsel a client newly diagnosed with gestational diabetes.",
      },
    ],
  },
  {
    label: "Family planning",
    weight: 10,
    topics: [
      {
        title: "Postpartum contraception",
        question:
          "How would you counsel a breastfeeding client on contraceptive options?",
      },
    ],
  },
  {
    label: "Postpartum",
    weight: 15,
    topics: [
      {
        title: "Secondary PPH",
        question:
          "How would you assess a client with heavy bleeding on day 6 postpartum?",
      },
      {
        title: "Perineal care",
        question:
          "Explain your assessment and advice for a second-degree tear healing poorly.",
      },
    ],
  },
  {
    label: "Newborn",
    weight: 12,
    topics: [
      {
        title: "Neonatal resuscitation",
        question:
          "Talk through the first minute of life for a baby not breathing at birth.",
      },
      {
        title: "Jaundice",
        question: "What would make you refer a jaundiced newborn urgently?",
      },
    ],
  },
  {
    label: "High-risk",
    weight: 12,
    topics: [
      {
        title: "Placental abruption",
        question:
          "Describe how you'd recognise and respond to suspected placental abruption.",
      },
      {
        title: "Amniotic fluid embolism",
        question:
          "What are the early warning signs of amniotic fluid embolism?",
      },
    ],
  },
  {
    label: "Public health",
    weight: 8,
    topics: [
      {
        title: "Vaccine hesitancy",
        question:
          "How would you approach a conversation about vaccine hesitancy in antenatal care?",
      },
    ],
  },
];

/** Weighted random index pick — larger `weight` values are proportionally more likely. */
function pickWeightedIndex(weights: number[]) {
  const total = weights.reduce((sum, w) => sum + w, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    if (roll < weights[i]) return i;
    roll -= weights[i];
  }
  return weights.length - 1;
}

const RESPONSE_WAVEFORM = [
  30, 18, 55, 40, 70, 48, 32, 60, 44, 26, 38, 66, 50, 74, 42, 30, 58, 46, 34,
  62, 40, 28, 50, 36,
];

const BARCODE_BARS = [
  2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 2, 1, 4, 1, 2, 3, 1,
  1, 2,
];

function CornerMark({ className }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none select-none text-lg font-light text-ink/20 ${className ?? ""}`}
    >
      +
    </span>
  );
}

function StepPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-[#eeecd6]  px-6 py-10 sm:px-10 sm:py-12">
      <CornerMark className="absolute right-6 top-6" />
      <CornerMark className="absolute bottom-6 left-6" />

      <span className="block text-center text-[13px] font-bold uppercase tracking-[0.2em] text-slate/70">
        The round / Practice 001
      </span>

      <div className="mt-12 flex min-h-72 items-center justify-center sm:mt-16">
        {children}
      </div>
    </div>
  );
}

const SEGMENT_ANGLE = 360 / WHEEL_SEGMENTS.length;
const SPIN_DURATION_MS = 3200;
const EXTRA_SPINS = 5;

type SpinResult = { index: number; topic: WheelTopic };

/**
 * How far (mod 360) the dial must turn so segment `index` ends up under the
 * fixed top pointer, with a small random offset so it doesn't always land
 * dead-center (kept inside the segment, clear of the divider lines).
 */
function targetRotationForIndex(index: number) {
  const jitter = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.6);
  return (((360 - index * SEGMENT_ANGLE + jitter) % 360) + 360) % 360;
}

function SpinWheelVisual() {
  const radius = 118;

  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<SpinResult | null>(null);
  const pendingResult = useRef<SpinResult | null>(null);

  function handleSpin() {
    if (spinning) return;

    const weights = WHEEL_SEGMENTS.map((segment) => segment.weight);
    let index = pickWeightedIndex(weights);
    // Avoid landing on the same category twice in a row when there's a choice.
    if (WHEEL_SEGMENTS.length > 1 && index === result?.index) {
      index = pickWeightedIndex(weights);
    }

    const topics = WHEEL_SEGMENTS[index].topics;
    const topic = topics[Math.floor(Math.random() * topics.length)];
    pendingResult.current = { index, topic };

    const targetMod = targetRotationForIndex(index);
    const currentMod = ((rotation % 360) + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta <= 0) delta += 360;

    setSpinning(true);
    setRotation(rotation + EXTRA_SPINS * 360 + delta);
  }

  function handleDialTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "transform" || !pendingResult.current) return;
    setResult(pendingResult.current);
    pendingResult.current = null;
    setSpinning(false);
  }

  return (
    <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-8">
      <div className="relative h-72 w-72 shrink-0 sm:h-80 sm:w-80">
        <span
          className="absolute left-1/2 -top-2 z-10 h-0 w-0 -translate-x-1/2"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "10px solid #caff79",
          }}
        />

        <div
          className="absolute inset-0 rounded-full border-[10px] border-white bg-ink shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.15, 0.85, 0.32, 1)`,
          }}
          onTransitionEnd={handleDialTransitionEnd}
        >
          <div className="absolute inset-5 rounded-full border border-dashed border-cream/15" />

          {WHEEL_SEGMENTS.map((_, i) => {
            const boundary = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{ transform: `rotate(${boundary}deg)` }}
              >
                <div className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-cream/10" />
              </div>
            );
          })}

          {WHEEL_SEGMENTS.map((segment, i) => {
            const angle = i * SEGMENT_ANGLE;
            const upright = angle > 90 && angle < 270 ? angle + 180 : angle;
            return (
              <div
                key={segment.label}
                className="absolute inset-0"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translateY(-${radius}px)`,
                  }}
                >
                  <span
                    className="block whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.1em] text-cream/80"
                    style={{ transform: `rotate(${upright - angle}deg)` }}
                  >
                    {segment.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-28 w-28 rounded-full border border-dashed border-cream/20" />
          <button
            type="button"
            onClick={handleSpin}
            disabled={spinning}
            className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-lime text-ink shadow-lg transition-transform enabled:hover:scale-105 disabled:cursor-not-allowed"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.1em]">
              {spinning ? "Spinning" : "Tap to"}
            </span>
            <span className="text-xl font-medium">
              {spinning ? "…" : "Spin"}
            </span>
          </button>
        </div>
      </div>

      <div className="flex w-full max-w-72 min-h-56 flex-col justify-center rounded-3xl bg-white p-5 shadow-xl">
        {result ? (
          <>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-moss">
              {WHEEL_SEGMENTS[result.index].label}
            </span>
            <p className="mt-3 text-2xl font-medium leading-tight text-ink">
              {result.topic.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              {result.topic.question}
            </p>
            <div className="mt-5 flex items-center justify-between rounded-full bg-ink py-2.5 pl-4 pr-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                Ready to speak
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime text-ink">
                &#8599;
              </span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate">
              Your topic
            </span>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              {spinning
                ? "Spinning…"
                : "Tap the wheel to get the topic you didn't pick."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function RecordingTimerVisual() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-white shadow-xl sm:h-72 sm:w-72">
        <div className="absolute inset-6 rounded-full border border-dashed border-ink/10" />
        <span className="absolute top-[30%] h-2 w-2 rounded-full bg-lime" />
        <div className="flex flex-col items-center">
          <span className="text-[88px] font-medium leading-none tracking-tight text-ink sm:text-[104px]">
            90
          </span>
          <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate">
            Seconds
          </span>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-[3px]">
        {Array.from({ length: 22 }).map((_, i) => (
          <span key={i} className="h-4 w-[3px] rounded-full bg-ink/70" />
        ))}
      </div>
      <span className="mt-4 text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
        Recording your response
      </span>
    </div>
  );
}

function WaveformPlayerVisual() {
  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate">
          Your response
        </span>
        <span className="text-sm text-slate/70">01:24 / 01:30</span>
      </div>

      <div className="mt-8 flex h-28 items-center gap-[5px] sm:mt-10">
        {RESPONSE_WAVEFORM.map((h, i) => (
          <span
            key={i}
            className={`w-2 shrink-0 rounded-full ${i % 3 === 1 ? "bg-moss" : "bg-ink"
              }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:flex-nowrap">
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-white"
        >
          <PauseIcon className="h-4 w-4" />
        </button>
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full w-[93%] rounded-full bg-moss" />
        </div>
        <span className="w-full text-sm text-slate sm:w-auto sm:shrink-0">
          Listen for clarity, structure and confidence.
        </span>
      </div>
    </div>
  );
}

function SavedRoundVisual() {
  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl sm:p-7">
      <div className="flex items-center justify-between border-b border-dashed border-ink/15 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
          Round 001
        </span>
        <span className="flex items-center gap-1.5 font-serif-italic text-sm italic text-moss">
          Saved
          <span aria-hidden>&#10003;</span>
        </span>
      </div>

      <span className="mt-5 block text-[11px] font-bold uppercase tracking-[0.14em] text-moss">
        Labour &amp; delivery
      </span>
      <p className="mt-2 text-2xl font-medium leading-tight text-ink sm:text-[28px]">
        Postpartum haemorrhage
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate">
        What are your first three actions when the uterus won&apos;t
        contract after delivery?
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-5 text-center">
        <div>
          <p className="text-base font-medium text-ink">01:30</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate/70">
            Duration
          </p>
        </div>
        <span className="h-8 w-px bg-ink/10" />
        <div>
          <p className="text-base font-medium text-ink">04 Aug</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate/70">
            Practiced
          </p>
        </div>
        <span className="h-8 w-px bg-ink/10" />
        <div>
          <p className="text-base font-medium text-ink">01</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate/70">
            Attempt
          </p>
        </div>
      </div>

      <div className="mt-6 flex h-8 items-center justify-center gap-[2px]">
        {BARCODE_BARS.map((w, i) => (
          <span
            key={i}
            className="h-full shrink-0 bg-ink"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  {
    number: "01",
    label: "Spin",
    headline: (
      <>
        Spin. Then meet the
        <br />
        topic you didn&apos;t pick.
      </>
    ),
    description:
      "No browsing toward familiar ground. The wheel chooses a clinically relevant topic at random.",
    visual: <SpinWheelVisual />,
  },
  {
    number: "02",
    label: "Speak",
    headline: (
      <>
        Say what you know
        <br />
        &mdash;now.
      </>
    ),
    description:
      "Choose 90 seconds or four minutes. The clock starts, the recorder listens, and you answer without a script.",
    visual: <RecordingTimerVisual />,
  },
  {
    number: "03",
    label: "Listen",
    headline: (
      <>
        Hear what thinking
        <br />
        felt like.
      </>
    ),
    description:
      "Play it back. Catch the pauses, missing structure, quiet delivery, and the parts that already sound clear.",
    visual: <WaveformPlayerVisual />,
  },
  {
    number: "04",
    label: "Save",
    headline: (
      <>
        Keep the attempt. Take
        <br />
        another round.
      </>
    ),
    description:
      "Your recording joins your practice history—proof of where you started and how your voice is changing.",
    visual: <SavedRoundVisual />,
  },
];

export function PracticeLoop() {
  return (
    <>
      {STEPS.map((step, i) => (
        <section
          key={step.number}
          style={{ top: i * 20, zIndex: i + 1 }}
          className="static flex lg:min-h-screen flex-col justify-center bg-white px-4 py-16 text-ink shadow-[0_-24px_50px_-20px_rgba(20,39,26,0.25)] sm:px-6 lg:sticky lg:px-[6.32%] lg:py-24"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
            <Reveal className="flex flex-col">
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate">
                The practice loop
              </span>

              <div className="mt-8 flex items-baseline gap-3 lg:mt-12">
                <span className="text-[80px] font-medium leading-none tracking-tight text-ink sm:text-[96px]">
                  {step.number}
                </span>
                <span className="text-2xl text-slate/40">/</span>
                <span className="text-2xl text-slate/40">
                  0{TOTAL_STEPS}
                </span>
              </div>

              <span className="mt-8 text-[13px] font-bold uppercase tracking-[0.14em] text-moss">
                {step.number} &middot; {step.label}
              </span>

              <h3 className="mt-3 text-[34px] font-medium leading-[1.05] tracking-tight text-ink sm:text-[44px]">
                {step.headline}
              </h3>

              <p className="mt-6 max-w-sm text-base text-slate lg:text-lg">
                {step.description}
              </p>

              <div className="mt-10 h-0.75 w-full max-w-md overflow-hidden rounded-full bg-cream">
                <div
                  className="h-full rounded-full bg-ink"
                  style={{ width: `${((i + 1) / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <StepPanel>{step.visual}</StepPanel>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
