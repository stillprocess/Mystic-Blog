import { BlogPostCard } from "@/components/blog-post-card";
import { GradientText } from "@/components/gradient-text";
import { getAllPosts } from "@/lib/posts";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <GradientText className="mx-auto text-2xl font-bold">
        Latest Posts
      </GradientText>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {posts.length > 0 ? (
          posts.map((post) => <BlogPostCard key={post.slug} post={post} />)
        ) : (
          <p className="col-span-2 text-sm text-[var(--muted)]">
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
}
