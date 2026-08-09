"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowIcon, CheckIcon, CloseIcon } from "./icon";

const EASE = [0.16, 1, 0.3, 1] as const;

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
  queuePosition,
}: {
  open: boolean;
  onClose: () => void;
  queuePosition: number;
}) {
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
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-slate transition-colors hover:bg-ink/5 hover:text-ink"
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
              className="mt-8 rounded-2xl bg-[#eeecd6] p-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-moss">
                  Beta access ticket
                </span>
                <span className="font-serif-italic text-sm italic text-moss">
                  Confirmed &#10003;
                </span>
              </div>
              <div className="pt-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate">
                  Queue position
                </span>
                <p className="mt-1 text-2xl font-bold text-ink">
                  #{queuePosition}
                </p>
              </div>
            </motion.div>

            <motion.button
              type="button"
              onClick={onClose}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="mt-6 flex w-full items-center justify-between rounded-2xl bg-lime py-4 pl-6 pr-2 text-left text-[13px] font-bold uppercase tracking-[0.1em] text-ink"
            >
              Awesome, thanks!
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-lime">
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
