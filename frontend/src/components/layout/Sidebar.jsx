import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Network, Wrench, Brain, CalendarRange,
  AlertTriangle, CalendarDays, CalendarClock, FileText, Train, Activity
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/network', icon: Network, label: 'Live Network' },
  { to: '#', icon: Wrench, label: 'Maintenance', disabled: true },
  { to: '/priority-center', icon: Brain, label: 'AI Priority Center' },
  { to: '/block-planning', icon: CalendarRange, label: 'Block Planning' },
  { to: '/conflicts', icon: AlertTriangle, label: 'Conflicts' },
  { to: '/planning?view=week', icon: CalendarDays, label: 'Weekly Plan' },
  { to: '/planning?view=month', icon: CalendarClock, label: 'Monthly Plan' },
  { to: '/monitoring', icon: Activity, label: 'Live Monitoring' },
  { to: '/reports', icon: FileText, label: 'Reports' },
]

export default function Sidebar() {
  return (
    <aside className="w-16 bg-white border-r border-gray-200 flex flex-col py-4 items-center shrink-0 shadow-sm z-50">
      {/* Logo */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
          <Train size={24} className="text-white" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 w-full px-2 flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `relative group flex items-center justify-center w-12 h-12 rounded-lg transition-all mx-auto ${
                item.disabled
                  ? 'text-gray-300 cursor-not-allowed pointer-events-none'
                  : isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={20} />
            
            {/* Tooltip */}
            <span className="absolute left-14 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs font-medium rounded-md px-2 py-1 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
              {item.label}
            </span>

            {/* Optional badge */}
            {item.label === 'Conflicts' && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full shadow-sm"></span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-100 w-full flex justify-center">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
          <span className="text-blue-700 font-bold text-xs">IR</span>
        </div>
      </div>
    </aside>
  )
}
