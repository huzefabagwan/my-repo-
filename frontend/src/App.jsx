import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import LiveRailwayNetwork from './pages/LiveRailwayNetwork'
import AIPriorityCenter from './pages/AIPriorityCenter'
import BlockPlanning from './pages/BlockPlanning'
import ConflictResolution from './pages/ConflictResolution'
import MaintenancePlanner from './pages/MaintenancePlanner'
import LiveMonitoring from './pages/LiveMonitoring'
import Reports from './pages/Reports'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/network" element={<LiveRailwayNetwork />} />
            <Route path="/monitoring" element={<LiveMonitoring />} />
            <Route path="/priority-center" element={<AIPriorityCenter />} />
            <Route path="/block-planning" element={<BlockPlanning />} />
            <Route path="/conflicts" element={<ConflictResolution />} />
            <Route path="/planning" element={<MaintenancePlanner />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
