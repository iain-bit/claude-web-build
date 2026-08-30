export const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/specialities", label: "Specialities" },
  { href: "/clients", label: "Clients" },
  { href: "/candidates", label: "Candidates" },
  { href: "/jobs", label: "Jobs" },
  { href: "/contact", label: "Contact" },
] as const;

export const TAGLINE = "Human Judgement. Machine Speed.";

/**
 * Left null until URLs exist — Footer only renders an icon once its URL is
 * set here, so adding LinkedIn later is a one-line change.
 */
export const SOCIALS = {
  instagram: "https://www.instagram.com/lumiqtalent/" as string | null,
  linkedin: null as string | null,
};

export const POSITIONING_STATEMENT =
  "Specialist talent advisory for AI, Data, Engineering and Blockchain. We use tools to move faster, but every judgement is made by a human, always. We dig deeper than the brief, challenge where it matters, and flex to how you want to work because getting it right beats getting it fast.";

export const VALUES = [
  {
    title: "Human Judgement",
    body: "We use tools to move faster but every judgement is made by a human, always. Technology gives us speed, but the decision itself never gets automated.",
  },
  {
    title: "Flexibility",
    body: "Contingency, rate card, or subscription, the commercial model bends to the client, not the other way around. That same flexibility applies to how we work as a team. We love being in the room together but we back our people to deliver from anywhere.",
  },
  {
    title: "Problem Solving",
    body: "We're not yes people internally or externally. We listen, we consult, we challenge, and we suggest. If something works against the outcome our clients need, we offer options. Same goes for how we operate as a team, we push back on each other, not just on clients.",
  },
  {
    title: "Domain Knowledge",
    body: 'We know AI, Data, Software Engineering, and Blockchain properly, not superficially. We have the runs on the board and years of experience to actually understand what "good" looks like in each vertical, so speed never comes at the cost of substance. Do it once and do it right.',
  },
] as const;

export const SPECIALITIES = [
  {
    title: "AI & Machine Learning",
    blurb:
      "From research through to production, we place the people building and running AI systems that actually ship.",
    roles: [
      "Research Scientists & ML Engineers",
      "AI Engineers",
      "AI Product Managers",
      "MLOps & Platform Engineers",
      "GPU/HPC & Data Centre Infrastructure",
      "AI Privacy Engineers",
      "AI Ethics & Responsible AI Leads",
      "AI Governance & Compliance Specialists",
      "Head of AI / Chief AI Officer",
    ],
  },
  {
    title: "Blockchain & Digital Assets",
    blurb:
      "Deep bench across protocol, infrastructure and compliance for teams building on-chain.",
    roles: [
      "Blockchain Engineers & Smart Contract Developers",
      "Software Engineers (Blockchain-focused)",
      "Protocol & Infrastructure Engineers",
      "RWA (Real-World Assets) Specialists",
      "Digital Asset / Tokenisation Leads",
      "Web3 Product Managers",
      "Compliance & Regulatory (Digital Assets)",
    ],
  },
  {
    title: "Data & Analytics",
    blurb:
      "The full data stack, from governance and architecture through to the analysts turning it into decisions.",
    roles: [
      "Data Analysts",
      "Data Engineers",
      "Data Scientists",
      "Data Architects",
      "Data Governance",
      "Data Privacy Officers",
      "Head of Data / Chief Data Officer",
    ],
  },
] as const;

/**
 * `linkedin` is left null until profile URLs are supplied — the About page
 * only renders the LinkedIn link when one is present, so adding them later
 * is a one-line change per person here.
 */
export const TEAM = [
  {
    name: "Jess",
    role: "Co-Founder",
    email: "jess@lumiqtalent.com",
    linkedin: null as string | null,
    photo: "/team-jess.jpg" as string | null,
    bio: [
      "Jess is an award-winning tech entrepreneur who launched her first business at 16 and her second at 22, scaling it to 130 countries. She was later a grand finalist on China's hit entrepreneurship show The Next Unicorn (a cross between Shark Tank and The Apprentice). Her work sits at the intersection of technology, systems and leadership, helping organisations navigate what's next.",
      "She is the co-founder of Women Making Waves, a technology company advancing awareness around women's rights law reform. Jess has been recognised by Forbes as one of 1,000 entrepreneurs under 30 to change the world in the next 50 years and is a three-time member of SmartCompany's 30 Under 30.",
      "Jess is also a recent contributor for Forbes Australia and a seasoned, sought-after keynote speaker and MC. She has opened national tours for Tony Robbins and Tom Bilyeu, and interviewed global icons on stage including Sir Richard Branson, Deepak Chopra, Robert Kiyosaki and All Blacks legend Dan Carter. She has delivered keynote presentations for Fortune 500 companies, high-growth startups, and organisations including Lenovo, KPMG, Airbnb, TikTok and Google.",
    ],
  },
  {
    name: "Iain",
    role: "Co-Founder",
    email: "iain@lumiqtalent.com",
    linkedin: null as string | null,
    photo: "/team-iain.jpg" as string | null,
    bio: [
      "Iain brings close to two decades of recruitment experience, with more than 750 placements across the UK, EU, and Australia. He has a comprehensive understanding of the IT landscape, from legacy systems underpinning traditional finance to the latest blockchain and AI technologies. Known for his ability to engage passive talent, he designs tailored recruitment processes that balance thorough vetting with a high-quality candidate experience. He is a trusted recruitment partner to global fintechs, investment banks, law firms, Big 4 consultancies, and high-growth startups.",
      "A key strength is his ability to solve the talent challenges others walk away from — whether that means navigating niche skill sets, hard-to-reach markets, or complex stakeholder environments.",
      "Based in the Northern Illawarra, Iain enjoys trail running and making the most of the coastal lifestyle. A long-suffering Tottenham Hotspur supporter, he brings a sense of loyalty and perspective to both his work and personal life, and values spending time with his family above all.",
    ],
  },
  {
    name: "Matt",
    role: "Co-Founder",
    email: "matt@lumiqtalent.com",
    linkedin: null as string | null,
    photo: "/team-matt.jpg" as string | null,
    bio: [
      "Matt has spent seven years building specialist recruitment expertise in the Sydney market, with more than 250 placements to his name and a focus on Data and AI talent. He works at the technical edge of the market, placing candidates who are shaping how organisations build, govern and scale their data and AI capability rather than filling generic headcount.",
      "Recently, Matt has built out AI teams for organisations including PwC, Cushman & Wakefield and Macquarie Bank — work that demands a genuine grasp of the technical landscape, not just a list of keywords. He's known across the industry for the depth of his market knowledge and for the level of care he brings to both clients and candidates, treating every placement as a long-term relationship rather than a transaction.",
    ],
  },
] as const;

/**
 * Placeholder testimonials — invented for layout purposes only.
 * Must be replaced with real client/candidate quotes before launch.
 */
export const PLACEHOLDER_TESTIMONIALS = [
  {
    quote:
      "Lumiq didn't just fill a role, they understood our team and found someone who actually fit how we work.",
    name: "Sarah",
    role: "Head of Data, Series B FinTech",
    context: "client" as const,
  },
  {
    quote:
      "They took the time to understand what I actually wanted from my next move, not just the next opening on their books.",
    name: "James",
    role: "Senior ML Engineer",
    context: "candidate" as const,
  },
  {
    quote:
      "Honest, fast, and genuinely specialised in AI hiring. That combination is rare.",
    name: "Priya",
    role: "CTO, Series A AI Startup",
    context: "client" as const,
  },
  {
    quote:
      "No pressure, no rushed decisions, just a recruiter who actually listened to where I wanted to go next.",
    name: "Tom",
    role: "Blockchain Engineer",
    context: "candidate" as const,
  },
] as const;
