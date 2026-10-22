import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { Linkedin } from '../common/Icons';

export default function ExecutiveTemplate({ resume, theme, formatting }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = resume;
  const primaryColor = theme?.primary || '#001950';

  return (
    <div 
      className="resume-paper bg-white text-slate-800 shadow-xl overflow-hidden"
      style={{
        fontFamily: formatting?.fontFamily || "'Lexend', sans-serif",
        fontSize: formatting?.fontSize || '14px',
        lineHeight: formatting?.lineHeight || '1.5'
      }}
    >
      {/* Executive Header Banner */}
      <header 
        className="p-8 sm:p-10 text-white relative"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 text-white">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-lg font-medium text-slate-200 tracking-wider uppercase text-xs sm:text-sm mb-4">
              {personalInfo.jobTitle}
            </p>
          )}

          {/* Contact pills */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-100">
            {personalInfo.email && (
              <span className="inline-flex items-center gap-1.5 opacity-90">
                <Mail className="w-3.5 h-3.5" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="inline-flex items-center gap-1.5 opacity-90">
                <Phone className="w-3.5 h-3.5" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="inline-flex items-center gap-1.5 opacity-90">
                <MapPin className="w-3.5 h-3.5" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="inline-flex items-center gap-1.5 opacity-90">
                <Linkedin className="w-3.5 h-3.5" />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="inline-flex items-center gap-1.5 opacity-90">
                <Globe className="w-3.5 h-3.5" />
                {personalInfo.website}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="p-8 sm:p-10 space-y-6">
        {/* Executive Summary */}
        {personalInfo.summary && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Executive Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experience && experience.length > 0 && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-3 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Leadership & Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1.5">
                    <div>
                      <span className="font-bold text-slate-900 text-base">{exp.title}</span>
                      <span className="text-slate-700 font-semibold"> · {exp.company}</span>
                      {exp.location && (
                        <span className="text-xs text-slate-500 italic"> ({exp.location})</span>
                      )}
                    </div>
                    <span 
                      className="text-xs font-semibold px-2 py-0.5 rounded mt-1 sm:mt-0 whitespace-nowrap self-start"
                      style={{ backgroundColor: theme?.light || '#eff6ff', color: primaryColor }}
                    >
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-slate-700 text-xs sm:text-sm">
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

        {/* Core Competencies / Skills */}
        {skills && skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-3 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Areas of Expertise
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {skills.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="p-2 rounded border border-slate-200 bg-slate-50/60 flex items-center justify-between"
                >
                  <span className="font-medium text-slate-800">{skill.name || skill}</span>
                  {skill.level && (
                    <span className="text-[10px] text-slate-400 font-mono">{skill.level}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 break-inside-avoid pt-2">
          {education && education.length > 0 && (
            <div>
              <h2 
                className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                Education
              </h2>
              <div className="space-y-2 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution} {edu.graduationDate && `· ${edu.graduationDate}`}</div>
                    {(edu.gpa || edu.honors) && (
                      <div className="text-slate-500 italic mt-0.5">
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
                className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                Certifications & Board
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {certifications.map((cert) => (
                  <li key={cert.id} className="flex justify-between items-baseline">
                    <span className="font-medium text-slate-800">{cert.name}</span>
                    {cert.date && <span className="text-slate-500 text-[11px]">{cert.date}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
