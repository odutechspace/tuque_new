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
          <Card key={post.id} className="w-full h-full hover:shadow-lg transition-shadow border-2 border-green-500">
            <CardHeader className="border border-red-500  h-[300px] w-full">
              {post.thumbnail && (
                <Image
                  alt={post.thumbnail?.alt || post.title}
                  className="w-full object-cover rounded-x border-2 border-blue-500"
                 /* src={post.meta.image.url || ''}*/
                  src={post?.thumbnail?.url || ''}
                  width={400}
                  height={200}
                />
              )}
            </CardHeader>
            <CardBody className="px-4 py-4">
              {/*<div className="flex flex-wrap gap-2 mb-3">
                {post.categories?.map((category) =>
                  typeof category === 'object' ? (
                    <Chip key={category.id} size="sm" variant="flat">
                      {category.title}
                    </Chip>
                  ) : null
                )}
              </div>*/}

              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary">
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
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center gap-4">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />

        <Pagination
          page={posts.page}
          totalPages={posts.totalPages}
          href="/blog"
        />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog',
    description: 'Read our latest blog posts and insights',
  }
}
