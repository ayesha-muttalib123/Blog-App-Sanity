import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // Revalidate every 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
      "currentSlug": slug.current,
      title,
      content,
      titleImage
    }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
    //dont put array on full blog cz its one object already
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Blog Header */}
      <header className="text-center">
        <h1 className="text-base text-primary font-semibold tracking-wide uppercase">
          Ayesha - Blog
        </h1>
        <h2 className="mt-2 text-3xl leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </h2>
      </header>

      {/* Title Image */}
      <div className="mt-8">
        <Image
          src={urlFor(data.titleImage).url()}
          width={800}
          height={800}
          alt="Title Image"
          //next js will list things which are in the priority lists
          priority
          className="rounded-lg border shadow-md"
        />
      </div>

      {/* Blog Content */}
      <article className="mt-16 prose prose-blue prose-lg dark:prose-invert">
        {/* adding prose things using tailwind typography it the library which adjust the looking of your text  */}
      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
      </article>

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
}
