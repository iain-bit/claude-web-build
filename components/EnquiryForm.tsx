"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/components/Analytics";

const HEARD_FROM = [
  "Google search",
  "AI tool (ChatGPT, Claude, Gemini, Perplexity etc.)",
  "LinkedIn",
  "X (Twitter)",
  "Referral or word of mouth",
  "Event",
  "Other",
] as const;

/**
 * Shared enquiry form for Clients/Candidates/Contact, all pointing at one
 * Formspree form (NEXT_PUBLIC_FORMSPREE_FORM_ID). `source` is sent as a
 * hidden field so submissions can be told apart in the Formspree inbox.
 */
export default function EnquiryForm({
  formId,
  source,
  enquiryLabel = "How can we help?",
}: {
  formId: string | undefined;
  source: string;
  enquiryLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formId) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        trackEvent("generate_lead", {
          form: source,
          heard_from: String(data.get("heard_from") ?? ""),
        });
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white/60 p-8 text-center">
        <p className="font-heading text-xl font-bold text-forest">
          Thanks — we&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="source" value={source} />
      {/* Spam trap: hidden from people, filled in by bots. Formspree rejects
          any submission where it has a value. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-sans text-sm text-forest/80">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-sage/30 bg-white/70 px-4 py-3 font-sans text-sm text-forest outline-none focus:border-bronze"
          />
        </div>
        <div>
          <label htmlFor="phone" className="font-sans text-sm text-forest/80">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-lg border border-sage/30 bg-white/70 px-4 py-3 font-sans text-sm text-forest outline-none focus:border-bronze"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="font-sans text-sm text-forest/80">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-sage/30 bg-white/70 px-4 py-3 font-sans text-sm text-forest outline-none focus:border-bronze"
        />
      </div>

      <div>
        <label htmlFor="message" className="font-sans text-sm text-forest/80">
          {enquiryLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-lg border border-sage/30 bg-white/70 px-4 py-3 font-sans text-sm text-forest outline-none focus:border-bronze"
        />
      </div>

      <div>
        <label htmlFor="heard_from" className="font-sans text-sm text-forest/80">
          How did you hear about us?
        </label>
        <select
          id="heard_from"
          name="heard_from"
          required
          defaultValue=""
          className="mt-1 w-full rounded-lg border border-sage/30 bg-white/70 px-4 py-3 font-sans text-sm text-forest outline-none focus:border-bronze"
        >
          <option value="" disabled>
            Please choose
          </option>
          {HEARD_FROM.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <p className="font-sans text-xs text-forest/60">
        We&apos;ll use your details to respond to your enquiry. See our{" "}
        <Link href="/privacy" className="underline decoration-sage/50 underline-offset-4 hover:text-forest">
          Privacy Policy
        </Link>
        .
      </p>

      {status === "error" && (
        <p className="font-sans text-sm text-red-700">
          {formId
            ? "Something went wrong sending your message — please try again or email us directly."
            : "Form isn't connected yet (no Formspree ID configured)."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-bronze px-6 py-3 font-sans text-sm font-medium text-stone transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
