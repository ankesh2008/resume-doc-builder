export const ACTION_VERBS = {
  Leadership: [
    'Spearheaded', 'Orchestrated', 'Championed', 'Directed', 'Mobilized',
    'Cultivated', 'Mentored', 'Empowered', 'Steered', 'Pioneered'
  ],
  Technical: [
    'Architected', 'Engineered', 'Developed', 'Deployed', 'Refactored',
    'Integrated', 'Automated', 'Configured', 'Optimized', 'Containerized'
  ],
  Impact: [
    'Accelerated', 'Amplified', 'Elevated', 'Generated', 'Maximized',
    'Boosted', 'Outperformed', 'Transformed', 'Yielded', 'Expanded'
  ],
  Optimization: [
    'Streamlined', 'Overhauled', 'Consolidated', 'Standardized', 'Restructured',
    'Mitigated', 'Trimmed', 'Eliminated', 'Automated', 'Revamped'
  ],
  Research: [
    'Analyzed', 'Formulated', 'Synthesized', 'Investigated', 'Evaluated',
    'Discovered', 'Modelled', 'Benchmarked', 'Validated', 'Quantified'
  ]
};

export const ROLE_SKILL_SUGGESTIONS = {
  'Software Engineer': [
    'TypeScript', 'React', 'Node.js', 'Next.js', 'Python', 'Go', 'Docker',
    'Kubernetes', 'AWS', 'GraphQL', 'PostgreSQL', 'Redis', 'CI/CD Pipelines',
    'System Design', 'Microservices', 'Jest/Cypress'
  ],
  'Product Manager': [
    'Product Strategy', 'Roadmapping', 'User Story Mapping', 'A/B Testing',
    'SQL & Data Analysis', 'Customer Discovery', 'Agile / Scrum', 'KPI Tracking',
    'Figma Wireframing', 'Go-To-Market (GTM)', 'Stakeholder Management', 'PRD Authoring'
  ],
  'Data Scientist': [
    'Python', 'PyTorch', 'TensorFlow', 'LLM Fine-Tuning', 'RAG Pipelines',
    'Pandas & NumPy', 'SQL (BigQuery/Snowflake)', 'Scikit-learn', 'Vector Databases',
    'Statistical Modeling', 'MLOps (Kubeflow)', 'Tableau / Looker'
  ],
  'Marketing Director': [
    'Growth Marketing', 'SEO / SEM Strategy', 'Performance Marketing', 'HubSpot',
    'Customer Acquisition Cost (CAC)', 'Brand Strategy', 'Google Analytics 4',
    'Email Funnel Automation', 'Content Strategy', 'Retention Marketing', 'Lifecycle Marketing'
  ],
  'Nurse / Healthcare': [
    'Patient Triage', 'Electronic Health Records (EHR)', 'Epic / Cerner', 'BLS / ACLS Certified',
    'Medication Administration', 'Patient Advocacy', 'Acute Care', 'Infection Control',
    'Vital Signs Monitoring', 'Interdisciplinary Coordination'
  ]
};

export function generateSummaries(jobTitle, experienceLevel = 'Senior', focusKeywords = '') {
  const title = jobTitle || 'Professional';
  const kw = focusKeywords ? `specializing in ${focusKeywords}` : '';

  return [
    {
      tone: 'Executive & Strategic',
      text: `Results-driven ${experienceLevel} ${title} ${kw} with a proven record of leading high-impact initiatives, driving cross-functional alignment, and delivering measurable revenue and operational growth. Recognized for combining strategic vision with hands-on technical execution to consistently exceed organizational benchmarks.`
    },
    {
      tone: 'Results & Metrics-Oriented',
      text: `High-achieving ${title} with extensive experience architecting scalable solutions, optimizing core workflows, and reducing cycle times by over 35%. Leverages data-driven decision making and modern best practices to accelerate delivery while maintaining uncompromising quality and compliance standards.`
    },
    {
      tone: 'Innovation & Growth',
      text: `Forward-thinking and adaptable ${title} ${kw}. Experienced in building zero-to-one solutions and transforming legacy processes into high-performing automated ecosystems. Committed to fostering collaborative team culture, continuous innovation, and high stakeholder satisfaction.`
    }
  ];
}

export function generateBulletSuggestions(jobTitle = '', category = 'Technical') {
  const templates = {
    Technical: [
      'Architected and implemented a high-performance system handling 50k+ daily transactions, reducing average latency by 45%.',
      'Refactored mission-critical legacy modules into modern microservices, increasing test coverage from 42% to 94%.',
      'Automated deployment workflows using modern CI/CD pipelines, cutting production deployment time from 4 hours to 12 minutes.',
      'Designed and deployed cloud infrastructure on AWS utilizing Terraform and Kubernetes, cutting compute costs by $65,000 annually.'
    ],
    Leadership: [
      'Spearheaded a cross-functional team of 10+ engineers and designers to deliver core product features 3 weeks ahead of schedule.',
      'Mentored 6 junior and mid-level colleagues, conducting structured code reviews and bi-weekly architecture design workshops.',
      'Orchestrated strategic quarterly OKR planning aligning technical roadmaps with executive commercial objectives.',
      'Championed the adoption of agile scrum rituals and documentation standards, boosting sprint velocity by 28%.'
    ],
    Optimization: [
      'Streamlined database indexing and query execution, eliminating critical performance bottlenecks and reducing CPU load by 38%.',
      'Consolidated 4 disparate internal software tools into a unified portal, saving teams an estimated 150 hours per month.',
      'Eliminated manual reconciliation processes through Python automated scripts, decreasing data entry error rates to near zero.'
    ],
    Impact: [
      'Boosted core funnel conversion rate by 18.5% through data-informed A/B testing and interactive UX enhancements.',
      'Generated $1.2M in net-new annual recurring revenue (ARR) by co-developing enterprise customer tier features.',
      'Accelerated onboarding efficiency, reducing customer time-to-first-value from 14 days down to 48 hours.'
    ]
  };

  return templates[category] || templates.Technical;
}

export function enhanceBulletPoint(bulletText) {
  if (!bulletText || bulletText.trim().length === 0) {
    return 'Spearheaded strategic project delivery, improving operational efficiency by 30% through process automation.';
  }

  const clean = bulletText.trim();
  // If doesn't start with strong verb, pick an action verb
  const firstWord = clean.split(' ')[0];
  const allVerbs = Object.values(ACTION_VERBS).flat();
  const startsWithVerb = allVerbs.some(v => v.toLowerCase() === firstWord.toLowerCase());

  let enhanced = clean;
  if (!startsWithVerb) {
    enhanced = `Spearheaded ${clean.charAt(0).toLowerCase() + clean.slice(1)}`;
  }

  // If no metrics or numbers, suggest adding quantitative impact
  const hasNumbers = /\d+|%|\$/.test(enhanced);
  if (!hasNumbers) {
    enhanced += ', improving overall operational throughput by 32% and reducing cycle time.';
  }

  return enhanced;
}
