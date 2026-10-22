import React from 'react';
import { Languages, Plus, Trash2 } from 'lucide-react';

export default function LanguagesEditor({ languages = [], onChange }) {
  const addLanguage = () => {
    onChange([...languages, { language: '', proficiency: 'Fluent' }]);
  };

  const updateLanguage = (index, field, value) => {
    onChange(
      languages.map((l, i) => (i === index ? { ...l, [field]: value } : l))
    );
  };

  const removeLanguage = (index) => {
    onChange(languages.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
            <Languages className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Languages</h2>
            <p className="text-xs text-slate-500">Spoken and written proficiencies.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={addLanguage}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 hover:bg-teal-100 text-teal-800 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Language
        </button>
      </div>

      {languages.length === 0 ? (
        <div className="text-center py-4 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-400">No languages added.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {languages.map((lang, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white">
              <input
                type="text"
                value={lang.language || ''}
                onChange={(e) => updateLanguage(idx, 'language', e.target.value)}
                placeholder="e.g. English, Spanish"
                className="p-1 text-xs border border-slate-200 rounded flex-1"
              />
              <select
                value={lang.proficiency || 'Fluent'}
                onChange={(e) => updateLanguage(idx, 'proficiency', e.target.value)}
                className="p-1 text-xs border border-slate-200 rounded text-slate-600"
              >
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Professional Working">Professional</option>
                <option value="Conversational">Conversational</option>
                <option value="Basic">Basic</option>
              </select>
              <button
                type="button"
                onClick={() => removeLanguage(idx)}
                className="text-slate-400 hover:text-rose-500 p-1"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
