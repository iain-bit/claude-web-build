import type { Metadata } from "next";
import { SPECIALITIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Specialities | Lumiq Talent",
  description:
    "Specialist talent advisory for AI & Machine Learning, Blockchain & Digital Assets, and Data & Analytics.",
};

export default function Specialities() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <h1 className="font-heading text-4xl font-bold text-forest sm:text-5xl">
        Specialities
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-forest/70">
        We know AI, Data, Software Engineering, and Blockchain properly, not
        superficially. Here&apos;s where we spend our time.
      </p>

      <div className="mt-16 space-y-16">
        {SPECIALITIES.map((group) => (
          <section key={group.title}>
            <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
              {group.title}
            </h2>
            <p className="mt-2 max-w-2xl font-sans text-sm text-forest/70">
              {group.blurb}
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {group.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-full bg-white/60 px-4 py-2 font-sans text-sm text-forest/80"
                >
                  {role}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
