import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog-post-card";
import { GradientText } from "@/components/gradient-text";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@config/site";

export const metadata: Metadata = {
  title: "文章",
  description: `${siteConfig.name} 的全部技术文章。`,
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="flex flex-wrap items-baseline gap-4">
        <GradientText className="mx-0 text-4xl font-bold tracking-tight">
          Blog
        </GradientText>
        <span className="text-sm text-[var(--muted)]">共 {posts.length} 篇</span>
      </div>
      <p className="mt-2 text-[var(--muted)]">
        关于开发、设计和学习方法的记录。
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {posts.length > 0 ? (
          posts.map((post) => <BlogPostCard key={post.slug} post={post} />)
        ) : (
          <p className="col-span-2 text-sm text-[var(--muted)]">
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
