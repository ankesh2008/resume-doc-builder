import React, { useState } from 'react';
import { Wrench, Plus, X, Sparkles, Check } from 'lucide-react';
import { ROLE_SKILL_SUGGESTIONS } from '../../utils/aiGenerator';

export default function SkillsEditor({ skills = [], onChange }) {
  const [newSkillText, setNewSkillText] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('General');
  const [newSkillLevel, setNewSkillLevel] = useState('Advanced');
  const [activeRoleCategory, setActiveRoleCategory] = useState('Software Engineer');

  const handleAddSkill = (name, category = newSkillCategory, level = newSkillLevel) => {
    if (!name || !name.trim()) return;
    const cleanName = name.trim();
    // Prevent duplicate
    if (skills.some(s => (s.name || s).toLowerCase() === cleanName.toLowerCase())) return;

    onChange([
      ...skills,
      {
        name: cleanName,
        category: category || 'General',
        level: level || 'Advanced'
      }
    ]);
    setNewSkillText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(newSkillText);
    }
  };

  const handleRemoveSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const roleSuggestions = ROLE_SKILL_SUGGESTIONS[activeRoleCategory] || [];

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Skills & Competencies</h2>
            <p className="text-xs text-slate-500">Target ATS keywords for your industry.</p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
          {skills.length} skills listed
        </span>
      </div>

      {/* Input row */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={newSkillText}
            onChange={(e) => setNewSkillText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill & press Enter (e.g. React, Docker, Python)..."
            className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value)}
            className="p-2 border border-slate-200 rounded-lg text-xs text-slate-600"
          >
            <option value="General">General</option>
            <option value="Languages">Languages</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Cloud / DevOps">Cloud / DevOps</option>
            <option value="Databases">Databases</option>
            <option value="Product & Strategy">Product & Strategy</option>
          </select>
          <button
            type="button"
            onClick={() => handleAddSkill(newSkillText)}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Active Skills Chips */}
      <div className="flex flex-wrap gap-1.5 min-h-12 p-2.5 bg-slate-50/60 border border-slate-100 rounded-xl">
        {skills.length === 0 ? (
          <span className="text-xs text-slate-400 italic">No skills added yet. Choose from suggestions below or type above.</span>
        ) : (
          skills.map((skill, idx) => {
            const skillName = skill.name || skill;
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs group"
              >
                <span>{skillName}</span>
                {skill.level && (
                  <span className="text-[10px] text-slate-400">· {skill.level}</span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(idx)}
                  className="text-slate-400 hover:text-rose-500 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })
        )}
      </div>

      {/* Smart Suggested Skills based on Job Title */}
      <div className="pt-2 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Recommended ATS Keywords by Role</span>
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1 text-[11px]">
            {Object.keys(ROLE_SKILL_SUGGESTIONS).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRoleCategory(role)}
                className={`px-2 py-0.5 rounded-full font-medium transition whitespace-nowrap ${
                  activeRoleCategory === role
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {roleSuggestions.map((sug, idx) => {
            const isAdded = skills.some(s => (s.name || s).toLowerCase() === sug.toLowerCase());
            return (
              <button
                key={idx}
                type="button"
                disabled={isAdded}
                onClick={() => handleAddSkill(sug)}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  isAdded
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-default'
                    : 'bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/60 cursor-pointer'
                }`}
              >
                {isAdded ? <Check className="w-3 h-3 text-emerald-500" /> : <Plus className="w-3 h-3 text-indigo-500" />}
                {sug}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
