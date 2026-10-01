import type { Metadata } from "next";
import { GradientText } from "@/components/gradient-text";
import { ProjectCard } from "@/components/project-card";
import { siteConfig } from "@config/site";
import { getAllProjects } from "@data/projects";

export const metadata: Metadata = {
  title: "项目",
  description: `${siteConfig.name} 的项目列表。`,
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="flex flex-wrap items-baseline gap-4">
        <GradientText className="mx-0 text-4xl font-bold tracking-tight">
          Projects
        </GradientText>
        <span className="text-sm text-[var(--muted)]">共 {projects.length} 个</span>
      </div>
      <p className="mt-2 text-[var(--muted)]">
        项目结构、技术方案和问题处理记录。
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
