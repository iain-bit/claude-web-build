import type { Metadata } from "next";
import TeamCard from "@/components/TeamCard";
import { TEAM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About | Lumiq Talent",
  description: "Meet the co-founders behind Lumiq Talent.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <h1 className="font-heading text-4xl font-bold text-forest sm:text-5xl">
        About Lumiq
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-forest/70">
        Three co-founders, one shared view: technology should make talent
        decisions faster, not make them for you.
      </p>

      <div className="mt-16 space-y-16">
        {TEAM.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </div>
  );
}
