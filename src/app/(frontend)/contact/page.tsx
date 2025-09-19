import type { Metadata } from 'next'
import { Button, Card, CardBody, Input, Spacer, Textarea } from '@heroui/react'
import { draftMode } from 'next/headers'
import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { getCachedDocument } from '@/utilities/getDocument'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { siteConfig } from '@/config/site'
import { ContactFAQ } from '@/components/_client/ContactFAQ'

export default async function ContactPage() {
  const { isEnabled: isDraftMode } = await draftMode()

  let page: PageType | null = null

  try {
    page = (await getCachedDocument('pages', 'contact')()) as PageType
  } catch (error) {
    console.warn('Failed to fetch contact page')
  }

  if (!page) {
    // Fallback UI when no CMS page is found
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-secondary/20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We would love to hear from you. Send us a message and we will respond as soon as
              possible.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="flex flex-col gap-8">
                  <h2 className="text-3xl font-bold">Contact Information</h2>

                  <div className="p-6 bg-primary-50 dark:bg-primary-50/10 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <p><strong>Monday - Friday</strong></p>
                      <p>9:00 AM - 5:00 PM</p>
                      {/*<p>*/}
                      {/*  <strong>Saturday:</strong> 10:00 AM - 4:00 PM*/}
                      {/*</p>*/}
                      {/*<p>*/}
                      {/*  <strong>Sunday:</strong> Closed*/}
                      {/*</p>*/}
                    </div>
                  </div>

                  <div className="p-6 bg-primary-50 dark:bg-primary-50/10 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Quick Response</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Need immediate assistance? We typically respond to all inquiries within 24
                      hours during business days.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      For urgent matters, please mention &#34;URGENT&#34; in your subject line.
                    </p>
                  </div>

                  <div className="p-6 bg-primary-50 dark:bg-primary-50/10 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Other Ways to Connect</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <p className="text-gray-600 dark:text-gray-300">Email: {siteConfig.links.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <p className="text-gray-600 dark:text-gray-300">Phone: {siteConfig.links.phone}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <p className="text-gray-600 dark:text-gray-300">
                          Address: I&A Centre, Regent Court, Block B. Argwings Kodhek Road
                        </p>
                      </div>
                    </div>
                  </div>
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

        {/*/!* FAQ Section *!/*/}
        {/*<section className="bg-gray-50 py-20">*/}
        {/*  <div className="container mx-auto px-4">*/}
        {/*    <div className="max-w-4xl mx-auto text-center">*/}
        {/*      <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>*/}

        {/*      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">*/}
        {/*        {[*/}
        {/*          {*/}
        {/*            question: 'How quickly do you respond?',*/}
        {/*            answer: 'We typically respond within 24 hours during business days.',*/}
        {/*          },*/}
        {/*          {*/}
        {/*            question: 'Do you offer phone support?',*/}
        {/*            answer: 'Yes, phone support is available during business hours.',*/}
        {/*          },*/}
        {/*          {*/}
        {/*            question: 'Can I schedule a consultation?',*/}
        {/*            answer: 'Absolutely! Mention your preferred time in your message.',*/}
        {/*          },*/}
        {/*          {*/}
        {/*            question: 'Do you work with international clients?',*/}
        {/*            answer: 'Yes, we work with clients globally across different time zones.',*/}
        {/*          },*/}
        {/*        ].map((faq, index) => (*/}
        {/*          <Card key={index} className="text-left">*/}
        {/*            <CardBody className="p-6">*/}
        {/*              <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>*/}
        {/*              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>*/}
        {/*            </CardBody>*/}
        {/*          </Card>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/* FAQ Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="border-t-2 inline-block w-fit border-secondary pt-2 pb-4">FAQ</p>
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Find answers to the most common questions about our services and how we can help your business.
              </p>
            </div>
            <ContactFAQ />
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
