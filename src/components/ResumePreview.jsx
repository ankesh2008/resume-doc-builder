import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Printer, Download, Check, Maximize2, Loader2 } from 'lucide-react';
import ResumeTemplateRenderer from './templates/ResumeTemplateRenderer';
import { COLOR_PALETTES } from '../data/templateThemes';
import { exportToPdf } from '../utils/pdfExport';

export default function ResumePreview({
  resume,
  selectedTemplate,
  selectedTheme,
  setSelectedTheme,
  formatting,
  isFullView = false
}) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(600);
  const [autoFit, setAutoFit] = useState(true);
  const [manualZoom, setManualZoom] = useState(85);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Measure container width for responsive auto-fit
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Standard Letter page is 816px wide at 96dpi
  const BASE_WIDTH = 816;
  const computedScale = autoFit
    ? Math.min(1.05, Math.max(0.4, (containerWidth - 40) / BASE_WIDTH))
    : manualZoom / 100;

  const currentPercent = Math.round(computedScale * 100);

  const handleZoomIn = () => {
    setAutoFit(false);
    setManualZoom((prev) => Math.min(140, Math.round(prev + 10)));
  };

  const handleZoomOut = () => {
    setAutoFit(false);
    setManualZoom((prev) => Math.max(45, Math.round(prev - 10)));
  };

  const handleResetZoom = () => {
    setAutoFit(false);
    setManualZoom(100);
  };

  const handleToggleAutoFit = () => {
    setAutoFit(prev => !prev);
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    const fileName = `${(resume.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
    try {
      await exportToPdf('resume-document', fileName);
    } catch (e) {
      console.error('PDF generation error:', e);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="preview-wrapper flex flex-col h-full bg-slate-200/70 rounded-2xl border border-slate-300/80 overflow-hidden shadow-xs">
      {/* Floating Preview Toolbar */}
      <div className="preview-toolbar p-2.5 bg-white/95 backdrop-blur-md border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 no-print z-10">
        {/* Quick Color Swatches */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">Theme:</span>
          <div className="flex items-center gap-1">
            {COLOR_PALETTES.slice(0, 6).map((pal) => (
              <button
                key={pal.id}
                type="button"
                onClick={() => setSelectedTheme(pal)}
                title={pal.name}
                className={`w-5 h-5 rounded-full transition relative flex items-center justify-center text-white ${
                  selectedTheme?.id === pal.id ? 'ring-2 ring-indigo-500 scale-110' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: pal.primary }}
              >
                {selectedTheme?.id === pal.id && <Check className="w-3 h-3 drop-shadow" />}
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Controls & Download Buttons */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs text-slate-700">
            <button
              type="button"
              onClick={handleToggleAutoFit}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                autoFit ? 'bg-indigo-600 text-white shadow-2xs' : 'hover:bg-white text-slate-600'
              }`}
              title="Automatically fit resume to container width"
            >
              Fit Width
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 hover:bg-white rounded transition ml-0.5"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] min-w-8 text-center font-medium">
              {currentPercent}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 hover:bg-white rounded transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1 hover:bg-white rounded transition border-l border-slate-200 ml-0.5"
              title="Reset to 100%"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Direct PDF Download button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-50"
            style={{ background: 'linear-gradient(332deg, #E92085 -15.2%, #FD7521 66.64%)' }}
            title="Download crisp PDF document"
          >
            {isDownloadingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>

          {/* Native Print button */}
          <button
            type="button"
            onClick={handlePrint}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200 bg-white"
            title="Print via Browser (Ctrl+P)"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable Preview Paper Area */}
      <div 
        ref={containerRef}
        className="preview-container flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-5 flex justify-center items-start"
      >
        {/* Scaling wrapper that allocates exactly scaled dimensions */}
        <div 
          style={{
            width: `${BASE_WIDTH * computedScale}px`,
            minHeight: `${1056 * computedScale}px`
          }}
          className="relative transition-all duration-150 flex justify-center"
        >
          <div 
            className="print-area shadow-2xl rounded-sm bg-white"
            style={{
              width: `${BASE_WIDTH}px`,
              minHeight: '1056px',
              transform: `scale(${computedScale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              left: 0,
              top: 0
            }}
          >
            <ResumeTemplateRenderer
              templateId={selectedTemplate}
              resume={resume}
              theme={selectedTheme}
              formatting={formatting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
