import type { Metadata } from "next";
import { LEGAL_NAME, PRIVACY_EMAIL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Lumiq Talent",
  description:
    "How Lumiq Talent collects, uses, stores and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "8 October 2026";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        {SITE_NAME} is the trading name of {LEGAL_NAME} (&ldquo;Lumiq&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;), a specialist recruitment and
        talent advisory business based in Australia. We handle personal
        information in line with the Privacy Act 1988 (Cth) and the
        Australian Privacy Principles.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p>Depending on how you deal with us, we may collect:</p>
        <ul>
          <li>
            <strong>Contact details</strong> such as your name, email
            address, phone number and location.
          </li>
          <li>
            <strong>Career information</strong> such as your CV, work
            history, qualifications, skills, salary expectations, right to
            work, referee details and notes from our conversations.
          </li>
          <li>
            <strong>Hiring information</strong> if you are a client, such as
            role briefs, team details and the people you work with.
          </li>
          <li>
            <strong>Anything you send us</strong> through our enquiry forms,
            by email, by phone or on LinkedIn.
          </li>
        </ul>
        <p>
          We only collect sensitive information (for example health
          information or criminal record checks) where it is needed for a
          specific role, and only with your consent.
        </p>
      </>
    ),
  },
  {
    heading: "How we collect it",
    body: (
      <p>
        Mostly directly from you: when you fill in a form on this website,
        apply for a role, send us your CV or speak with us. We may also
        collect information from publicly available sources such as LinkedIn
        and professional profiles, from referees you nominate, and from
        people who recommend you to us.
      </p>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <>
        <p>We use your personal information to:</p>
        <ul>
          <li>respond to your enquiry;</li>
          <li>
            match candidates with suitable roles and represent you to
            prospective employers (with your agreement before we put you
            forward for a specific role);
          </li>
          <li>
            run searches and hiring processes for our clients, including
            reference checks;
          </li>
          <li>
            keep in touch about roles, market insights and events that may
            interest you (you can opt out at any time); and
          </li>
          <li>meet our legal and contractual obligations.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Who we share it with",
    body: (
      <>
        <p>We never sell your personal information. We may share it with:</p>
        <ul>
          <li>
            <strong>Prospective employers and clients</strong>, when you
            have agreed to be put forward for a role;
          </li>
          <li>
            <strong>Referees</strong> you have nominated;
          </li>
          <li>
            <strong>Service providers</strong> who help us run our business,
            such as our recruitment software (JobAdder), website hosting
            (Vercel), form handling (Formspree) and email (Google
            Workspace). They may only use your information to provide their
            services to us; and
          </li>
          <li>
            <strong>Authorities</strong> where we are required or authorised
            by law.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Overseas disclosure",
    body: (
      <p>
        Some of our service providers store data outside Australia, including
        in the United States. Where a role is based overseas, we may also
        share your details with a client in that country, with your
        agreement. We take reasonable steps to make sure overseas recipients
        protect your information in a way consistent with the Australian
        Privacy Principles.
      </p>
    ),
  },
  {
    heading: "Storage and security",
    body: (
      <p>
        We store information in secure, access-controlled systems and take
        reasonable steps to protect it from misuse, loss and unauthorised
        access. We keep it only for as long as we need it for the purposes
        above or as required by law, and then delete or de-identify it.
      </p>
    ),
  },
  {
    heading: "Cookies and analytics",
    body: (
      <p>
        This website does not use advertising or tracking cookies. Our
        hosting provider may record standard technical information, such as
        your IP address and browser type, to keep the site secure and
        working.
      </p>
    ),
  },
  {
    heading: "Accessing and correcting your information",
    body: (
      <p>
        You can ask to see the personal information we hold about you, ask
        us to correct it, or ask us to delete it, by emailing us at the
        address below. We will respond within 30 days. You can also ask us
        to stop contacting you at any time.
      </p>
    ),
  },
  {
    heading: "Questions and complaints",
    body: (
      <p>
        If you have a question or concern about how we handle your
        information, email{" "}
        <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. We will
        look into it and respond within 30 days. If you are not satisfied
        with our response, you can contact the Office of the Australian
        Information Commissioner at{" "}
        <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">
          oaic.gov.au
        </a>
        .
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The latest version will
        always be on this page.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="font-heading text-4xl font-bold text-forest sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 font-sans text-sm text-forest/60">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="mt-12 space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-2xl font-bold text-forest">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3 font-sans text-sm leading-relaxed text-forest/80 [&_a]:underline [&_a]:decoration-sage/50 [&_a]:underline-offset-4 hover:[&_a]:text-forest [&_strong]:font-semibold [&_strong]:text-forest [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
