import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Sparkles, ChevronDown, ChevronUp, Wand2, Lightbulb } from 'lucide-react';
import { enhanceBulletPoint, generateBulletSuggestions, ACTION_VERBS } from '../../utils/aiGenerator';

export default function ExperienceEditor({ experience = [], onChange }) {
  const [expandedId, setExpandedId] = useState(experience[0]?.id || null);
  const [aiSuggestionsCategory, setAiSuggestionsCategory] = useState(null); // category string or null
  const [activeExpIdForAi, setActiveExpIdForAi] = useState(null);

  const addExperience = () => {
    const newId = `exp-${Date.now()}`;
    const newEntry = {
      id: newId,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['']
    };
    onChange([newEntry, ...experience]);
    setExpandedId(newId);
  };

  const updateExperience = (id, field, value) => {
    onChange(
      experience.map(exp => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const removeExperience = (id) => {
    onChange(experience.filter(exp => exp.id !== id));
  };

  const addBullet = (expId) => {
    onChange(
      experience.map(exp => {
        if (exp.id === expId) {
          return { ...exp, bullets: [...(exp.bullets || []), ''] };
        }
        return exp;
      })
    );
  };

  const updateBullet = (expId, index, text) => {
    onChange(
      experience.map(exp => {
        if (exp.id === expId) {
          const updated = [...(exp.bullets || [])];
          updated[index] = text;
          return { ...exp, bullets: updated };
        }
        return exp;
      })
    );
  };

  const removeBullet = (expId, index) => {
    onChange(
      experience.map(exp => {
        if (exp.id === expId) {
          const updated = (exp.bullets || []).filter((_, i) => i !== index);
          return { ...exp, bullets: updated.length ? updated : [''] };
        }
        return exp;
      })
    );
  };

  const handleImproveBullet = (expId, index, currentText) => {
    const improved = enhanceBulletPoint(currentText);
    updateBullet(expId, index, improved);
  };

  const handleInsertAiSuggestion = (expId, suggestion) => {
    onChange(
      experience.map(exp => {
        if (exp.id === expId) {
          const bullets = [...(exp.bullets || [])];
          // If last bullet is empty, replace it, otherwise append
          if (bullets.length > 0 && bullets[bullets.length - 1].trim() === '') {
            bullets[bullets.length - 1] = suggestion;
          } else {
            bullets.push(suggestion);
          }
          return { ...exp, bullets };
        }
        return exp;
      })
    );
    setAiSuggestionsCategory(null);
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Work Experience</h2>
            <p className="text-xs text-slate-500">Highlight quantifiable achievements & leadership.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Role
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No work experience added yet.</p>
          <button
            onClick={addExperience}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            + Add your first position
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {experience.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div 
                key={exp.id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/40 transition"
              >
                {/* Accordion Bar */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="flex items-center justify-between p-3.5 bg-white cursor-pointer hover:bg-slate-50 select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">
                        {exp.title || 'Untitled Role'} {exp.company ? `— ${exp.company}` : ''}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {exp.startDate ? `${exp.startDate} – ${exp.current ? 'Present' : exp.endDate || 'End'}` : 'Dates not set'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExperience(exp.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition"
                      title="Remove role"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-1 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Form */}
                {isExpanded && (
                  <div className="p-4 bg-white border-t border-slate-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.title || ''}
                          onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Company / Organization</label>
                        <input
                          type="text"
                          value={exp.company || ''}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Acme Corp"
                          className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location || ''}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          placeholder="e.g. San Francisco, CA or Remote"
                          className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-slate-600 font-medium">Dates</label>
                          <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={exp.current || false}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            I currently work here
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Start (YYYY-MM)"
                            value={exp.startDate || ''}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="p-2 border border-slate-200 rounded-lg text-xs"
                          />
                          {!exp.current ? (
                            <input
                              type="text"
                              placeholder="End (YYYY-MM)"
                              value={exp.endDate || ''}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              className="p-2 border border-slate-200 rounded-lg text-xs"
                            />
                          ) : (
                            <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 text-xs text-center font-medium">
                              Present
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-700">
                          Key Achievements & Bullet Points
                        </label>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveExpIdForAi(exp.id);
                              setAiSuggestionsCategory('Technical');
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 px-2 py-1 rounded"
                          >
                            <Sparkles className="w-3 h-3" />
                            AI Suggest Bullets
                          </button>
                          <button
                            type="button"
                            onClick={() => addBullet(exp.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2 py-1 rounded"
                          >
                            <Plus className="w-3 h-3" />
                            Add Bullet
                          </button>
                        </div>
                      </div>

                      {/* AI Suggestions dropdown preview if open for this role */}
                      {aiSuggestionsCategory && activeExpIdForAi === exp.id && (
                        <div className="p-3 bg-pink-50/70 border border-pink-200 rounded-xl space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-pink-800 text-[11px] uppercase tracking-wide">
                              AI Formula Suggestions
                            </span>
                            <div className="flex gap-1">
                              {['Technical', 'Leadership', 'Optimization', 'Impact'].map((cat) => (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => setAiSuggestionsCategory(cat)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${
                                    aiSuggestionsCategory === cat 
                                      ? 'bg-pink-600 text-white' 
                                      : 'bg-white text-pink-700 border border-pink-200'
                                  }`}
                                >
                                  {cat}
                                </button>
                              ))}
                              <button
                                type="button"
                                onClick={() => setAiSuggestionsCategory(null)}
                                className="text-slate-400 hover:text-slate-600 text-xs ml-1"
                              >
                                ✕
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1.5 max-h-48 overflow-y-auto">
                            {generateBulletSuggestions(exp.title, aiSuggestionsCategory).map((sug, sIdx) => (
                              <div
                                key={sIdx}
                                onClick={() => handleInsertAiSuggestion(exp.id, sug)}
                                className="p-2 rounded bg-white border border-pink-100 hover:border-pink-300 hover:shadow-xs cursor-pointer text-slate-700 text-xs flex justify-between items-center group"
                              >
                                <span>{sug}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-[11px] font-bold text-pink-600 shrink-0 ml-2">
                                  + Insert
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Individual Bullets */}
                      <div className="space-y-2">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-1.5 group">
                            <span className="text-slate-400 text-xs mt-2 select-none">•</span>
                            <div className="flex-1">
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                                placeholder="Spearheaded [X] project resulting in [Y%] improvement in [Z metric]..."
                                className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 leading-relaxed"
                              />
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                              <button
                                type="button"
                                onClick={() => handleImproveBullet(exp.id, bIdx, bullet)}
                                title="Improve with AI (Action verb & metrics formula)"
                                className="p-1 rounded text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition"
                              >
                                <Wand2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeBullet(exp.id, bIdx)}
                                title="Delete bullet"
                                className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
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
          })}
        </div>
      )}
    </div>
  );
}
