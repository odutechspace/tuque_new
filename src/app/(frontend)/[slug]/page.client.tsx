'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardBody, Spinner } from '@heroui/react'

export default function PageClient() {
  const router = useRouter()

  useEffect(() => {
    // This component can be used for client-side functionality
    // such as analytics, interactive elements, etc.
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <CardBody className="flex items-center gap-4">
          <Spinner size="lg" />
          <p>Loading page...</p>
        </CardBody>
      </Card>
    </div>
  )
}