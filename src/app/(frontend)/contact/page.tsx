import type { Metadata } from 'next'
import { Card, CardBody, Spacer, Button, Input, Textarea, Select, SelectItem } from '@heroui/react'
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

export default async function ContactPage() {
  const { isEnabled: isDraftMode } = await draftMode()

  let page: PageType | null = null

  try {
    page = await getCachedDocument('pages', 'contact')() as PageType
  } catch (error) {
    console.warn('Failed to fetch contact page')
  }

  if (!page) {
    // Fallback UI when no CMS page is found
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We would love to hear from you. Send us a message and we will respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Contact Information */}
                <div>
                  <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

                  <Card className="mb-8">
                    <CardBody className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                      <div className="space-y-2 text-gray-600">
                        <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                        <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                        <p><strong>Sunday:</strong> Closed</p>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="mb-8">
                    <CardBody className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Quick Response</h3>
                      <p className="text-gray-600 mb-4">
                        Need immediate assistance? We typically respond to all inquiries within 24 hours during business days.
                      </p>
                      <p className="text-gray-600">
                        For urgent matters, please mention &#34;URGENT&#34; in your subject line.
                      </p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Other Ways to Connect</h3>
                      <div className="space-y-3">
                        <p className="text-gray-600">📧 Email: hello@company.com</p>
                        <p className="text-gray-600">📞 Phone: (555) 123-4567</p>
                        <p className="text-gray-600">📍 Address: 123 Business St, City, State 12345</p>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Contact Form */}
                <div>
                  <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

                  <Card>
                    <CardBody className="p-8">
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="First Name"
                            placeholder="Enter your first name"
                            isRequired
                            variant="bordered"
                          />
                          <Input
                            label="Last Name"
                            placeholder="Enter your last name"
                            isRequired
                            variant="bordered"
                          />
                        </div>

                        <Input
                          label="Email Address"
                          placeholder="Enter your email"
                          type="email"
                          isRequired
                          variant="bordered"
                        />

                        <Input
                          label="Phone Number"
                          placeholder="Enter your phone number"
                          type="tel"
                          variant="bordered"
                        />

                        {/*<Select*/}
                        {/*  label="Subject"*/}
                        {/*  placeholder="Select a subject"*/}
                        {/*  isRequired*/}
                        {/*  variant="bordered"*/}
                        {/*>*/}
                        {/*  <SelectItem key="general">General Inquiry</SelectItem>*/}
                        {/*  <SelectItem key="support">Support Request</SelectItem>*/}
                        {/*  <SelectItem key="sales">Sales Question</SelectItem>*/}
                        {/*  <SelectItem key="partnership">Partnership</SelectItem>*/}
                        {/*  <SelectItem key="other">Other</SelectItem>*/}
                        {/*</Select>*/}

                        <Textarea
                          label="Message"
                          placeholder="Tell us how we can help you..."
                          isRequired
                          variant="bordered"
                          minRows={5}
                        />

                        <Button
                          type="submit"
                          color="primary"
                          size="lg"
                          className="w-full font-semibold"
                        >
                          Send Message
                        </Button>
                      </form>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question: "How quickly do you respond?",
                    answer: "We typically respond within 24 hours during business days."
                  },
                  {
                    question: "Do you offer phone support?",
                    answer: "Yes, phone support is available during business hours."
                  },
                  {
                    question: "Can I schedule a consultation?",
                    answer: "Absolutely! Mention your preferred time in your message."
                  },
                  {
                    question: "Do you work with international clients?",
                    answer: "Yes, we work with clients globally across different time zones."
                  }
                ].map((faq, index) => (
                  <Card key={index} className="text-left">
                    <CardBody className="p-6">
                      <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const { hero, layout } = page

  return (
    <article className="pb-24">
      <PayloadRedirects disableNotFound url="/contact" />

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

export function generateMetadata(): Metadata {
  return {
    title: 'Contact Us',
    description: 'Get in touch with our team. We would love to hear from you',
  }
}
