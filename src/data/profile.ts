export const profile = {
  name: 'Alexandre Laurans',
  title: 'Senior Platform Engineer · SRE',
  tagline:
    'I build internal platforms developers actually want to use. 10 years shipping cloud infrastructure — Kubernetes, AWS, Azure — currently at Kiln.',
  location: 'Pau, France · Remote',
  email: 'alexandre.laurans14@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alexandre-laurans/',
  github: 'https://github.com/ancitik',
  site: 'https://ancitik.work',
};

export const impact = [
  {
    label: 'Scale',
    statement: 'Operated 47 Kubernetes clusters across 22 cloud regions.',
  },
  {
    label: 'Ownership',
    statement: 'Owned SRE roadmaps with CTOs; led teams of senior engineers.',
  },
  {
    label: 'Breadth',
    statement: '10 years in production across AWS, Azure and GCP.',
  },
  {
    label: 'Developer Experience',
    statement: 'Platforms as products — developer self-service from commit to production.',
  },
  {
    label: 'Security',
    statement: 'Security by design — workload identity, zero trust at scale, supply-chain scanning, secrets management.',
  },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  highlight: boolean; // white card vs outlined card
  points: string[];
};

export const jobs: Job[] = [
  {
    company: 'Kiln',
    role: 'Senior Platform Engineer',
    period: '2026 — now',
    highlight: true,
    points: [
      'Platform engineering & SRE for enterprise-grade digital-asset infrastructure.',
      'Building AI-assisted tooling and agentic workflows for the platform team.',
    ],
  },
  {
    company: 'Hublo',
    role: 'Tech Lead SRE · Senior SRE Platform',
    period: '2024 — 2026',
    highlight: true,
    points: [
      'Owned the SRE roadmap with the CTO; led a team of 3 senior engineers.',
      'Completed the ECS→EKS migration, then rebuilt the AWS network foundation (VPC & IP addressing design) to unblock multi-region growth.',
      'Drove adoption of AI tooling and agentic platforms across engineering.',
    ],
  },
  {
    company: 'SOPHiA GENETICS',
    role: 'Cloud Architect (Azure) · Senior Software Engineer',
    period: '2022 — 2024',
    highlight: false,
    points: [
      'Operated 47 Kubernetes clusters across 22 Azure regions for a global genomics SaaS.',
      'Migrated 15 TB of on-prem data to Azure with Data Factory.',
      'Coordinated distributed engineering teams across Europe.',
    ],
  },
  {
    company: 'Ippon Technologies',
    role: 'Cloud & DevOps Consultant',
    period: '2020 — 2022',
    highlight: false,
    points: [
      'Actia Automotive — software forge modernization, Azure landing zones, Kubernetes execution platform.',
      'Berger-Levrault — monolith→microservices replatforming: Istio, Tekton, ArgoCD, security-by-design; developer platform on Swarm & K8s.',
      'Twelv — sovereign-cloud SaaS architecture on Scaleway Kubernetes.',
    ],
  },
];

export const earlier =
  'Earlier: DevOps Engineer @ SKALE-5 (2021–22) · DevOps Architect @ RGPD Web (2019) · DevOps Architect & IT Manager @ Genesis Groupe (2018–19)';

export const stacks: { group: string; items: string[] }[] = [
  { group: 'Orchestration', items: ['Kubernetes', 'Docker', 'Helm', 'Kustomize'] },
  { group: 'Clouds', items: ['AWS', 'Azure', 'GCP', 'Scaleway'] },
  { group: 'IaC', items: ['Terraform', 'Pulumi', 'Ansible'] },
  { group: 'GitOps & CI/CD', items: ['ArgoCD', 'Flux', 'GitLab CI', 'GitHub Actions', 'Tekton'] },
  { group: 'Observability', items: ['Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry'] },
  { group: 'Security & Identity', items: ['SPIFFE', 'Istio', 'Trivy', 'SOPS'] },
  { group: 'Messaging', items: ['Kafka', 'NATS'] },
  { group: 'AI platforms', items: ['Agentic workflows', 'LLM infrastructure', 'MCP'] },
];
