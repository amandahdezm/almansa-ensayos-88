import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { TestItem, SiteStatistics } from '../types';

interface GeneratePdfOptions {
  tests: TestItem[];
  stats: SiteStatistics;
  currentLocationFilter: string;
  currentDisciplineFilter: string;
  projectName?: string;
  developerName?: string;
}

export function generateActaPdf({
  tests,
  stats,
  currentLocationFilter,
  currentDisciplineFilter,
  projectName = 'PROMOCIÓN DE 88 VIVIENDAS, GARAJES Y TRASTEROS',
  developerName = 'DIRECCIÓN FACULTATIVA & CONSTRUCTORA'
}: GeneratePdfOptions) {
  // Create A4 portrait document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor: [number, number, number] = [30, 41, 59]; // slate-800
  const accentColor: [number, number, number] = [37, 99, 235]; // blue-600

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const timeFormatted = now.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // --- HEADER BANNER ---
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 24, 'F');

  doc.setFillColor(...accentColor);
  doc.rect(0, 24, 210, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('ACTA DE SEGUIMIENTO Y CONTROL DE ENSAYOS DE OBRA', 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text(`${projectName} | ${developerName}`, 14, 18);

  const docCode = `ACTA-ENS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  doc.text(`Ref: ${docCode}`, 196, 18, { align: 'right' });

  // --- PROJECT & METADATA SECTION ---
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  let currentY = 32;

  // Box for document info
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, currentY, 182, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('DATOS GENERALES DE LA INSPECCIÓN', 18, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`• Fecha de emisión: ${dateFormatted} (${timeFormatted})`, 18, currentY + 12);
  doc.text(`• Filtro de Ubicación: ${currentLocationFilter === 'all' ? 'Todas las ubicaciones (88 Viv + Comunes)' : currentLocationFilter}`, 18, currentY + 17);
  
  const discLabel = currentDisciplineFilter === 'all' 
    ? 'Todas las disciplinas' 
    : currentDisciplineFilter === 'fontaneria' 
      ? 'Fontanería y Climatización' 
      : currentDisciplineFilter === 'saneamiento' 
        ? 'Saneamiento' 
        : 'Baja Tensión';
  doc.text(`• Disciplina filtrada: ${discLabel}`, 18, currentY + 22);

  // Summary KPI Pill indicators inside box
  doc.setFont('helvetica', 'bold');
  doc.text(`Total ensayos en acta: ${tests.length}`, 115, currentY + 12);
  
  doc.setTextColor(16, 185, 129); // Green
  doc.text(`✓ Conformes: ${stats.conforme}`, 115, currentY + 17);

  doc.setTextColor(225, 29, 72); // Red
  doc.text(`✗ No Conformes: ${stats.noConforme}`, 155, currentY + 17);

  doc.setTextColor(217, 119, 6); // Amber
  doc.text(`◷ Pendientes: ${stats.pendiente}`, 115, currentY + 22);

  doc.setTextColor(37, 99, 235); // Blue
  doc.text(`Progreso: ${stats.progressPercentage}%`, 155, currentY + 22);

  currentY += 32;

  // --- TABLE WITH TESTS ---
  const tableData = tests.map((t) => {
    let discText = 'Fontanería / Clima';
    if (t.discipline === 'saneamiento') discText = 'Saneamiento';
    if (t.discipline === 'baja_tension') discText = 'Baja Tensión';

    let statusText = 'PENDIENTE';
    if (t.status === 'conforme') statusText = 'CONFORME';
    if (t.status === 'no_conforme') statusText = 'NO CONFORME';

    const photoCountText = t.photos && t.photos.length > 0 
      ? `\n[${t.photos.length} Evidencia${t.photos.length > 1 ? 's' : ''} fotográfica(s)]` 
      : '';

    const obsText = (t.observations || 'Sin observaciones registradas.') + photoCountText;

    return [
      discText,
      `${t.title}\n[${t.normative}]`,
      t.location,
      statusText,
      obsText
    ];
  });

  autoTable(doc, {
    startY: currentY,
    head: [['Disciplina', 'Ensayo / Normativa de Referencia', 'Ubicación', 'Estado', 'Observaciones de D.O. / Evidencias']],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 7.5,
      cellPadding: 2.2,
      textColor: [30, 41, 59],
      valign: 'middle',
      lineColor: [226, 232, 240],
      lineWidth: 0.2
    },
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    columnStyles: {
      0: { cellWidth: 26, fontStyle: 'bold' },
      1: { cellWidth: 62 },
      2: { cellWidth: 26, halign: 'center' },
      3: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
      4: { cellWidth: 46 }
    },
    didParseCell: (data) => {
      // Color-code the Estado column
      if (data.section === 'body' && data.column.index === 3) {
        const val = data.cell.raw as string;
        if (val === 'CONFORME') {
          data.cell.styles.textColor = [16, 149, 100]; // dark green
          data.cell.styles.fillColor = [240, 253, 244]; // light green bg
        } else if (val === 'NO CONFORME') {
          data.cell.styles.textColor = [190, 18, 60]; // dark red
          data.cell.styles.fillColor = [255, 241, 242]; // light red bg
        } else {
          data.cell.styles.textColor = [180, 83, 9]; // amber
          data.cell.styles.fillColor = [254, 252, 232]; // light amber bg
        }
      }
    },
    margin: { left: 14, right: 14, bottom: 42 }
  });

  // --- SIGNATURE SECTION ---
  // Ensure signatures fit on last page or add page if near bottom
  const finalY = (doc as any).lastAutoTable?.finalY || currentY;
  const pageHeight = doc.internal.pageSize.getHeight();

  let sigY = finalY + 10;
  if (sigY + 36 > pageHeight) {
    doc.addPage();
    sigY = 20;
  }

  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.text('El presente documento certifica los ensayos e inspecciones técnicas de control de calidad realizados en obra con arreglo al CTE y REBT.', 14, sigY);

  sigY += 6;

  // Signature Box 1: Dirección Facultativa
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(14, sigY, 86, 26, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('POR LA DIRECCIÓN FACULTATIVA', 18, sigY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Arquitecto Técnico / Director de Ejecución (D.E.O.)', 18, sigY + 9);
  doc.text('Firma y sello colegial:', 18, sigY + 16);

  // Signature Box 2: Constructora
  doc.roundedRect(110, sigY, 86, 26, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('POR LA EMPRESA CONSTRUCTORA', 114, sigY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Jefe de Obra / Responsable de Calidad', 114, sigY + 9);
  doc.text('Firma y sello de empresa:', 114, sigY + 16);

  // Add Page numbers to all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Página ${i} de ${totalPages} | © 2026 Amanda Hernández Montesdeoca – AHM Ingeniería | Email: amanda@ahmingenieria.com`,
      105,
      pageHeight - 6,
      { align: 'center' }
    );
  }

  // Save / Download PDF
  const filename = `Acta_Ensayos_88_Viviendas_${dateFormatted.replace(/ /g, '_')}.pdf`;
  doc.save(filename);
}
