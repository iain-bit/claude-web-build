import Hero from "@/components/Hero";
import TeamCard from "@/components/TeamCard";
import { VALUES, TEAM, SPECIALITIES } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 className="font-heading text-3xl font-bold text-forest sm:text-4xl">
          What we stand for
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <div key={value.title} className="rounded-2xl bg-white/60 p-8">
              <span className="font-heading text-sm text-bronze">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-heading text-xl font-bold text-forest">
                {value.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-forest/70">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-5xl px-6 py-20 sm:py-28"
      >
        <h2 className="font-heading text-3xl font-bold text-forest sm:text-4xl">
          About Lumiq
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-forest/70">
          Three co-founders, one shared view: technology should make talent
          decisions faster, not make them for you.
        </p>

        <div className="mt-16 space-y-16">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      <section
        id="specialities"
        className="mx-auto max-w-5xl px-6 py-20 sm:py-28"
      >
        <h2 className="font-heading text-3xl font-bold text-forest sm:text-4xl">
          Specialities
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-forest/70">
          We know AI, Data, and Software Engineering properly, not
          superficially. Here&apos;s where we spend our time.
        </p>

        <div className="mt-16 space-y-16">
          {SPECIALITIES.map((group) => (
            <section key={group.title}>
              <h3 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
                {group.title}
              </h3>
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
      </section>
    </>
  );
}
