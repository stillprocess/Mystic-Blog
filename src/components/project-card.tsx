import Link from "next/link";
import { GithubIcon } from "@/components/icons";
import { TiltedCard } from "@/components/tilted-card";
import type { Project } from "@data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltedCard className="h-full" rotateAmplitude={8} scaleOnHover={1.02}>
      <article className="group flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:shadow-lg">
        {project.placeholder && (
          <span className="w-fit rounded bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
            占位项目
          </span>
        )}
        <Link href={`/projects/${project.slug}`}>
          <h2 className="mt-3 text-xl font-semibold transition-all group-hover:opacity-70">
            {project.name}
          </h2>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--muted)]"
            >
              {technology}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="focus-ring font-medium transition-all hover:opacity-70"
          >
            View Project
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-1.5 text-[var(--muted)] transition-all hover:opacity-70"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          )}
        </div>
      </article>
    </TiltedCard>
  );
}
