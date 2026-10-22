import React from 'react';

export default function TraditionalTemplate({ resume, theme, formatting }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = resume;

  return (
    <div 
      className="resume-paper bg-white p-8 sm:p-12 text-slate-900 shadow-xl"
      style={{
        fontFamily: formatting?.fontFamily || "'Merriweather', serif",
        fontSize: formatting?.fontSize || '13.5px',
        lineHeight: formatting?.lineHeight || '1.45'
      }}
    >
      {/* Traditional Centered Header */}
      <header className="text-center pb-3 mb-5 border-b border-slate-900">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-slate-700 italic mb-2">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contacts */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-slate-800">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>•  {personalInfo.phone}</span>}
          {personalInfo.email && <span>•  {personalInfo.email}</span>}
          {personalInfo.linkedin && <span>•  {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>•  {personalInfo.website}</span>}
          {personalInfo.github && <span>•  {personalInfo.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-400">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 text-justify leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2.5 border-b border-slate-400">
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-950 text-sm">{exp.company}</span>
                    {exp.location && <span className="text-xs text-slate-700">, {exp.location}</span>}
                  </div>
                  <span className="text-xs italic text-slate-700 whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="italic text-xs font-medium text-slate-800 mb-1">
                  {exp.title}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-800 text-xs">
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

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b border-slate-400">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-950">{edu.institution}</span>
                    {edu.location && <span>, {edu.location}</span>}
                  </div>
                  <span className="text-xs italic text-slate-700">{edu.graduationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="italic">{edu.degree}</span>
                  {(edu.gpa || edu.honors) && (
                    <span className="text-slate-600">
                      {[edu.gpa ? `GPA: ${edu.gpa}` : '', edu.honors].filter(Boolean).join(' | ')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-400">
            Skills & Competencies
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed">
            <span className="font-semibold">Core Proficiencies: </span>
            {skills.map(s => s.name || s).join(', ')}
          </p>
        </section>
      )}

      {/* Certifications & Additional */}
      {certifications && certifications.length > 0 && (
        <section className="mb-4 break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-400">
            Certifications & Affiliations
          </h2>
          <ul className="list-disc list-outside ml-4 text-xs space-y-1 text-slate-800">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <span className="font-semibold">{cert.name}</span>
                {cert.issuer && ` — ${cert.issuer}`}
                {cert.date && ` (${cert.date})`}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
