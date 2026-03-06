// components/DashboardSidebar.tsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  href: string
  label: string
  icon: string
  exact: boolean
}

export function DashboardNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <div className="space-y-1">
      {items.map(item => {
        const isActive = item.exact 
          ? pathname === item.href
          : pathname.startsWith(item.href)
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-colors ${
              isActive
                ? 'bg-yellow-600 text-black font-medium'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}