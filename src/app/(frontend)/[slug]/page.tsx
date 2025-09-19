import type { Metadata } from 'next'
import { Card, CardBody, Spacer } from '@heroui/react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'

export async function generateStaticParams() {
  try {
    const pages = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?depth=0&draft=false&limit=1000`)
      .then((res) => res.json())
      .then((res) => res.docs || [])

    return pages.map((page: PageType) => ({
      slug: page.slug,
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

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const { isEnabled: isDraftMode } = await draftMode()

  let page: PageType | null = null

  try {
    page = await getCachedDocument('pages', slug)() as PageType
  } catch (error) {
    console.warn(`Failed to fetch page for slug: ${slug}`)
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <article className="pb-24">
      <PayloadRedirects disableNotFound url={`/${slug}`} />

      {/* Hero Section */}
      {hero && hero.type !== 'none' && (
        <div className="w-full">
          <RenderHero {...hero} />
        </div>
      )}

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {layout && layout.length > 0 && (
          <Card className="w-full bg-transparent shadow-none">
            <CardBody className="p-0">
              <RenderBlocks blocks={layout} />
            </CardBody>
          </Card>
        )}
      </div>

      <Spacer y={8} />

      {isDraftMode && (
        // @ts-ignore
        <LivePreviewListener serverURL={process.env.NEXT_PUBLIC_SERVER_URL || ''} />
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await getCachedDocument('pages', slug)()

  // @ts-ignore
  return generateMeta({ doc: page })
}
