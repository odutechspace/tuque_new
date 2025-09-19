import { Post } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getLatestPosts(limit = 3, depth = 1): Promise<Post[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    limit,
    depth,                   // so categories/authors come populated
    sort: '-publishedAt',    // newest first (or use "-createdAt")
    where: {
      _status: { equals: 'published' },
    },
    select: {
      id: true,
      thumbnail: true,
      createdAt: true,
      title: true,
    },
  })

  return result.docs as Post[]
}
