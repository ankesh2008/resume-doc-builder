import React from 'react';
import { User, Briefcase, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';

export default function PersonalInfoEditor({ personalInfo, onChange }) {
  const updateField = (field, value) => {
    onChange({
      ...personalInfo,
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
          <User className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-800">Personal Details</h2>
          <p className="text-xs text-slate-500">Recruiters use this to reach you directly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
          <div className="relative">
            <input 
              type="text"
              value={personalInfo.fullName || ''}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Professional Title</label>
          <div className="relative">
            <input 
              type="text"
              value={personalInfo.jobTitle || ''}
              onChange={(e) => updateField('jobTitle', e.target.value)}
              placeholder="e.g. Senior Full-Stack Engineer"
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <input 
              type="email"
              value={personalInfo.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="alex.morgan@example.com"
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
          <div className="relative">
            <input 
              type="tel"
              value={personalInfo.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Location</label>
          <div className="relative">
            <input 
              type="text"
              value={personalInfo.location || ''}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="City, State / Country"
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">LinkedIn Profile</label>
          <div className="relative">
            <input 
              type="text"
              value={personalInfo.linkedin || ''}
              onChange={(e) => updateField('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <Linkedin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">GitHub / Code Link</label>
          <div className="relative">
            <input 
              type="text"
              value={personalInfo.github || ''}
              onChange={(e) => updateField('github', e.target.value)}
              placeholder="github.com/username"
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <Github className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Portfolio / Website</label>
          <div className="relative">
            <input 
              type="url"
              value={personalInfo.website || ''}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="https://yourportfolio.dev"
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
