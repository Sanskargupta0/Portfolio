import { BiLogoPostgresql } from "react-icons/bi";
import { BsFillBootstrapFill, BsRobot } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import {
  SiCss3,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiTensorflow,
  SiCplusplus,
  SiBun,
  SiPython,
  SiHtml5,
  SiFlask,
  SiArchlinux,
  SiMongodb,
  SiVite,
  SiShadcnui,
  SiMui,
  SiGo,
  SiDocker,
  SiKubernetes,
  SiApachekafka,
  SiPostman,
  SiGithubactions,
  SiN8N,
  SiMysql,
  SiMarkdown
} from "react-icons/si";

import { DiRedis } from "react-icons/di";
import { FaSquareGithub } from "react-icons/fa6";

export type stacksProps = Record<
  string,
  {
    Icon: IconType;
    className: string;
  }
>;

export const FRONTEND_STACKS: stacksProps = {
  JavaScript: { Icon: SiJavascript, className: "text-yellow-400" },
  TypeScript: { Icon: SiTypescript, className: "text-blue-400" },
  "Next.js": { Icon: SiNextdotjs, className: "" },
  "React.js": { Icon: SiReact, className: "text-sky-500" },
  TailwindCSS: { Icon: SiTailwindcss, className: "text-cyan-300" },
  Bootstrap: { Icon: BsFillBootstrapFill, className: "text-purple-500" },
  "C++": { Icon: SiCplusplus, className: "text-blue-500" },
  CSS: { Icon: SiCss3, className: "text-blue-500" },
  Python: { Icon: SiPython, className: "text-yellow-300" },
  Vite : { Icon: SiVite, className: "text-yellow-50" },
  HTML: { Icon: SiHtml5, className: "text-orange-600" },
  ShadcnUi: { Icon: SiShadcnui, className: "text-sky-500" },
  Mui: { Icon: SiMui, className: "text-rose-500" },
  Markdown: { Icon: SiMarkdown, className: "text-gray-500" },
};

export const BACKEND_STACKS = {
  postgreSql: { Icon: BiLogoPostgresql, className: "text-blue-500" },
  Prisma: { Icon: SiPrisma, className: "text-emerald-500" },
  "Node.js": { Icon: SiNodedotjs, className: "text-green-600" },
  Firebase: { Icon: SiFirebase, className: "text-yellow-500" },
  "Artificial Intelligence": { Icon: BsRobot, className: "text-rose-500" },
  Nginx: { Icon: SiNginx, className: "text-green-500" },
  Express: { Icon: SiExpress, className: "" },
  TensorFlow: { Icon: SiTensorflow, className: "text-orange-600" },
  Bun: { Icon: SiBun, className: "text-yellow-50" },
  Flask: { Icon: SiFlask, className: "text-neutral-200" },
  "Arch Linux": { Icon: SiArchlinux, className: "text-sky-400" },
  MongoDB: { Icon: SiMongodb, className: "text-green-400" },
  Go: { Icon: SiGo, className: "text-blue-500" },
  Docker: { Icon: SiDocker, className: "text-blue-500" },
  Kubernetes: { Icon: SiKubernetes, className: "text-blue-500" },
  "Apache Kafka": { Icon: SiApachekafka, className: "text-red-500" },
  Postman: { Icon: SiPostman, className: "text-orange-500" },
  Redis: { Icon: DiRedis, className: "text-red-500" },
  "GitHub Actions": { Icon: SiGithubactions, className: "text-gray-500" },
  "n8n": { Icon: SiN8N, className: "text-green-500" },
  MySQL: { Icon: SiMysql, className: "text-blue-500" },
  "GitHub": { Icon: FaSquareGithub, className: "text-gray-800" }, 
};
