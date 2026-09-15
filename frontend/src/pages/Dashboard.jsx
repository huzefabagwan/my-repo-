import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell, User, Wifi, Clock, ChevronRight,
  ShieldCheck, AlertTriangle, Construction, Train,
  Plus, Eye, Network, CalendarDays,
  Brain, MapPin, Wrench, Zap, ArrowRight,
  CheckCircle2, AlertCircle, Circle, WifiOff
} from 'lucide-react'
import {
  stations, sections, trains, networkStats, statusColors,
  criticalIssues, aiRecommendation, maintenanceTimeline
} from '../data/mockData'
import API from '../services/API'

// ============================================================
// Dashboard Header
// ============================================================
function DashboardHeader() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    API.getHealth().then(status => setIsOnline(status))
  }, [])

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
  })
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: false
  })

  return (
    <div className="flex items-center justify-between px-5 py-2.5 bg-white border-b border-gray-200">
      <div>
        <h1 className="text-base font-bold text-gray-900 tracking-tight">Railway Control Office</h1>
        <div className="flex items-center gap-1.5 text-xs">
          <Wifi size={12} className="text-green-500" />
          <span className="text-green-600 font-medium">Connected</span>
        </div>

        <button className="relative p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">3</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <User size={14} className="text-gray-400" />
          <span>Controller</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 border-l border-gray-200 pl-4">
          <Clock size={12} />
          <span>{dateStr}</span>
          <span className="font-semibold text-gray-700">{timeStr}</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Status Cards
// ============================================================
function StatusCards() {
  const cards = [
    {
      label: 'Asset Availability',
      value: `${networkStats.availableSections}%`,
      icon: ShieldCheck,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
    {
      label: 'Critical Defects',
      value: '04',
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    {
      label: 'Active Maintenance Blocks',
      value: String(networkStats.activeBlocks).padStart(2, '0'),
      icon: Construction,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      label: 'Train Operations',
      value: String(networkStats.activeTrains),
      icon: Train,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      sub: (
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-green-600">121 On Time</span>
          <span className="text-[10px] text-amber-600">5 Delayed</span>
          <span className="text-[10px] text-red-600">2 Affected</span>
        </div>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-3">
      {cards.map((card) => (
        <div key={card.label} className={`${card.bg} border ${card.border} rounded-lg p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{card.label}</p>
              <p className={`text-2xl font-bold ${card.color} mt-0.5`}>{card.value}</p>
              {card.sub}
            </div>
            <card.icon size={20} className={`${card.color} opacity-50`} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// Railway Situation — Inline SVG Schematic
// ============================================================
function RailwaySituation() {
  // Simplified main-line stations for dashboard schematic
  const dashStations = [
    { id: 'KNP', name: 'KANPUR', x: 60, y: 70 },
    { id: 'ETW', name: 'ETAWAH', x: 200, y: 70 },
    { id: 'TDL', name: 'TUNDLA', x: 340, y: 70 },
    { id: 'AGC', name: 'AGRA', x: 480, y: 70 },
    { id: 'MTJ', name: 'MATHURA', x: 620, y: 70 },
  ]
  // Main-line sections for dashboard
  const dashSections = [
    { from: 'KNP', to: 'ETW', id: 'KNP-01', status: 'available' },
    { from: 'ETW', to: 'TDL', id: 'KNP-02', status: 'movement' },
    { from: 'TDL', to: 'AGC', id: 'KNP-03', status: 'available' },
    { from: 'AGC', to: 'MTJ', id: 'KNP-04', status: 'maintenance' },
  ]
  // Train indicators on dashboard
  const dashTrains = [
    { id: '12904', label: 'EXP 12904', x: 520, dir: '→', color: '#3b82f6' },
    { id: '12311', label: 'EXP 12311', x: 260, dir: '←', color: '#f59e0b' },
    { id: '12001', label: 'EXP 12001', x: 145, dir: '→', color: '#3b82f6' },
  ]

  const getPos = (id) => dashStations.find((s) => s.id === id)
  const getColor = (status) => {
    const map = { available: '#22c55e', movement: '#3b82f6', maintenance: '#f59e0b', critical: '#ef4444', restricted: '#f97316' }
    return map[status] || '#9ca3af'
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 col-span-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Current Railway Situation</h2>
        <Link to="/network" className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5">
          Full Network View <ChevronRight size={10} />
        </Link>
      </div>

      <svg viewBox="0 0 680 150" className="w-full" style={{ maxHeight: '200px' }}>
        {/* Background */}
        <rect x="0" y="0" width="680" height="150" rx="4" fill="#f8fafc" />

        {/* Section lines */}
        {dashSections.map((sec) => {
          const from = getPos(sec.from)
          const to = getPos(sec.to)
          const color = getColor(sec.status)
          return (
            <g key={sec.id}>
              {/* Wide bg */}
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={color} strokeWidth={8} strokeLinecap="round" opacity={0.15} />
              {/* Line */}
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={color} strokeWidth={3} strokeLinecap="round"
                strokeDasharray={sec.status === 'maintenance' ? '8 4' : 'none'} />
              {/* Section label */}
              <text x={(from.x + to.x) / 2} y={from.y + 22}
                textAnchor="middle" fontSize="7" fill="#6b7280" fontWeight="500">
                {sec.id}
              </text>
              {/* Status label */}
              <text x={(from.x + to.x) / 2} y={from.y + 32}
                textAnchor="middle" fontSize="6" fill={color} fontWeight="600"
                textTransform="uppercase">
                {sec.status === 'available' ? 'AVAILABLE' :
                 sec.status === 'movement' ? 'TRAIN MOVEMENT' :
                 sec.status === 'maintenance' ? 'MAINT. BLOCK' :
                 sec.status.toUpperCase()}
              </text>
            </g>
          )
        })}

        {/* Maintenance block highlight on KNP-04 */}
        <g>
          <rect x="448" y="42" width="100" height="18" rx="2"
            fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.5" />
          <text x="498" y="50" textAnchor="middle" fontSize="6" fill="#92400e" fontWeight="700">
            MAINTENANCE BLOCK
          </text>
          <text x="498" y="57" textAnchor="middle" fontSize="6" fill="#92400e">
            22:00–03:00
          </text>
        </g>

        {/* Station nodes */}
        {dashStations.map((st) => (
          <g key={st.id}>
            <circle cx={st.x} cy={st.y} r={7} fill="white" stroke="#374151" strokeWidth={1.5} />
            <circle cx={st.x} cy={st.y} r={3} fill="#374151" />
            <text x={st.x} y={st.y - 14} textAnchor="middle"
              fontSize="8" fill="#111827" fontWeight="700">
              {st.name}
            </text>
          </g>
        ))}

        {/* Train indicators */}
        {dashTrains.map((tr) => (
          <g key={tr.id}>
            <rect x={tr.x - 26} y={70 - 38} width={52} height={16} rx={2}
              fill="white" stroke={tr.color} strokeWidth={0.8} />
            <text x={tr.x} y={70 - 28} textAnchor="middle"
              fontSize="7" fill={tr.color} fontWeight="600">
              {tr.label}
            </text>
            <text x={tr.x} y={70 - 20} textAnchor="middle"
              fontSize="8" fill={tr.color} fontWeight="700">
              {tr.dir}
            </text>
          </g>
        ))}

        {/* Legend */}
        {[
          { label: 'Available', color: '#22c55e', x: 30 },
          { label: 'Train Movement', color: '#3b82f6', x: 130 },
          { label: 'Maint. Block', color: '#f59e0b', x: 260 },
          { label: 'Critical', color: '#ef4444', x: 370 },
        ].map((leg) => (
          <g key={leg.label}>
            <circle cx={leg.x} cy={138} r={3} fill={leg.color} />
            <text x={leg.x + 7} y={140} fontSize="7" fill="#6b7280">{leg.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ============================================================
// Critical Issues
// ============================================================
function CriticalIssuesPanel() {
  const severityStyles = {
    critical: { badge: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
    high: { badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Critical Issues</h2>
      <div className="space-y-2">
        {criticalIssues.map((issue) => {
          const style = severityStyles[issue.severity] || severityStyles.high
          return (
            <div key={issue.id} className="border border-gray-100 rounded p-2.5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className={`${style.badge} text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider`}>
                  {issue.severity}
                </span>
                <span className="text-[11px] font-semibold text-gray-800">{issue.title}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1.5">
                <span className="flex items-center gap-0.5">
                  <MapPin size={9} /> {issue.section}
                </span>
                <span>•</span>
                <span>{issue.department}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Detected {issue.detectedAgo}</span>
                <button className="text-[10px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5">
                  {issue.action} <ChevronRight size={9} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
// AI Recommendation
// ============================================================
function AIRecommendationPanel() {
  const rec = aiRecommendation
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Brain size={13} className="text-blue-600" />
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">AI Recommendation</h2>
        </div>
        <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
          Recommended
        </span>
      </div>

      <p className="text-[12px] font-semibold text-gray-800 mb-2">{rec.title}</p>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-gray-500 w-16">Section:</span>
          <span className="text-gray-800 font-medium">{rec.section}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-gray-500 w-16">Window:</span>
          <span className="text-gray-800 font-medium">{rec.window}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-gray-500 w-16">Depts:</span>
          <span className="text-gray-800 font-medium">{rec.departments.join(' + ')}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded p-2 mb-2">
        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-0.5">Reason</p>
        <p className="text-[10px] text-gray-600 leading-relaxed">{rec.reason}</p>
      </div>

      <div className="bg-green-50 border border-green-100 rounded p-2 mb-3">
        <p className="text-[10px] font-semibold text-green-700 uppercase tracking-wider mb-0.5">Impact</p>
        <p className="text-[10px] text-green-700">{rec.impact}</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex-1 px-3 py-1.5 text-[10px] font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Approve Block
        </button>
        <button className="flex-1 px-3 py-1.5 text-[10px] font-semibold bg-white text-gray-700 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
          Modify
        </button>
        <button className="flex-1 px-3 py-1.5 text-[10px] font-semibold bg-white text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors">
          Reject
        </button>
      </div>
    </div>
  )
}

// ============================================================
// Maintenance Timeline
// ============================================================
function MaintenanceTimelinePanel() {
  // Timeline from 18:00 to 06:00 (12 hours)
  const timeLabels = ['18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00']

  // Convert time string to position (0–100%)
  const timeToPercent = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number)
    let hour = h
    if (hour < 12) hour += 24 // next day
    const mins = (hour - 18) * 60 + m // minutes from 18:00
    const total = 12 * 60 // 18:00 to 06:00 = 12 hours
    return Math.max(0, Math.min(100, (mins / total) * 100))
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 col-span-2">
      <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Today's Maintenance Blocks</h2>

      {/* Time axis */}
      <div className="relative">
        {/* Time labels */}
        <div className="flex justify-between mb-1">
          {timeLabels.map((t) => (
            <span key={t} className="text-[9px] text-gray-400 font-medium">{t}</span>
          ))}
        </div>

        {/* Timeline track */}
        <div className="relative bg-gray-100 rounded h-2 mb-3">
          {/* Grid lines */}
          {timeLabels.map((t, i) => (
            <div key={t} className="absolute top-0 h-full border-l border-gray-200"
              style={{ left: `${(i / (timeLabels.length - 1)) * 100}%` }} />
          ))}
        </div>

        {/* Blocks */}
        <div className="space-y-2">
          {maintenanceTimeline.map((block) => {
            const startPct = timeToPercent(block.start)
            const endPct = timeToPercent(block.end)
            const widthPct = endPct - startPct
            return (
              <div key={block.id} className="relative h-8 bg-gray-50 rounded border border-gray-100">
                {/* Block bar */}
                <div
                  className="absolute top-0 h-full rounded opacity-90 flex items-center px-2 overflow-hidden"
                  style={{
                    left: `${startPct}%`,
                    width: `${widthPct}%`,
                    backgroundColor: block.color + '22',
                    borderLeft: `3px solid ${block.color}`,
                  }}
                >
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="text-[9px] font-bold" style={{ color: block.color }}>{block.section}</span>
                    <span className="text-[9px] text-gray-500">{block.department}</span>
                    <span className="text-[8px] text-gray-400">{block.start}–{block.end}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Quick Actions
// ============================================================
function QuickActions() {
  const actions = [
    { icon: Plus, label: 'Create Block Plan', color: 'bg-blue-600 text-white hover:bg-blue-700' },
    { icon: AlertTriangle, label: 'Review Critical Issues', color: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50' },
    { icon: Network, label: 'View Live Network', color: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50', to: '/network' },
    { icon: CalendarDays, label: 'Open Weekly Plan', color: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50' },
  ]

  return (
    <div className="flex items-center gap-2">
      {actions.map((action) => {
        const Comp = action.to ? Link : 'button'
        return (
          <Comp
            key={action.label}
            to={action.to}
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium rounded transition-colors ${action.color}`}
          >
            <action.icon size={13} />
            {action.label}
          </Comp>
        )
      })}
    </div>
  )
}

// ============================================================
// Main Dashboard Component
// ============================================================
export default function Dashboard() {
  return (
    <div className="h-full flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <DashboardHeader />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Status cards */}
        <StatusCards />

        {/* Railway situation + Critical issues */}
        <div className="grid grid-cols-3 gap-3">
          <RailwaySituation />
          <CriticalIssuesPanel />
        </div>

        {/* AI Recommendation + Maintenance timeline */}
        <div className="grid grid-cols-3 gap-3">
          <AIRecommendationPanel />
          <MaintenanceTimelinePanel />
        </div>

        {/* Quick actions */}
        <QuickActions />
      </div>
    </div>
  )
}
