'use client'

import { Accordion, AccordionItem } from '@heroui/react'
import React from 'react'

const faqs = [
  {
    id: '1',
    question: 'Does Tuque Consulting help write business plans for enterprises?',
    answer: 'Yes, we help SMEs and startups craft strategic, investor-ready business plans, including ideation and market research to structuring, risk analysis, and go-to-market strategy.'
  },
  {
    id: '2',
    question: 'Can Tuque Consulting assist with tax and compliance matters?',
    answer: 'Absolutely. We support businesses with tax planning, filing, and compliance and help clients stay aligned with Kenyan tax regulations.'
  },
  {
    id: '3',
    question: 'How do I book a Tuque Consultant?',
    answer: 'Reach out through the website inquiry form or email support@tuque.africa. A Tuque Consultant will respond within 12 hours.'
  },
  {
    id: '4',
    question: 'Who does Tuque Consulting work with?',
    answer: 'We support individuals and early-stage founders to SMEs, nonprofits, and growing digital brands.'
  },
  {
    id: '5',
    question: 'Does Tuque Consulting support startups?',
    answer: 'Yes. We understand startup challenges and provide affordable, tailored support to help run a compliant, scalable, and investor-ready business.'
  },
  {
    id: '6',
    question: 'What are Tuque Consulting\'s operating hours?',
    answer: 'We are open Monday to Friday, 8:00 AM to 5:00 PM (EAT). For urgent matters, we recommend emailing us.'
  }
]

export function ContactFAQ() {
  return (
    <div className="max-w-4xl mx-auto">
      <Accordion variant="splitted">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            aria-label={faq.question}
            title={
              <span className="font-semibold text-left">{faq.question}</span>
            }
          >
            <div className="pb-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
