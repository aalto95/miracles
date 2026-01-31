import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";

export default function Page() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Exploring web development, technology, and everything in between.
            Join me on this journey of learning and sharing.
          </p>
          <Link href="/blog">
            <Button size="lg">Read My Blog</Button>
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Recent Posts
            </h2>
            <p className="text-gray-600">
              Check out my latest articles and thoughts.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
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

          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline">View All Posts</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            About This Blog
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            This is my personal space to share knowledge, insights, and
            experiences in web development and technology. Whether you're a
            beginner or an experienced developer, I hope you find something
            valuable here.
          </p>
        </div>
      </section>
    </main>
  );
}
