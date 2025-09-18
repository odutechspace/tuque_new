import type { Metadata } from 'next'
import { Button, Card, CardBody, Link, Spacer } from '@heroui/react'
import { draftMode } from 'next/headers'
import React from 'react'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedDocument } from '@/utilities/getDocument'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { ArrowRightIcon, ArrowUpRight, PhoneCall } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default async function HomePage() {
  const { isEnabled: isDraftMode } = await draftMode()

  let page: PageType | null = null

  try {
    page = (await getCachedDocument('pages', 'home')()) as PageType
  } catch (error) {
    console.warn('Failed to fetch home page')
  }

  if (!page) {
    // Fallback UI when no CMS page is found
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="w-full bg-primary/20 min-h-[80vh] flex items-center">
          <div className="grid md:grid-cols-5 gap-4 justify-between container items-center align-middle h-full">
            <div className="col-span-2 flex flex-col gap-8">
              <h2 className="text-7xl">Empowering Business Success with Expert Consulting</h2>
              <p className="text-xl">Navigate Company Formation, Tax Strategies, and Business Growth with Tuque Consulting
              </p>

              <div className="flex items-center gap-8">
                <Button color="primary" size="lg" endContent={<ArrowUpRight/>}>
                  Dial a Consultant
                </Button>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-[50px] h-[50px] bg-white rounded-full"><PhoneCall /></div>
                  <div>
                    <p>Available 24/7</p>
                    <p className="text-xl font-bold">{siteConfig.links.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3">

            </div>
          </div>
        </section>
        {/*<section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">*/}
        {/*  <div className="container mx-auto px-4 text-center">*/}
        {/*    <h1 className="text-5xl md:text-7xl font-bold mb-6">*/}
        {/*      Welcome to Our Website*/}
        {/*    </h1>*/}
        {/*    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">*/}
        {/*      Discover incredible solutions and join thousands of satisfied customers who trust our services.*/}
        {/*    </p>*/}
        {/*    <div className="flex flex-col sm:flex-row gap-4 justify-center">*/}
        {/*      <Button*/}
        {/*        as={Link}*/}
        {/*        href="/about"*/}
        {/*        size="lg"*/}
        {/*        color="secondary"*/}
        {/*        variant="solid"*/}
        {/*      >*/}
        {/*        Learn More*/}
        {/*      </Button>*/}
        {/*      <Button*/}
        {/*        as={Link}*/}
        {/*        href="/contact"*/}
        {/*        size="lg"*/}
        {/*        variant="bordered"*/}
        {/*        className="border-white text-white hover:bg-white hover:text-blue-600"*/}
        {/*      >*/}
        {/*        Get Started*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We provide exceptional service with cutting-edge technology and unmatched customer
                support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Innovation',
                  description: 'Cutting-edge solutions that keep you ahead of the competition.',
                  icon: '⚡',
                },
                {
                  title: 'Quality',
                  description: 'Excellence is not negotiable in everything we deliver.',
                  icon: '🎯',
                },
                {
                  title: 'Support',
                  description: '24/7 customer support to help you succeed.',
                  icon: '🚀',
                },
              ].map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardBody className="text-center p-8">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <Card className="max-w-4xl mx-auto">
              <CardBody className="p-12">
                <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Join thousands of satisfied customers today.
                </p>
                <Button
                  as={Link}
                  href="/contact"
                  size="lg"
                  color="primary"
                  className="font-semibold"
                >
                  Contact Us Today
                </Button>
              </CardBody>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  const { hero, layout } = page

  return (
    <article className="pb-24">
      <PayloadRedirects disableNotFound url="/" />

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

      {/*{isDraftMode && (*/}
      {/*  <LivePreviewListener serverURL={process.env.NEXT_PUBLIC_SERVER_URL || ''} />*/}
      {/*)}*/}
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = (await getCachedDocument('pages', 'home')()) as PageType
    return generateMeta({ doc: page })
  } catch (error) {
    return {
      title: 'Home - Welcome to Our Website',
      description:
        'Discover incredible solutions and join thousands of satisfied customers who trust our services.',
    }
  }
}
