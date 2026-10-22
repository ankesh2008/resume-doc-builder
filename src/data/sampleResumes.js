export const SAMPLE_RESUMES = {
  software_engineer: {
    id: 'software_engineer',
    name: 'Software Engineer',
    personalInfo: {
      fullName: 'Alex Morgan',
      jobTitle: 'Senior Full-Stack & Cloud Engineer',
      email: 'alex.morgan.dev@gmail.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      website: 'https://alexmorgan.dev',
      linkedin: 'linkedin.com/in/alexmorgandev',
      github: 'github.com/alexmorgandev',
      summary: 'Results-driven Senior Full-Stack Engineer with 7+ years of experience designing scalable microservices, real-time distributed systems, and responsive web applications. Proven track record of reducing latency by 42% and driving 99.99% uptime across Kubernetes clusters. Passionate about developer tooling, modern React architectures, and cloud-native AI integration.'
    },
    experience: [
      {
        id: 'exp-1',
        title: 'Lead Software Engineer',
        company: 'Veloce Cloud Solutions',
        location: 'San Francisco, CA',
        startDate: '2022-03',
        endDate: '',
        current: true,
        bullets: [
          'Architected and led the development of a high-throughput event processing pipeline handling 120M+ daily events using Node.js, Kafka, and Redis.',
          'Spearheaded the migration of monolithic frontend services to modern Next.js/React architecture, improving Core Web Vitals score from 58 to 96.',
          'Mentored a high-performing team of 8 engineers, instituting rigorous automated CI/CD testing with GitHub Actions and cutting deployment cycle times by 55%.',
          'Reduced AWS cloud compute expenses by $180,000 annually through intelligent container auto-scaling and spot instance orchestration.'
        ]
      },
      {
        id: 'exp-2',
        title: 'Senior Frontend Engineer',
        company: 'Apex Data Labs',
        location: 'San Jose, CA',
        startDate: '2019-06',
        endDate: '2022-02',
        current: false,
        bullets: [
          'Engineered real-time data visualization dashboards using React, TypeScript, and D3.js utilized by over 45,000 enterprise analysts.',
          'Implemented end-to-end type safety across GraphQL endpoints and Apollo Client, reducing production runtime errors by 34%.',
          'Collaborated closely with Product and UX teams to build an accessible, WCAG 2.1 AA compliant design system adopted company-wide.'
        ]
      },
      {
        id: 'exp-3',
        title: 'Full-Stack Developer',
        company: 'Nexis Interactive',
        location: 'Austin, TX',
        startDate: '2017-08',
        endDate: '2019-05',
        current: false,
        bullets: [
          'Developed RESTful microservices with Express.js and PostgreSQL, achieving sub-40ms response times for core user authentication flows.',
          'Built responsive customer-facing web apps with React and Redux, boosting mobile conversion rates by 28%.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        graduationDate: '2017',
        gpa: '3.85 / 4.0',
        honors: 'Dean’s Honors List, Magna Cum Laude'
      }
    ],
    skills: [
      { name: 'TypeScript / JavaScript', category: 'Languages', level: 'Expert' },
      { name: 'React / Next.js', category: 'Frontend', level: 'Expert' },
      { name: 'Node.js / Express', category: 'Backend', level: 'Expert' },
      { name: 'Python', category: 'Languages', level: 'Advanced' },
      { name: 'GraphQL & REST APIs', category: 'Backend', level: 'Advanced' },
      { name: 'PostgreSQL & Redis', category: 'Databases', level: 'Advanced' },
      { name: 'Docker & Kubernetes', category: 'DevOps / Cloud', level: 'Advanced' },
      { name: 'AWS (ECS, Lambda, S3)', category: 'DevOps / Cloud', level: 'Advanced' },
      { name: 'Tailwind CSS', category: 'Frontend', level: 'Expert' },
      { name: 'CI/CD & GitHub Actions', category: 'DevOps / Cloud', level: 'Advanced' }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'StreamSync Distributed Cache',
        role: 'Creator & Maintainer',
        link: 'https://github.com/alexmorgandev/streamsync',
        date: '2023',
        description: 'Open-source distributed in-memory cache written in Go with consistent hashing and raft consensus; featured on Hacker News with 1,200+ GitHub stars.'
      },
      {
        id: 'proj-2',
        name: 'OmniDoc AI Assistant',
        role: 'Full-Stack Engineer',
        link: 'https://github.com/alexmorgandev/omnidoc',
        date: '2024',
        description: 'Real-time document analysis tool leveraging local embeddings and LLM streaming responses with zero external data leaks.'
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect – Professional',
        issuer: 'Amazon Web Services',
        date: '2023',
        credentialUrl: 'https://aws.amazon.com'
      },
      {
        id: 'cert-2',
        name: 'Certified Kubernetes Administrator (CKA)',
        issuer: 'Cloud Native Computing Foundation',
        date: '2022',
        credentialUrl: 'https://cncf.io'
      }
    ],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'Spanish', proficiency: 'Professional Working' }
    ],
    customSections: []
  },

  product_manager: {
    id: 'product_manager',
    name: 'Product Manager',
    personalInfo: {
      fullName: 'Sarah Jenkins',
      jobTitle: 'Principal Product Manager',
      email: 'sarah.jenkins.pm@outlook.com',
      phone: '+1 (555) 890-1234',
      location: 'New York, NY',
      website: 'https://sarahjenkins.co',
      linkedin: 'linkedin.com/in/sarahjenkins-pm',
      github: '',
      summary: 'Strategic Principal Product Manager with 8+ years leading cross-functional teams from ideation to scale across B2B SaaS and enterprise marketplaces. Expert in discovery, quantitative user analytics, roadmapping, and driving double-digit ARR growth. Successfully launched 4 zero-to-one products resulting in $32M+ cumulative recurring revenue.'
    },
    experience: [
      {
        id: 'exp-1',
        title: 'Principal Product Manager',
        company: 'Klarity Enterprise Tech',
        location: 'New York, NY',
        startDate: '2021-08',
        endDate: '',
        current: true,
        bullets: [
          'Defined vision, OKRs, and multi-year product strategy for core SaaS analytics suite serving Fortune 500 customers, driving 46% YoY ARR expansion.',
          'Spearheaded AI-powered predictive reporting feature that increased monthly active user retention from 71% to 89%.',
          'Conducted 100+ deep customer discovery interviews and synthesized qualitative feedback into prioritized backlog iterations with engineering leads.'
        ]
      },
      {
        id: 'exp-2',
        title: 'Senior Product Manager',
        company: 'Elevate Commerce',
        location: 'Boston, MA',
        startDate: '2018-04',
        endDate: '2021-07',
        current: false,
        bullets: [
          'Managed checkout & payments funnel team of 14 designers, engineers, and data scientists, increasing payment conversion by 14.8%.',
          'Ran 65+ rigorous A/B experiments evaluating user checkout friction, localized payment methods, and trust badges.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Master of Business Administration (MBA)',
        institution: 'Columbia Business School',
        location: 'New York, NY',
        graduationDate: '2018',
        gpa: '3.9 / 4.0',
        honors: 'Beta Gamma Sigma Honors'
      },
      {
        id: 'edu-2',
        degree: 'B.S. in Economics & Information Systems',
        institution: 'Boston College',
        location: 'Chestnut Hill, MA',
        graduationDate: '2015',
        gpa: '3.8 / 4.0',
        honors: ''
      }
    ],
    skills: [
      { name: 'Product Strategy & Roadmapping', category: 'Product', level: 'Expert' },
      { name: 'Quantitative & Qualitative Discovery', category: 'Research', level: 'Expert' },
      { name: 'A/B Testing & Experimentation', category: 'Analytics', level: 'Expert' },
      { name: 'Amplitude, Mixpanel & SQL', category: 'Analytics', level: 'Advanced' },
      { name: 'Figma & Wireframing', category: 'Design', level: 'Advanced' },
      { name: 'Agile / Scrum Leadership', category: 'Methodology', level: 'Expert' },
      { name: 'Go-To-Market (GTM) Alignment', category: 'Business', level: 'Expert' }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'Enterprise Self-Serve Onboarding Flow',
        role: 'Product Lead',
        link: 'https://sarahjenkins.co/case-studies/onboarding',
        date: '2023',
        description: 'Redesigned time-to-first-value onboarding journey, reducing enterprise onboarding friction from 14 days down to 48 hours.'
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'Pragmatic Institute Certified (PMC-III)',
        issuer: 'Pragmatic Institute',
        date: '2020',
        credentialUrl: ''
      }
    ],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'French', proficiency: 'Conversational' }
    ],
    customSections: []
  },

  data_scientist: {
    id: 'data_scientist',
    name: 'Data Scientist & AI Specialist',
    personalInfo: {
      fullName: 'Dr. Marcus Vance',
      jobTitle: 'Lead Machine Learning & Data Scientist',
      email: 'marcus.vance.ai@gmail.com',
      phone: '+1 (555) 765-4321',
      location: 'Seattle, WA',
      website: 'https://marcusvance.ai',
      linkedin: 'linkedin.com/in/marcusvance-ai',
      github: 'github.com/marcusvance',
      summary: 'Senior Machine Learning Scientist and quantitative researcher with PhD and 6+ years deploying high-impact LLM pipelines, recommendation engines, and neural network models at scale. Published author in NeurIPS & ICML with expertise in PyTorch, Transformer fine-tuning, and low-latency inference pipelines.'
    },
    experience: [
      {
        id: 'exp-1',
        title: 'Lead AI & Machine Learning Scientist',
        company: 'Synthetix Dynamics',
        location: 'Seattle, WA',
        startDate: '2022-01',
        endDate: '',
        current: true,
        bullets: [
          'Spearheaded the development and fine-tuning of domain-specific LLMs (Llama-3 & Mistral) reducing vendor API expenses by 68% while boosting retrieval accuracy by 22%.',
          'Constructed hybrid semantic search system combining Vector DBs (Milvus) with BM25 rerankers for 30M+ technical documentation records.',
          'Engineered model quantization (FP8, INT4) and TensorRT deployment pipeline delivering 3.8x faster token generation at 99.8% precision retention.'
        ]
      },
      {
        id: 'exp-2',
        title: 'Senior Data Scientist',
        company: 'Beacon Insights Group',
        location: 'Redmond, WA',
        startDate: '2019-09',
        endDate: '2021-12',
        current: false,
        bullets: [
          'Built customer churn predictive model utilizing XGBoost and LightGBM across 2.4M subscriber accounts, identifying $12M in at-risk revenue annually.',
          'Designed automated anomaly detection alerting system monitoring 400+ real-time telemetry pipelines.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Ph.D. in Computer Science (Machine Learning Focus)',
        institution: 'University of Washington',
        location: 'Seattle, WA',
        graduationDate: '2019',
        gpa: '3.95 / 4.0',
        honors: 'National Science Foundation Graduate Research Fellow'
      }
    ],
    skills: [
      { name: 'Python (PyTorch, TensorFlow)', category: 'ML/AI', level: 'Expert' },
      { name: 'Transformers & LLM Fine-Tuning', category: 'ML/AI', level: 'Expert' },
      { name: 'Vector DBs (Pinecone, Milvus)', category: 'Databases', level: 'Advanced' },
      { name: 'SQL & Data Warehousing (Snowflake)', category: 'Data', level: 'Expert' },
      { name: 'MLOps (Kubeflow, MLflow, Docker)', category: 'DevOps', level: 'Advanced' },
      { name: 'Statistics & Experimentation', category: 'Math', level: 'Expert' }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'FastRAG – High Speed Retrieval Augmented Generation',
        role: 'Author & Lead',
        link: 'https://github.com/marcusvance/fastrag',
        date: '2024',
        description: 'Blazing fast C++/Python hybrid library for RAG indexing with under 5ms latency on standard CPU hardware.'
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'Google Cloud Professional Machine Learning Engineer',
        issuer: 'Google Cloud',
        date: '2023',
        credentialUrl: ''
      }
    ],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'German', proficiency: 'Bilingual' }
    ],
    customSections: []
  }
};
