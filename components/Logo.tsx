import Image from "next/image";
import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  void dark;

  return (
    <Link href="/" className="inline-flex items-center">
      <Image
        src="/lumiq-logo.png"
        alt="Lumiq"
        width={480}
        height={191}
        className="h-8 w-auto sm:h-9"
        priority
      />
    </Link>
  );
}
