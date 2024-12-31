import React from "react";
import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

// Adjusted interface for the props
interface PageProps {
  params: {
    slug: string;
  };
}

// Fetch blog data based on the slug
async function getData(slug: string) {
  const query = `*[_type == "blog" && slug.current == '${slug}'] {
    "currentSlug": slug.current,
    title,
    content,
    titleImage
  }[0]`;

  const data = await client.fetch(query);
  return data;
}

// Main component
const BlogArticle = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params; // Await params here
  const data: fullBlog = await getData(slug);

  return (
    <div className="mt-8">
      {/* Blog Header */}
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Jan Marshal - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      {/* Blog Title Image */}
      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />

      {/* Blog Content */}
      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>

      {/* Newsletter Subscription Section */}
      <section className="bg-darkBlue mt-16 py-12 px-6 rounded-lg">
        <h2 className="text-center text-white text-3xl font-bold">
          Stories and Interviews
        </h2>
        <p className="text-center text-gray-300 mt-4">
          Subscribe to learn about new product features, the latest in
          technology, solutions, and updates.
        </p>
        <form className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary focus:border-primary"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Subscribe
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          We care about your data in our{" "}
          <a href="/privacy-policy" className="text-primary underline">
            privacy policy
          </a>
          .
        </p>
      </section>

      {/* Comment Section */}
      <section className="mt-16">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Leave a Comment
        </h3>
        <form className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Comment
            </label>
            <textarea
              id="comment"
              rows={4}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Write your comment here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default BlogArticle;
