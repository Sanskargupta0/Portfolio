import { typo } from "./ui/typograpghy";

type Experience = {
  role: string;
  company: string;
  companyUrl: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
};

const experiences: Experience[] = [
  {
    role: "Software Developer",
    company: "Piovation GmbH",
    companyUrl: "https://piovation.com/",
    period: "10/2025 - Present",
    location: "Grasbrunn, Germany",
    bullets: [
      "Build PioWorker, an AI workflow automation platform, developing backend connectors, custom code execution, and a revamped frontend for smoother workflow configuration.",
      "Automate end-to-end testing with Playwright and Jenkins, reducing manual testing by ~90%; deliver Grafana dashboards for team-wide visibility into test results.",
    ],
    stack: [
      "Playwright",
      "Jenkins",
      "Grafana",
      "Workflow Automation",
      "API Integrations",
    ],
  },
  {
    role: "Software Developer",
    company: "Electronicx GmbH",
    companyUrl: "https://electronicx.de/",
    period: "10/2024 - 09/2025",
    location: "Hindenburgstr, Germany",
    bullets: [
      "Automate return processing and fraud detection for 5,000+ returns worth €520K+, reducing manual effort by ~90% and saving an estimated 2,000+ staff hours.",
      "Build analytics, notifications, and scraping microservices with Node.js, FastAPI, Docker, and GitHub Actions; deliver secure dashboards with JWT authentication and WebSockets.",
    ],
    stack: ["Node.js", "React", "FastAPI", "Docker", "TailwindCSS", "GitHub Actions"],
  },
  {
    role: "Full Stack Developer Intern",
    company: "AptiDude",
    companyUrl: "https://aptidude.in/",
    period: "02/2024 - 09/2024",
    location: "Kharagpur, India",
    bullets: [
      "Build a MERN examination platform with real-time anti-cheating detection, JWT authentication, and multi-tenant access.",
      "Develop admin tools for test creation, user management, and performance analytics.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
  },
];

const Experience = () => {
  return (
    <section aria-label="experience" className="space-y-6">
      <h2 className={typo({ variant: "h2" })}>Work Experience</h2>

      <div className="relative space-y-0">
        {experiences.map((exp, index) => (
          <div key={index} className="flex gap-4">
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center">
              <div className="mt-1 size-3 shrink-0 rounded-full border-2 border-[#00adb5] bg-background" />
              {index < experiences.length - 1 && (
                <div className="mt-1 w-px grow bg-neutral-700" />
              )}
            </div>

            {/* Content */}
            <div className="pb-10">
              {/* Company + period */}
              <div className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ubuntu text-base font-semibold text-foreground hover:text-[#00adb5] transition-colors"
                >
                  {exp.company}
                </a>
                <span className="text-xs text-muted-foreground">
                  {exp.period} · {exp.location}
                </span>
              </div>

              {/* Role */}
              <p className="mt-0.5 text-sm text-[#00adb5]">{exp.role}</p>

              {/* Bullets */}
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neutral-500" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-sm border border-neutral-700 bg-neutral-900 px-2 py-0.5 font-mono text-xs text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
