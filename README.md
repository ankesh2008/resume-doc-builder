# ResumeDoc Builder (AI Pro)

A high-performance, ATS-compliant, full-featured online Resume & Document Builder engineered using **REA (Reverse Engineer Anything)** to reverse-engineer and match the core features, design philosophy, and UX patterns of **[ResumeBuilder.com](https://www.resumebuilder.com/)**.

---

## 🔍 REA Evidence & Reverse-Engineering Findings

Through REA CDP browser scenario execution against `https://www.resumebuilder.com/` (Evidence ID: `ev_8b5257867aeab437b9e0168549433443e9c4ccdca535fab9544f83417ffa1043`), we extracted the core UX and application capabilities:

1. **Brand Identity & Typography**:
   - Signature typography: **Lexend** (`Lexend-Regular`, `Lexend-Medium`, `Lexend-Bold`), designed to reduce reading strain and maximize readability across screen and ATS parsers.
   - Primary color schemes extracted from query parameters (`theme` and `skin`):
     - Slate Navy (`#001950` - Skin T15)
     - Olive Forest Green (`#618553` - Skin T16)
     - Crimson Wine (`#6b0000` - Skin T19)
     - Royal Violet (`#543477` - Skin T11)
     - Rose Quartz (`#c34c8c` - Skin T3v1)
2. **Schema & Feature Set**:
   - Software application metadata revealed 15 core features including:
     - **AI Resume Writer & Editor**
     - **Real-time ATS Resume Checker & Scoring**
     - **Job Description Keyword Matching & Optimization**
     - **ATS-Friendly and Modern Designer Templates**
     - **Resume Bullet Point & Summary Generators**
     - **Multi-Format Export**: PDF, Microsoft Word (.docx), and plain text (.txt).

---

## ✨ Key Features Implemented

### 1. Multi-Step & Modular Section Editor
- **Personal Details**: Full Name, Job Title/Headline, Email, Phone, Location, Portfolio, LinkedIn, GitHub.
- **Professional Summary**: Live word count with ATS optimal badge (40-100 words), plus **AI Summary Writer** (tailored to Seniority & Specialization).
- **Work Experience**: Dynamic roles, date ranges ("Currently work here" toggle), collapsible accordion items, bullet management.
- **AI Bullet Enhancer & Suggester**: Automatic conversion of simple bullets into quantifiable achievements with power action verbs (`Spearheaded`, `Architected`, `Accelerated`, `Optimized`).
- **Skills & Competencies**: Tag management with level & category, plus **1-Click Role Recommendations** for Software Engineers, Product Managers, Data Scientists, Marketing Leads, and Healthcare.
- **Education, Projects, Certifications & Languages**: Structured fields for degrees, GPAs, project demo links, credentials, and language proficiencies.

### 2. 6 ATS-Optimized Designer Templates
- **Modern Clean**: Clean lines with colored section rules and high visual hierarchy.
- **Executive Slate**: Authoritative dark header banner designed for senior management and executives.
- **Tech & Dense**: Compact high-density layout with categorized technical competencies and git links.
- **Classic Harvard**: Traditional Ivy League serif styling with 100% ATS parseability.
- **Split Sidebar**: Two-column layout with personal contacts and skill pills on the left.
- **Nordic Minimal**: Refined typography with soft borders and minimalist whitespace.

### 3. Real-Time ATS Checker & Job Description Matcher
- **Live Scoring Meter (0-100)**: Evaluates contact completeness, summary length, quantifiable bullet metrics, action verbs, and skill density.
- **Job Description Matcher**: Paste any job description from LinkedIn/Indeed to receive an instant match percentage, a list of matched keywords, and **1-click buttons to insert missing keywords** directly into your skills.
- Celebratory confetti upon reaching 90%+ ATS score!

### 4. Multi-Format Export Engine
- **PDF Export**: Print-ready `@media print` styling calibrated for US Letter and A4 without page breaks splitting headers or bullets.
- **Microsoft Word (.docx)**: Genuine native `.docx` generator with formatted tables, bold runs, bullet lists, and theme colors using the `docx` library.
- **Plain Text (.txt)**: Raw formatted text output ready for pasting into legacy text-only ATS portals.
- **JSON Backup & Restore**: Full resume data export/import.

### 5. Instant Preloaded Sample Profiles
- **Alex Morgan** (Senior Full-Stack & Cloud Engineer)
- **Sarah Jenkins** (Principal Product Manager)
- **Dr. Marcus Vance** (Lead Machine Learning & Data Scientist)

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18

### Running Locally
```bash
cd resume-doc-builder
npm install
npm run dev
```

Open `http://localhost:5173/` in your browser.
