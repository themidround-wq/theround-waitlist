"use server";

import { after } from "next/server";

import { sendWaitlistEmail } from "@/lib/email";
import { getSupabaseClient } from "@/lib/supabase";

const DUPLICATE_KEY_ERROR = "23505";

type JoinWaitlistResult =
  | { success: false; error: string }
  | { success: true; ticketNumber: number };

export async function joinWaitlist(
  formData: FormData
): Promise<JoinWaitlistResult> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Enter a valid email address." };
  }

  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("waitlist")
    .insert({ email })
    .select("id")
    .single();

  if (error) {
    if (error.code === DUPLICATE_KEY_ERROR) {
      const { data: existing } = await supabase
        .from("waitlist")
        .select("id")
        .eq("email", email)
        .single();

      if (existing) {
        return { success: true, ticketNumber: 1000 + Number(existing.id) };
      }
    }

    return { success: false, error: "Something went wrong. Please try again." };
  }

  const ticketNumber = 1000 + Number(data.id);

  // Runs after the response is sent, so a slow or failing Resend call never
  // delays the success modal or fails a signup that already landed in the DB.
  // Only new rows send: a duplicate signup returns early above, so re-submitting
  // the same address cannot be used to re-trigger mail to it.
  after(async () => {
    await sendWaitlistEmail({
      to: email,
      waitlistId: Number(data.id),
      ticketNumber,
    });
  });

  return { success: true, ticketNumber };
}
