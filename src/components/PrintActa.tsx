import React from 'react';
import type { TestItem, SiteStatistics } from '../types';

interface PrintActaProps {
  tests: TestItem[];
  stats: SiteStatistics;
  currentLocationFilter: string;
  currentDisciplineFilter: string;
}

export const PrintActa: React.FC<PrintActaProps> = ({
  tests,
  stats,
  currentLocationFilter,
  currentDisciplineFilter
}) => {
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="hidden print:block p-8 bg-white text-slate-900 font-sans">
      {/* Official Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-600">
              DOCUMENTO OFICIAL DE DIRECCIÓN DE EJECUCIÓN DE OBRA
            </span>
            <h1 className="text-xl font-black tracking-tight text-slate-900 mt-1">
              ACTA DE CONTROL Y SEGUIMIENTO DE ENSAYOS DE INSTALACIONES
            </h1>
            <p className="text-sm font-bold text-slate-700 mt-0.5">
              PROMOCIÓN DE 88 VIVIENDAS, GARAJES Y TRASTEROS — C/ ALMANSA
            </p>
          </div>
          <div className="text-right text-xs text-slate-600 font-mono">
            <p className="font-bold text-slate-900">REF: ACTA-ENS-{now.getFullYear()}{String(now.getMonth()+1).padStart(2,'0')}</p>
            <p>Fecha: {dateFormatted}</p>
          </div>
        </div>
      </div>

      {/* Inspection Summary Block */}
      <div className="bg-slate-50 border border-slate-300 rounded p-4 mb-6 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Ubicación inspeccionada:</strong> {currentLocationFilter === 'all' ? 'Todas las ubicaciones (88 Viviendas + Zonas Comunes)' : currentLocationFilter}</p>
            <p><strong>Disciplina:</strong> {currentDisciplineFilter === 'all' ? 'Todas las disciplinas (Fontanería, Saneamiento, Baja Tensión)' : currentDisciplineFilter.toUpperCase()}</p>
            <p><strong>Normativa de aplicación:</strong> CTE DB-HS 4, CTE DB-HS 5, REBT (R.D. 842/2002), RITE</p>
          </div>
          <div>
            <p><strong>Total ensayos reportados:</strong> {tests.length}</p>
            <p>
              <strong>Estado general: </strong>
              <span className="text-emerald-700 font-bold">Conformes: {stats.conforme} ({stats.progressPercentage}%)</span> | 
              <span className="text-rose-700 font-bold"> No Conformes: {stats.noConforme}</span> | 
              <span className="text-amber-700 font-bold"> Pendientes: {stats.pendiente}</span>
            </p>
            <p><strong>Sistema de verificación:</strong> Dirección Facultativa & Empresa Constructora</p>
          </div>
        </div>
      </div>

      {/* Tests Table */}
      <table className="print-table w-full text-xs mb-8">
        <thead>
          <tr className="bg-slate-100 text-slate-900 font-bold">
            <th className="p-2 border text-left w-24">Disciplina</th>
            <th className="p-2 border text-left">Ensayo / Normativa de Referencia</th>
            <th className="p-2 border text-center w-28">Ubicación</th>
            <th className="p-2 border text-center w-24">Estado</th>
            <th className="p-2 border text-left w-64">Observaciones y Evidencias</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((t) => (
            <tr key={t.id} className="print-break-inside-avoid">
              <td className="p-2 border font-medium text-slate-700">
                {t.discipline === 'fontaneria' ? 'Fontanería' : t.discipline === 'saneamiento' ? 'Saneamiento' : 'Baja Tensión'}
              </td>
              <td className="p-2 border">
                <div className="font-semibold text-slate-900">{t.title}</div>
                <div className="text-[10px] text-slate-600 font-mono mt-0.5">{t.normative}</div>
              </td>
              <td className="p-2 border text-center font-medium">
                {t.location}
              </td>
              <td className="p-2 border text-center font-bold">
                {t.status === 'conforme' && (
                  <span className="text-emerald-700">✓ CONFORME</span>
                )}
                {t.status === 'no_conforme' && (
                  <span className="text-rose-700">✗ NO CONFORME</span>
                )}
                {t.status === 'pendiente' && (
                  <span className="text-amber-700">◷ PENDIENTE</span>
                )}
              </td>
              <td className="p-2 border text-slate-700">
                <div>{t.observations || 'Sin observaciones adicionales.'}</div>
                {t.photos && t.photos.length > 0 && (
                  <div className="text-[10px] text-blue-700 font-semibold mt-1">
                    [{t.photos.length} Evidencia(s) fotográfica(s) archivadas en expediente]
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Signatures Area */}
      <div className="print-break-inside-avoid mt-10 pt-4 border-t border-slate-300">
        <p className="text-xs text-slate-600 mb-6 italic">
          En testimonio de lo actuado y para que conste a los efectos reglamentarios oportunos en el Libro de Órdenes y Asistencias y control de calidad de la edificación:
        </p>
        <div className="grid grid-cols-2 gap-12">
          {/* Dirección Facultativa */}
          <div className="border border-slate-400 rounded p-4 h-36 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase">POR LA DIRECCIÓN FACULTATIVA</p>
              <p className="text-[11px] text-slate-600">Arquitecto Técnico / Director de Ejecución de Obra (D.E.O.)</p>
            </div>
            <div className="border-t border-dashed border-slate-400 pt-1 text-[10px] text-slate-500">
              Firma y sello profesional
            </div>
          </div>

          {/* Constructora */}
          <div className="border border-slate-400 rounded p-4 h-36 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase">POR LA EMPRESA CONSTRUCTORA</p>
              <p className="text-[11px] text-slate-600">Jefe de Obra / Representante Técnico</p>
            </div>
            <div className="border-t border-dashed border-slate-400 pt-1 text-[10px] text-slate-500">
              Firma y sello de empresa
            </div>
          </div>
        </div>
        <div className="mt-8 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-500 font-sans">
          © 2026 Amanda Hernández Montesdeoca – AHM Ingeniería. Todos los derechos reservados. | Email: amanda@ahmingenieria.com
        </div>
      </div>
    </div>
  );
};
