'use client'

const stats = [
  {
    number: '20+',
    label: 'Local & Global Clients',
  },
  {
    number: '5+',
    label: 'Bank Clients',
  },
  {
    number: '12',
    label: 'Full Time Consultants',
  },
  {
    number: '30+',
    label: 'Direct Business Impact',
  },
]

export function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`text-center px-8 py-4  md:border-r md:last:border-none`}>
          <div className="text-4xl md:text-6xl font-medium mb-2">{stat.number}</div>
          <div className="text-sm md:text-base font-medium opacity-90">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
