import type { Page } from '../../payload-types'

export const aboutPageData: Partial<Page> = {
  title: 'About Us',
  slug: 'about',
  _status: 'published',
  hero: {
    type: 'mediumImpact',
    richText: [
      {
        type: 'h1',
        children: [
          {
            text: 'About Our Company',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Learn about our mission, values, and the passionate team behind our success.',
          },
        ],
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
                  text: 'Our Story',
                },
              ],
            },
            {
              type: 'p',
              children: [
                {
                  text: 'Founded with a vision to revolutionize the industry, our company has grown from a small startup to a trusted leader. We believe in innovation, quality, and putting our customers first.',
                },
              ],
            },
            {
              type: 'h3',
              children: [
                {
                  text: 'Our Mission',
                },
              ],
            },
            {
              type: 'p',
              children: [
                {
                  text: 'To provide exceptional solutions that empower businesses and individuals to achieve their full potential through innovative technology and outstanding service.',
                },
              ],
            },
            {
              type: 'h3',
              children: [
                {
                  text: 'Our Values',
                },
              ],
            },
            {
              type: 'ul',
              children: [
                {
                  type: 'li',
                  children: [
                    {
                      text: 'Innovation: We constantly push boundaries to deliver cutting-edge solutions',
                    },
                  ],
                },
                {
                  type: 'li',
                  children: [
                    {
                      text: 'Quality: Excellence is not negotiable in everything we do',
                    },
                  ],
                },
                {
                  type: 'li',
                  children: [
                    {
                      text: 'Customer Focus: Your success is our success',
                    },
                  ],
                },
                {
                  type: 'li',
                  children: [
                    {
                      text: 'Integrity: We operate with transparency and honesty',
                    },
                  ],
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
              text: 'Want to Learn More?',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Get in touch with our team to discover how we can help you.',
            },
          ],
        },
      ],
      links: [
        {
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Contact Us',
            appearance: 'primary',
          },
        },
        {
          link: {
            type: 'custom',
            url: '/blog',
            label: 'Read Our Blog',
            appearance: 'secondary',
          },
        },
      ],
    },
  ],
  meta: {
    title: 'About Us - Our Story and Mission',
    description: 'Learn about our mission, values, and the passionate team behind our success.',
  },
}