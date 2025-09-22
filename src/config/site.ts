export type SiteConfig = typeof siteConfig

export const PORTAL_URL = 'https://invest.arvocap.com'

export const siteConfig = {
  name: 'Arvocap Invest',
  description:
    'Unlock Your Financial Potential with ArvoCap - Your Gateway to Smart Investments and Wealth Growth. Discover a World of Opportunities Today!',
  navMenuItems: [
    {
      name: 'Home',
      path: '/',
      icon: ``,
    },
    {
      name: 'About Us',
      path: 'about',
      icon: '',
    },
    {
      name: 'Blog',
      path: 'blog',
      icon: '',
    },
    {
      name: 'Contact Us',
      path: '/contact',
      icon: '',
    },
  ],

  links: {
    twitter: '',
    phone: '+254 718 104514',
    whatsapp: '',
    email: 'kamathi@consultuque.com',
  },
}
