import { SOCIALS } from "@/lib/constants";

export default function SocialLinks() {
  const links = [
    { name: "Instagram", href: SOCIALS.instagram, icon: InstagramIcon },
    { name: "LinkedIn", href: SOCIALS.linkedin, icon: LinkedInIcon },
  ].filter((link) => link.href);

  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-4">
      {links.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="text-stone/70 transition-colors hover:text-stone"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7.5" cy="6.8" r="1" fill="currentColor" />
      <path
        d="M11.5 17v-4.5c0-1.5 1-2.5 2.3-2.5s2.2 1 2.2 2.5V17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="11.5" y1="10" x2="11.5" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
