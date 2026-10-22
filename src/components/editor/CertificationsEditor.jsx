import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';

export default function CertificationsEditor({ certifications = [], onChange }) {
  const addCert = () => {
    const newEntry = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      credentialUrl: ''
    };
    onChange([...certifications, newEntry]);
  };

  const updateCert = (id, field, value) => {
    onChange(
      certifications.map(c => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeCert = (id) => {
    onChange(certifications.filter(c => c.id !== id));
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Certifications & Licenses</h2>
            <p className="text-xs text-slate-500">Industry-recognized professional credentials.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={addCert}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-50 hover:bg-orange-100 text-orange-800 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Credential
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No certifications listed.</p>
          <button
            onClick={addCert}
            className="text-xs font-semibold text-orange-700 hover:underline"
          >
            + Add certificate / license
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-3 border border-slate-200 rounded-xl bg-slate-50/40 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={cert.name || ''}
                  onChange={(e) => updateCert(cert.id, 'name', e.target.value)}
                  placeholder="Certification Name (e.g. AWS Solutions Architect)"
                  className="font-medium text-xs border border-slate-200 rounded-lg p-1.5 flex-1 mr-2 bg-white"
                />
                <button
                  type="button"
                  onClick={() => removeCert(cert.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  value={cert.issuer || ''}
                  onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                  placeholder="Issuing Organization (e.g. Amazon Web Services)"
                  className="border border-slate-200 rounded-lg p-1.5 bg-white text-xs"
                />
                <input
                  type="text"
                  value={cert.date || ''}
                  onChange={(e) => updateCert(cert.id, 'date', e.target.value)}
                  placeholder="Issue Date (e.g. 2023)"
                  className="border border-slate-200 rounded-lg p-1.5 bg-white text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
