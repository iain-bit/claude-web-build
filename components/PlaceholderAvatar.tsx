const COLORS = ["bg-moss", "bg-sage", "bg-forest"] as const;

/**
 * Brand-consistent stand-in for team photography (shoot pending). A colour
 * block with the person's initial in Playfair Display, per the brief's
 * "illustration/colour blocks, not stock photos" placeholder direction.
 * Swap for a real <Image> once photos are shot.
 */
export default function PlaceholderAvatar({
  name,
  index,
}: {
  name: string;
  index: number;
}) {
  const color = COLORS[index % COLORS.length];

  return (
    <div
      className={`flex aspect-square w-full items-center justify-center rounded-2xl ${color}`}
      aria-hidden
    >
      <span className="font-heading text-6xl font-bold text-stone/90">
        {name.charAt(0)}
      </span>
    </div>
  );
}
