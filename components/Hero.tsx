import Image from "next/image";
import Link from "next/link";
import { POSITIONING_STATEMENT, TAGLINE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest text-stone">
      <Image
        src="/hero-sydney.jpg"
        alt="Sydney Harbour Bridge and Opera House skyline at night"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-forest/55" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center sm:py-36">
        <h1 className="font-heading text-4xl font-bold leading-tight sm:text-6xl">
          {TAGLINE}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base text-stone/80 sm:text-lg">
          {POSITIONING_STATEMENT}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/clients"
            className="rounded-full bg-bronze px-6 py-3 font-sans text-sm font-medium text-stone transition-opacity hover:opacity-90"
          >
            Hire talent
          </Link>
          <Link
            href="/candidates"
            className="rounded-full border border-stone/40 px-6 py-3 font-sans text-sm font-medium text-stone transition-colors hover:bg-stone/10"
          >
            Find your next role
          </Link>
        </div>
      </div>
    </section>
  );
}
