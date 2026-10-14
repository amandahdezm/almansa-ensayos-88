export type Discipline = 'all' | 'fontaneria' | 'saneamiento' | 'baja_tension';

export type TestStatus = 'conforme' | 'no_conforme' | 'pendiente';

export interface PhotoEvidence {
  id: string;
  url: string; // base64 or url
  name: string;
  timestamp: string;
  notes?: string;
}

export interface TestItem {
  id: string;
  code: string;
  discipline: 'fontaneria' | 'saneamiento' | 'baja_tension';
  title: string;
  normative: string;
  technicalCriteria: string;
  location: string; // e.g. "Vivienda 01", "General / Infraestructuras Comunes", "Centralización de Contadores / RITI"
  status: TestStatus;
  observations: string;
  dateInspected?: string;
  inspectorName?: string;
  photos: PhotoEvidence[];
  isCustom?: boolean;
}

export interface SiteStatistics {
  total: number;
  conforme: number;
  noConforme: number;
  pendiente: number;
  progressPercentage: number;
}
