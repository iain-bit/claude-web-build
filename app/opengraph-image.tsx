import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * The branded preview card LinkedIn, Slack, X etc. show when any page of
 * the site is shared. Job pages have their own card (jobs/[slug]).
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Lumiq Talent: AI, Data & Data Centre Recruitment";

// Brand palette (matches app/globals.css).
const FOREST = "#0f3028";
const SAND = "#ddd0b7";
const STONE = "#f3ece0";
const BRONZE = "#b48b5a";

// Fonts and logo don't change per job, so read them once.
const assets = join(process.cwd(), "assets/og");
const playfairBold = readFile(join(assets, "playfair-display-latin-700-normal.woff"));
const interMedium = readFile(join(assets, "inter-latin-500-normal.woff"));
const logo = readFile(join(assets, "lumiq-logo-gold.png"), "base64");

// The gold logo is 600 x 251.
const LOGO_HEIGHT = 72;
const LOGO_WIDTH = Math.round((LOGO_HEIGHT * 600) / 251);

export default async function Image() {
  const title = "AI, Data & Data Centre Recruitment";
  const details = "Specialist talent advisory  |  Sydney, Australia";
  const titleSize = 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: FOREST,
          color: STONE,
          fontFamily: "Inter",
        }}
      >
        <img
          src={`data:image/png;base64,${await logo}`}
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          alt=""
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Playfair Display",
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.12,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {details && (
            <div style={{ fontSize: 34, marginTop: 24, color: SAND }}>
              {details}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${BRONZE}`,
            paddingTop: 24,
            fontSize: 26,
          }}
        >
          <div style={{ color: BRONZE }}>lumiqtalent.com</div>
          <div style={{ color: SAND }}>Human Judgement. Machine Speed.</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair Display", data: await playfairBold, weight: 700, style: "normal" },
        { name: "Inter", data: await interMedium, weight: 500, style: "normal" },
      ],
    }
  );
}
