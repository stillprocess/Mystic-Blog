import { GithubIcon } from "@/components/icons";
import { GradientText } from "@/components/gradient-text";
import { ParticleBackground } from "@/components/particle-background";
import { StarBorder } from "@/components/star-border";
import { siteConfig } from "@config/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      <ParticleBackground
        dotRadius={1.5}
        dotSpacing={14}
        cursorRadius={500}
        bulgeOnly
        bulgeStrength={67}
        sparkle
        gradientFrom="rgba(168, 85, 247, 0.35)"
        gradientTo="rgba(59, 130, 246, 0.25)"
        glowColor="rgba(168, 85, 247, 0.15)"
      />
      <div className="relative z-10 px-4 text-center">
        <GradientText className="mx-auto text-5xl font-bold tracking-tight sm:text-6xl">
          {siteConfig.name}
        </GradientText>
        <p className="mt-4 text-lg text-[var(--muted)]">
          {siteConfig.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <StarBorder
            href="/blog"
            color="#a855f7"
            speed="5s"
            thickness={2}
            className="text-sm"
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
            className="text-sm"
          >
            <span className="flex items-center gap-2">
              <GithubIcon className="size-4" />
              GitHub
            </span>
          </StarBorder>
        </div>
      </div>
    </section>
  );
}
