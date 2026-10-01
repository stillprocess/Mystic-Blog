import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadPostComponent } from "@/lib/load-post-component";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "文章不存在" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const PostContent = await loadPostComponent(post.fileName);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)] sm:gap-4">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
        </div>
      </header>

      <div className="article-content mt-12">
        <PostContent />
      </div>
    </article>
  );
}
