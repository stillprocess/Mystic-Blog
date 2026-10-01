import Link from "next/link";
import { TiltedCard } from "@/components/tilted-card";
import { formatPostDate, type PostSummary } from "@/lib/posts";

type BlogPostCardProps = {
  post: PostSummary;
  compact?: boolean;
};

export function BlogPostCard({ post, compact = false }: BlogPostCardProps) {
  return (
    <TiltedCard className="h-full" rotateAmplitude={8} scaleOnHover={1.02}>
      <article
        className={`group h-full rounded-xl border border-[var(--border)] bg-[var(--card)] transition-all hover:shadow-lg ${compact ? "p-3.5" : "p-6"}`}
      >
        <div className={`flex items-center ${compact ? "gap-1.5" : "gap-2"}`}>
          {post.pinned && (
            <span
              className={`rounded bg-amber-500/10 py-0.5 font-medium text-amber-600 dark:text-amber-400 ${compact ? "px-1.5 text-[11px]" : "px-2 text-xs"}`}
            >
              置顶
            </span>
          )}
          <time
            dateTime={post.date}
            className={`${compact ? "text-[13px]" : "text-sm"} text-[var(--muted)]`}
          >
            {formatPostDate(post.date)}
          </time>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2
            className={`${compact ? "mt-1.5 text-[17px] leading-6" : "mt-3 text-xl"} font-semibold transition-all group-hover:opacity-70`}
          >
            {post.title}
          </h2>
        </Link>
        <p
          className={`${compact ? "mt-1.5 text-[13px] leading-5" : "mt-2 text-sm"} line-clamp-2 text-[var(--muted)]`}
        >
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div
            className={`${compact ? "mt-2.5 gap-1.5" : "mt-4 gap-2"} flex flex-wrap`}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full bg-[var(--border)] py-0.5 text-[var(--muted)] ${compact ? "px-2 text-[11px]" : "px-2.5 text-xs"}`}
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
