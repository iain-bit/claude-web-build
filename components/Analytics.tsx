"use client";

import { useEffect } from "react";
import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID } from "@/lib/constants";

/**
 * Google Analytics 4 on every page, plus an `email_click` event whenever
 * someone clicks an email link (e.g. a co-founder's "Email" button), so
 * enquiries that go by email are counted alongside form submissions.
 * Does nothing until GA_MEASUREMENT_ID is set in lib/constants.ts.
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href^='mailto:']");
      if (!link) return;
      const address = link.getAttribute("href")?.replace(/^mailto:/, "").split("?")[0];
      trackEvent("email_click", {
        email: address ?? "",
        page: window.location.pathname,
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null;
}

/** Sends a GA4 event; silently does nothing if Analytics isn't set up. */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (!GA_MEASUREMENT_ID) return;
  try {
    sendGAEvent("event", name, params);
  } catch {
    // Analytics must never break the page.
  }
}
