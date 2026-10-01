import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { GithubIcon } from "@/components/icons";
import { getAllProjects, getProjectBySlug } from "@data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function ProjectSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-[var(--line)] pt-9 sm:pt-11">
      <h2 className="text-2xl font-bold tracking-[-0.035em] text-neutral-950 dark:text-neutral-50 sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 text-base leading-7 text-neutral-600 dark:text-neutral-300">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[0.68rem] size-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "项目不存在" };
  }

  return {
    title: project.name,
    description: project.description,
    keywords: project.techStack,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
      <div className="mx-auto w-full max-w-4xl px-4 pt-12 pb-20 sm:pt-16 sm:pb-24">
        <Link
          href="/projects"
          className="focus-ring text-sm font-medium text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
        >
          ← 返回项目列表
        </Link>

        <article className="mt-10">
          <header className="pb-11 sm:pb-14">
            {project.placeholder && (
              <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                占位项目 · 不代表真实经历
              </span>
            )}
            <h1 className="mt-5 text-3xl leading-tight font-bold tracking-tight sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </header>

          <div className="grid gap-11 sm:gap-14">
            <ProjectSection title="Overview">
              <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300">{project.overview}</p>
            </ProjectSection>

            <ProjectSection title="System Architecture">
              <ol className="grid gap-3 sm:grid-cols-2">
                {project.systemArchitecture.map((step, index) => (
                  <li key={step} className="surface-card p-5">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">STEP {index + 1}</span>
                    <p className="mt-2 text-sm leading-6 font-medium text-neutral-800 dark:text-neutral-200">{step}</p>
                  </li>
                ))}
              </ol>
            </ProjectSection>

            <div className="grid gap-11 sm:grid-cols-2 sm:gap-8">
              <ProjectSection title="Hardware">
                <DetailList items={project.hardware} />
              </ProjectSection>
              <ProjectSection title="Software">
                <DetailList items={project.software} />
              </ProjectSection>
            </div>

            <ProjectSection title="Communication">
              <DetailList items={project.communication} />
            </ProjectSection>

            <ProjectSection title="Key Features">
              <DetailList items={project.keyFeatures} />
            </ProjectSection>

            <ProjectSection title="Problems & Solutions">
              <div className="grid gap-4">
                {project.problemsAndSolutions.map((item) => (
                  <div key={item.problem} className="surface-card p-5 sm:p-6">
                    <h3 className="font-bold text-neutral-950 dark:text-neutral-50">{item.problem}</h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">{item.solution}</p>
                  </div>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Screenshots">
              <div className="grid gap-5 sm:grid-cols-2">
                {project.screenshots.map((screenshot) => (
                  <figure key={screenshot.title} className="surface-card overflow-hidden">
                    {screenshot.imageSrc ? (
                      <Image
                        src={screenshot.imageSrc}
                        alt={screenshot.imageAlt}
                        width={1200}
                        height={675}
                        className="aspect-video w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-video items-center justify-center border-b border-neutral-200 bg-[linear-gradient(135deg,#fafafa_25%,#f5f5f5_25%,#f5f5f5_50%,#fafafa_50%,#fafafa_75%,#f5f5f5_75%)] bg-[length:18px_18px] px-5 text-center text-sm font-medium text-neutral-400 dark:border-neutral-700 dark:bg-none dark:bg-neutral-800 dark:text-neutral-500">
                        Screenshot Placeholder
                      </div>
                    )}
                    <figcaption className="p-4">
                      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{screenshot.title}</p>
                      <p className="mt-1 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{screenshot.description}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="GitHub">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg bg-neutral-950 px-5 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  <span className="flex items-center gap-2 text-white">
                    <GithubIcon className="size-4" />
                    查看 GitHub 仓库
                  </span>
                </a>
              ) : (
                <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-5 text-sm leading-6 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-400">
                  GitHub 仓库待补充。填写真实项目数据后，此处会显示仓库链接。
                </div>
              )}
            </ProjectSection>
          </div>
        </article>
      </div>
  );
}
