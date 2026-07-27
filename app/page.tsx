import Hero from "@/components/Hero";
import { VALUES } from "@/lib/constants";

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
    </>
  );
}
