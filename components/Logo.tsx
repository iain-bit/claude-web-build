import Image from "next/image";
import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  const src = dark ? "/lumiq-logo.png" : "/lumiq-logo-green.png";

  return (
    <Link href="/" className="inline-flex items-center">
      <Image
        src={src}
        alt="Lumiq"
        width={480}
        height={191}
        className="h-8 w-auto sm:h-9"
        priority
      />
    </Link>
  );
}
