import React, { useState } from 'react';
import { Smartphone, Wifi, Shield, Lock, Bell, UserCheck } from 'lucide-react';
import { ThemeProvider } from '../command-centre/src/context/ThemeContext';
import { NotificationProvider } from '../command-centre/src/context/NotificationContext';
import { DataProvider } from '../command-centre/src/context/DataContext';
import { Header } from '../command-centre/src/components/layout/Header';
import { Sidebar } from '../command-centre/src/components/layout/Sidebar';
import { CommandPalette } from '../command-centre/src/components/layout/CommandPalette';
import { RegisterCaseModal } from '../command-centre/src/components/modals/RegisterCaseModal';
import { GoogleAuthModal } from '../command-centre/src/components/modals/GoogleAuthModal';
import { ExpoQRModal } from '../command-centre/src/components/modals/ExpoQRModal';
import { DashboardOverview } from '../command-centre/src/features/dashboard/DashboardOverview';
import { GeospatialMap } from '../command-centre/src/features/map/GeospatialMap';
import { CurrencyScanner } from '../command-centre/src/features/currency/CurrencyScanner';
import { AgentMeshOverview } from '../command-centre/src/features/agents/AgentMeshOverview';
import { DigitalArrestTriage } from '../command-centre/src/features/triage/DigitalArrestTriage';
import { ScamMonitor } from '../command-centre/src/features/scam/ScamMonitor';
import { FraudGraph } from '../command-centre/src/features/graph/FraudGraph';
import { CitizenInbox } from '../command-centre/src/features/reports/CitizenInbox';
import { EvidenceVault } from '../command-centre/src/features/evidence/EvidenceVault';

export type TabType = 
  | 'home' 
  | 'triage' 
  | 'scam' 
  | 'graph' 
  | 'currency' 
  | 'reports' 
  | 'evidence' 
  | 'agents' 
  | 'map' 
  | 'simulator' 
  | 'cases';

import { AuthLandingPage } from '../command-centre/src/components/auth/AuthLandingPage';
import { useData } from '../command-centre/src/context/DataContext';

const CitizenMobileAppContent: React.FC = () => {
  const { isAuthenticated } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isExpoQROpen, setIsExpoQROpen] = useState(false);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabType);
  };

  if (!isAuthenticated) {
    return (
      <>
        <AuthLandingPage />
        <GoogleAuthModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* MOBILE CITIZEN NATIVE STATUS BAR */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono font-bold text-[10px] flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-teal-400" /> EXPO NATIVE MOBILE
          </span>
          <span className="text-slate-400 text-[10px] font-semibold hidden sm:inline">
            SentinelX Citizen Shield • iOS & Android Edition
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Wifi className="w-3.5 h-3.5" /> 5G Encrypted
          </span>
          <span className="text-teal-400 font-semibold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-teal-400" /> Active Protection
          </span>
        </div>
      </div>

      {/* Top Header Bar */}
      <Header
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenExpoQR={() => setIsExpoQROpen(true)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Central Dashboard Canvas */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'home' && (
            <DashboardOverview
              onNavigateTab={handleTabChange}
            />
          )}

          {(activeTab === 'triage' || activeTab === 'simulator') && <DigitalArrestTriage />}

          {activeTab === 'scam' && <ScamMonitor />}

          {activeTab === 'graph' && <FraudGraph />}

          {activeTab === 'currency' && <CurrencyScanner />}

          {(activeTab === 'reports' || activeTab === 'cases') && <CitizenInbox />}

          {activeTab === 'evidence' && <EvidenceVault />}

          {activeTab === 'agents' && <AgentMeshOverview />}

          {activeTab === 'map' && <GeospatialMap />}
        </main>
      </div>

      {/* Global Command Palette Overlay (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={handleTabChange}
        onTriggerSimulator={() => setActiveTab('triage')}
      />

      {/* Global Modals */}
      <RegisterCaseModal />
      <GoogleAuthModal />
      <ExpoQRModal isOpen={isExpoQROpen} onClose={() => setIsExpoQROpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <DataProvider>
          <CitizenMobileAppContent />
        </DataProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
