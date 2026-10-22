import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';

export default function ElegantTemplate({ resume, theme, formatting }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = resume;
  const primaryColor = theme?.primary || '#001950';

  return (
    <div 
      className="resume-paper bg-white p-8 sm:p-12 text-slate-800 shadow-xl"
      style={{
        fontFamily: formatting?.fontFamily || "'Lexend', sans-serif",
        fontSize: formatting?.fontSize || '14px',
        lineHeight: formatting?.lineHeight || '1.5'
      }}
    >
      {/* Elegant Header */}
      <header className="text-center pb-6 mb-6 border-b border-slate-100">
        <h1 
          className="text-3xl sm:text-4xl font-light tracking-wide mb-2"
          style={{ color: primaryColor }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact links */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>·  {personalInfo.phone}</span>}
          {personalInfo.location && <span>·  {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>·  {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>·  {personalInfo.github}</span>}
          {personalInfo.website && <span>·  {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6 break-inside-avoid max-w-2xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
            "{personalInfo.summary}"
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6 break-inside-avoid">
          <h2 
            className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4"
          >
            Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">{exp.title}</span>
                    <span className="text-slate-500 text-xs sm:text-sm">, {exp.company}</span>
                    {exp.location && <span className="text-xs text-slate-400"> — {exp.location}</span>}
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-600 text-xs sm:text-sm">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6 break-inside-avoid">
          <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Core Competencies
          </h2>
          <div className="flex flex-wrap justify-center gap-1.5">
            {skills.map((skill, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded-full text-xs bg-slate-50 text-slate-700 border border-slate-200"
              >
                {skill.name || skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education & Projects in 2 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 break-inside-avoid pt-2">
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-semibold text-slate-800">{edu.degree}</div>
                  <div className="text-slate-500">{edu.institution} {edu.graduationDate && `(${edu.graduationDate})`}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              Certifications
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {certifications.map((c) => (
                <li key={c.id}>
                  <span className="font-medium text-slate-800">{c.name}</span>
                  {c.issuer && <span className="text-slate-400 ml-1">({c.issuer})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
