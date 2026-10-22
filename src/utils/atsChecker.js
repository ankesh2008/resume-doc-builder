const COMMON_STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot',
  'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
  'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i',
  'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
  'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
  'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while',
  'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll',
  'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves', 'will', 'with', 'work', 'job', 'role', 'team',
  'experience', 'years', 'looking', 'join', 'must', 'have', 'skills', 'responsibilities', 'requirements'
]);

export function calculateAtsScore(resume, jobDescription = '') {
  let score = 0;
  const checklist = [];

  // 1. Personal Information Completeness (max 20 pts)
  let contactScore = 0;
  if (resume.personalInfo.fullName?.trim()) contactScore += 5;
  if (resume.personalInfo.email?.includes('@')) contactScore += 5;
  if (resume.personalInfo.phone?.trim()) contactScore += 4;
  if (resume.personalInfo.location?.trim()) contactScore += 3;
  if (resume.personalInfo.linkedin?.trim() || resume.personalInfo.website?.trim() || resume.personalInfo.github?.trim()) contactScore += 3;

  score += contactScore;
  checklist.push({
    title: 'Contact Information',
    status: contactScore >= 18 ? 'pass' : contactScore >= 12 ? 'warning' : 'fail',
    detail: contactScore >= 18 ? 'Complete contact details provided.' : 'Missing essential contact info (e.g., location, LinkedIn, or phone).'
  });

  // 2. Professional Summary (max 15 pts)
  const summary = resume.personalInfo.summary || '';
  const summaryWordCount = summary.trim().split(/\s+/).filter(Boolean).length;
  let summaryScore = 0;
  if (summaryWordCount >= 30 && summaryWordCount <= 120) {
    summaryScore = 15;
    checklist.push({
      title: 'Professional Summary',
      status: 'pass',
      detail: `Optimal summary length (${summaryWordCount} words) for ATS & recruiters.`
    });
  } else if (summaryWordCount > 0) {
    summaryScore = 8;
    checklist.push({
      title: 'Professional Summary',
      status: 'warning',
      detail: summaryWordCount < 30 ? 'Summary is a bit short. Aim for 40-80 words.' : 'Summary is quite long. Consider condensing.'
    });
  } else {
    checklist.push({
      title: 'Professional Summary',
      status: 'fail',
      detail: 'Add a 3-4 sentence professional summary highlighting your key achievements.'
    });
  }
  score += summaryScore;

  // 3. Work Experience & Quantifiable Bullets (max 30 pts)
  const exp = resume.experience || [];
  let expScore = 0;
  let totalBullets = 0;
  let metricBullets = 0;
  let strongVerbBullets = 0;

  exp.forEach(e => {
    (e.bullets || []).forEach(b => {
      totalBullets++;
      if (/\d+|%|\$|k|m/i.test(b)) metricBullets++;
      const firstWord = b.trim().split(' ')[0] || '';
      if (/^[A-Z][a-z]+ed$/.test(firstWord) || ['Built', 'Led', 'Won', 'Ran', 'Grew'].includes(firstWord)) {
        strongVerbBullets++;
      }
    });
  });

  if (exp.length >= 1) expScore += 10;
  if (totalBullets >= 4) expScore += 5;
  if (metricBullets >= 2) expScore += 8;
  if (strongVerbBullets >= 3) expScore += 7;

  score += expScore;
  checklist.push({
    title: 'Work Experience & Action Bullets',
    status: expScore >= 25 ? 'pass' : expScore >= 15 ? 'warning' : 'fail',
    detail: `${metricBullets} of ${totalBullets} bullets feature measurable metrics (%, $, numbers). Aim for at least 50%.`
  });

  // 4. Skills Section (max 20 pts)
  const skillsCount = (resume.skills || []).length;
  let skillsScore = 0;
  if (skillsCount >= 8) {
    skillsScore = 20;
    checklist.push({
      title: 'Skills Keyword Density',
      status: 'pass',
      detail: `Great keyword coverage with ${skillsCount} relevant skills.`
    });
  } else if (skillsCount >= 4) {
    skillsScore = 12;
    checklist.push({
      title: 'Skills Keyword Density',
      status: 'warning',
      detail: `Only ${skillsCount} skills listed. Adding 8-12 targeted skills improves match rates.`
    });
  } else {
    checklist.push({
      title: 'Skills Keyword Density',
      status: 'fail',
      detail: 'Add at least 6-8 core technical and domain skills.'
    });
  }
  score += skillsScore;

  // 5. Education & Credentials (max 15 pts)
  const eduCount = (resume.education || []).length;
  const certCount = (resume.certifications || []).length;
  let eduScore = 0;
  if (eduCount >= 1) eduScore += 10;
  if (certCount >= 1) eduScore += 5;

  score += eduScore;
  checklist.push({
    title: 'Education & Certifications',
    status: eduScore >= 10 ? 'pass' : 'warning',
    detail: eduCount >= 1 ? `Degree and ${certCount} certifications listed.` : 'Add your educational background.'
  });

  // 6. Target Job Description Keyword Analysis
  let keywordAnalysis = null;
  if (jobDescription && jobDescription.trim().length > 30) {
    keywordAnalysis = analyzeJobDescriptionMatch(resume, jobDescription);
    // Weigh in job match
    const matchBonus = Math.round((keywordAnalysis.matchPercentage / 100) * 15);
    score = Math.min(100, Math.round(score * 0.85 + matchBonus));
  } else {
    score = Math.min(100, score);
  }

  return {
    score,
    checklist,
    keywordAnalysis
  };
}

export function analyzeJobDescriptionMatch(resume, jobDescription) {
  // Extract words from job description
  const jdTokens = jobDescription
    .toLowerCase()
    .replace(/[^a-z0-9#+.]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !COMMON_STOPWORDS.has(w));

  // Count frequencies
  const freq = {};
  jdTokens.forEach(t => {
    freq[t] = (freq[t] || 0) + 1;
  });

  // Get top 25 keywords from JD
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([word]) => word);

  // Resume full text
  const resumeText = JSON.stringify(resume).toLowerCase();

  const matched = [];
  const missing = [];

  topKeywords.forEach(kw => {
    if (resumeText.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const matchPercentage = topKeywords.length > 0 
    ? Math.round((matched.length / topKeywords.length) * 100) 
    : 0;

  return {
    matchPercentage,
    matchedKeywords: matched,
    missingKeywords: missing,
    totalTargetKeywords: topKeywords.length
  };
}
