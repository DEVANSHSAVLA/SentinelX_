import React from 'react';

export const FraudGraph: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-lg text-white">NPCI / Bank Mule Multi-Hop Transaction Pathfinding</h4>
          <span className="text-xs text-slate-400">Seed Account: BA-SBI-1002 (Complainant Account)</span>
        </div>

        {/* SVG VISUAL MULE NODE NETWORK */}
        <div className="h-96 bg-slate-950 border border-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 800 400">
            {/* CONNECTION LINES */}
            <line x1="150" y1="200" x2="320" y2="120" stroke="#ef4444" strokeWidth="2" strokeDasharray="5" />
            <line x1="320" y1="120" x2="480" y2="120" stroke="#ef4444" strokeWidth="2" strokeDasharray="5" />
            <line x1="480" y1="120" x2="650" y2="200" stroke="#ef4444" strokeWidth="2" />
            <line x1="320" y1="120" x2="320" y2="280" stroke="#475569" strokeWidth="1" />

            {/* NODE 1: VICTIM ACCOUNT */}
            <circle cx="150" cy="200" r="28" fill="#334155" />
            <text x="150" y="205" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">VICTIM (SBI)</text>
            <text x="150" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">BA-SBI-1002</text>

            {/* NODE 2: 1ST HOP MULE */}
            <circle cx="320" cy="120" r="28" fill="#ef4444" />
            <text x="320" y="125" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MULE 1 (HDFC)</text>
            <text x="320" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">BA-HDFC-9921</text>

            {/* NODE 3: 2ND HOP MULE */}
            <circle cx="480" cy="120" r="28" fill="#ef4444" />
            <text x="480" y="125" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MULE 2 (ICICI)</text>
            <text x="480" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">BA-ICICI-8812</text>

            {/* NODE 4: ATM CASH OUT OPERATOR */}
            <circle cx="650" cy="200" r="28" fill="#ef4444" />
            <text x="650" y="205" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ATM CASH OUT</text>
            <text x="650" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">BA-BOB-7761 (BOB)</text>

            {/* NODE 5: CONNECTED DEVICE IMEI */}
            <rect x="270" y="280" width="100" height="40" rx="6" fill="#1e293b" stroke="#334155" />
            <text x="320" y="295" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="bold">IMEI-88772299</text>
            <text x="320" y="310" textAnchor="middle" fill="#cbd5e1" fontSize="8">OnePlus 11 Model</text>

            {/* EDGE LABELS */}
            <text x="235" y="150" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">₹2,50,000</text>
            <text x="400" y="110" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">₹2,40,000</text>
            <text x="565" y="150" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">₹2,35,000</text>
          </svg>
        </div>
      </div>
    </div>
  );
};
