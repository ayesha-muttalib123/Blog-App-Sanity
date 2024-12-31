import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface"; 
import { client, urlFor } from "./lib/sanity"; // Already imported
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// its for dynamic checking of caches as it will store previous one time you need to check if data come 
// on api on sanity by de
export const revalidate = 30; // revalidate at most 30 seconds

// Fetch data for recent blogs
async function getRecentBlogs() {
  // Fetch blogs for this month
  const thisMonthQuery = `
    *[_type == 'blog' && _createdAt >= '2024-12-01T00:00:00Z'] | order(_createdAt desc) {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      _createdAt
    }`;

  // Fetch blogs for last month
  const lastMonthQuery = `
    *[_type == 'blog' && _createdAt >= '2024-11-01T00:00:00Z' && _createdAt < '2024-12-01T00:00:00Z'] | order(_createdAt desc) {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      _createdAt
    }`;

  // Fetch older blogs (before November 2024)
  const olderBlogsQuery = `
    *[_type == 'blog' && _createdAt < '2024-11-01T00:00:00Z'] | order(_createdAt desc) {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      _createdAt
    }`;

  // Fetch blogs for each time frame
  const thisMonthBlogs = await client.fetch(thisMonthQuery);
  const lastMonthBlogs = await client.fetch(lastMonthQuery);
  const olderBlogs = await client.fetch(olderBlogsQuery);

  return {
    thisMonthBlogs,
    lastMonthBlogs,
    olderBlogs,
  };
}

export default async function Home() {
  // Fetch data from the getRecentBlogs function
  const { thisMonthBlogs, lastMonthBlogs, olderBlogs } = await getRecentBlogs();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Recent Blogs Section */}
      <section>
        <h1 className="text-2xl font-bold mb-5">Recent Blogs Posts </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
          {thisMonthBlogs.map((post: simpleBlogCard, idx: number) => (
            <Card key={idx}>
              <Image
                src={urlFor(post.titleImage).url()}
                alt={post.title}
                width={500}
                height={500}
                className="rounded-t-lg h-[200px] object-cover"
              />
              <CardContent className="mt-5">
                <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
                <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                  {post.smallDescription}
                </p>
                <Button asChild className="w-full mt-7">
                  <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Time Frame Section */}
      <section className="mt-16">
       

        {/* This Month Blogs */}
        <div className="mt-5">
          <h1 className="text-xl font-bold mb-5">This Month Blog Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
            {thisMonthBlogs.map((post: simpleBlogCard, idx: number) => (
              <Card key={idx}>
                <Image
                  src={urlFor(post.titleImage).url()}
                  alt={post.title}
                  width={500}
                  height={500}
                  className="rounded-t-lg h-[200px] object-cover"
                />
                <CardContent className="mt-5">
                  <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
                  <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                    {post.smallDescription}
                  </p>
                  <Button asChild className="w-full mt-7">
                    <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Last Month Blogs */}
        <div className="mt-5">
          <h1 className="text-xl font-bold mb-5">Last Month Blog Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
            {lastMonthBlogs.map((post: simpleBlogCard, idx: number) => (
              <Card key={idx}>
                <Image
                  src={urlFor(post.titleImage).url()}
                  alt={post.title}
                  width={500}
                  height={500}
                  className="rounded-t-lg h-[200px] object-cover"
                />
                <CardContent className="mt-5">
                  <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
                  <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                    {post.smallDescription}
                  </p>
                  <Button asChild className="w-full mt-7">
                    <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Older Blogs */}
        <div className="mt-5">
          <h3 className="text-xl  font-bold">Older Blog Posts </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-5 mt-5 gap-5">
            {olderBlogs.map((post: simpleBlogCard, idx: number) => (
              <Card key={idx}>
                <Image
                  src={urlFor(post.titleImage).url()}
                  alt={post.title}
                  width={500}
                  height={500}
                  className="rounded-t-lg h-[200px] object-cover"
                />
                <CardContent className="mt-5">
                  <h1 className="text-lg line-clamp-2 font-bold">{post.title}</h1>
                  <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                    {post.smallDescription}
                  </p>
                  <Button asChild className="w-full mt-7">
                    <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
