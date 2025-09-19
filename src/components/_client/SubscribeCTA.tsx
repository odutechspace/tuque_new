import { Button, Input } from '@heroui/react'
import { ArrowUpRight } from 'lucide-react'

export function SubscribeCTA() {
  return (
    <section className="bg-[url(/images/black-coworkers.jpg)] bg-center">
      <div className="bg-black/50  py-20 md:py-30">
        <div className="container grid md:grid-cols-2 gap-x-20 gap-y-6 items-center">
          <div className=" text-white text-lg">
            <p className="text-5xl mb-4">Stay Ahead with Tuque Consulting&apos;s Insights</p>
            <p>
              Subscribe to our newsletter and get the latest in business strategies and trends
              delivered straight to your inbox.
            </p>
          </div>
          <div className="flex items-center bg-gray-100 dark:bg-neutral-800 rounded-xl p-2">
            <Input placeholder="Email address" size="lg" variant="flat" className="active:outline-0" />
            <Button size="lg" color="primary" endContent={<ArrowUpRight />}>
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
