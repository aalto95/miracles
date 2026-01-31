import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-lg text-gray-600">
              Thoughts, tutorials, and insights on web development and technology.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/">
              <Button variant="outline">To Home Page</Button>
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
