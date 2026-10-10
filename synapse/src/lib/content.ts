const G = "https://lh3.googleusercontent.com/aida-public/";

/** Imagery from the Stitch export. Swap for your own assets (public/ or a CDN) before launch. */
export const images = {
  hero: `${G}AB6AXuCoqIRNxybSZXXwrInKTj_K_yj6O8RmF6sZsnF4oGj2hreS7Ic2Fg95-EIw8dIhDyYqBTaMmHHe7j2sqFJFM3Qk3MlGM8g0qxxB__B0rFjefNukkBTwmnO2DzKnZg4eUy5Ly0W3HTeBo-aaUgu6A_xAJZxBln9ZueaALs0iDk4Tks5u_WHS1Wnnb-bUj1daCfMN7_p-mCMJi1mkWyjN9HS1FbbgCNHAhFItaXXbzdWWSJnTuKTcdPFd`,
  quote: `${G}AB6AXuDa5UC4naZVy2muuo7s9QTbgq73BcWPNN6C7yL06B8bJFOSmgDGCaNGBSHeVqIvxzsLmVDTca7KlwJTktEGFJTLDSYKc5U74o2SgEh4RphHXnU8obsDFyaZ_nNJQJGqH5Bdy30agJ9gFXANK_UCw3mWBVfEuMUeelm10NXwrZfYe00IqrglOg-59VsgucvmJknI28gr3VHz4ypWyXnUHYxiO3TUdmZl1eCH31dPbhtQiDTNaa5hp03t`,
  avatars: [
    `${G}AB6AXuC_SYX0sfO1n067qtNSZBrek6yr7DmBaZsuNLbHkojT6Q7ACbUnRYCTDskCnx_dGpXlg6JkqH0x6mVmtCLlgde7g96kShIlvCv4p_5E9NFGtzAOjQtV-kVGIR2DXwlAb3ePkHFqGHTAYV0pyIiQd-PoMkYAfEUrCknZg6NQv99IlRRyXFSJwFkG4hii81DNYbfrHqSDPpl_l87Ww1XY_6tJNvu-REbmiZ-C0yKvPkERNwIeD917S6WK`,
    `${G}AB6AXuAMfycWr_Bl3Ss4A-2BI9GnTz1TNUVEHiYhwOwr9Um0uCGjcrqG_daYU1YUnfOmLwiapFO5v_aI2J4_KDmVmbRLmILntK3Zf5dvbbIEkBxCgrb-fELOgmaTV1cpTbVxlUF2TKMVflv09DBD-LDqpvZoz-4r8UhhQK6KwBX-Sc3ZRwmgtY1AQ3i6G5WQK7-RIuJfhA4io0N3mthevMLUVdHhudK5HB7OfIU4wSOaLJ7qcuw_tB81eToR`,
    `${G}AB6AXuAp0W0soHaNAL2kRY4J2okQRkSde8UWFNfDk7EIWSlWwpa3IxZ1fvr0vtWMuQK0NiedLz02PbEHyXcooG-mqiTOrdrAcfb1-Toof68lGOe6QpquiLGh0wE2fXwvHFWuVP2UKXujcBCY09IGnp5Zyoa44qpXTsupnTQei3_VTyTeirqpmsaqC052vbWqwRF0V91afDXckfQou_vi07psGUv9lXIx9or7Va0zBCoYNmDpjznACMoBY3Vp`,
  ],
  executive: `${G}AB6AXuAuZJTOgrUms_HD-gcWsFcO6eRfnXskXsTyxw7U_CMYj_8Cz-nMWbaUcNWyDCneREtVvkJHbFqLZ9uJnqNe-yBLgOArfKuLxlAKFW6ZY1MLpdW42uzffL8NaFz0z6ZQyVo3lwaYBVZuEQ28BX4KtF0-Csjzv7lgozSCMa8I84pA-vDYFZNTbuP9DAJMSnUZskO_IXscAL31lXvq-Zc-T-_aQiKlhqakLxtE1LmPMB_Q6Gk6Evuo3caQ`,
  monitorAvatar: `${G}AB6AXuDTJVOzQgmTRPn_CuhAakqqgzoEThIcMZ5LXtdcq_3AfT4rYaOvhtuVFn-7awSYcigJjA9NVLIG3nYbdMJ3T3ZkIe6il5THqfF3g1cyC8iWDDm4s_Z8u7X1qcnIjk_f_hQtGLmxDu6i1IkCncgU47e8kW6dvpYl91NzbRq7LfR3WK9zrzzd1BsqUmtrGLXQE8rMqBRDY11BMdJAwXWI2ZpvgbW5si1JhAGgLXaxZUXK3UW4nZZbk8BY`,
};

export const nav = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Solutions", href: "#solutions" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#consultation" },
] as const;

export const promptChips = [
  { label: "Support Swarms", text: "Orchestrate 4 autonomous customer support agents with Zendesk & Slack integration" },
  { label: "Lead Prospector", text: "Synthesize 100,000 lead profiles and draft hyper-personalized outbound cadences" },
  { label: "Predictive Ops", text: "Run predictive Monte Carlo simulations on Q3 inventory and logistics constraints" },
] as const;

// Placeholder client names — replace with real, permissioned logos before launch.
export const logos = ["Halcyon", "Orbital", "Meridian", "Fathom", "Kestrel", "Atlas & Co"] as const;

export const metrics = [
  { prefix: "Up to", value: "5x", text: "Faster multi-agent prompt to production pipeline rollout" },
  { prefix: "Up to", value: "96%", text: "Reduction in repetitive triage and manual operational waste" },
  { prefix: "Up to", value: "3.4x", text: "Higher throughput and customer query task resolution" },
  { prefix: "Generated", value: "$42M+", text: "Documented net client efficiency gains in 2024" },
] as const;

export const capabilities = [
  {
    key: "swarms",
    tab: "Autonomous Swarms",
    sub: "Aim for Excellence",
    title: "Set Budget & Agent Boundaries",
    desc: "Spending and API inference tokens are dynamically allocated. The autonomous supervisor maintains rigorous accuracy benchmarks and fail-safes within the workflow.",
    features: [
      "Multi-modal vision and code-generation runtime",
      "Human-in-the-loop review queues on outlier confidence",
      "Zero-data retention agreements with model providers",
    ],
  },
  {
    key: "knowledge",
    tab: "Enterprise Knowledge Graph",
    sub: "Deep Memory Fabric",
    title: "Context Graph & Enterprise RAG",
    desc: "Synchronize millions of proprietary docs, tickets, and codebases into an ultra-low latency vector graph with bi-temporal verification.",
    features: [
      "Hybrid semantic & dense lexical retrieval pipelines",
      "Automatic document chunking with metadata lineage",
      "Role-based access controls inherited from Okta/SAML",
    ],
  },
  {
    key: "telemetry",
    tab: "Real-Time Telemetry",
    sub: "Observability",
    title: "Real-Time Multi-Modal Telemetry",
    desc: "Inspect live reasoning traces, token usage, drift metrics, and multi-agent consensus scoring in high-frequency dashboards.",
    features: [
      "End-to-end tracing for every autonomous decision",
      "Real-time cost & speed optimization engine",
      "Alerting webhooks for anomalous token spikes",
    ],
  },
  {
    key: "slm",
    tab: "Fine-Tuned SLMs",
    sub: "Sovereignty & Speed",
    title: "Custom Fine-Tuned SLMs",
    desc: "Dramatically lower cloud inference costs by deploying task-specific 7B-14B parameter models tuned directly on your company corpus.",
    features: [
      "3x lower latency compared to mega-models",
      "On-premise air-gapped or private VPC hosting",
      "Domain-specific vocabulary and code fine-tuning",
    ],
  },
] as const;

// Sample testimonials — placeholders until real customer quotes are approved.
export const testimonials = [
  {
    quote: "Synapse integrated an autonomous multi-modal triage mesh into our logistics software in under three weeks. Our team saved 3,400 engineering hours in the first month alone.",
    name: "Elena Rostova",
    role: "VP Engineering @ ApexLogistics",
    image: "AB6AXuDqu6BnIdlfo2ZEeXRNoeebh-LdRlgqOZgqTpNXqSphKdoIxy4H0267OE1JV20u9oPrYp1l5exC5FfpMcgL9w9vdmdW9LZdYMHcCu0G2LimCFQpgmmaOT86ArFJyr44V4eXLZ3008me8P1pmOHqpEpLlGgBsG6IEEDx6yeJg_04yyCVj0yTav5v3JyojL4Ar95ADJCe6aV0JaIyNDeUocoijf4sltKPhqT6iHN1lsIlmbxY476xVgeu",
  },
  {
    quote: "The difference between generic LLM wrappers and Synapse's cognitive graph architecture is astronomical. They gave us real deterministic guarantees and privacy compliance.",
    name: "Marcus Vance",
    role: "CTO @ CloudScale Data",
    image: "AB6AXuAu7kFxT9tNyIW28ur-xCx4SxzvINEIp8BKFIdEa5RNoKbJ_-jNtCCnkG2GwkqHvgiqZJ1A-sDnvNfYRsjkd0hNr5o9tn9db9dCCyOtemqzb6_I-H0OWZvKP4AcC62uQmXNW1VEv_WHysyE5YGh0A2FoYlvV6e2890WZwoNOYM3dvvpOOHJEZMZL1ylJ76KUYgjIh-UboU7Ti-uvmR6PvHdsv6QOuwk_Xk4v91N0NBBqGzT16dSNiHD",
  },
  {
    quote: "We went from evaluating vague generative AI roadmaps to actively executing 92% of our tier-1 support tickets autonomously. Our NPS score climbed by 19 points.",
    name: "Sarah Lin",
    role: "Head of Operations @ Veloce Commerce",
    image: "AB6AXuB4OM3CYoA_le5MDlyNbWMRAJ5VPLIPhHicO5qzDYiBxRvUWJMiE_Hh4cKbCliWRdDAQDDeyoO91XWmPjNC6NhcysROEdCAT24BwVNi5Lx_MpkFJSouSDZcG3qm8L7J8ZOCrF2N4NAc94RRBYcfzD7PPFjpLOalu3Y9rMw6dmdKqy0DublubfjAgIx4DJ4_0vByfGK8MeK6bC-jol1KJdktGC3ehKpztBzPaL8axCpOFvhrhTIV2Uvu",
  },
].map((t) => ({ ...t, image: `${G}${t.image}` }));

export const consultationPoints = [
  { title: "Infrastructure & Latency Audit", text: "Comprehensive assessment of model weights, API costs, and latency budgets." },
  { title: "Custom Prototype Blueprint", text: "Detailed architectural schematic tailored specifically to your data schema." },
  { title: "Fixed Sprint Pricing & SLA Guarantee", text: "Transparent milestones with deterministic delivery guarantees." },
] as const;

export const orgSizes = ["10 - 50 employees", "51 - 250 employees", "251 - 1,000 employees", "1,000+ Enterprise"] as const;
export const focusAreas = ["Autonomous Agent Swarms", "Enterprise RAG & Knowledge", "Workflow Automation", "SLM Fine-Tuning"] as const;

export const footerColumns = [
  { title: "Platform", links: ["Core Engine", "Multi-Agent Swarms", "Context Graph", "Synthetics API", "Observability"] },
  { title: "Solutions", links: ["Enterprise Copilots", "Autonomous Workflows", "Predictive Logistics", "Automated Research", "GovTech AI"] },
  { title: "Resources", links: ["Case Studies", "Documentation", "Research Papers", "Security Whitepaper", "System Status"] },
  { title: "Company", links: ["About Synapse", "Careers", "Press & Media", "Pricing Plans", "Contact Team"] },
] as const;
