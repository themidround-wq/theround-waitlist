"use server";

import { apiUrl } from "@/lib/api";

type JoinWaitlistResult =
  | { success: false; error: string }
  | { success: true; ticketNumber: number };

type WaitlistResponse = { ticketNumber: number };

export async function joinWaitlist(
  formData: FormData
): Promise<JoinWaitlistResult> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Enter a valid email address." };
  }

  // theround-service stores the signup and sends the confirmation email
  // (only for new signups, so re-submitting cannot re-trigger mail).
  let entry: WaitlistResponse;
  try {
    const res = await fetch(apiUrl("/waitlist"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (res.status === 400) {
      return { success: false, error: "Enter a valid email address." };
    }
    if (!res.ok) throw new Error(`Waitlist API responded ${res.status}`);

    entry = (await res.json()) as WaitlistResponse;
  } catch (error) {
    console.error("joinWaitlist failed", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true, ticketNumber: entry.ticketNumber };
}
