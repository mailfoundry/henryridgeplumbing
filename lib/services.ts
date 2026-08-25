export type ServiceSlug =
  | "emergency-repairs"
  | "bathroom-installation"
  | "tiling"
  | "taps-toilets-showers"
  | "drainage-blockages"
  | "radiator-fitting"
  | "outdoor-taps";

export interface Service {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  category: "Plumbing" | "Bathrooms" | "Tiling";
  tagline: string;
  description: string;
  features: string[];
  icon: string; // SVG path data
  emergencyAvailable: boolean;
}

export const services: Service[] = [
  {
    slug: "emergency-repairs",
    title: "Emergency Leak & Pipe Repair",
    shortTitle: "Emergency Repairs",
    category: "Plumbing",
    tagline: "Fast response across Staffordshire — burst pipes, major leaks, and urgent fixes.",
    description:
      "A burst pipe or sudden leak can cause serious damage fast. Henry responds quickly to emergency call-outs across Staffordshire — isolating the problem, stopping the damage, and getting everything sorted with minimum disruption to your home.",
    features: [
      "Fast response times across Staffordshire",
      "Burst and leaking pipes repaired",
      "Stopcock and isolation valve work",
      "Emergency pressure issues resolved",
      "Post-repair check to prevent recurrence",
    ],
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    emergencyAvailable: true,
  },
  {
    slug: "bathroom-installation",
    title: "Bathroom Installation & Fitting",
    shortTitle: "Bathrooms",
    category: "Bathrooms",
    tagline: "Full bathroom fits from strip-out to finished suite — all trades coordinated.",
    description:
      "Henry handles the complete bathroom installation from start to finish. That means strip-out, new pipework, suite fitting, and finishing. Whether you want a simple refresh or a full redesign, you'll get a bathroom you're proud of — fitted properly, no shortcuts.",
    features: [
      "Full strip-out of existing bathroom",
      "New bath, shower, basin and WC fitted",
      "All pipework and waste connections",
      "Shower enclosure installation",
      "Coordinated alongside tiling (ask about package pricing)",
    ],
    icon: "M4 4h16v16H4zM4 12h16M12 4v16",
    emergencyAvailable: false,
  },
  {
    slug: "tiling",
    title: "Tiling — Bathrooms, Kitchens & Floors",
    shortTitle: "Tiling",
    category: "Tiling",
    tagline: "Precise, professional tiling in bathrooms, kitchens, and on floors.",
    description:
      "Good tiling transforms a room. Henry tiles to a high standard — straight lines, consistent grout, properly waterproofed. Wall tiling for bathrooms and kitchens, floor tiling for any room, and full bathroom tiling packages combined with installation.",
    features: [
      "Bathroom wall and floor tiling",
      "Kitchen splashback tiling",
      "Wet room waterproofing and tiling",
      "Large format tile fitting",
      "Combined bathroom + tiling packages available",
    ],
    icon: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z",
    emergencyAvailable: false,
  },
  {
    slug: "taps-toilets-showers",
    title: "Taps, Toilets & Showers",
    shortTitle: "Taps & Showers",
    category: "Plumbing",
    tagline: "Dripping tap? Running toilet? New shower? Supply, fit and repair.",
    description:
      "From a simple dripping tap to a full shower installation, Henry handles all small-to-medium plumbing jobs professionally. No job is too small — and everything is done cleanly and correctly first time.",
    features: [
      "Tap replacement and repair",
      "Toilet cistern, seat and pan replacement",
      "Electric and mixer shower fitting",
      "Shower valve and cartridge replacement",
      "Basin and sink fitting",
    ],
    icon: "M12 2v6M12 18v4M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M18 12h4M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24",
    emergencyAvailable: false,
  },
  {
    slug: "drainage-blockages",
    title: "Drainage & Blockage Clearance",
    shortTitle: "Drainage",
    category: "Plumbing",
    tagline: "Slow drains, blocked toilets, and outdoor drainage sorted quickly.",
    description:
      "Blocked drains are a nuisance — and left untreated, they get worse. Henry clears blockages in sinks, baths, toilets and outdoor drains, diagnosing the cause so the problem doesn't keep coming back.",
    features: [
      "Kitchen and bathroom sink unblocking",
      "Toilet blockage clearance",
      "Slow drain diagnosis and fix",
      "Outdoor drain clearance",
      "Advice on preventing future blockages",
    ],
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4h3V8h2v4h3l-4 4z",
    emergencyAvailable: true,
  },
  {
    slug: "radiator-fitting",
    title: "Radiator Fitting & Replacement",
    shortTitle: "Radiators",
    category: "Plumbing",
    tagline: "Add, replace, or relocate radiators on your existing system.",
    description:
      "Want an extra radiator in a room that's always cold? Replacing an old, inefficient rad? Henry handles the water-side work — fitting new radiators, replacing valves, and bleeding the system — all neatly and reliably.",
    features: [
      "New radiator installation",
      "Old radiator replacement",
      "TRV (thermostatic valve) fitting",
      "System bleeding and balancing",
      "Radiator relocation",
    ],
    icon: "M4 5h16M4 9h16M4 13h16M4 17h16",
    emergencyAvailable: false,
  },
  {
    slug: "outdoor-taps",
    title: "Outdoor Tap Installation",
    shortTitle: "Outdoor Taps",
    category: "Plumbing",
    tagline: "Garden tap fitted neatly — perfect for hosepipes and pressure washers.",
    description:
      "An outdoor tap is one of the most useful additions to any home. Henry installs garden taps professionally, with a proper isolation valve so you can turn it off in winter, and a tidy finish through the external wall.",
    features: [
      "Garden tap supply and installation",
      "Isolation valve fitted as standard",
      "Neat external wall penetration",
      "Suitable for hosepipes and pressure washers",
      "Frost protection advice included",
    ],
    icon: "M12 2a5 5 0 015 5v3H7V7a5 5 0 015-5zM7 10h10l1 12H6L7 10z",
    emergencyAvailable: false,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const AREAS = [
  "Stafford", "Lichfield", "Cannock", "Tamworth", "Rugeley",
  "Burntwood", "Stone", "Uttoxeter", "Burton-on-Trent",
  "Penkridge", "Hednesford", "Chase Terrace",
];
