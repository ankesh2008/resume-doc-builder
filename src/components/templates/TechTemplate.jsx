import React from 'react';
import { Mail, Phone, MapPin, Globe, Terminal, Code2, Cpu } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';

export default function TechTemplate({ resume, theme, formatting }) {
  const { personalInfo, experience, education, skills, projects, certifications } = resume;
  const primaryColor = theme?.primary || '#0f172a';

  // Group skills by category if available
  const skillCategories = {};
  (skills || []).forEach(s => {
    const cat = s.category || 'General';
    if (!skillCategories[cat]) skillCategories[cat] = [];
    skillCategories[cat].push(s);
  });

  return (
    <div 
      className="resume-paper bg-white p-8 sm:p-10 text-slate-800 shadow-xl border-t-4"
      style={{
        borderColor: primaryColor,
        fontFamily: formatting?.fontFamily || "'Lexend', sans-serif",
        fontSize: formatting?.fontSize || '13.5px',
        lineHeight: formatting?.lineHeight || '1.45'
      }}
    >
      {/* Tech Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-4 mb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>
          </div>
          {personalInfo.jobTitle && (
            <p className="text-sm font-semibold tracking-wide mt-0.5" style={{ color: primaryColor }}>
              {personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Contact Links in Monospace badge style */}
        <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs text-slate-600 mt-3 sm:mt-0">
          <div className="flex items-center gap-3 flex-wrap">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          <div className="flex items-center gap-3 flex-wrap text-slate-700 font-medium">
            {personalInfo.github && <span className="text-indigo-600">{personalInfo.github}</span>}
            {personalInfo.linkedin && <span className="text-indigo-600">{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-4 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {/* Technical Skills Inventory */}
      {skills && skills.length > 0 && (
        <section className="mb-5 break-inside-avoid bg-slate-50 p-3 rounded border border-slate-200">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" style={{ color: primaryColor }} />
            Technical & Domain Competencies
          </h2>
          <div className="space-y-1.5 text-xs">
            {Object.entries(skillCategories).map(([cat, list]) => (
              <div key={cat} className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-semibold text-slate-700 w-28 shrink-0">{cat}:</span>
                <span className="text-slate-800">
                  {list.map(s => s.name || s).join(' · ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-5 break-inside-avoid">
          <h2 
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
            style={{ color: primaryColor, borderColor: primaryColor }}
          >
            Engineering Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{exp.title}</span>
                    <span className="text-slate-700 font-medium"> | {exp.company}</span>
                    {exp.location && <span className="text-xs text-slate-500"> ({exp.location})</span>}
                  </div>
                  <span className="text-xs font-mono text-slate-500 whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-xs">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5 break-inside-avoid">
          <h2 
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2"
            style={{ color: primaryColor, borderColor: primaryColor }}
          >
            Open Source & Key Systems
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    {proj.role && <span className="text-slate-500 font-mono text-[11px]">{proj.role}</span>}
                    {proj.link && (
                      <span className="text-indigo-600 font-mono text-[11px] underline">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.date && <span className="text-slate-500 font-mono text-[11px]">{proj.date}</span>}
                </div>
                {proj.description && (
                  <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 break-inside-avoid pt-1">
        {education && education.length > 0 && (
          <div>
            <h2 
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Education
            </h2>
            <div className="space-y-1 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.institution} {edu.graduationDate && `(${edu.graduationDate})`}</div>
                  {(edu.gpa || edu.honors) && (
                    <div className="text-slate-500 italic text-[11px]">
                      {[edu.gpa ? `GPA: ${edu.gpa}` : '', edu.honors].filter(Boolean).join(' | ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Certifications
            </h2>
            <ul className="space-y-1 text-xs text-slate-700">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex justify-between">
                  <span className="font-medium text-slate-800">{cert.name}</span>
                  {cert.date && <span className="text-slate-500 font-mono text-[11px]">{cert.date}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
