import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      title: true,
      slug: true,
      content: true,
      thumbnail: true,
      tags: true,
      relatedPosts: true,
      categories: true,
      meta: true,
      authors: true,
      populatedAuthors: true,
      publishedAt: true,
      heroImage: true,
    },
  })

  return page.docs[0]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (collection: Collection, slug: string) =>
  unstable_cache(async () => getDocument(collection, slug), [collection, slug], {
    tags: [`${collection}_${slug}`],
  })
