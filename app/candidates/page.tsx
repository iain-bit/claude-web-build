import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "AI, Data & Data Centre Careers | Lumiq Talent",
  description:
    "Career advice and roles for AI, machine learning, data and data centre professionals in Australia, from specialist recruiters who listen.",
  alternates: { canonical: "/candidates" },
};

export default function Candidates() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <h1 className="font-heading text-4xl font-bold text-forest sm:text-5xl">
        Candidates
      </h1>
      <p className="mt-6 max-w-2xl font-sans text-forest/80">
        We know that a job move is more than a job title, it&apos;s your next
        chapter. At Lumiq, we take the time to understand where you&apos;ve
        been and where you want to go, matching you with roles and companies
        that are genuinely the right fit, not just the next opening. Backed
        by deep specialisation in AI, Data &amp; Analytics, and Engineering, we
        advise honestly, listen thoughtfully, and never rush a decision that
        matters this much.
      </p>

      <div className="mt-16 max-w-xl rounded-2xl bg-white/60 p-8">
        <h2 className="font-heading text-2xl font-bold text-forest">
          Tell us about your next move
        </h2>
        <p className="mt-2 font-sans text-sm text-forest/70">
          Give us a few details and we&apos;ll get back to you.
        </p>
        <div className="mt-6">
          <EnquiryForm
            formId={process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}
            source="candidates"
            enquiryLabel="What are you looking for next?"
          />
        </div>
      </div>
    </div>
  );
}
