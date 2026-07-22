import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { DataProvider } from './context/DataContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { RegisterCaseModal } from './components/modals/RegisterCaseModal';
import { GoogleAuthModal } from './components/modals/GoogleAuthModal';
import { DashboardOverview } from './features/dashboard/DashboardOverview';
import { GeospatialMap } from './features/map/GeospatialMap';
import { CurrencyScanner } from './features/currency/CurrencyScanner';
import { AgentMeshOverview } from './features/agents/AgentMeshOverview';
import { DigitalArrestTriage } from './features/triage/DigitalArrestTriage';
import { ScamMonitor } from './features/scam/ScamMonitor';
import { FraudGraph } from './features/graph/FraudGraph';
import { CitizenInbox } from './features/reports/CitizenInbox';
import { EvidenceVault } from './features/evidence/EvidenceVault';

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

const CommandCentreContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabType);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Bar */}
      <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Central Dashboard Canvas */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
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
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <DataProvider>
          <CommandCentreContent />
        </DataProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
