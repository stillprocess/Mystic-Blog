import Link from "next/link";
import { TiltedCard } from "@/components/tilted-card";
import { formatPostDate, type PostSummary } from "@/lib/posts";

export function BlogPostCard({ post }: { post: PostSummary }) {
  return (
    <TiltedCard className="h-full" rotateAmplitude={8} scaleOnHover={1.02}>
      <article className="group h-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:shadow-lg">
        <div className="flex items-center gap-2">
          {post.pinned && (
            <span className="rounded bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              置顶
            </span>
          )}
          <time dateTime={post.date} className="text-sm text-[var(--muted)]">
            {formatPostDate(post.date)}
          </time>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="mt-3 text-xl font-semibold transition-all group-hover:opacity-70">
            {post.title}
          </h2>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </TiltedCard>
  );
}
