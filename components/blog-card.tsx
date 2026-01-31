import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
}

export function BlogCard({ title, description, date, slug }: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative w-full overflow-hidden px-4">
          <div className="absolute inset-0 z-10 bg-primary opacity-30 mix-blend-color" />
          <div className="relative z-20 aspect-video w-full">
            <Image
              src="https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Mockup image"
              title="Mockup image"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
