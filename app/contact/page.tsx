import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact | Lumiq Talent",
  description: "Get in touch with Lumiq Talent.",
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <h1 className="font-heading text-4xl font-bold text-forest sm:text-5xl">
        Contact
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-forest/70">
        Not quite a hiring or job-search enquiry? Speaking engagements,
        podcasts, partnerships, press — whatever it is, get in touch and
        we&apos;ll get back to you.
      </p>

      <div className="mt-12 max-w-xl rounded-2xl bg-white/60 p-8">
        <EnquiryForm
          formId={process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}
          source="contact"
          enquiryLabel="What's this about?"
        />
      </div>
    </div>
  );
}
