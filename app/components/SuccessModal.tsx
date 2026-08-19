"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  BarcodeIcon,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  WhatsAppIcon,
  XIcon,
} from "./icon";

const EASE = [0.16, 1, 0.3, 1] as const;
const WAITLIST_URL = "https://theround.app/joinwaitlist";
const SHARE_TEXT =
  "I just joined the private beta waitlist for The Round — clinical speaking practice for student midwives.";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: EASE,
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    transition: { duration: 0.2, ease: EASE },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 18 },
  },
};

export function SuccessModal({
  open,
  onClose,
  ticketNumber,
}: {
  open: boolean;
  onClose: () => void;
  ticketNumber: number;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  async function handleCopy() {
    await navigator.clipboard.writeText(WAITLIST_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-success-heading"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-md rounded-[32px] bg-white p-8 text-center shadow-2xl sm:p-10"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close"
              variants={itemVariants}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
            >
              <CloseIcon className="h-4 w-4" />
            </motion.button>

            <motion.div
              variants={iconVariants}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-moss/10"
            >
              <CheckIcon className="h-8 w-8 text-moss" />
            </motion.div>

            <motion.h2
              id="waitlist-success-heading"
              variants={itemVariants}
              className="mt-6 text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              You&apos;re on the list!
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-base leading-relaxed text-slate"
            >
              We&apos;ve reserved your place in our private beta. We&apos;ll
              let you know as soon as it&apos;s your turn to spin.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="relative mt-8 flex rounded-2xl bg-ink text-left text-cream"
            >
              <span className="absolute left-[calc(100%-7rem)] top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              <span className="absolute left-[calc(100%-7rem)] bottom-0 h-5 w-5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white" />

              <div className="flex-1 border-r border-dashed border-white/20 px-5 py-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em]">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    Private beta
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cream/50">
                    Seat reserved &#10003;
                  </span>
                </div>
                <div className="flex items-start gap-3 pt-4">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-lime">
                    <CheckIcon className="h-2.5 w-2.5" />
                  </span>
                  <p className="text-[13px] leading-snug text-cream/60">
                    We&apos;ve reserved your place in our private beta.
                  </p>
                </div>
              </div>

              <div className="flex w-28 shrink-0 flex-col items-center justify-center gap-2 px-3 py-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cream/50">
                  Ticket no.
                </span>
                <span className="font-serif-italic text-2xl italic text-lime">
                  #{ticketNumber}
                </span>
                <BarcodeIcon className="h-4 w-16 text-cream/40" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate">
                Invite friends, spread the word.
              </span>

              <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-cream/70 py-3 pl-4 pr-3">
                <span className="truncate text-sm text-ink">
                  {WAITLIST_URL}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy waitlist link"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-ink transition-transform hover:scale-105"
                >
                  <CopyIcon className="h-4 w-4" />
                </button>
              </div>
              <span
                className={`mt-1.5 block text-xs font-medium text-moss transition-opacity ${copied ? "opacity-100" : "opacity-0"
                  }`}
              >
                Link copied
              </span>

              <div className="mt-2 flex items-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    SHARE_TEXT
                  )}&url=${encodeURIComponent(WAITLIST_URL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3 text-[13px] font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <XIcon className="h-3.5 w-3.5" />
                  Share on X
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${SHARE_TEXT} ${WAITLIST_URL}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-[13px] font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Share on WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
