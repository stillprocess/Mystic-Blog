import { Hero } from "@/components/hero";
import { LatestPosts } from "@/components/latest-posts";

export default function Home() {
  return (
    <section>
      <div className="mx-auto grid w-full max-w-[1400px] gap-0 px-4 sm:px-6 lg:min-h-[calc(100svh-11.25rem)] lg:grid-cols-[minmax(300px,420px)_minmax(560px,640px)] lg:items-stretch lg:justify-between lg:px-8 lg:py-6">
        <Hero />
        <LatestPosts />
      </div>
    </section>
  );
}
