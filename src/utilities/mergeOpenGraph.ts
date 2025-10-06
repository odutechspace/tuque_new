import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Tuque Consulting: Kenya-proud business strategists guiding SMEs and corporations with expert services in company formation, tax planning, compliance, tech & data, and more. Get empowered, get global.',
  images: [
    {
      url: `${getServerSideURL()}/images/tuque-logo.png`,
    },
  ],
  siteName: 'Tuque Consulting',
  title: 'Tuque Consulting',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
