import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import TestimonialCard from "@/components/TestimonialCard";
import { PLACEHOLDER_TESTIMONIALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Clients | Lumiq Talent",
  description:
    "An end-to-end talent advisory for AI, Data & Analytics, and Engineering hiring.",
  alternates: { canonical: "/clients" },
};

const CLIENT_TESTIMONIALS = PLACEHOLDER_TESTIMONIALS.filter(
  (t) => t.context === "client"
);

const VIDEO_SERVICES = [
  {
    title: "Reach the people who aren't looking",
    body: "Short, scroll-stopping video adverts pushed out across LinkedIn and our wider network, putting your opportunity in front of passive talent before your competitors get to them.",
  },
  {
    title: "Bring your JD to life",
    body: "Video content that sits alongside your job description and sells what a document can't: the role, the company and the culture. Candidates see the team, the mission and the energy before they ever speak to us.",
  },
  {
    title: "Better candidates, faster",
    body: "When people can see the opportunity, the right ones lean in and the wrong ones self-select out. That means a sharper shortlist, stronger engagement and less time lost along the way.",
  },
];

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

      <section className="mt-20">
        <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
          We don&apos;t just advertise your roles. We sell them.
        </h2>
        <p className="mt-4 max-w-3xl font-sans text-forest/80">
          The people you want most are rarely scrolling job boards. A text
          advert won&apos;t move them, but seeing the opportunity might. So we
          use video to sell your role at every stage of the candidate
          attraction cycle, from the first scroll to the final conversation.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="space-y-6">
            {VIDEO_SERVICES.map((item) => (
              <div key={item.title}>
                <h3 className="font-heading text-xl font-bold text-forest">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-forest/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <figure>
            <video
              controls
              playsInline
              preload="none"
              poster="/videos/fde-advert-poster.jpg"
              className="aspect-video w-full rounded-2xl bg-forest"
            >
              <source src="/videos/fde-advert.mp4" type="video/mp4" />
            </video>
            <figcaption className="mt-3 font-sans text-xs text-forest/60">
              Example: our network advert for five Forward Deployed Engineers
              (Agentic AI) at a globally backed AI scale-up in Sydney.
            </figcaption>
          </figure>
        </div>
      </section>

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
