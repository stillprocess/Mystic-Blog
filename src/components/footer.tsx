import { GithubIcon } from "@/components/icons";
import { StarBorder } from "@/components/star-border";
import { siteConfig } from "@config/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-4xl px-4 py-8 text-center text-sm text-[var(--muted)]">
        <StarBorder
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="#a855f7"
          speed="10s"
          thickness={1}
          className="inline-flex items-center gap-1.5"
        >
          <span className="flex items-center gap-1.5">
            <GithubIcon className="size-4" />
            GitHub
          </span>
        </StarBorder>
        <p className="mt-4">© {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.</p>
      </div>
    </footer>
  );
}
