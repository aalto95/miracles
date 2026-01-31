import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  html: string;
}

export interface BlogPostPreview {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export function getAllPosts(): BlogPostPreview[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || "1970-01-01",
        description: data.description || "",
      };
    });

  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || "1970-01-01",
    description: data.description || "",
    content,
    html: processedContent.toString(),
  };
}

export function getPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
