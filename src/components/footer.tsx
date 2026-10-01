import { siteConfig } from "@config/site";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-4xl px-4 py-8 text-center text-sm text-[var(--muted)]">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.</p>
      </div>
    </footer>
  );
}
