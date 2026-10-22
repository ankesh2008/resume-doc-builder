import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export default function EducationEditor({ education = [], onChange }) {
  const addEducation = () => {
    const newEntry = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      honors: ''
    };
    onChange([...education, newEntry]);
  };

  const updateEducation = (id, field, value) => {
    onChange(
      education.map(edu => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Education</h2>
            <p className="text-xs text-slate-500">Degrees, colleges, academic honors.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Degree
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No education listed yet.</p>
          <button
            onClick={addEducation}
            className="text-xs font-semibold text-amber-700 hover:underline"
          >
            + Add educational background
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div 
              key={edu.id}
              className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/40 relative space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">
                  #{idx + 1} {edu.degree || 'Degree / Major'}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Remove education"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Degree & Major</label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Institution / School</label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    placeholder="e.g. Stanford, CA"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Graduation Year / Date</label>
                  <input
                    type="text"
                    value={edu.graduationDate || ''}
                    onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                    placeholder="e.g. 2021 or Expected 2025"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">GPA (Optional)</label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="e.g. 3.85 / 4.0"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Honors / Activities</label>
                  <input
                    type="text"
                    value={edu.honors || ''}
                    onChange={(e) => updateEducation(edu.id, 'honors', e.target.value)}
                    placeholder="e.g. Magna Cum Laude, Dean's List"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
