import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export async function exportToPdf(elementId = 'resume-document', fileName = 'Resume.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    window.print();
    return false;
  }

  try {
    // High-resolution rendering via browser native SVG foreignObject engine
    const imgData = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      skipFonts: true
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth(); // 8.5 inches
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const pageHeight = pdf.internal.pageSize.getHeight(); // 11.0 inches
    let heightLeft = pdfHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Add subsequent pages if content overflows 1 page
    while (heightLeft > 0.2) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (err) {
    console.warn('PDF export failed, falling back to print dialog:', err);
    window.print();
    return false;
  }
}
