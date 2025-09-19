'use client'

import React from 'react'
import { HeroUIProvider } from '@heroui/react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider, useTheme } from './Theme'

function HeroUIThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  
  return (
    <HeroUIProvider
      className={theme === 'dark' ? 'dark' : 'light'}
    >
      {children}
    </HeroUIProvider>
  )
}

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeroUIThemeWrapper>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </HeroUIThemeWrapper>
    </ThemeProvider>
  )
}
