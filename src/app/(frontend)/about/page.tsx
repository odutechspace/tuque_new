import type { Metadata } from 'next'
import { Card, CardBody, Spacer, Button, Link } from '@heroui/react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedDocument } from '@/utilities/getDocument'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'

export default async function AboutPage() {
  const { isEnabled: isDraftMode } = await draftMode()

  let page: PageType | null = null

  try {
    page = await getCachedDocument('pages', 'about')() as PageType
  } catch (error) {
    console.warn('Failed to fetch about page')
  }

  if (!page) {
    // Fallback UI when no CMS page is found
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Our Company
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Learn about our mission, values, and the passionate team behind our success.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
              <Card className="mb-12">
                <CardBody className="p-8">
                  <p className="text-lg text-gray-700 mb-6">
                    Founded with a vision to revolutionize the industry, our company has grown from a small startup to a trusted leader. We believe in innovation, quality, and putting our customers first.
                  </p>
                  <p className="text-lg text-gray-700">
                    Our journey began with a simple idea: to provide exceptional solutions that empower businesses and individuals to achieve their full potential through innovative technology and outstanding service.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Mission */}
                <Card className="h-full">
                  <CardBody className="p-8">
                    <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                    <p className="text-lg text-gray-700">
                      To provide exceptional solutions that empower businesses and individuals to achieve their full potential through innovative technology and outstanding service.
                    </p>
                  </CardBody>
                </Card>

                {/* Values */}
                <Card className="h-full">
                  <CardBody className="p-8">
                    <h3 className="text-3xl font-bold mb-6">Our Values</h3>
                    <ul className="space-y-4">
                      {[
                        "Innovation: We constantly push boundaries to deliver cutting-edge solutions",
                        "Quality: Excellence is not negotiable in everything we do",
                        "Customer Focus: Your success is our success",
                        "Integrity: We operate with transparency and honesty"
                      ].map((value, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary text-xl mr-3">•</span>
                          <span className="text-gray-700">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Passionate professionals dedicated to delivering exceptional results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Leadership", description: "Experienced leaders guiding our vision", icon: "👥" },
                { name: "Innovation", description: "Creative minds driving breakthrough solutions", icon: "💡" },
                { name: "Support", description: "Dedicated team ensuring customer success", icon: "🤝" }
              ].map((team, index) => (
                <Card key={index} className="text-center h-full">
                  <CardBody className="p-8">
                    <div className="text-6xl mb-4">{team.icon}</div>
                    <h3 className="text-2xl font-semibold mb-4">{team.name}</h3>
                    <p className="text-gray-600">{team.description}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Want to Learn More?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get in touch with our team to discover how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="/contact"
                size="lg"
                color="secondary"
                variant="solid"
              >
                Contact Us
              </Button>
              <Button
                as={Link}
                href="/blog"
                size="lg"
                variant="bordered"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Read Our Blog
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const { hero, layout } = page

  return (
    <article className="pb-24">
      <PayloadRedirects disableNotFound url="/about" />

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
        <LivePreviewListener serverURL={process.env.NEXT_PUBLIC_SERVER_URL || ''} />
      )}
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'About Us',
    description: 'Learn more about our company, mission, and team',
  }
}