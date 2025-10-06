import type { Metadata } from 'next'
import { Button, Image, Link, Spacer } from '@heroui/react'
import { ChevronLeft } from 'lucide-react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import type { Post } from '@/payload-types'

import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedDocument } from '@/utilities/getDocument'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getLatestPosts } from '@/utilities/getLatestPosts'

export async function generateStaticParams() {
  try {
    const posts = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?depth=0&draft=false&limit=1000`,
    )
      .then((res) => res.json())
      .then((res) => res.docs || [])

    return posts.map((post: Post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const { isEnabled: isDraftMode } = await draftMode()

  const latestPosts = await getLatestPosts(3)

  if (latestPosts) {
    console.log('latestPosts: ', latestPosts)
  }

  let post: Post | null = null

  try {
    post = (await getCachedDocument('posts', slug)()) as Post
    console.log(post)
  } catch (error) {
    console.log(error);
    console.warn(`Failed to fetch post for slug: ${slug}`)
  }

  if (!post) {
    return notFound()
  }

  return (
    <article className="pb-24 bg-secondary/10">
      <PayloadRedirects disableNotFound url={`/posts/${slug}`} />

      <div className="container grid md:grid-cols-6 gap-4">
        <div className="my-4 md:col-span-6">
          <Button as={Link} href="/blog" variant="light" startContent={<ChevronLeft size={16} />}>
            Back to Blog
          </Button>
        </div>
        <div className="md:col-span-4">
          {/* Back to Blog Button */}

          {/* Post Header */}
          <div className="w-full mb-8">
            <div className="bg-gray-100 min-h-[500px] rounded-xl">
              {post.thumbnail && typeof post.thumbnail !== 'string' && (
                <Image
                  alt={post.thumbnail?.alt || post.title}
                  className="w-full object-cover rounded-xl"
                  src={post.thumbnail?.url || ''}
                  width={1200}
                  height={600}
                />
              )}
            </div>

            <div className="">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4 mt-4">
                {post.tags?.map((tag) =>
                  typeof tag === 'object' ? (
                    <div
                      key={tag.id}
                      className="bg-primary-100 dark:bg-primary-100/50 rounded-lg p-2 px-3"
                    >
                      {tag.tag}
                    </div>
                  ) : null,
                )}
              </div>

              {/* Post Title */}
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

              {/* Post Meta */}
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                {post.populatedAuthors && post.populatedAuthors.length > 0 && (
                  <span>By {post.populatedAuthors.map((author) => author?.name).join(', ')}</span>
                )}
                {post.publishedAt && (
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="w-full border-t pt-4">
            <div className="prose prose-lg max-w-none text-lg">
              {post.content && (
                <RichText data={post.content} enableGutter={false} className="text-lg" />
              )}
            </div>
          </div>

          <Spacer y={8} />
        </div>
        <div className="md:col-span-2">
          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="border rounded-xl p-4">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="flex flex-col gap-6 ">
                {post.relatedPosts.map((relatedPost) =>
                  typeof relatedPost === 'object' ? (
                    <div key={relatedPost.id} className="w-full hover:bg-primary-50 cursor-pointer border-b last:border-none">
                      <div>
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <h3 className="text-lg font-semibold mb-2 hover:text-primary">
                            {relatedPost.title}
                          </h3>
                        </Link>
                        {/*{post.publishedAt && (*/}
                        {/*  <span>*/}
                        {/*    {new Date(post.publishedAt).toLocaleDateString('en-US', {*/}
                        {/*      year: 'numeric',*/}
                        {/*      month: 'long',*/}
                        {/*      day: 'numeric',*/}
                        {/*    })}*/}
                        {/*  </span>*/}
                        {/*)}*/}

                        {/*{relatedPost.meta?.description && (*/}
                        {/*  <p className="text-gray-600 text-sm line-clamp-3">*/}
                        {/*    {relatedPost.meta.description}*/}
                        {/*  </p>*/}
                        {/*)}*/}
                      </div>
                      {/*<Image*/}
                      {/*  src={relatedPost?.thumbnail}*/}
                      {/*  alt={relatedPost.title}*/}
                      {/*  width={100}*/}
                      {/*  height={70}*/}
                      {/*/>*/}
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isDraftMode && (
        // @ts-ignore
        <LivePreviewListener serverURL={process.env.NEXT_PUBLIC_SERVER_URL || ''} />
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await getCachedDocument('posts', slug)() as Post

  if (!post) {
    return {
      title: 'Post Not Found | Tuque Consulting',
      description: 'The requested blog post could not be found.',
    }
  }

  const metadata = await generateMeta({ doc: post })

  console.log(metadata)

  // Enhanced metadata for blog posts
  return {
    ...metadata,
    keywords: post.tags?.map(tag => typeof tag === 'object' ? tag.tag : '').filter(Boolean).join(', '),
    authors: post.populatedAuthors?.map(author => ({ name: author?.name || '' })) || [{ name: 'Tuque Consulting' }],
    category: 'Business Consulting',
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      ...(post.populatedAuthors?.length && {
        authors: post.populatedAuthors.map(author => author?.name || ''),
      }),
      ...(post.tags?.length && {
        tags: post.tags.map(tag => typeof tag === 'object' ? tag.tag : '').filter(Boolean),
      }),
    },
    twitter: {
      ...metadata.twitter,
      card: 'summary_large_image',
    },
  }
}
