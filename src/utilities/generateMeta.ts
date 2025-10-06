import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/images/tuque-logo.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const serverUrl = getServerSideURL()

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Tuque Consulting'
    : 'Tuque Consulting'

  const description = doc?.meta?.description || 'Tuque Consulting: Kenya-proud business strategists guiding SMEs and corporations with expert services in company formation, tax planning, compliance, tech & data, and more.'

  // Build canonical URL
  const canonicalUrl = doc?.slug
    ? `${serverUrl}/${Array.isArray(doc.slug) ? doc.slug.join('/') : doc.slug}`
    : serverUrl

  return {
    title,
    description,
    metadataBase: new URL(serverUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: mergeOpenGraph({
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: doc?.meta?.title || title,
            },
          ]
        : undefined,
      ...(doc && 'publishedAt' in doc && doc.publishedAt && {
        publishedTime: doc.publishedAt,
      }),
      ...(doc && 'updatedAt' in doc && doc.updatedAt && {
        modifiedTime: doc.updatedAt,
      }),
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
      creator: '@tuqueconsulting',
      site: '@tuqueconsulting',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
