import {
  TrendingUp,
  Calculator,
  FileText,
  Database,
  GraduationCap,
  Shield
} from 'lucide-react'
import { Card, CardBody } from '@heroui/react'

const services = [
  {
    title: 'Business Advisory for SMEs',
    description: 'Strategic guidance and consulting for small and medium enterprises to drive growth and efficiency.',
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
  },
  {
    title: 'Tax Planning and Compliance',
    description: 'Comprehensive tax strategies and compliance solutions to optimize your financial obligations.',
    icon: Calculator,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
  },
  {
    title: 'Accounting and Financial Reporting',
    description: 'Professional accounting services and detailed financial reporting for informed decision-making.',
    icon: FileText,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
  },
  {
    title: 'Technology and Data',
    description: 'Digital transformation and data management solutions to modernize your business operations.',
    icon: Database,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
  },
  {
    title: 'Training',
    description: 'Professional development and training programs to enhance your team\'s skills and capabilities.',
    icon: GraduationCap,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
  },
  {
    title: 'Risk and Compliance',
    description: 'Risk assessment and compliance management to protect your business and ensure regulatory adherence.',
    icon: Shield,
    color: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
  }
]

export const Services = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const IconComponent = service.icon
        return (
          <div key={index} className="h-full rounded-xl border transition-shadow duration-300">
            <div className="p-6">
              <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                <IconComponent size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {service.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
