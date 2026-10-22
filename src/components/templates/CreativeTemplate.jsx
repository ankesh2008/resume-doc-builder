import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';

export default function CreativeTemplate({ resume, theme, formatting }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = resume;
  const primaryColor = theme?.primary || '#001950';

  return (
    <div 
      className="resume-paper bg-white text-slate-800 shadow-xl flex flex-col md:flex-row min-h-[1050px]"
      style={{
        fontFamily: formatting?.fontFamily || "'Lexend', sans-serif",
        fontSize: formatting?.fontSize || '13.5px',
        lineHeight: formatting?.lineHeight || '1.45'
      }}
    >
      {/* Left Sidebar */}
      <aside 
        className="w-full md:w-1/3 p-6 sm:p-8 text-white space-y-6 shrink-0"
        style={{ backgroundColor: primaryColor }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-xs sm:text-sm font-medium text-slate-200 tracking-wide uppercase">
              {personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-2.5 text-xs text-slate-100 border-t border-white/20 pt-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            Contact
          </h2>
          {personalInfo.email && (
            <div className="flex items-start gap-2 break-all">
              <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-80" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-start gap-2 break-all">
              <Linkedin className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-80" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-start gap-2 break-all">
              <Github className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-80" />
              <span>{personalInfo.github}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-start gap-2 break-all">
              <Globe className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-80" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="border-t border-white/20 pt-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="bg-white/15 px-2 py-0.5 rounded text-[11px] font-medium text-white"
                >
                  {skill.name || skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education in Sidebar */}
        {education && education.length > 0 && (
          <div className="border-t border-white/20 pt-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
              Education
            </h2>
            <div className="space-y-3 text-xs text-slate-100">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-semibold text-white">{edu.degree}</div>
                  <div className="text-slate-200 opacity-90">{edu.institution}</div>
                  <div className="text-[11px] text-slate-300">{edu.graduationDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages in Sidebar */}
        {languages && languages.length > 0 && (
          <div className="border-t border-white/20 pt-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
              Languages
            </h2>
            <div className="space-y-1 text-xs text-slate-100">
              {languages.map((l, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{l.language}</span>
                  <span className="text-slate-300 text-[11px]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Content Area */}
      <main className="w-full md:w-2/3 p-6 sm:p-10 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Profile
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-3 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{exp.title}</span>
                      <span className="text-slate-600 font-medium"> · {exp.company}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
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
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Key Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    {proj.date && <span className="text-slate-500 text-[11px]">{proj.date}</span>}
                  </div>
                  {proj.description && (
                    <p className="text-slate-700 mt-0.5 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Certifications
            </h2>
            <ul className="space-y-1 text-xs text-slate-700">
              {certifications.map((c) => (
                <li key={c.id} className="flex justify-between">
                  <span className="font-medium text-slate-900">{c.name}</span>
                  <span className="text-slate-500">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
