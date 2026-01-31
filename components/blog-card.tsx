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
