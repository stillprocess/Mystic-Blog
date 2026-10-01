import Link from "next/link";
import { GithubIcon, MenuIcon } from "@/components/icons";
import { StarBorder } from "@/components/star-border";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@config/site";

const navItems = [
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--background) 80%, transparent)",
      }}
    >
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="focus-ring text-lg font-bold tracking-tight transition-all hover:opacity-70"
        >
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring text-sm text-[var(--muted)] transition-all hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
          <StarBorder
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="#a855f7"
            speed="8s"
            thickness={1}
            className="p-2"
            aria-label="打开 GitHub"
          >
            <GithubIcon className="size-4 text-[var(--muted)]" />
          </StarBorder>
          <ThemeSwitcher />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeSwitcher />
          <details className="group relative">
            <summary className="focus-ring flex size-8 cursor-pointer list-none items-center justify-center rounded-full text-[var(--muted)] [&::-webkit-details-marker]:hidden">
              <span className="sr-only">打开导航菜单</span>
              <MenuIcon className="size-4" />
            </summary>
            <div className="absolute right-0 mt-3 w-48 rounded-xl border border-[var(--border)] bg-[var(--background)] p-2 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring block rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--card)]"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--card)]"
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
