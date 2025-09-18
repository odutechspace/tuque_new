import type { Metadata } from 'next'
import { Card, CardBody, CardHeader, Chip, Image, Link, Button, Spacer } from '@heroui/react'
import { ChevronLeft } from 'lucide-react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import type { Post } from '@/payload-types'

import { RichText } from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedDocument } from '@/utilities/getDocument'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'

export async function generateStaticParams() {
  try {
    const posts = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?depth=0&draft=false&limit=1000`)
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

  let post: Post | null = null

  try {
    post = await getCachedDocument('posts', slug)()
  } catch (error) {
    console.warn(`Failed to fetch post for slug: ${slug}`)
  }

  if (!post) {
    return notFound()
  }

  return (
    <article className="pb-24">
      <PayloadRedirects disableNotFound url={`/posts/${slug}`} />

      <div className="container mx-auto px-4 py-8">
        {/* Back to Blog Button */}
        <div className="mb-8">
          <Button
            as={Link}
            href="/blog"
            variant="light"
            startContent={<ChevronLeft size={16} />}
          >
            Back to Blog
          </Button>
        </div>

        {/* Post Header */}
        <Card className="w-full mb-8">
          <CardHeader className="pb-0">
            {post.heroImage && typeof post.heroImage !== 'string' && (
              <Image
                alt={post.heroImage.alt || post.title}
                className="w-full object-cover rounded-xl"
                src={post.heroImage.url || ''}
                width={1200}
                height={600}
              />
            )}
          </CardHeader>
          
          <CardBody className="px-8 py-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories?.map((category) =>
                typeof category === 'object' ? (
                  <Chip key={category.id} size="sm" variant="flat" color="primary">
                    {category.title}
                  </Chip>
                ) : null
              )}
            </div>

            {/* Post Title */}
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            {/* Post Meta */}
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              {post.populatedAuthors && post.populatedAuthors.length > 0 && (
                <span>By {post.populatedAuthors.map(author => author?.name).join(', ')}</span>
              )}
              {post.publishedAt && (
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Post Content */}
        <Card className="w-full">
          <CardBody className="px-8 py-8">
            <div className="prose prose-lg max-w-none">
              {post.content && <RichText content={post.content} enableGutter={false} />}
            </div>
          </CardBody>
        </Card>

        <Spacer y={8} />

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost) =>
                typeof relatedPost === 'object' ? (
                  <Card key={relatedPost.id} className="w-full hover:shadow-lg transition-shadow">
                    <CardBody>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <h3 className="text-lg font-semibold mb-2 hover:text-primary">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      {relatedPost.meta?.description && (
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {relatedPost.meta.description}
                        </p>
                      )}
                    </CardBody>
                  </Card>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>

      {isDraftMode && (
        <LivePreviewListener serverURL={process.env.NEXT_PUBLIC_SERVER_URL || ''} />
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await getCachedDocument('posts', slug)()

  return generateMeta({ doc: post })
}