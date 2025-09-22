import type { Metadata } from 'next'
import { Button, Card, CardBody, Chip, Spacer } from '@heroui/react'
import { draftMode } from 'next/headers'
import React from 'react'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedDocument } from '@/utilities/getDocument'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { ArrowUpRight, PhoneCall } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { PartnersSlider } from '@/components/_client/PartnersSlider'
import Image from 'next/image'
import { ConsultationSteps } from '@/components/_client/ConsultationSteps'
import { Stats } from '@/components/_client/Stats'
import { SubscribeCTA } from '@/components/_client/SubscribeCTA'
import { Services } from '@/components/_client/Services'
import Link from 'next/link'

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
          <div className="grid md:grid-cols-5 gap-4 justify-between container items-center min-h-[80vh]">
            <div className="col-span-2 flex flex-col gap-8">
              <h2 className="text-5xl md:text-7xl">
                Empowering Business Success with Expert Consulting
              </h2>
              <p className="text-xl">
                Navigate Company Formation, Tax Strategies, and Business Growth with Tuque
                Consulting
              </p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button
                  as={Link}
                  href={'tel:' + siteConfig.links.phone}
                  color="primary"
                  size="lg"
                  endContent={<ArrowUpRight />}
                  className="flex-grow font-bold"
                >
                  Dial a Consultant
                </Button>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-[50px] h-[50px] bg-white rounded-full">
                    <PhoneCall />
                  </div>
                  <div>
                    <p>Available 24/7</p>
                    <p className="text-xl font-bold">{siteConfig.links.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 text-center relative hidden md:block w-full h-full">
              <Image
                className="absolute w-full h-full object-cover"
                src={'/images/bg/bg9.png'}
                width={200}
                height={200}
                alt={''}
              />
              <Image
                className="absolute mx-auto bottom-[50%] left-[10%]"
                src={'/images/home/growth.jpg'}
                width={200}
                height={400}
                alt={''}
              />
              <Image
                className="absolute left-[50%] transform -translate-x-[50%] bottom-[20%]"
                src={'/images/home/advisor.jpg'}
                width={200}
                height={400}
                alt={''}
              />
              <Image
                className="absolute mx-auto right-[10%] bottom-[50%]"
                src={'/images/home/decision.jpg'}
                width={200}
                height={400}
                alt={''}
              />
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="flex flex-col gap-20 py-20 md:py-40 text-center">
          <h2 className="text-4xl font-bold">Our Client Partners</h2>
          <div className="container">
            <PartnersSlider />
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 md:py-40 bg-secondary/20">
          <div className="container grid md:grid-cols-2 gap-20 items-center">
            <div className="rounded-lg overflow-hidden ">
              <Image
                src={'/images/home/discuss.jpg'}
                alt={'Discussion'}
                width={320}
                height={320}
                className="aspect-square w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-8">
              <h3 className="border-t-2 block w-fit border-secondary pt-4">ABOUT TUQUE</h3>
              <h2 className="text-4xl font-bold">
                Tuque Consulting: Globally Minded, Kenya-Proud Business Strategists
              </h2>
              <p className="text-lg">
                At Tuque Consulting, we blend the vibrant energy and innovative spirit of a youthful
                team with deep expertise in the world of business consulting. Based in the heart of
                Kenya, our firm is a testament to the dynamic entrepreneurial spirit that thrives in
                one of Africa&apos;s most bustling economies.
                <br />
                <br />
                While our roots are firmly planted in Kenya, our vision transcends borders. We offer
                a suite of global services, tailored to meet the unique needs of businesses
                worldwide. Whether you&apos;re an emerging startup or an established corporation,
                our team is equipped to guide you through every phase of business growth – from
                company formation to strategic tax planning and beyond.
              </p>
              <Button
                as={Link}
                href={'/about'}
                color="primary"
                size="lg"
                endContent={<ArrowUpRight />}
                className="w-full md:w-fit  font-bold"
              >
                View Our Story
              </Button>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-40 ">
          <div className="container">
            <div className="text-center mb-16">
              <p className="border-t-2 inline-block w-fit border-secondary pt-2 pb-4">
                OUR EXPERTISE
              </p>
              <h2 className="text-4xl font-bold mb-4">
                Comprehensive Services for Your Business Journey
              </h2>
            </div>

            <Services />
          </div>
        </section>

        {/* Our Value Section */}
        <section className="py-20 md:py-40">
          <div className="container grid md:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8 text-lg">
              <p className="border-t-2 block w-fit border-primary pt-4">OUR VALUE</p>
              <h2 className="text-4xl font-bold">
                Step Into the SME Business Clinic – Powered by Tuque Consulting
              </h2>
              <p>
                Bring your business in for a free diagnosis. At Tuque Consulting, we know SMEs face
                real challenges — from growth plateaus to compliance concerns. That’s why we created
                the SME Business Clinic: a space where you can get a free expert diagnosis of your
                business’s pain points and receive guidance on the next steps.
              </p>

              <p> You’ll be queued in to a network of subject matter experts across:</p>
              <ul className="list-disc pl-8">
                <li>Accounting and Tax</li>
                <li>Legal and Compliance</li>
                <li>Technology and Systems</li>
                <li>Sales and Marketing</li>
              </ul>

              <p>
                We’ll assess your business needs and provide clear, actionable recommendations. If
                you choose to proceed, our professionals can help implement tailored solutions with
                support aligned to your business needs and growth stage. Bring your business for
                diagnosis. Leave with direction.
              </p>
              <Chip color="success" variant="flat" className="uppercase">
                Tuque Tukuze Bizna PAMOJA.
              </Chip>
              <Button
                as={Link}
                href={"/contact"}
                color="primary"
                size="lg"
                endContent={<ArrowUpRight />}
                className="w-full md:w-fit  font-bold"
              >
                Get in Touch
              </Button>
            </div>

            <div className="rounded-lg overflow-hidden ">
              <ConsultationSteps />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-40 bg-primary dark:bg-primary/40">
          <div className="container text-white">
            <div className="text-center mb-16">
              <p className="border-t-2 inline-block w-fit border-white pt-2 pb-4">STATS</p>
              <h2 className="text-4xl font-semibold mb-4">Why Tuque is the best?</h2>
            </div>
            <Stats />
          </div>
        </section>

        {/* Team Section */}
        {/*<section className="py-20 md:py-40 ">*/}
        {/*  <div className="container">*/}
        {/*    <div className="text-center mb-16">*/}
        {/*      <p className="border-t-2 inline-block w-fit border-secondary pt-2 pb-4">*/}
        {/*        MEET OUR TEAM*/}
        {/*      </p>*/}
        {/*      <h2 className="text-4xl font-bold mb-4">*/}
        {/*        Our team of business consultants helping you*/}
        {/*        <br /> achieve your goals.*/}
        {/*      </h2>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/* Subscribe Section */}
        <SubscribeCTA />
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
