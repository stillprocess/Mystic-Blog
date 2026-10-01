import type { Metadata } from "next";
import { GradientText } from "@/components/gradient-text";
import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@config/site";

export const metadata: Metadata = {
  title: "关于",
  description: "网站说明与联系信息。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <GradientText className="mx-0 text-4xl font-bold tracking-tight">
        About
      </GradientText>
      <div className="mt-8 space-y-4 leading-relaxed">
        <p>{siteConfig.description}</p>
        <p>
          这里用于整理技术文章与项目记录。个人介绍尚未补充，当前页面只展示网站信息和公开联系方式。
        </p>
      </div>

      <section className="mt-12 border-t border-[var(--border)] pt-10">
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm transition-all hover:opacity-70"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
          {siteConfig.email && (
            <a
              href={`mailto:${siteConfig.email}`}
              className="focus-ring rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm transition-all hover:opacity-70"
            >
              {siteConfig.email}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
