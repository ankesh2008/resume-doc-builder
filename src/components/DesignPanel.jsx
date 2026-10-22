import React from 'react';
import { TEMPLATES, COLOR_PALETTES, TYPOGRAPHY_OPTIONS } from '../data/templateThemes';
import { Check, Sparkles, Type, Palette, Layout, Sliders } from 'lucide-react';

export default function DesignPanel({
  selectedTemplate,
  setSelectedTemplate,
  selectedTheme,
  setSelectedTheme,
  formatting,
  setFormatting
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-8 max-w-4xl mx-auto">
      {/* Template Chooser */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-pink-50 text-pink-600">
            <Layout className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Choose Template Design</h2>
            <p className="text-xs text-slate-500">All layouts are battle-tested for modern Applicant Tracking Systems (ATS).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {TEMPLATES.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50/20 shadow-md ring-2 ring-pink-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{tpl.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      ATS: {tpl.atsScore}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {tpl.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {tpl.category}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-bold text-pink-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Color Palette Selector */}
      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Color Palette & Accents</h2>
            <p className="text-xs text-slate-500">Includes exact extracted palettes from resumebuilder.com (T15, T16, T19, T11, T3v1).</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {COLOR_PALETTES.map((pal) => {
            const isSelected = selectedTheme?.id === pal.id;
            return (
              <div
                key={pal.id}
                onClick={() => setSelectedTheme(pal)}
                className={`p-3 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/30 shadow-xs ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div 
                  className="w-7 h-7 rounded-full shadow-inner shrink-0 flex items-center justify-center text-white"
                  style={{ backgroundColor: pal.primary }}
                >
                  {isSelected && <Check className="w-4 h-4 drop-shadow" />}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-800 truncate">{pal.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{pal.tag}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Typography Selector */}
      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Typography</h2>
            <p className="text-xs text-slate-500">Lexend was selected by resumebuilder.com to maximize readability and ATS font recognition.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TYPOGRAPHY_OPTIONS.map((font) => {
            const isSelected = formatting.fontFamily === font.fontFamily;
            return (
              <div
                key={font.id}
                onClick={() => setFormatting({ ...formatting, fontFamily: font.fontFamily })}
                className={`p-3.5 rounded-xl border cursor-pointer transition ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/20 shadow-xs ring-1 ring-teal-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800" style={{ fontFamily: font.fontFamily }}>
                    {font.name}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {font.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Formatting & Spacing Controls */}
      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Document Scale & Spacing</h2>
            <p className="text-xs text-slate-500">Fine-tune font size and line spacing to keep your resume on 1 or 2 pages perfectly.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Font Size Scaling</span>
              <span className="text-indigo-600">{formatting.fontSize}</span>
            </label>
            <div className="flex gap-2">
              {['13px', '13.5px', '14px', '14.5px', '15px'].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setFormatting({ ...formatting, fontSize: sz })}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition ${
                    formatting.fontSize === sz
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Line Height & Density</span>
              <span className="text-indigo-600">
                {formatting.lineHeight === '1.35' ? 'Compact' : formatting.lineHeight === '1.5' ? 'Normal' : 'Relaxed'}
              </span>
            </label>
            <div className="flex gap-2">
              {[
                { label: 'Compact', val: '1.35' },
                { label: 'Normal', val: '1.5' },
                { label: 'Relaxed', val: '1.65' }
              ].map((lh) => (
                <button
                  key={lh.val}
                  type="button"
                  onClick={() => setFormatting({ ...formatting, lineHeight: lh.val })}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition ${
                    formatting.lineHeight === lh.val
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {lh.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
