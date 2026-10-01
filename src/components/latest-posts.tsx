import { BlogPostCard } from "@/components/blog-post-card";
import { GradientText } from "@/components/gradient-text";
import { getAllPosts } from "@/lib/posts";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 4);

  return (
    <section className="min-w-0 self-center py-12 lg:w-full lg:max-w-[640px] lg:justify-self-end lg:py-0">
      <GradientText className="text-[22px] font-bold">
        Latest Posts
      </GradientText>
      <div className="mt-5 grid gap-3.5 sm:grid-cols-2 xl:ml-12 xl:w-full">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} compact />
          ))
        ) : (
          <p className="col-span-2 text-sm text-[var(--muted)]">
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
}
