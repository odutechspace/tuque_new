import type { Page } from '../../payload-types'

export const homePageData: Partial<Page> = {
  title: 'Welcome to Our Website',
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'highImpact',
    richText: [
      {
        type: 'h1',
        children: [
          {
            text: 'Welcome to Our Amazing Website',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Discover incredible solutions and join thousands of satisfied customers who trust our services.',
          },
        ],
      },
    ],
    links: [
      {
        link: {
          type: 'custom',
          url: '/about',
          label: 'Learn More',
          appearance: 'primary',
        },
      },
      {
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Get Started',
          appearance: 'secondary',
        },
      },
    ],
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: [
            {
              type: 'h2',
              children: [
                {
                  text: 'Why Choose Us?',
                },
              ],
            },
            {
              type: 'p',
              children: [
                {
                  text: 'We provide exceptional service with cutting-edge technology and unmatched customer support. Our team is dedicated to helping you achieve your goals.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      blockType: 'cta',
      richText: [
        {
          type: 'h3',
          children: [
            {
              text: 'Ready to Get Started?',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Join thousands of satisfied customers today.',
            },
          ],
        },
      ],
      links: [
        {
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Contact Us Today',
            appearance: 'primary',
          },
        },
      ],
    },
  ],
  meta: {
    title: 'Home - Welcome to Our Website',
    description: 'Discover incredible solutions and join thousands of satisfied customers who trust our services.',
  },
}