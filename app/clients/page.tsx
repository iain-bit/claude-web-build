import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import TestimonialCard from "@/components/TestimonialCard";
import { PLACEHOLDER_TESTIMONIALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Clients | Lumiq Talent",
  description:
    "An end-to-end talent advisory for AI, Data & Analytics, and Engineering hiring.",
};

const CLIENT_TESTIMONIALS = PLACEHOLDER_TESTIMONIALS.filter(
  (t) => t.context === "client"
);

export default function Clients() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <h1 className="font-heading text-4xl font-bold text-forest sm:text-5xl">
        Clients
      </h1>
      <p className="mt-6 max-w-2xl font-sans text-forest/80">
        Lumiq is an end-to-end talent advisory, not a one-size-fits-all
        recruiter. Whether you need a single traditional hire filled quickly
        or a fully embedded talent acquisition process built and run
        alongside your team, we tailor our offering to how you actually work.
        Backed by deep specialism in AI, Data &amp; Analytics, and Engineering,
        we bring judgement, honesty, and flexibility to every engagement.
      </p>

      <div className="mt-16 max-w-xl rounded-2xl bg-white/60 p-8">
        <h2 className="font-heading text-2xl font-bold text-forest">
          Tell us what you need
        </h2>
        <p className="mt-2 font-sans text-sm text-forest/70">
          Give us a few details and we&apos;ll get back to you.
        </p>
        <div className="mt-6">
          <EnquiryForm
            formId={process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}
            source="clients"
            enquiryLabel="What are you hiring for?"
          />
        </div>
      </div>

      <div className="mt-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {CLIENT_TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
