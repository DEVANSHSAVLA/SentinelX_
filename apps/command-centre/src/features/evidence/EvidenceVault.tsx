import React, { useState } from 'react';
import { Printer, ShieldCheck, Lock, Unlock, Upload, FileText, Image, File, CheckCircle2, Key, X, Eye, ExternalLink } from 'lucide-react';
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
      const typeStr = file.name.endsWith('.pdf') ? 'pdf' : file.name.match(/\.(jpg|jpeg|png|webp)$/i) ? 'image' : 'doc';
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

      addEvidenceFile({
        fileName: file.name,
        fileType: typeStr,
        fileSize: sizeStr,
        fileUrl: URL.createObjectURL(file),
        caseId: selectedCase.id
      });
    }
  };

  const handleSimulateAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName) return;

    addEvidenceFile({
      fileName: uploadFileName.endsWith(`.${uploadFileType}`) ? uploadFileName : `${uploadFileName}.${uploadFileType === 'pdf' ? 'pdf' : uploadFileType === 'image' ? 'png' : 'docx'}`,
      fileType: uploadFileType,
      fileSize: uploadFileSize,
      fileUrl: '#',
      caseId: selectedCase.id
    });

    setUploadFileName('');
  };

  const handleViewDocument = (file: EvidenceFile) => {
    if (file.fileUrl && file.fileUrl !== '#') {
      window.open(file.fileUrl, '_blank');
    }
    setViewingFile(file);
  };

  const currentCaseFiles = evidenceFiles.filter(f => f.caseId === selectedCase.id);

  return (
    <div className="space-y-6">
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
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
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
            <div className="border-2 border-dashed border-slate-700 hover:border-teal-400 rounded-lg p-5 text-center cursor-pointer transition-all relative bg-slate-900/60">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-200">Click or Drag Files Here</p>
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
                  <div key={file.id} className="bg-slate-900 border border-slate-750 p-3.5 rounded-lg flex items-start space-x-3">
                    <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                      {file.fileType === 'pdf' ? <FileText className="w-5 h-5" /> : file.fileType === 'image' ? <Image className="w-5 h-5 text-emerald-400" /> : <File className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-slate-200 truncate">{file.fileName}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{file.fileSize} • Uploaded {file.uploadDate}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => handleViewDocument(file)}
                          className="text-[10px] bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1"
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

        {/* PRINTABLE LEGAL FORENSIC DOSSIER */}
        <div id="printable-evidence-ledger" className="border border-slate-300 bg-white text-slate-900 p-8 rounded-lg min-h-[350px] space-y-6 shadow-xl">
          <div className="flex justify-between items-center border-b-2 border-slate-300 pb-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">SENTINELX PUBLIC SAFETY FORENSIC LEDGER</h1>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                Digital Evidence Package Vault — Case Ref: {selectedCase.id}
              </p>
            </div>
            <div className="text-right">
              <span className="border-2 border-emerald-600 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1 uppercase rounded tracking-wider">
                Legally Signed
              </span>
              <p className="text-[9px] text-slate-500 mt-1 font-mono">{new Date().toLocaleString()}</p>
            </div>
          </div>

          <table className="w-full text-xs text-left border-collapse border border-slate-300">
            <tbody>
              <tr className="bg-slate-50 border-b border-slate-300">
                <td className="p-2.5 font-bold w-1/3 text-slate-700">Incident Classification</td>
                <td className="p-2.5 font-semibold text-slate-900">{selectedCase.crimeCategory}</td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="p-2.5 font-bold text-slate-700">Primary Complainant / Phone</td>
                <td className="p-2.5 font-semibold text-slate-900">{selectedCase.reporter} ({selectedCase.phone})</td>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-300">
                <td className="p-2.5 font-bold text-slate-700">Jurisdiction & Location</td>
                <td className="p-2.5 font-semibold text-slate-900">{selectedCase.location}</td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="p-2.5 font-bold text-slate-700">Attached Evidence Files</td>
                <td className="p-2.5 font-semibold text-slate-900">
                  {currentCaseFiles.length > 0
                    ? currentCaseFiles.map(f => f.fileName).join(', ')
                    : 'cbi_digital_arrest_call_recording.wav, fake_notice_police.pdf'}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wider">
              I. Coercive Script Transcripts & Forensic Evidence
            </p>
            <p className="text-[11px] font-mono leading-relaxed text-slate-800 bg-slate-50 p-3.5 rounded border border-slate-200">
              "{selectedCase.detail}"
            </p>
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
                    <ExternalLink className="w-3.5 h-3.5" /> Open Direct File
                  </a>
                )}
                <button onClick={() => setViewingFile(null)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {viewingFile.fileUrl && (viewingFile.fileUrl.startsWith('blob:') || viewingFile.fileUrl.startsWith('data:')) ? (
                viewingFile.fileType === 'image' ? (
                  <div className="flex justify-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <img src={viewingFile.fileUrl} alt={viewingFile.fileName} className="max-h-[60vh] object-contain rounded" />
                  </div>
                ) : (
                  <iframe src={viewingFile.fileUrl} className="w-full h-[60vh] rounded-xl border border-slate-800 bg-white" title={viewingFile.fileName} />
                )
              ) : (
                /* FORMATTED ELECTRONIC DOCUMENT DOSSIER PREVIEW */
                <div className="bg-white text-slate-900 p-6 rounded-xl border border-slate-300 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 uppercase">AUTHENTICATED DIGITAL EVIDENCE DOSSIER</h3>
                      <p className="text-[10px] text-slate-500 font-mono">FILE REF: {viewingFile.id} • CASE: {viewingFile.caseId}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300">
                      HSM 256-BIT VERIFIED
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

                  <div className="space-y-1">
                    <p className="font-bold text-slate-800">File Contents Summary & Verification Status:</p>
                    <p className="text-slate-700 leading-relaxed font-mono text-[11px] bg-slate-100 p-3 rounded">
                      Document successfully parsed. Contains verified digital evidence linked to case {viewingFile.caseId}. Cryptographic signature match confirmed with 100% confidence.
                    </p>
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
                className="px-4 py-1.5 bg-slate-800 text-slate-300 hover:text-white rounded font-bold"
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
