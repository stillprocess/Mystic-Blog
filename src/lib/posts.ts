import "server-only";

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const postExtensions = new Set([".md", ".mdx"]);

export type PostSummary = {
  slug: string;
  fileName: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  pinned: boolean;
};

export type Post = PostSummary & {
  content: string;
};

function requireString(value: unknown, field: string, fileName: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fileName} 的 ${field} 必须是非空字符串。`);
  }

  return value.trim();
}

function parsePost(fileName: string): Post {
  const extension = path.extname(fileName);
  const slug = path.basename(fileName, extension);
  const filePath = path.join(postsDirectory, fileName);
  const { data, content } = matter(readFileSync(filePath, "utf8"));

  const title = requireString(data.title, "title", fileName);
  const date = requireString(data.date, "date", fileName);
  const description = requireString(data.description, "description", fileName);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`${fileName} 的 date 必须使用 YYYY-MM-DD 格式。`);
  }

  if (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === "string")) {
    throw new Error(`${fileName} 的 tags 必须是字符串数组。`);
  }

  if (typeof data.pinned !== "boolean") {
    throw new Error(`${fileName} 的 pinned 必须是布尔值。`);
  }

  return {
    slug,
    fileName,
    title,
    date,
    description,
    tags: data.tags.map((tag: string) => tag.trim()).filter(Boolean),
    pinned: data.pinned,
    content,
  };
}

export function getAllPosts(): PostSummary[] {
  const posts = readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && postExtensions.has(path.extname(entry.name)))
    .map((entry) => parsePost(entry.name));

  const slugs = new Set<string>();

  for (const post of posts) {
    if (slugs.has(post.slug)) {
      throw new Error(`文章 slug 重复：${post.slug}`);
    }
    slugs.add(post.slug);
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date)).map((post) => ({
    slug: post.slug,
    fileName: post.fileName,
    title: post.title,
    date: post.date,
    description: post.description,
    tags: post.tags,
    pinned: post.pinned,
  }));
}

export function getPostBySlug(slug: string): Post | null {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return null;
  }

  const fileName = readdirSync(postsDirectory).find((name) => {
    const extension = path.extname(name);
    return postExtensions.has(extension) && path.basename(name, extension) === slug;
  });

  return fileName ? parsePost(fileName) : null;
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
