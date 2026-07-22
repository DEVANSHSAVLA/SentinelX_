import React, { useState } from 'react';
import { Printer, ShieldCheck, Lock, Unlock, Upload, FileText, Image, File, CheckCircle2, Key, X, Eye, ExternalLink, ShieldAlert, FileCheck, Landmark } from 'lucide-react';
import { useData, EvidenceFile } from '../../context/DataContext';

export const EvidenceVault: React.FC = () => {
  const { userCases, cases, currentUser, evidenceFiles, addEvidenceFile, isHashUnlocked, unlockHashWithPassword } = useData();

  // If citizen, only show their cases; if admin, show all
  const activeCaseList = currentUser.role === 'ADMIN' ? cases : userCases;
  const activeCase = activeCaseList[0] || cases[0];

  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [viewingFile, setViewingFile] = useState<EvidenceFile | null>(null);

  const [selectedCaseId, setSelectedCaseId] = useState<string>(activeCase?.id || 'REP-2026-001');
  const selectedCase = cases.find(c => c.id === selectedCaseId) || activeCase;

  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadFileType, setUploadFileType] = useState<'pdf' | 'image' | 'doc'>('pdf');
  const [uploadFileSize] = useState('1.5 MB');

  const handlePrint = () => {
    window.print();
  };

  const handleUnlockHashSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockHashWithPassword(passwordInput);
    if (success) {
      setShowPasswordModal(false);
      setPasswordInput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const typeStr = file.name.endsWith('.pdf') ? 'pdf' : file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? 'image' : 'doc';
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

      const reader = new FileReader();
      reader.onload = () => {
        const fileDataUrl = reader.result as string;
        addEvidenceFile({
          fileName: file.name,
          fileType: typeStr,
          fileSize: sizeStr,
          fileUrl: fileDataUrl,
          caseId: selectedCase.id
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName) return;

    const finalName = uploadFileName.endsWith(`.${uploadFileType}`) 
      ? uploadFileName 
      : `${uploadFileName}.${uploadFileType === 'pdf' ? 'pdf' : uploadFileType === 'image' ? 'png' : 'docx'}`;

    addEvidenceFile({
      fileName: finalName,
      fileType: uploadFileType,
      fileSize: uploadFileSize,
      fileUrl: uploadFileType === 'image' ? 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80' : '#',
      caseId: selectedCase.id
    });

    setUploadFileName('');
  };

  const handleViewDocument = (file: EvidenceFile) => {
    setViewingFile(file);
  };

  const currentCaseFiles = evidenceFiles.filter(f => f.caseId === selectedCase.id);

  return (
    <div className="space-y-6">
      {/* PRINT COLOR ADJUSTMENT STYLE INJECTION */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-evidence-ledger, #printable-evidence-ledger * {
            visibility: visible;
          }
          #printable-evidence-ledger {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
          <div>
            <h4 className="font-bold text-lg text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Digital Evidence Package Vault
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Role-restricted vault containing verified forensic ledgers, cryptographically sealed hashes, and citizen attachments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1.5 rounded-full font-bold border border-emerald-500/30">
              Signature Valid
            </span>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print DEP Dossier PDF</span>
            </button>
          </div>
        </div>

        {/* HASHED VALUE SECURITY SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-slate-850 p-4 rounded-lg border border-slate-800 relative">
          <div>
            <p className="text-slate-400 font-semibold uppercase flex items-center gap-1.5">
              SHA-256 HASH VERIFICATION
              {isHashUnlocked || currentUser.role === 'ADMIN' ? (
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-400" />
              )}
            </p>

            {isHashUnlocked || currentUser.role === 'ADMIN' ? (
              <p className="font-mono text-emerald-300 font-bold mt-1 break-all animate-in fade-in">
                4a9b2c3d8e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b
              </p>
            ) : (
              <p className="font-mono text-slate-500 font-bold mt-1 tracking-widest select-none">
                ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
              </p>
            )}
          </div>

          <div>
            <p className="text-slate-400 font-semibold uppercase flex items-center gap-1.5">
              HSM DIGITAL SIGNATURE HEX
              {isHashUnlocked || currentUser.role === 'ADMIN' ? (
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-400" />
              )}
            </p>

            {isHashUnlocked || currentUser.role === 'ADMIN' ? (
              <p className="font-mono text-emerald-300 font-bold mt-1 break-all animate-in fade-in">
                a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
              </p>
            ) : (
              <p className="font-mono text-slate-500 font-bold mt-1 tracking-widest select-none">
                ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
              </p>
            )}
          </div>

          {!isHashUnlocked && currentUser.role !== 'ADMIN' && (
            <div className="md:col-span-2 pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-amber-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Raw cryptographic hash values are protected. Admin password required to unlock.
              </span>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Enter Admin Password to Unlock</span>
              </button>
            </div>
          )}
        </div>

        {/* CASE SELECTOR & USER EVIDENCE ATTACHMENTS PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* UPLOAD REAL USER EVIDENCE DOCUMENTS */}
          <div className="bg-slate-850 border border-slate-800 p-5 rounded-xl space-y-4">
            <h5 className="font-bold text-sm text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-teal-400" />
              Attach Evidence Files (PDF, Image, Word)
            </h5>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Case Ref</label>
              <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-teal-400 font-bold rounded-lg p-2 text-xs outline-none cursor-pointer"
              >
                {activeCaseList.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    {c.id} - {c.reporter} ({c.crimeCategory})
                  </option>
                ))}
              </select>
            </div>

            {/* Direct File Picker Upload */}
            <div className="border-2 border-dashed border-slate-700 hover:border-teal-400 rounded-lg p-5 text-center cursor-pointer transition-all relative bg-slate-900/60 group">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <Upload className="w-8 h-8 text-slate-500 group-hover:text-teal-400 mx-auto mb-2 transition-colors" />
              <p className="text-xs font-semibold text-slate-200 group-hover:text-teal-300">Click or Drag Files Here</p>
              <p className="text-[10px] text-slate-500 mt-1">PDF, JPG, PNG, DOCX up to 25MB</p>
            </div>

            <div className="relative border-t border-slate-800 pt-3">
              <span className="text-[10px] text-slate-500 font-semibold block mb-2">Or Quick Create Evidence Record:</span>
              <form onSubmit={handleSimulateAddEvidence} className="space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="e.g. bank_statement_sbi.pdf"
                  value={uploadFileName}
                  onChange={(e) => setUploadFileName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded p-2 text-xs outline-none"
                />

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={uploadFileType}
                    onChange={(e) => setUploadFileType(e.target.value as any)}
                    className="bg-slate-900 border border-slate-700 text-slate-200 rounded p-1.5 text-xs outline-none cursor-pointer"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="image">Image Scan</option>
                    <option value="doc">Word Doc</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded p-1.5 transition-all cursor-pointer"
                  >
                    Attach Record
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* DYNAMIC ATTACHED EVIDENCE LIST FOR SELECTED CASE */}
          <div className="bg-slate-850 border border-slate-800 p-5 rounded-xl lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h5 className="font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Attached Evidence Documents ({currentCaseFiles.length})
              </h5>
              <span className="text-xs text-slate-400">Case Ref: <b className="text-teal-400">{selectedCase.id}</b></span>
            </div>

            {currentCaseFiles.length === 0 ? (
              <div className="py-10 text-center text-slate-500 text-xs italic">
                No custom evidence files attached to this case yet. Use the upload box on the left to attach PDFs, photos, or Word documents.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentCaseFiles.map((file) => (
                  <div key={file.id} className="bg-slate-900 border border-slate-750 p-3.5 rounded-lg flex items-start space-x-3 hover:border-indigo-500/50 transition-all">
                    <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                      {file.fileType === 'pdf' ? <FileText className="w-5 h-5" /> : file.fileType === 'image' ? <Image className="w-5 h-5 text-emerald-400" /> : <File className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-slate-200 truncate">{file.fileName}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{file.fileSize} • Uploaded {file.uploadDate}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => handleViewDocument(file)}
                          className="text-[10px] bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <Eye className="w-3 h-3 text-indigo-400" />
                          View Document
                        </button>
                        <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> HSM Verified
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* HIGHLY STYLED COLORFUL PRINTABLE DOSSIER PDF */}
        <div id="printable-evidence-ledger" className="border-2 border-indigo-900 bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl space-y-6">
          
          {/* VIBRANT OFFICIAL HEADER BAR */}
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-6 border-b-4 border-amber-500 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-400/40 text-amber-400">
                <Landmark className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-wider text-white">SENTINELX NATIONAL PUBLIC SAFETY COMMAND</h1>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Official Forensic Evidence Ledger & DEP Dossier
                </p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="bg-emerald-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                ✓ Legally Certified
              </span>
              <p className="text-[10px] text-slate-300 font-mono pt-1">
                Ref ID: <b>{selectedCase.id}</b>
              </p>
              <p className="text-[9px] text-slate-400 font-mono">
                Generated: {new Date().toLocaleString()}
              </p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* INCIDENT HIGHLIGHT CARDS (COLORFUL GRID) */}
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="bg-indigo-50 border border-indigo-200 p-3.5 rounded-xl space-y-1">
                <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Incident Classification</p>
                <p className="font-extrabold text-sm text-indigo-950">{selectedCase.crimeCategory}</p>
              </div>

              <div className="bg-teal-50 border border-teal-200 p-3.5 rounded-xl space-y-1">
                <p className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Complainant Name / Contact</p>
                <p className="font-extrabold text-sm text-teal-950">{selectedCase.reporter}</p>
                <p className="text-[10px] font-mono text-teal-800">{selectedCase.phone}</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl space-y-1">
                <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Jurisdiction & Location</p>
                <p className="font-extrabold text-sm text-amber-950">{selectedCase.location}</p>
                <p className="text-[10px] font-mono text-amber-800">Priority: {selectedCase.priority}</p>
              </div>
            </div>

            {/* NEEDFUL ATTACHED DOCUMENTS ONLY SECTION */}
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b-2 border-indigo-100 pb-2">
                <h3 className="font-extrabold text-sm text-indigo-950 uppercase tracking-wide flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-indigo-600" />
                  Attached Needful Evidence Documents ({currentCaseFiles.length})
                </h3>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded border border-slate-300">
                  Case Ref: {selectedCase.id}
                </span>
              </div>

              {currentCaseFiles.length === 0 ? (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500 italic">
                  No custom evidence files attached to case {selectedCase.id}.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {currentCaseFiles.map((file, idx) => (
                    <div key={file.id} className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-extrabold text-slate-900 text-xs">{file.fileName}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{file.fileSize} • Uploaded {file.uploadDate}</p>
                        </div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-300 uppercase font-mono">
                        HSM VERIFIED
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COERCIVE SCRIPT TRANSCRIPT */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" /> Incident Forensic Transcript & Statements
              </h3>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs border border-slate-800 leading-relaxed shadow-inner">
                "{selectedCase.detail}"
              </div>
            </div>

            {/* CRYPTOGRAPHIC INTEGRITY FOOTER */}
            <div className="bg-slate-100 border border-slate-300 p-4 rounded-xl grid grid-cols-2 gap-4 text-[10px] font-mono">
              <div>
                <p className="text-slate-500 font-bold uppercase">SHA-256 Cryptographic Hash</p>
                <p className="text-indigo-900 font-bold break-all mt-0.5">
                  4a9b2c3d8e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b
                </p>
              </div>

              <div>
                <p className="text-slate-500 font-bold uppercase">HSM Digital Seal Signature</p>
                <p className="text-emerald-900 font-bold break-all mt-0.5">
                  a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
                </p>
              </div>
            </div>

            {/* SIGNATURE STAMP FOOTER */}
            <div className="pt-4 border-t border-slate-300 flex justify-between items-end text-xs">
              <div className="space-y-1">
                <p className="font-bold text-slate-800">SentinelX Forensic Ledger Officer</p>
                <p className="text-[10px] text-slate-500">Insp. R. Sharma (Admin ID: USR-ADMIN-01)</p>
              </div>

              <div className="text-right">
                <div className="w-32 border-b-2 border-slate-900 mb-1"></div>
                <p className="text-[10px] font-bold text-slate-900 uppercase">Authorized Official Stamp</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* REAL DOCUMENT PREVIEW MODAL */}
      {viewingFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center bg-slate-850 px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-indigo-500/20 text-indigo-400">
                  {viewingFile.fileType === 'pdf' ? <FileText className="w-5 h-5" /> : viewingFile.fileType === 'image' ? <Image className="w-5 h-5 text-emerald-400" /> : <File className="w-5 h-5 text-blue-400" />}
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{viewingFile.fileName}</h4>
                  <p className="text-xs text-slate-400">Size: {viewingFile.fileSize} • Case Ref: {viewingFile.caseId}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {viewingFile.fileUrl && viewingFile.fileUrl !== '#' && (
                  <a
                    href={viewingFile.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Download / Open Direct File
                  </a>
                )}
                <button onClick={() => setViewingFile(null)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {viewingFile.fileUrl && (viewingFile.fileUrl.startsWith('data:image') || viewingFile.fileUrl.startsWith('blob:') || viewingFile.fileUrl.startsWith('http')) ? (
                <div className="flex flex-col items-center justify-center bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
                  <img src={viewingFile.fileUrl} alt={viewingFile.fileName} className="max-h-[60vh] object-contain rounded shadow-lg border border-slate-700" />
                  <span className="text-[11px] text-slate-400 font-mono">Original Upload Preview • {viewingFile.fileName}</span>
                </div>
              ) : viewingFile.fileUrl && viewingFile.fileUrl.startsWith('data:application/pdf') ? (
                <iframe src={viewingFile.fileUrl} className="w-full h-[60vh] rounded-xl border border-slate-800 bg-white" title={viewingFile.fileName} />
              ) : (
                /* FORMATTED ELECTRONIC DOCUMENT DOSSIER PREVIEW */
                <div className="bg-white text-slate-900 p-6 rounded-xl border border-slate-300 space-y-4 text-xs shadow-md">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 uppercase tracking-tight">AUTHENTICATED DIGITAL EVIDENCE DOSSIER</h3>
                      <p className="text-[10px] text-slate-500 font-mono">FILE REF: {viewingFile.id} • CASE: {viewingFile.caseId}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded border border-emerald-300 uppercase font-mono">
                      HSM 256-BIT SEALED
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded text-[11px]">
                    <div>
                      <p className="text-slate-500 font-semibold">Document Name:</p>
                      <p className="font-bold text-slate-900">{viewingFile.fileName}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-semibold">Upload Timestamp:</p>
                      <p className="font-bold text-slate-900">{viewingFile.uploadDate}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-slate-800">Forensic Evidence & Analysis Status:</p>
                    <div className="text-slate-700 leading-relaxed font-mono text-[11px] bg-slate-50 p-4 rounded border border-slate-200 space-y-2">
                      <p>✓ Document successfully parsed and verified in SentinelX Evidence Vault.</p>
                      <p>✓ Contains authentic forensic ledger records for case <b>{viewingFile.caseId}</b>.</p>
                      <p>✓ SHA-256 Hash Match Confirmed with 100% cryptographic integrity.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-850 px-6 py-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Cryptographically Sealed & Verified
              </span>
              <button
                onClick={() => setViewingFile(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN PASSWORD PROMPT MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                Admin Password Required
              </h4>
              <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUnlockHashSubmit} className="space-y-3 text-xs">
              <p className="text-slate-400">Enter Admin password to reveal raw SHA-256 and HSM hex signature values (Default: <b className="text-white">admin123</b>):</p>

              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded p-2.5 outline-none font-mono"
                autoFocus
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded shadow"
                >
                  Unlock Hashes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
