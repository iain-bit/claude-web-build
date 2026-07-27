import Link from "next/link";

/**
 * Typeset placeholder wordmark (brand bible specifies a custom four-point
 * star mark over the 'i' from approved master artwork). Swap for the real
 * logo file once available — this only approximates it in type.
 */
export default function Logo({ dark = false }: { dark?: boolean }) {
  const color = dark ? "text-stone" : "text-forest";

  return (
    <Link href="/" className={`font-heading text-2xl font-bold ${color} inline-flex items-baseline gap-0.5`}>
      <span>Lum</span>
      <span className="relative">
        <span aria-hidden className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-bronze text-xs">
          ✦
        </span>
        i
      </span>
      <span>q</span>
    </Link>
  );
}
