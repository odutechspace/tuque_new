'use client'
import React from 'react'

const consultationSteps = [
  {
    id: '1',
    title: 'Initial Consultation',
    description:
      'Your journey begins with a free business diagnosis at the SME Business Clinic. We take time to understand your goals, challenges, and current business condition — across key areas like compliance, sales, accounting, legal, and technology.',
  },
  {
    id: '2',
    title: 'Custom Strategy Development',
    description:
      'After the diagnosis, we develop tailored recommendations to address the issues identified. These strategies are designed to unlock growth, improve efficiency, and position your business for sustainable success.',
  },
  {
    id: '3',
    title: 'Implementation and Support',
    description:
      'Once you have a clear action plan, we connect you with a network of subject matter experts who can help put the recommended solutions into action — walking alongside you through each step of implementation.',
  },
  {
    id: '4',
    title: 'Continuous Monitoring and Adaptation',
    description:
      'We stay with you beyond the initial intervention. As your business evolves, we offer ongoing guidance to track progress, adjust strategies, and ensure long-term growth and resilience.',
  },
]

export function ConsultationSteps() {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set(['1', '2', '3', '4']))

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {consultationSteps.map((step) => (
          <div key={step.id} aria-label={step.title} className="rounded-lg bg-primary-50 dark:bg-primary-50/10 p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-lg text-xl font-bold">
                {step.id}
              </div>
              <span className="font-semibold text-xl">{step.title}</span>
            </div>
            <div className="">
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
