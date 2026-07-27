import type { PLACEHOLDER_TESTIMONIALS } from "@/lib/constants";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof PLACEHOLDER_TESTIMONIALS)[number];
}) {
  return (
    <figure className="rounded-2xl bg-white/60 p-8">
      <blockquote className="font-heading text-lg leading-snug text-forest">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 font-sans text-sm text-forest/70">
        <span className="font-medium text-forest">{testimonial.name}</span>
        {" — "}
        {testimonial.role}
      </figcaption>
    </figure>
  );
}
