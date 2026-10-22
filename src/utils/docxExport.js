import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';

export async function exportToDocx(resume, themeColor = '#001950') {
  const pInfo = resume.personalInfo || {};
  const expList = resume.experience || [];
  const eduList = resume.education || [];
  const skillsList = resume.skills || [];
  const projList = resume.projects || [];
  const certList = resume.certifications || [];

  // Convert hex to docx color (without #)
  const hexColor = themeColor.replace('#', '');

  const children = [];

  // 1. Header (Name, Title, Contacts)
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: pInfo.fullName || 'Your Name',
          bold: true,
          size: 36, // 18pt
          color: hexColor,
          font: 'Arial'
        })
      ]
    })
  );

  if (pInfo.jobTitle) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: pInfo.jobTitle,
            size: 24, // 12pt
            italics: true,
            color: '4B5563',
            font: 'Arial'
          })
        ]
      })
    );
  }

  // Contact line
  const contacts = [
    pInfo.email,
    pInfo.phone,
    pInfo.location,
    pInfo.linkedin,
    pInfo.website,
    pInfo.github
  ].filter(Boolean);

  if (contacts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 280 },
        children: [
          new TextRun({
            text: contacts.join('  |  '),
            size: 18, // 9pt
            color: '6B7280',
            font: 'Arial'
          })
        ]
      })
    );
  }

  // Helper for Section Heading
  const addSectionHeading = (title) => {
    children.push(
      new Paragraph({
        spacing: { before: 240, after: 120 },
        border: {
          bottom: {
            color: hexColor,
            space: 4,
            style: BorderStyle.SINGLE,
            size: 12
          }
        },
        children: [
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: 22,
            color: hexColor,
            font: 'Arial'
          })
        ]
      })
    );
  };

  // 2. Summary
  if (pInfo.summary) {
    addSectionHeading('Professional Summary');
    children.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: pInfo.summary,
            size: 20,
            font: 'Arial'
          })
        ]
      })
    );
  }

  // 3. Experience
  if (expList.length > 0) {
    addSectionHeading('Work Experience');
    expList.forEach((exp) => {
      // Role & Dates line
      children.push(
        new Paragraph({
          spacing: { before: 140, after: 40 },
          children: [
            new TextRun({
              text: exp.title || '',
              bold: true,
              size: 22,
              font: 'Arial'
            }),
            new TextRun({
              text: `  |  ${exp.company || ''}`,
              bold: false,
              size: 20,
              color: '374151',
              font: 'Arial'
            }),
            new TextRun({
              text: ` (${exp.location || ''})`,
              italics: true,
              size: 18,
              color: '6B7280',
              font: 'Arial'
            }),
            new TextRun({
              text: `  [${exp.startDate || ''} – ${exp.current ? 'Present' : exp.endDate || ''}]`,
              italics: true,
              size: 18,
              color: hexColor,
              font: 'Arial'
            })
          ]
        })
      );

      // Bullets
      (exp.bullets || []).forEach((bullet) => {
        if (bullet && bullet.trim()) {
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: bullet,
                  size: 20,
                  font: 'Arial'
                })
              ]
            })
          );
        }
      });
    });
  }

  // 4. Skills
  if (skillsList.length > 0) {
    addSectionHeading('Skills & Competencies');
    const skillNames = skillsList.map(s => s.name || s).filter(Boolean);
    children.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: skillNames.join('  •  '),
            size: 20,
            font: 'Arial'
          })
        ]
      })
    );
  }

  // 5. Education
  if (eduList.length > 0) {
    addSectionHeading('Education');
    eduList.forEach((edu) => {
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: edu.degree || '',
              bold: true,
              size: 22,
              font: 'Arial'
            }),
            new TextRun({
              text: `  |  ${edu.institution || ''} (${edu.location || ''})`,
              size: 20,
              font: 'Arial'
            }),
            new TextRun({
              text: edu.graduationDate ? `  [${edu.graduationDate}]` : '',
              italics: true,
              size: 18,
              color: hexColor,
              font: 'Arial'
            })
          ]
        })
      );
      if (edu.honors || edu.gpa) {
        children.push(
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: [edu.gpa ? `GPA: ${edu.gpa}` : '', edu.honors].filter(Boolean).join('  —  '),
                italics: true,
                size: 18,
                color: '4B5563',
                font: 'Arial'
              })
            ]
          })
        );
      }
    });
  }

  // 6. Projects
  if (projList.length > 0) {
    addSectionHeading('Projects');
    projList.forEach((proj) => {
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: proj.name || '',
              bold: true,
              size: 22,
              font: 'Arial'
            }),
            new TextRun({
              text: proj.role ? `  (${proj.role})` : '',
              italics: true,
              size: 18,
              color: '6B7280',
              font: 'Arial'
            }),
            new TextRun({
              text: proj.date ? `  [${proj.date}]` : '',
              size: 18,
              color: hexColor,
              font: 'Arial'
            })
          ]
        })
      );
      if (proj.description) {
        children.push(
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: proj.description,
                size: 20,
                font: 'Arial'
              })
            ]
          })
        );
      }
    });
  }

  // 7. Certifications
  if (certList.length > 0) {
    addSectionHeading('Certifications & Credentials');
    certList.forEach((cert) => {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: cert.name || '',
              bold: true,
              size: 20,
              font: 'Arial'
            }),
            new TextRun({
              text: cert.issuer ? ` – ${cert.issuer}` : '',
              size: 20,
              font: 'Arial'
            }),
            new TextRun({
              text: cert.date ? ` (${cert.date})` : '',
              italics: true,
              size: 18,
              color: '6B7280',
              font: 'Arial'
            })
          ]
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch
              right: 720,
              bottom: 720,
              left: 720
            }
          }
        },
        children
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${(pInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.docx`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToTxt(resume) {
  const p = resume.personalInfo || {};
  let out = '';

  out += `${(p.fullName || 'YOUR NAME').toUpperCase()}\n`;
  if (p.jobTitle) out += `${p.jobTitle}\n`;
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.website, p.github].filter(Boolean);
  if (contacts.length) out += `${contacts.join(' | ')}\n`;
  out += '\n' + '='.repeat(60) + '\n\n';

  if (p.summary) {
    out += 'PROFESSIONAL SUMMARY\n';
    out += '-'.repeat(30) + '\n';
    out += `${p.summary}\n\n`;
  }

  if (resume.experience && resume.experience.length) {
    out += 'WORK EXPERIENCE\n';
    out += '-'.repeat(30) + '\n';
    resume.experience.forEach(exp => {
      out += `${exp.title} | ${exp.company} (${exp.location || ''})\n`;
      out += `Dates: ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || ''}\n`;
      (exp.bullets || []).forEach(b => {
        out += `  • ${b}\n`;
      });
      out += '\n';
    });
  }

  if (resume.skills && resume.skills.length) {
    out += 'SKILLS\n';
    out += '-'.repeat(30) + '\n';
    out += resume.skills.map(s => s.name || s).join(', ') + '\n\n';
  }

  if (resume.education && resume.education.length) {
    out += 'EDUCATION\n';
    out += '-'.repeat(30) + '\n';
    resume.education.forEach(edu => {
      out += `${edu.degree} | ${edu.institution} (${edu.location || ''}) - ${edu.graduationDate || ''}\n`;
      if (edu.honors || edu.gpa) out += `  ${[edu.gpa ? `GPA: ${edu.gpa}` : '', edu.honors].filter(Boolean).join(' | ')}\n`;
      out += '\n';
    });
  }

  if (resume.projects && resume.projects.length) {
    out += 'PROJECTS\n';
    out += '-'.repeat(30) + '\n';
    resume.projects.forEach(proj => {
      out += `${proj.name} ${proj.role ? `(${proj.role})` : ''} - ${proj.date || ''}\n`;
      if (proj.description) out += `  ${proj.description}\n`;
      out += '\n';
    });
  }

  if (resume.certifications && resume.certifications.length) {
    out += 'CERTIFICATIONS\n';
    out += '-'.repeat(30) + '\n';
    resume.certifications.forEach(cert => {
      out += `  • ${cert.name} - ${cert.issuer || ''} (${cert.date || ''})\n`;
    });
    out += '\n';
  }

  const blob = new Blob([out], { type: 'text/plain;charset=utf-8' });
  const fileName = `${(p.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.txt`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToJson(resume) {
  const jsonStr = JSON.stringify(resume, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const fileName = `${(resume.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_')}_backup.json`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
