import type { Metadata } from 'next'
import { Card, CardBody, CardHeader, Chip, Image, Link } from '@heroui/react'
import React from 'react'

import type { Post } from '@/payload-types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Args = {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const searchParams = await searchParamsPromise
  const page = parseInt(searchParams?.page || '1', 10)

  const payload = await getPayload({ config: configPromise });

  const posts: any = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      meta: true,
      publishedAt: true,
      populatedAuthors: true,
      thumbnail: true,
      tags: true,
    },
  });

  console.log(posts);

  const formattedDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Blog Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover insights, tutorials, and stories from our team
        </p>
      </div>

      {/* Featured Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.docs?.map((post: Post) => (
          <div key={post.id} className="w-full h-full cursor-pointer">
            <div className="flex w-full overflow-hidden rounded-xl">
              {post.thumbnail && typeof post.thumbnail !== 'string' && (
                <Image
                  alt={post.thumbnail.alt || post.title}
                  className="w-full h-[300px] md:h-auto object-cover rounded-x transform transition duration-300 hover:scale-110 hover:-rotate-[-4deg]"
                  src={post.thumbnail.url || ''}
                  width={1000}
                  height={350}
                />
              )}
            </div>
            <div className="">
              {/*<div className="flex flex-wrap gap-2 mb-3">
                {post.categories?.map((category) =>
                  typeof category === 'object' ? (
                    <Chip key={category.id} size="sm" variant="flat">
                      {category.title}
                    </Chip>
                  ) : null
                )}
              </div>*/}

              {/*@ts-ignore*/}
              {post?.tags?.length > 0 && (
                <ul className="flex flex-row gap-2 flex-wrap mt-[25px] mb-[10px] p-0 list-none">
                  {post?.tags?.map((tag) => (
                    <li key={tag.id} className="p-2 bg-primary/20 rounded-lg text-[#081a4e]">
                      {tag.tag}
                    </li>
                  ))}
                </ul>
              )}

              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-2xl font-semibold mb-2 line-clamp-2 text-[#161540]">
                  {post.title}
                </h2>
              </Link>

              {post.meta?.description && (
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.meta.description}
                </p>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                {post.populatedAuthors && post.populatedAuthors.length > 0 && (
                  <span>By {post.populatedAuthors[0]?.name}</span>
                )}
                {post.publishedAt && (
                  <span className="text-medium">Tuque Insights | {formattedDate(new Date(post.publishedAt))}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/*<div className="flex flex-col items-center gap-4">*/}
      {/*  <PageRange*/}
      {/*    collection="posts"*/}
      {/*    currentPage={posts.page}*/}
      {/*    limit={12}*/}
      {/*    totalDocs={posts.totalDocs}*/}
      {/*  />*/}

      {/*  <Pagination*/}
      {/*    page={posts.page}*/}
      {/*    totalPages={posts.totalPages}*/}
      {/*    href={"/blog"}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog',
    description: 'Read our latest blog posts and insights',
  }
}
