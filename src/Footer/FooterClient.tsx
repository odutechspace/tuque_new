import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { siteConfig } from '@/config/site'
import { Mailbox, PhoneCall } from 'lucide-react'

export async function FooterClient() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="bg-primary-50 dark:bg-primary/10 py-10">
      <div className="container py-8 gap-x-16 gap-y-8 grid md:grid-cols-3 text-lg">
        <div>
          <Link className="flex items-center h-20" href="/">
            <Logo />
          </Link>
          <p>
            Founded in the heart of Kenya’s vibrant business scene, Tuque Consulting has earned
            recognition as a trusted advisor to SMEs — valued for its practical solutions,
            consistent support, and commitment to helping businesses thrive.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:mt-20">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <Link href={"/about"}>About Us</Link>
          <Link href={"/blog"}>Blog</Link>
          <Link href={"/contact"}>Contact Us</Link>
        </div>
        <div className="flex flex-col gap-4 md:mt-20">
          <h3 className="text-xl font-semibold">Get in Touch</h3>
          <div className="flex gap-2 items-center">
            <PhoneCall className="w-8 h-8 bg-primary text-primary-foreground p-2 rounded-xl"/>
            <Link href={`tel:` + siteConfig.links.phone}>KE: {siteConfig.links.phone}</Link>
          </div>
          <div className="flex gap-2 items-center">
            <Mailbox className="w-8 h-8 bg-primary text-primary-foreground p-2 rounded-xl"/>
            <Link href={`mailto:` + siteConfig.links.email}>{siteConfig.links.email}</Link>
          </div>
        </div>

        <div className="flex justify-end md:col-span-3">
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
