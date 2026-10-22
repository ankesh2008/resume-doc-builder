import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Sparkles, Plus, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateAtsScore } from '../utils/atsChecker';

export default function AtsModal({ resume, onAddSkill, onClose }) {
  const [jobDescription, setJobDescription] = useState('');
  const [copiedKeyword, setCopiedKeyword] = useState(null);

  const atsResult = calculateAtsScore(resume, jobDescription);
  const { score, checklist, keywordAnalysis } = atsResult;

  useEffect(() => {
    if (score >= 90) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [score]);

  const handleAddMissingKeyword = (kw) => {
    onAddSkill(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">ATS Resume Checker & Analysis</h2>
              <p className="text-xs text-slate-500">Real-time parser audit against top Applicant Tracking Systems.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
          >
            ✕
          </button>
        </div>

        {/* Big Score Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-1">
              Overall ATS Readiness Score
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold flex items-baseline gap-2">
              <span className={score >= 85 ? 'text-emerald-400' : score >= 65 ? 'text-amber-400' : 'text-rose-400'}>
                {score}
              </span>
              <span className="text-sm font-normal text-slate-400">/ 100</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 max-w-sm">
              {score >= 85
                ? 'Excellent! Your resume has strong keyword density, action verbs, and clear structure.'
                : score >= 65
                ? 'Good foundation, but adding quantifiable metrics and missing keywords will boost interview rates.'
                : 'Needs improvement. Follow the checklist below to optimize for recruiting algorithms.'}
            </p>
          </div>

          <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center font-extrabold text-2xl shrink-0"
            style={{
              borderColor: score >= 85 ? '#34d399' : score >= 65 ? '#fbbf24' : '#f87171'
            }}
          >
            {score}%
          </div>
        </div>

        {/* ATS Checklist Audit */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Core Optimization Criteria
          </h3>
          <div className="space-y-2.5">
            {checklist.map((item, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-start gap-3"
              >
                {item.status === 'pass' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                ) : item.status === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-bold text-slate-800">{item.title}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Job Description Matcher */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Target Job Description Matcher
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Paste the job posting from LinkedIn, Indeed, or the employer career site to check keyword coverage.
          </p>

          <textarea
            rows={3}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste target job requirements and qualifications here..."
            className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          />

          {keywordAnalysis && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Keyword Match Rate:</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  keywordAnalysis.matchPercentage >= 70 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {keywordAnalysis.matchPercentage}% ({keywordAnalysis.matchedKeywords.length}/{keywordAnalysis.totalTargetKeywords})
                </span>
              </div>

              {/* Matched Keywords */}
              {keywordAnalysis.matchedKeywords.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase block mb-1">
                    ✓ Found in your resume:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {keywordAnalysis.matchedKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px]">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {keywordAnalysis.missingKeywords.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-rose-700 uppercase block mb-1">
                    ! Missing from your resume (Click to Add):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {keywordAnalysis.missingKeywords.slice(0, 15).map((kw, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleAddMissingKeyword(kw)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] transition"
                      >
                        {copiedKeyword === kw ? <Check className="w-3 h-3 text-emerald-600" /> : <Plus className="w-3 h-3" />}
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition shadow-sm"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
