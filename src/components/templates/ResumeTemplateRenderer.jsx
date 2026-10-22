import React from 'react';
import ModernTemplate from './ModernTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import TechTemplate from './TechTemplate';
import TraditionalTemplate from './TraditionalTemplate';
import CreativeTemplate from './CreativeTemplate';
import ElegantTemplate from './ElegantTemplate';

export default function ResumeTemplateRenderer({ templateId, resume, theme, formatting }) {
  const renderTemplate = () => {
    switch (templateId) {
      case 'executive':
        return <ExecutiveTemplate resume={resume} theme={theme} formatting={formatting} />;
      case 'tech':
        return <TechTemplate resume={resume} theme={theme} formatting={formatting} />;
      case 'traditional':
        return <TraditionalTemplate resume={resume} theme={theme} formatting={formatting} />;
      case 'creative':
        return <CreativeTemplate resume={resume} theme={theme} formatting={formatting} />;
      case 'elegant':
        return <ElegantTemplate resume={resume} theme={theme} formatting={formatting} />;
      case 'modern':
      default:
        return <ModernTemplate resume={resume} theme={theme} formatting={formatting} />;
    }
  };

  return (
    <div id="resume-document" className="w-full bg-white">
      {renderTemplate()}
    </div>
  );
}
