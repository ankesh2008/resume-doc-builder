import React from 'react';
import { FolderGit2, Plus, Trash2, ExternalLink } from 'lucide-react';

export default function ProjectsEditor({ projects = [], onChange }) {
  const addProject = () => {
    const newEntry = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      link: '',
      date: '',
      description: ''
    };
    onChange([...projects, newEntry]);
  };

  const updateProject = (id, field, value) => {
    onChange(
      projects.map(proj => (proj.id === id ? { ...proj, [field]: value } : proj))
    );
  };

  const removeProject = (id) => {
    onChange(projects.filter(proj => proj.id !== id));
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Key Projects</h2>
            <p className="text-xs text-slate-500">Open source, freelance, or major initiatives.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 hover:bg-purple-100 text-purple-700 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No projects added yet.</p>
          <button
            onClick={addProject}
            className="text-xs font-semibold text-purple-700 hover:underline"
          >
            + Add a project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div 
              key={proj.id}
              className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/40 relative space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">
                  #{idx + 1} {proj.name || 'Untitled Project'}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(proj.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Remove project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Project Name</label>
                  <input
                    type="text"
                    value={proj.name || ''}
                    onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                    placeholder="e.g. Distributed Cache Engine"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Role / Tech Stack</label>
                  <input
                    type="text"
                    value={proj.role || ''}
                    onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                    placeholder="e.g. Creator / Go, Redis, Docker"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Project / Demo URL</label>
                  <input
                    type="url"
                    value={proj.link || ''}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Year / Date</label>
                  <input
                    type="text"
                    value={proj.date || ''}
                    onChange={(e) => updateProject(proj.id, 'date', e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-600 font-medium mb-1">Description & Impact</label>
                  <textarea
                    rows={2}
                    value={proj.description || ''}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    placeholder="Built an open-source tool with 1,200+ stars that reduces cache query latency by 40%..."
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-700 leading-relaxed"
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
