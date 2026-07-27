"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Renders the JobAdder JS widget once NEXT_PUBLIC_JOBADDER_WIDGET_SRC is
 * set (the script URL JobAdder gives you for the board). Until then, shows
 * a placeholder so the page isn't broken. The exact container/script
 * pattern may need a small tweak once we have JobAdder's real embed
 * snippet in hand — this assumes the common "script injects into a
 * container div" pattern.
 */
export default function JobAdderEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const src = process.env.NEXT_PUBLIC_JOBADDER_WIDGET_SRC;

  useEffect(() => {
    if (!src || !containerRef.current) return;

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      script.remove();
    };
  }, [src]);

  if (!src) {
    return (
      <div className="rounded-2xl bg-white/60 p-12 text-center">
        <p className="font-heading text-xl font-bold text-forest">
          Job listings are coming soon.
        </p>
        <p className="mx-auto mt-3 max-w-md font-sans text-sm text-forest/70">
          We&apos;re connecting our live job board now. In the meantime, get
          in touch and we&apos;ll point you at roles that fit.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-bronze px-6 py-3 font-sans text-sm font-medium text-stone transition-opacity hover:opacity-90"
        >
          Get in touch
        </Link>
      </div>
    );
  }

  return <div id="ja-widget" ref={containerRef} />;
}
