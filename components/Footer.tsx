import Link from "next/link";
import Logo from "./Logo";
import { NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-forest text-stone">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <Logo dark />
          <p className="max-w-xs font-sans text-sm text-stone/70">
            Specialist talent advisory for AI, Data, Engineering and Blockchain.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-stone/80 hover:text-stone"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-stone/10 px-6 py-6 text-center font-sans text-xs text-stone/50">
        © {new Date().getFullYear()} Lumiq Talent. All rights reserved.
      </div>
    </footer>
  );
}
