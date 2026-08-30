import Image from "next/image";
import PlaceholderAvatar from "./PlaceholderAvatar";
import type { TEAM } from "@/lib/constants";

export default function TeamCard({
  member,
  index,
}: {
  member: (typeof TEAM)[number];
  index: number;
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-[220px_1fr] sm:gap-10">
      <div>
        {member.photo ? (
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
        ) : (
          <PlaceholderAvatar name={member.name} index={index} />
        )}
        <div className="mt-4 flex items-center gap-4">
          
            href={`mailto:${member.email}`}
            className="font-sans text-sm text-forest/70 underline decoration-sage/50 underline-offset-4 hover:text-forest"
          >
            Email
          </a>
          {member.linkedin && (
            
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-forest/70 underline decoration-sage/50 underline-offset-4 hover:text-forest"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>

      <div>
        <h2 className="font-heading text-2xl font-bold text-forest">
          {member.name}
        </h2>
        <p className="font-sans text-sm text-bronze">{member.role}</p>
        <div className="mt-4 space-y-4">
          {member.bio.map((paragraph, i) => (
            <p
              key={i}
              className="font-sans text-sm leading-relaxed text-forest/70"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
