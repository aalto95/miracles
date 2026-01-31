import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  type BlogPost,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
} from "@/lib/blog";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  let post: BlogPost;

  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            ← Back to Blog
          </Button>
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-gray-600">{formattedDate}</p>
          </header>

          <div
            className="prose prose-sm sm:prose-base max-w-none"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown content is safe
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        <nav className="mt-12 pt-8 border-t border-gray-200 flex justify-between">
          {previousPost ? (
            <Link href={`/blog/${previousPost.slug}`}>
              <Button variant="outline">← {previousPost.title}</Button>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`}>
              <Button variant="outline">{nextPost.title} →</Button>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </main>
  );
}
