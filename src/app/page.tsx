import { Hero } from "@/components/hero";
import { LatestPosts } from "@/components/latest-posts";

export default function Home() {
  return (
    <section>
      <div className="mx-auto grid w-full max-w-[1240px] gap-0 px-4 sm:px-6 lg:min-h-[calc(100svh-11.25rem)] lg:grid-cols-[minmax(300px,0.8fr)_minmax(600px,1.4fr)] lg:items-stretch lg:gap-12 lg:px-8 lg:py-6 xl:gap-16">
        <Hero />
        <LatestPosts />
      </div>
    </section>
  );
}
