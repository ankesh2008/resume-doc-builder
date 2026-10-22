import React, { useState } from 'react';
import { Sparkles, FileText, Check, RefreshCw } from 'lucide-react';
import { generateSummaries } from '../../utils/aiGenerator';

export default function SummaryEditor({ summary, jobTitle, onChange }) {
  const [showAiModal, setShowAiModal] = useState(false);
  const [expLevel, setExpLevel] = useState('Senior');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [generatedOptions, setGeneratedOptions] = useState([]);

  const wordCount = (summary || '').trim().split(/\s+/).filter(Boolean).length;

  const handleOpenAi = () => {
    const opts = generateSummaries(jobTitle || 'Professional', expLevel, focusKeyword);
    setGeneratedOptions(opts);
    setShowAiModal(true);
  };

  const handleRegenerate = () => {
    const opts = generateSummaries(jobTitle || 'Professional', expLevel, focusKeyword);
    setGeneratedOptions(opts);
  };

  const handleSelectOption = (text) => {
    onChange(text);
    setShowAiModal(false);
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-pink-50 text-pink-600">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Professional Summary</h2>
            <p className="text-xs text-slate-500">2-4 sentences highlighting your value proposition.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAi}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
          style={{ background: 'linear-gradient(332deg, #E92085 -15.2%, #FD7521 66.64%)' }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI Summary Writer
        </button>
      </div>

      <div className="relative">
        <textarea
          rows={4}
          value={summary || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Briefly describe your career achievements, technical core competencies, and career trajectory..."
          className="w-full p-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition leading-relaxed text-slate-700"
        />

        <div className="flex items-center justify-between mt-1.5 px-1 text-[11px]">
          <span className={`${wordCount >= 30 && wordCount <= 100 ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
            {wordCount} words {wordCount >= 30 && wordCount <= 100 ? '✓ (Optimal ATS length)' : '(Recommended: 40–100 words)'}
          </span>
          {summary && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-slate-400 hover:text-rose-500 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* AI Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-pink-100 text-pink-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">AI Summary Generator</h3>
                  <p className="text-xs text-slate-500">Pick the style that best aligns with your target role.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAiModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Customization controls */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Seniority Level</label>
                <select
                  value={expLevel}
                  onChange={(e) => setExpLevel(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="Junior">Junior / Entry Level</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead / Staff">Lead / Staff</option>
                  <option value="Principal / Director">Principal / Director</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Key Specialization</label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Systems, Cloud Architecture"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleRegenerate}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Regenerate tailored suggestions
            </button>

            {/* Options List */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {generatedOptions.map((opt, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50/30 transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 mb-1 block">
                      {opt.tone}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">{opt.text}</p>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSelectOption(opt.text)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-pink-600 text-white transition shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Use this summary
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
