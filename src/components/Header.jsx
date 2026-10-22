import React, { useState, useRef } from 'react';
import { 
  FileText, Download, Sparkles, Eye, Layout, Sliders, CheckCircle2, 
  Upload, RotateCcw, ChevronDown, Check, FileDown, ShieldCheck, Printer, Loader2
} from 'lucide-react';
import { exportToDocx, exportToTxt, exportToJson } from '../utils/docxExport';
import { exportToPdf } from '../utils/pdfExport';
import { SAMPLE_RESUMES } from '../data/sampleResumes';

export default function Header({ 
  resume, 
  setResume, 
  activeView, 
  setActiveView, 
  atsScore, 
  onOpenAtsModal, 
  theme,
  onReset
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showSampleMenu, setShowSampleMenu] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const fileInputRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    const fileName = `${(resume.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
    try {
      await exportToPdf('resume-document', fileName);
    } catch (e) {
      console.error('PDF generation error:', e);
    } finally {
      setIsExportingPdf(false);
      setShowExportMenu(false);
    }
  };

  const handleExportDocx = async () => {
    await exportToDocx(resume, theme?.primary || '#001950');
    setShowExportMenu(false);
  };

  const handleExportTxt = () => {
    exportToTxt(resume);
    setShowExportMenu(false);
  };

  const handleExportJson = () => {
    exportToJson(resume);
    setShowExportMenu(false);
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.personalInfo) {
          setResume(parsed);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
    setShowExportMenu(false);
  };

  const handleLoadSample = (key) => {
    if (SAMPLE_RESUMES[key]) {
      setResume(JSON.parse(JSON.stringify(SAMPLE_RESUMES[key])));
    }
    setShowSampleMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{ background: 'linear-gradient(135deg, #A053CF 0%, #E92085 50%, #FD7521 100%)' }}
          >
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                Resume<span className="text-pink-600">Builder</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
                AI Pro
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Inspired by resumebuilder.com · REA Verified
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveView('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeView === 'split'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            Editor & Live Preview
          </button>

          <button
            type="button"
            onClick={() => setActiveView('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeView === 'preview'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Full Document
          </button>

          <button
            type="button"
            onClick={() => setActiveView('design')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeView === 'design'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Design & Fonts
          </button>
        </nav>

        {/* Action Controls & Export */}
        <div className="flex items-center gap-2">
          {/* Real-time ATS Score Pill */}
          <button
            type="button"
            onClick={onOpenAtsModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs border ${
              atsScore >= 85 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : atsScore >= 65
                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ATS: {atsScore}%</span>
          </button>

          {/* Sample Profiles Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSampleMenu(!showSampleMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span className="hidden sm:inline">Samples</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {showSampleMenu && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Preloaded Profiles
                </div>
                <button
                  type="button"
                  onClick={() => handleLoadSample('software_engineer')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Software Engineer</span>
                  {resume.id === 'software_engineer' && <Check className="w-3.5 h-3.5 text-pink-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('product_manager')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Product Manager</span>
                  {resume.id === 'product_manager' && <Check className="w-3.5 h-3.5 text-pink-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('data_scientist')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Data Scientist / AI</span>
                  {resume.id === 'data_scientist' && <Check className="w-3.5 h-3.5 text-pink-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
              style={{ background: 'linear-gradient(332deg, #E92085 -15.2%, #FD7521 66.64%)' }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
              <ChevronDown className="w-3 h-3 text-white/80" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Export Document
                </div>
                
                {/* Direct PDF Download */}
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="w-full text-left px-3 py-2 text-xs text-slate-800 hover:bg-pink-50 flex items-center gap-2.5 transition"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-4 h-4 text-pink-600 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 text-pink-600" />
                  )}
                  <div>
                    <div className="font-semibold text-slate-900">Direct Download PDF</div>
                    <div className="text-[10px] text-slate-400">Download formatted PDF file directly</div>
                  </div>
                </button>

                {/* Print via Browser */}
                <button
                  type="button"
                  onClick={() => {
                    setShowExportMenu(false);
                    handlePrint();
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 transition"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <div>
                    <div className="font-semibold">Print via Browser (Ctrl+P)</div>
                    <div className="text-[10px] text-slate-400">Browser print dialog with A4/Letter size</div>
                  </div>
                </button>

                {/* Word DOCX */}
                <button
                  type="button"
                  onClick={handleExportDocx}
                  className="w-full text-left px-3 py-2 text-xs text-slate-800 hover:bg-blue-50 flex items-center gap-2.5 transition"
                >
                  <FileDown className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-semibold">Microsoft Word (.docx)</div>
                    <div className="text-[10px] text-slate-400">Native editable Word document</div>
                  </div>
                </button>

                {/* Plain Text TXT */}
                <button
                  type="button"
                  onClick={handleExportTxt}
                  className="w-full text-left px-3 py-2 text-xs text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 transition"
                >
                  <FileText className="w-4 h-4 text-slate-600" />
                  <div>
                    <div className="font-semibold">Plain Text (.txt)</div>
                    <div className="text-[10px] text-slate-400">ResumeBuilder free TXT format</div>
                  </div>
                </button>

                <div className="my-1 border-t border-slate-100" />

                {/* Backup JSON */}
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Backup JSON Data</span>
                </button>

                {/* Import JSON */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-400" />
                  <span>Restore from JSON</span>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImportJson} 
                  accept=".json" 
                  className="hidden" 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
