import React, { createContext, useContext, useState } from 'react';
import { useNotification } from './NotificationContext';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CITIZEN';
  avatar?: string;
}

export interface CaseItem {
  id: string;
  reporter: string;
  reporterEmail: string;
  phone: string;
  crimeCategory: string;
  detail: string;
  location: string;
  date: string;
  status: 'OPEN' | 'INVESTIGATING' | 'EVIDENCE_PACKAGED' | 'RESOLVED' | 'CLOSED';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  coords: { lat: number; lng: number };
}

export interface SessionItem {
  id: string;
  caller: string;
  risk: number;
  impersonating: string;
  status: string;
  timestamp: string;
  transcript: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  location: string;
}

export interface CurrencyScanResult {
  denomination: string;
  serialNumber: string;
  confidence: number;
  failedMarkers: Array<{ marker: string; details: string }>;
  scannedAt: string;
  imagePreview: string;
}

export interface EvidenceFile {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'image' | 'doc';
  fileSize: string;
  uploadDate: string;
  fileUrl: string;
  caseId: string;
}

export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "mumbai": { lat: 19.0760, lng: 72.8777 },
  "bandra": { lat: 19.0596, lng: 72.8295 },
  "pune": { lat: 18.5204, lng: 73.8567 },
  "nagpur": { lat: 21.1458, lng: 79.0882 },
  "delhi": { lat: 28.6139, lng: 77.2090 },
  "noida": { lat: 28.5355, lng: 77.3910 },
  "gurgaon": { lat: 28.4595, lng: 77.0266 },
  "bengaluru": { lat: 12.9716, lng: 77.5946 },
  "kolkata": { lat: 22.5726, lng: 88.3639 },
  "hyderabad": { lat: 17.3850, lng: 78.4867 },
  "ahmedabad": { lat: 23.0225, lng: 72.5714 },
  "jaipur": { lat: 26.9124, lng: 75.7873 },
  "chennai": { lat: 13.0827, lng: 80.2707 }
};

export const resolveCityCoords = (locationStr: string): { lat: number; lng: number } => {
  const locLower = (locationStr || '').toLowerCase();
  for (const city in CITY_COORDINATES) {
    if (locLower.includes(city)) {
      return CITY_COORDINATES[city];
    }
  }
  return { lat: 20.5937, lng: 78.9629 };
};

interface DataContextType {
  currentUser: UserProfile;
  switchUserRole: (role: 'ADMIN' | 'CITIZEN') => void;
  loginWithGoogle: (email: string, name: string, role: 'ADMIN' | 'CITIZEN', avatar?: string) => void;
  logout: () => void;
  isGoogleAuthModalOpen: boolean;
  openGoogleAuthModal: () => void;
  closeGoogleAuthModal: () => void;
  cases: CaseItem[];
  userCases: CaseItem[];
  sessions: SessionItem[];
  activeSessionId: string;
  setActiveSessionId: (id: string) => void;
  isRegisterCaseModalOpen: boolean;
  openRegisterCaseModal: () => void;
  closeRegisterCaseModal: () => void;
  addCase: (caseData: Omit<CaseItem, 'id' | 'date' | 'coords' | 'reporterEmail'> & { location: string }) => void;
  updateCaseStatus: (id: string, status: CaseItem['status']) => void;
  updateSessionStatus: (id: string, status: string) => void;
  currencyScanResult: CurrencyScanResult | null;
  isCurrencyScanning: boolean;
  runCurrencyScan: (fileUrl: string) => void;
  evidenceFiles: EvidenceFile[];
  addEvidenceFile: (file: Omit<EvidenceFile, 'id' | 'uploadDate'>) => void;
  isHashUnlocked: boolean;
  unlockHashWithPassword: (password: string) => boolean;
  kpis: {
    activeStreams: number;
    preventedLoss: string;
    networksTraced: number;
    dismantledRings: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const ADMIN_USER: UserProfile = {
  id: 'USR-ADMIN-01',
  name: 'Insp. R. Sharma (Admin)',
  email: 'admin@sentinelx.gov.in',
  role: 'ADMIN',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
};

export const CITIZEN_USER: UserProfile = {
  id: 'USR-CITIZEN-01',
  name: 'Sunita Patel (Citizen)',
  email: 'sunita.patel@gmail.com',
  role: 'CITIZEN',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast } = useNotification();

  const [currentUser, setCurrentUser] = useState<UserProfile>(ADMIN_USER);
  const [isGoogleAuthModalOpen, setIsGoogleAuthModalOpen] = useState(false);

  const [cases, setCases] = useState<CaseItem[]>([
    {
      id: 'REP-2026-001',
      reporter: 'Sunita Patel (Citizen)',
      reporterEmail: 'sunita.patel@gmail.com',
      phone: '+919876543210',
      crimeCategory: 'Fake Calls Frauds',
      detail: 'Received fake police digital arrest call demanding money via UPI.',
      location: 'Mumbai',
      date: new Date().toISOString().split('T')[0],
      status: 'INVESTIGATING',
      priority: 'CRITICAL',
      coords: CITY_COORDINATES['mumbai']
    },
    {
      id: 'REP-2026-002',
      reporter: 'Ramesh Kumar',
      reporterEmail: 'ramesh.kumar@gmail.com',
      phone: '+919811223344',
      crimeCategory: 'Net Banking/ATM Frauds',
      detail: 'Unauthorized transaction of Rs 50,000 from SBI account.',
      location: 'Delhi',
      date: new Date().toISOString().split('T')[0],
      status: 'OPEN',
      priority: 'HIGH',
      coords: CITY_COORDINATES['delhi']
    },
    {
      id: 'REP-2026-003',
      reporter: 'Ananya Roy',
      reporterEmail: 'ananya.roy@gmail.com',
      phone: '+919711224455',
      crimeCategory: 'Counterfeit Currency Note',
      detail: 'Received fake 500 note from local merchant.',
      location: 'Kolkata',
      date: new Date().toISOString().split('T')[0],
      status: 'CLOSED',
      priority: 'MEDIUM',
      coords: CITY_COORDINATES['kolkata']
    }
  ]);

  const [sessions, setSessions] = useState<SessionItem[]>([
    {
      id: "SESS-8921",
      caller: "+919876500112",
      risk: 0.94,
      impersonating: "CBI Officer Raghavan",
      status: "LOCK_BANK_APPS",
      timestamp: "17:42:01",
      transcript: "You are under digital arrest. Do not disconnect the camera. Transfer your account balance to CBI verification vault.",
      priority: "CRITICAL",
      location: "Mumbai"
    },
    {
      id: "SESS-8922",
      caller: "+919123499218",
      risk: 0.72,
      impersonating: "FedEx / Customs",
      status: "WARN_CITIZEN",
      timestamp: "17:44:32",
      transcript: "We found illegal drugs in a package sent under your Aadhaar card number. Pay 45000 rupees clearance fee.",
      priority: "HIGH",
      location: "Noida"
    },
    {
      id: "SESS-8923",
      caller: "+918889997771",
      risk: 0.35,
      impersonating: "TRAI Compliance",
      status: "MONITORING",
      timestamp: "17:45:10",
      transcript: "Your SIM card will be deactivated in 2 hours due to illegal advertising. Confirm details to keep active.",
      priority: "MEDIUM",
      location: "Delhi"
    }
  ]);

  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([
    {
      id: 'FILE-001',
      fileName: 'cbi_digital_arrest_call_recording.wav',
      fileType: 'doc',
      fileSize: '4.2 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      fileUrl: '#',
      caseId: 'REP-2026-001'
    },
    {
      id: 'FILE-002',
      fileName: 'fake_notice_police_letterhead.pdf',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      fileUrl: '#',
      caseId: 'REP-2026-001'
    },
    {
      id: 'FILE-003',
      fileName: 'counterfeit_500_note_watermark.jpg',
      fileType: 'image',
      fileSize: '2.5 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      fileUrl: '#',
      caseId: 'REP-2026-003'
    }
  ]);

  const [isHashUnlocked, setIsHashUnlocked] = useState<boolean>(false);
  const [activeSessionId, setActiveSessionId] = useState<string>("SESS-8921");
  const [isRegisterCaseModalOpen, setIsRegisterCaseModalOpen] = useState(false);

  const [currencyScanResult, setCurrencyScanResult] = useState<CurrencyScanResult | null>(null);
  const [isCurrencyScanning, setIsCurrencyScanning] = useState(false);

  const openGoogleAuthModal = () => setIsGoogleAuthModalOpen(true);
  const closeGoogleAuthModal = () => setIsGoogleAuthModalOpen(false);

  const switchUserRole = (role: 'ADMIN' | 'CITIZEN') => {
    const newUser = role === 'ADMIN' ? ADMIN_USER : CITIZEN_USER;
    setCurrentUser(newUser);
    addToast({
      type: 'info',
      title: `Logged in as ${newUser.role}`,
      message: `User switched to ${newUser.name} (${newUser.email}). Role-based data filtering active!`
    });
  };

  const loginWithGoogle = (email: string, name: string, role: 'ADMIN' | 'CITIZEN', avatar?: string) => {
    const newUser: UserProfile = {
      id: `USR-G-${Math.random().toString(36).substr(2, 6)}`,
      name,
      email,
      role,
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };
    setCurrentUser(newUser);
    addToast({
      type: 'success',
      title: 'Google Auth Successful',
      message: `Signed in as ${name} (${role} access).`
    });
    closeGoogleAuthModal();
  };

  const logout = () => {
    setCurrentUser(CITIZEN_USER);
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'Signed out successfully. Switched to Citizen mode.'
    });
  };

  const openRegisterCaseModal = () => setIsRegisterCaseModalOpen(true);
  const closeRegisterCaseModal = () => setIsRegisterCaseModalOpen(false);

  // User-separated cases: ADMIN sees ALL cases; CITIZEN sees ONLY their own registered cases
  const userCases = currentUser.role === 'ADMIN'
    ? cases
    : cases.filter(c => c.reporterEmail.toLowerCase() === currentUser.email.toLowerCase() || c.reporter.toLowerCase().includes(currentUser.name.toLowerCase()));

  const addCase = (caseData: Omit<CaseItem, 'id' | 'date' | 'coords' | 'reporterEmail'> & { location: string }) => {
    const nextNum = cases.length + 1;
    const id = `REP-2026-00${nextNum}`;
    const date = new Date().toISOString().split('T')[0];
    const coords = resolveCityCoords(caseData.location);

    const newCase: CaseItem = {
      ...caseData,
      id,
      reporterEmail: currentUser.email,
      date,
      coords
    };

    setCases(prev => [newCase, ...prev]);

    addToast({
      type: newCase.priority === 'CRITICAL' ? 'critical' : 'success',
      title: 'Incident Case Registered',
      message: `Case ${id} registered for ${newCase.reporter}. Isolated to ${currentUser.email}'s account ledger!`
    });

    closeRegisterCaseModal();
  };

  const updateCaseStatus = (id: string, newStatus: CaseItem['status']) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    addToast({
      type: newStatus === 'CLOSED' ? 'info' : 'success',
      title: 'Case Status Updated',
      message: `Case ${id} status updated to ${newStatus}.`
    });
  };

  const updateSessionStatus = (id: string, newStatus: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    addToast({
      type: newStatus.includes('LOCK') ? 'critical' : 'warning',
      title: 'Scam Action Directive Executed',
      message: `Session ${id} directive updated to: ${newStatus}`
    });
  };

  const addEvidenceFile = (file: Omit<EvidenceFile, 'id' | 'uploadDate'>) => {
    const newFile: EvidenceFile = {
      ...file,
      id: `FILE-00${evidenceFiles.length + 1}`,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setEvidenceFiles(prev => [newFile, ...prev]);
    addToast({
      type: 'success',
      title: 'Evidence File Attached',
      message: `Attached ${newFile.fileName} to Digital Evidence Package Vault!`
    });
  };

  const unlockHashWithPassword = (password: string): boolean => {
    if (password === 'admin123' || currentUser.role === 'ADMIN') {
      setIsHashUnlocked(true);
      addToast({
        type: 'success',
        title: 'Cryptographic Hash Unlocked',
        message: 'Admin authentication verified! SHA-256 hash & HSM hex signature revealed.'
      });
      return true;
    } else {
      addToast({
        type: 'critical',
        title: 'Authentication Failed',
        message: 'Incorrect Admin Password! Access denied.'
      });
      return false;
    }
  };

  const runCurrencyScan = (fileUrl: string) => {
    setIsCurrencyScanning(true);
    setCurrencyScanResult(null);

    setTimeout(() => {
      const mockResult: CurrencyScanResult = {
        denomination: '500',
        serialNumber: '7BC991024',
        confidence: 0.94,
        failedMarkers: [
          { marker: 'security_thread', details: 'Micro-lettering color shift variance exceeded tolerance (Delta E > 4.2)' },
          { marker: 'watermark_clarity', details: 'Mahatma Gandhi shadow portrait lacks multi-tone gradient layers' },
          { marker: 'intaglio_print_raised_text', details: 'Surface tactile roughness profile matches flat inkjet printing' }
        ],
        scannedAt: new Date().toLocaleTimeString(),
        imagePreview: fileUrl
      };

      setCurrencyScanResult(mockResult);
      setIsCurrencyScanning(false);

      addToast({
        type: 'critical',
        title: 'Counterfeit Note Detected',
        message: 'Serial 7BC991024 failed 3 security thread and intaglio markers! Confidence: 94%'
      });
    }, 1800);
  };

  const activeStreamsCount = sessions.filter(s => s.status !== 'CLOSED').length;
  const networksTracedCount = cases.length + 39;
  const kpis = {
    activeStreams: activeStreamsCount,
    preventedLoss: `₹${(cases.length * 1.8 + 5.2).toFixed(1)} Crores`,
    networksTraced: networksTracedCount,
    dismantledRings: 11
  };

  return (
    <DataContext.Provider
      value={{
        currentUser,
        switchUserRole,
        loginWithGoogle,
        logout,
        isGoogleAuthModalOpen,
        openGoogleAuthModal,
        closeGoogleAuthModal,
        cases,
        userCases,
        sessions,
        activeSessionId,
        setActiveSessionId,
        isRegisterCaseModalOpen,
        openRegisterCaseModal,
        closeRegisterCaseModal,
        addCase,
        updateCaseStatus,
        updateSessionStatus,
        currencyScanResult,
        isCurrencyScanning,
        runCurrencyScan,
        evidenceFiles,
        addEvidenceFile,
        isHashUnlocked,
        unlockHashWithPassword,
        kpis
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
