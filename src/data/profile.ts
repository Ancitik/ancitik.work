export const profile = {
  name: 'Alexandre Laurans',
  title: 'Senior Platform Engineer · SRE Tech Lead',
  tagline:
    'I build internal platforms developers actually want to use. 10 years shipping cloud & on-prem infrastructure - Kubernetes, AWS, Azure - currently at Kiln.',
  location: 'South West, France · Remote',
  email: 'alexandre.laurans14@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alexandre-laurans/',
  github: 'https://github.com/ancitik',
  site: 'https://ancitik.work',
};

export const impact = [
  {
    label: 'Scale',
    statement: 'Operated 47 Kubernetes clusters across 22 cloud and on-prem regions.',
  },
  {
    label: 'Ownership',
    statement: 'Owned SRE roadmaps with CTOs; led teams of senior engineers.',
  },
  {
    label: 'Breadth',
    statement: '10 years in production across AWS, Azure, GCP, Scaleway, and on-prem - ~50% on-prem at Kiln today.',
  },
  {
    label: 'Developer Experience',
    statement: 'Platforms as products - developer self-service from commit to production.',
  },
  {
    label: 'Security',
    statement: 'Security by design - workload identity, zero trust at scale, supply-chain hardening, secrets management.',
  },
  {
    label: 'AI Platforms',
    statement: 'Shipping AI-assisted tooling and agentic workflows for platform teams at Kiln; drove AI/agentic adoption across engineering at Hublo.',
  },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  highlight: boolean; // white card vs outlined card
  points: string[];
  link?: { label: string; href: string };
};

export const jobs: Job[] = [
  {
    company: 'Kiln',
    role: 'Senior Platform Engineer',
    period: '2026 - now',
    highlight: true,
    points: [
      'Platform engineering & SRE for enterprise-grade digital-asset infrastructure.',
      'Building AI-assisted tooling and agentic workflows for the platform team.',
    ],
  },
  {
    company: 'Hublo',
    role: 'Tech Lead SRE · Senior SRE Platform',
    period: '2024 - 2026',
    highlight: true,
    points: [
      'Owned the SRE roadmap with the CTO; led a team of 3 senior engineers.',
      'Led the ECS→EKS migration and directed the AWS network foundation rebuild (VPC & IP-addressing design) to unblock multi-region growth.',
      'Drove adoption of AI tooling and agentic platforms across engineering.',
    ],
    link: { label: 'See Selected Work ↓', href: '#work' },
  },
  {
    company: 'SOPHiA GENETICS',
    role: 'Cloud Architect (Azure) · Senior Software Engineer',
    period: '2022 - 2024',
    highlight: false,
    points: [
      'Operated 47 Kubernetes clusters across 22 regions (Azure + on-prem) for a global genomics SaaS.',
      'Migrated 15 TB of on-prem data to Azure with Data Factory.',
      'Coordinated distributed engineering teams across Europe.',
    ],
  },
  {
    company: 'Ippon Technologies',
    role: 'Cloud & DevOps Consultant',
    period: '2020 - 2022',
    highlight: false,
    points: [
      'Actia Automotive - software forge modernization, Azure landing zones, Kubernetes execution platform.',
      'Berger-Levrault - monolith→microservices replatforming: Istio, Tekton, ArgoCD, security-by-design; developer platform on K8s.',
      'Twelv - sovereign-cloud SaaS architecture on Scaleway Kubernetes.',
    ],
  },
];

export const earlier =
  'Earlier: DevOps Engineer @ SKALE-5 (2021-22) · DevOps Architect @ RGPD Web (2019) · DevOps Architect & IT Manager @ Genesis Groupe (2018-19)';

export const stacks: { group: string; items: string[] }[] = [
  { group: 'Orchestration', items: ['Kubernetes', 'Crossplane', 'Helm', 'Kustomize'] },
  { group: 'Clouds', items: ['AWS', 'Azure', 'GCP', 'Scaleway'] },
  { group: 'IaC', items: ['Terraform', 'Pulumi', 'Crossplane', 'Ansible', 'Packer'] },
  { group: 'GitOps & CI/CD', items: ['ArgoCD', 'Flux', 'GitLab CI', 'GitHub Actions', 'Tekton'] },
  { group: 'Observability', items: ['Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry'] },
  { group: 'Networking', items: ['Cilium', 'Istio', 'Gateway API', 'Hub&Spoke', 'Network Policy'] },
  { group: 'Security & Identity', items: ['SPIFFE', 'SOPS', 'Vault', 'Wiz', 'IdP', 'ZeroTrust'] },
  { group: 'Messaging', items: ['Kafka', 'NATS'] },
  { group: 'AI platforms', items: ['Agentic workflows', 'LLM infrastructure', 'MCP'] },
];

export const selectedWork = {
  eyebrow: 'Hublo · Self-service Kubernetes platform · 2024-2026',
  title: 'From product spec to production in one commit',
  problem:
    "Shipping to production meant routing through the platform team. Every new service was a ticket, a wait, and a handful of inconsistent decisions about networking, observability, and security. That doesn't scale - not the infrastructure, and not the people maintaining it.",
  approach:
    "Before committing to a line of infrastructure, I interviewed the stakeholders and the platform's real customers - our developers - to build for an actual need, not an infrastructure trend. That product mindset is the difference between a platform people are forced to use and one they reach for.",
  built: [
    {
      label: 'Developer paved path',
      body: 'Directed the design of a golden path that takes a service from product spec to production in a single commit. Observability, alerting, and security are part of the path, not an afterthought.',
    },
    {
      label: 'Kubernetes platform',
      body: 'Led a re-architecture of cluster operations around four non-negotiables I refused to trade off against each other: developer autonomy, performance, security, and cost.',
    },
    {
      label: 'AWS network foundation',
      body: 'Drove the rebuild of the networking layer (VPC and IP-addressing design) for scale - and for safe, secured interoperability with private partners.',
    },
  ],
  stats: [
    { value: '~3 days → ~45 min', label: 'New service: zero to production' },
    { value: '4 teams', label: 'Shipping autonomously' },
    { value: 'Zero', label: 'Platform tickets in the deploy path' },
  ],
  outcome:
    'Observability, alerting, and security ship on the paved path by default - reliability built in, not bolted on.',
  stack:
    'Kubernetes · ArgoCD · Terraform · AWS (EKS, VPC, Transit Gateway) · Backstage · Prometheus · Grafana · Datadog · OpenTelemetry · NATS',
};
