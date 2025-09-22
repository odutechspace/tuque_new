import type { Metadata } from 'next'
import { Button } from '@heroui/react'
import React from 'react'
import { ArrowUpRight, Facebook, Instagram, Linkedin } from 'lucide-react'
import { ChallengesAccordion } from '@/components/_client/ChallengesAccordion'
import Link from 'next/link'
import { SubscribeCTA } from '@/components/_client/SubscribeCTA'
import Image from 'next/image'

const services = [
  'Business plan writing',
  'Tax and compliance support',
  'Strategic consulting',
  'Bookkeeping',
  'Technology setup',
  'Document management',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-primary/20 py-20 flex items-center ">
        <div className="container text-center">
          <p className="text-xl uppercase mb-6">About Tuque</p>
          <p className="text-6xl md:text-7xl">
            Fueling the future of Kenyan SMEs — one solution at a time
          </p>
        </div>
      </section>

      <section className="w-full h-[700px] bg-[url(/images/about-6.jpg)] bg-center"></section>

      {/* Mission Section */}
      <section className="py-20 md:py-40">
        <div className="container">
          <div className="md:text-center">
            <div className={'flex flex-col items-start md:items-center'}>
              <p className="border-t-2 inline-block w-fit border-primary pt-4 mb-8">OUR MISSION</p>
              <h2 className="text-4xl font-bold mb-6">
                Making Professional Business Support Accessible
              </h2>
              <p className="text-lg mb-6 max-w-4xl">
                At Tuque Consulting, we provide professional business support for small and medium
                enterprises in Kenya. Our focus is making specialized talent more accessible and
                flexible for growing businesses.
              </p>
              <p className="text-lg max-w-4xl">
                We help businesses operate better, grow smarter, and move faster through our
                comprehensive range of professional services.
              </p>
            </div>
            {/*<div className="rounded-lg overflow-hidden mt-2">*/}
            {/*  <h2 className="text-2xl font-bold mb-4">Common SME Struggles We Address</h2>*/}
            {/*  <ChallengesAccordion />*/}
            {/*</div>*/}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 md:py-40 bg-secondary/20">
        <div className="container">
          <div className="text-center mb-16">
            <p className="border-t-2 inline-block w-fit border-secondary pt-2 pb-4">
              CHALLENGES WE SOLVE
            </p>
            <h2 className="text-4xl font-bold mb-4">Common SME Struggles We Address</h2>
            <p className="text-xl max-w-3xl mx-auto">
              We understand the unique challenges that small and medium enterprises face in
              today&apos;s competitive landscape.
            </p>
          </div>

          <ChallengesAccordion />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-40">
        <div className="container">
          <div className="text-center mb-16">
            <p className="border-t-2 inline-block w-fit border-primary pt-2 pb-4">OUR TEAM</p>
            <h2 className="text-4xl font-bold mb-4">Meet Our Senior Consultant</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="text-center p-8  rounded-2xl flex items-center flex-col">
              <div className="bg-primary/20 rounded-full w-fit h-fit mb-6 flex items-center justify-center overflow-hidden">
                <Image src={"/images/kl.png"} alt={"Kamathi limuki"} width={300} height={300} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Kamathi Limukii</h3>
              <p className="text-primary font-semibold mb-4">Senior Consultant</p>
              <div className="flex justify-center gap-4">
                <Button isIconOnly variant="light" className="text-blue-600">
                  <Linkedin size={20} />
                </Button>
                <Button isIconOnly variant="light" className="text-blue-600">
                  <Facebook size={20} />
                </Button>
                <Button isIconOnly variant="light" className="text-pink-600">
                  <Instagram size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-40 bg-primary/20">
        <div className="container">
          <div className="text-center mb-8">
            <p className="border-t-2 inline-block w-fit border-secondary pt-2 pb-4">GET IN TOUCH</p>
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Contact us today to discover how we can help your business operate better, grow
              smarter, and move faster.
            </p>
          </div>

          <div className="text-center">
            <Button
              color="primary"
              size="lg"
              as={Link}
              href={'/contact'}
              endContent={<ArrowUpRight />}
              className="font-bold"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <SubscribeCTA />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'About Us - Tuque Consulting',
    description:
      'Learn about Tuque Consulting - fueling the future of Kenyan SMEs through professional business support, strategic consulting, and comprehensive solutions.',
  }
}
