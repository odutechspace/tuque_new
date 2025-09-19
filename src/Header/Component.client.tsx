'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [navItems, setNavItems] = useState(siteConfig.navMenuItems)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // const navItems = [
  //   { label: 'Home', url: '' },
  //   { label: 'About Us', url: '/about' },
  //   { label: 'Blog', url: '/blog' },
  //   { label: 'Contact Us', url: '/contact' },
  // ]

  return (
    <header className="relative  z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container py-2 flex justify-between ">
        <Link href="/">
          <Logo loading="eager" priority="high" className="" />
        </Link>

        <nav className="gap-3 items-center hidden md:flex">
          {navItems.map((item, i) => {
            const { name, path } = item
            return (
              <Button key={i} asChild size="default" variant="ghost" className="font-bold text-lg">
                <Link className="" href={path || ''}>
                  {name && name}
                </Link>
              </Button>
            )
          })}
          {/*<Link href="/search">*/}
          {/*  <span className="sr-only">Search</span>*/}
          {/*  <SearchIcon className="w-5 text-primary" />*/}
          {/*</Link>*/}
        </nav>
      </div>
    </header>
  )
}
