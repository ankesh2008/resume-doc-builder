import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';

export default function ModernTemplate({ resume, theme, formatting }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = resume;
  const primaryColor = theme?.primary || '#001950';

  return (
    <div 
      className="resume-paper bg-white p-8 sm:p-12 text-slate-800 shadow-xl transition-all duration-200"
      style={{
        fontFamily: formatting?.fontFamily || "'Lexend', sans-serif",
        fontSize: formatting?.fontSize || '14px',
        lineHeight: formatting?.lineHeight || '1.5'
      }}
    >
      {/* Header */}
      <header className="border-b-2 pb-5 mb-6" style={{ borderColor: primaryColor }}>
        <h1 
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-1"
          style={{ color: primaryColor }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-lg font-medium text-slate-600 mb-3 tracking-wide">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact links */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs sm:text-sm text-slate-600">
          {personalInfo.email && (
            <span className="inline-flex items-center gap-1.5 hover:text-slate-900">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="inline-flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="inline-flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.github}
            </span>
          )}
          {personalInfo.website && (
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6 break-inside-avoid">
          <h2 
            className="text-xs font-bold uppercase tracking-wider mb-2"
            style={{ color: primaryColor }}
          >
            Professional Summary
          </h2>
          <p className="text-slate-700 text-justify leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6 break-inside-avoid">
          <h2 
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b border-slate-200"
            style={{ color: primaryColor }}
          >
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                  <div>
                    <span className="font-semibold text-slate-900 text-base">{exp.title}</span>
                    <span className="text-slate-600 font-medium"> · {exp.company}</span>
                    {exp.location && (
                      <span className="text-xs text-slate-500"> ({exp.location})</span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-500 mt-0.5 sm:mt-0 whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-xs sm:text-sm">
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

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6 break-inside-avoid">
          <h2 
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b border-slate-200"
            style={{ color: primaryColor }}
          >
            Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
              >
                {skill.name || skill}
                {skill.level && (
                  <span className="ml-1 text-[10px] text-slate-500">({skill.level})</span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6 break-inside-avoid">
          <h2 
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b border-slate-200"
            style={{ color: primaryColor }}
          >
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="break-inside-avoid">
                <div className="flex items-baseline justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">{proj.name}</span>
                    {proj.role && <span className="text-xs text-slate-500">({proj.role})</span>}
                    {proj.link && (
                      <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs inline-flex items-center gap-0.5 text-indigo-600 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  {proj.date && <span className="text-xs text-slate-500">{proj.date}</span>}
                </div>
                {proj.description && (
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6 break-inside-avoid">
          <h2 
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b border-slate-200"
            style={{ color: primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-slate-900 text-sm">{edu.degree}</span>
                  <span className="text-slate-600 text-xs sm:text-sm"> · {edu.institution}</span>
                  {edu.location && <span className="text-xs text-slate-500"> ({edu.location})</span>}
                  {(edu.gpa || edu.honors) && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {[edu.gpa ? `GPA: ${edu.gpa}` : '', edu.honors].filter(Boolean).join(' | ')}
                    </div>
                  )}
                </div>
                {edu.graduationDate && (
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                    {edu.graduationDate}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 break-inside-avoid">
        {certifications && certifications.length > 0 && (
          <div>
            <h2 
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200"
              style={{ color: primaryColor }}
            >
              Certifications
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex items-start justify-between">
                  <span className="font-medium text-slate-800">{cert.name}</span>
                  {cert.date && <span className="text-slate-500 ml-2 whitespace-nowrap">{cert.date}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <h2 
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200"
              style={{ color: primaryColor }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-2 text-xs text-slate-700">
              {languages.map((lang, idx) => (
                <span key={idx} className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                  <span className="font-medium">{lang.language}</span>
                  {lang.proficiency && <span className="text-slate-500 ml-1">({lang.proficiency})</span>}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
