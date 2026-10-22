import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PersonalInfoEditor from './components/editor/PersonalInfoEditor';
import SummaryEditor from './components/editor/SummaryEditor';
import ExperienceEditor from './components/editor/ExperienceEditor';
import SkillsEditor from './components/editor/SkillsEditor';
import EducationEditor from './components/editor/EducationEditor';
import ProjectsEditor from './components/editor/ProjectsEditor';
import CertificationsEditor from './components/editor/CertificationsEditor';
import LanguagesEditor from './components/editor/LanguagesEditor';
import ResumePreview from './components/ResumePreview';
import DesignPanel from './components/DesignPanel';
import AtsModal from './components/AtsModal';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import { COLOR_PALETTES } from './data/templateThemes';
import { calculateAtsScore } from './utils/atsChecker';

const STORAGE_KEY = 'resume_doc_builder_state_v1';

export default function App() {
  // Load saved state or default to sample
  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SAMPLE_RESUMES.software_engineer;
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedTheme, setSelectedTheme] = useState(COLOR_PALETTES[0]); // Slate Navy (T15 from REA)
  const [formatting, setFormatting] = useState({
    fontFamily: "'Lexend', sans-serif",
    fontSize: '14px',
    lineHeight: '1.5'
  });

  const [activeView, setActiveView] = useState('split'); // 'split' | 'preview' | 'design'
  const [showAtsModal, setShowAtsModal] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
    } catch (e) {}
  }, [resume]);

  const atsAnalysis = calculateAtsScore(resume);
  const atsScore = atsAnalysis.score;

  const handleAddSkillFromAts = (skillName) => {
    if (!skillName || !skillName.trim()) return;
    const clean = skillName.trim();
    if (!resume.skills.some(s => (s.name || s).toLowerCase() === clean.toLowerCase())) {
      setResume({
        ...resume,
        skills: [...resume.skills, { name: clean, category: 'General', level: 'Advanced' }]
      });
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset resume to empty template?')) {
      setResume({
        id: 'custom',
        name: 'My Resume',
        personalInfo: {
          fullName: '',
          jobTitle: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
          summary: ''
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Header & Navigation */}
      <Header
        resume={resume}
        setResume={setResume}
        activeView={activeView}
        setActiveView={setActiveView}
        atsScore={atsScore}
        onOpenAtsModal={() => setShowAtsModal(true)}
        theme={selectedTheme}
        onReset={handleReset}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeView === 'design' && (
          <div className="animate-in fade-in duration-200">
            <DesignPanel
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              formatting={formatting}
              setFormatting={setFormatting}
            />
          </div>
        )}

        {activeView === 'preview' && (
          <div className="h-[calc(100vh-6rem)] animate-in fade-in duration-200">
            <ResumePreview
              resume={resume}
              selectedTemplate={selectedTemplate}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              formatting={formatting}
              isFullView={true}
            />
          </div>
        )}

        {activeView === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Comprehensive Interactive Editor */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4 no-print pb-20">
              <PersonalInfoEditor
                personalInfo={resume.personalInfo}
                onChange={(pInfo) => setResume({ ...resume, personalInfo: pInfo })}
              />

              <SummaryEditor
                summary={resume.personalInfo.summary}
                jobTitle={resume.personalInfo.jobTitle}
                onChange={(sum) => setResume({
                  ...resume,
                  personalInfo: { ...resume.personalInfo, summary: sum }
                })}
              />

              <ExperienceEditor
                experience={resume.experience}
                onChange={(exp) => setResume({ ...resume, experience: exp })}
              />

              <SkillsEditor
                skills={resume.skills}
                onChange={(sk) => setResume({ ...resume, skills: sk })}
              />

              <EducationEditor
                education={resume.education}
                onChange={(edu) => setResume({ ...resume, education: edu })}
              />

              <ProjectsEditor
                projects={resume.projects}
                onChange={(proj) => setResume({ ...resume, projects: proj })}
              />

              <CertificationsEditor
                certifications={resume.certifications}
                onChange={(cert) => setResume({ ...resume, certifications: cert })}
              />

              <LanguagesEditor
                languages={resume.languages}
                onChange={(lang) => setResume({ ...resume, languages: lang })}
              />
            </div>

            {/* Right Column: Sticky Live Resume Preview */}
            <div className="lg:col-span-6 xl:col-span-7 lg:sticky lg:top-20 h-[calc(100vh-6rem)]">
              <ResumePreview
                resume={resume}
                selectedTemplate={selectedTemplate}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                formatting={formatting}
                isFullView={false}
              />
            </div>
          </div>
        )}
      </main>

      {/* ATS Audit & Job Description Matcher Modal */}
      {showAtsModal && (
        <AtsModal
          resume={resume}
          onAddSkill={handleAddSkillFromAts}
          onClose={() => setShowAtsModal(false)}
        />
      )}
    </div>
  );
}
