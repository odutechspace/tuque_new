'use client'

import { Accordion, AccordionItem } from '@heroui/react'
import React from 'react'

const challenges = [
  {
    id: '1',
    title: 'Accessing Skilled Professionals',
    description: 'Many SMEs struggle to find and hire qualified professionals for specialized business functions.'
  },
  {
    id: '2', 
    title: 'High Hiring Costs',
    description: 'The cost of recruiting and maintaining full-time specialists can be prohibitive for growing businesses.'
  },
  {
    id: '3',
    title: 'Compliance and Bookkeeping Gaps',
    description: 'Keeping up with regulatory requirements and maintaining accurate financial records is often challenging.'
  },
  {
    id: '4',
    title: 'Digital Transformation',
    description: 'Many SMEs find it difficult to keep pace with rapidly evolving technology and digital solutions.'
  }
]

export function ChallengesAccordion() {
  return (
    <div className="max-w-4xl mx-auto">
      <Accordion variant="bordered">
        {challenges.map((challenge) => (
          <AccordionItem
            key={challenge.id}
            aria-label={challenge.title}
            title={
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-secondary text-white rounded-full text-sm font-bold">
                  {challenge.id}
                </div>
                <span className="font-semibold">{challenge.title}</span>
              </div>
            }
          >
            <div className="px-12 pb-4">
              <p className="text-gray-600 leading-relaxed text-lg">{challenge.description}</p>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}