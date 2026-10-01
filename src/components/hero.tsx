import { GithubIcon } from "@/components/icons";
import { GradientText } from "@/components/gradient-text";
import { StarBorder } from "@/components/star-border";
import { siteConfig } from "@config/site";

export function Hero() {
  return (
    <section className="flex min-h-[60svh] items-center justify-center lg:min-h-0 lg:justify-start">
      <div className="relative z-10 w-full py-12 text-center lg:py-0 lg:text-left">
        <GradientText className="mx-auto text-5xl font-bold tracking-tight sm:text-[52px] lg:mx-0">
          {siteConfig.name}
        </GradientText>
        <p className="mt-4 text-base text-[var(--muted)]">
          {siteConfig.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:mt-6 lg:justify-start">
          <StarBorder
            href="/blog"
            color="#a855f7"
            speed="5s"
            thickness={2}
            className="text-[13px] [&>span:last-child]:px-5 [&>span:last-child]:py-2.5"
          >
            Read the Blog
          </StarBorder>
          <StarBorder
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="#3b82f6"
            speed="5s"
            thickness={2}
            className="text-[13px] [&>span:last-child]:px-5 [&>span:last-child]:py-2.5"
          >
            <span className="flex items-center gap-1.5">
              <GithubIcon className="size-3.5" />
              GitHub
            </span>
          </StarBorder>
        </div>
      </div>
    </section>
  );
}
