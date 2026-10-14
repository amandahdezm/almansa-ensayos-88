import React, { useState } from 'react';
import { X, PlusCircle, Sparkles } from 'lucide-react';
import type { TestItem, TestStatus } from '../types';
import { LOCATIONS_LIST } from '../data/initialTests';

interface NewTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTest: (test: TestItem) => void;
  currentLocationFilter: string;
}

export const NewTestModal: React.FC<NewTestModalProps> = ({
  isOpen,
  onClose,
  onAddTest,
  currentLocationFilter
}) => {
  const [discipline, setDiscipline] = useState<'fontaneria' | 'saneamiento' | 'baja_tension'>('fontaneria');
  const [title, setTitle] = useState('');
  const [normative, setNormative] = useState('CTE DB-HS 4');
  const [technicalCriteria, setTechnicalCriteria] = useState('');
  const [location, setLocation] = useState(currentLocationFilter !== 'all' ? currentLocationFilter : 'Vivienda 01');
  const [status, setStatus] = useState<TestStatus>('pendiente');
  const [observations, setObservations] = useState('');
  const [inspectorName, setInspectorName] = useState('D. Carlos Méndez (DEO)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const codePrefix = discipline === 'fontaneria' ? 'FON' : discipline === 'saneamiento' ? 'SAN' : 'BT';
    const locClean = location.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase();
    const uniqueCode = `ENS-${codePrefix}-${locClean}-${Math.floor(100 + Math.random() * 900)}`;

    const newTest: TestItem = {
      id: `custom-test-${Date.now()}`,
      code: uniqueCode,
      discipline,
      title: title.trim(),
      normative: normative.trim(),
      technicalCriteria: technicalCriteria.trim(),
      location,
      status,
      observations: observations.trim(),
      dateInspected: status !== 'pendiente' ? new Date().toISOString().split('T')[0] : undefined,
      inspectorName: inspectorName.trim() || undefined,
      photos: [],
      isCustom: true
    };

    onAddTest(newTest);
    onClose();
  };

  // Quick preset templates
  const presets = [
    {
      disc: 'fontaneria' as const,
      t: 'Prueba de estanqueidad de circuito de suelo radiante / refrescante',
      n: 'UNE-EN 1264-4 (6 bar durante 24 horas)',
      c: 'Mantener presión hidrostática durante el vertido y fraguado del mortero.'
    },
    {
      disc: 'baja_tension' as const,
      t: 'Medida de resistencia de aislamiento de conductores activos entre sí y contra tierra',
      n: 'REBT ITC-BT-19 (Tensión ensayo 500V, R > 0.5 MΩ)',
      c: 'Aislamiento mínimo de 1000 Ω/V con megóhmetro homologado.'
    },
    {
      disc: 'saneamiento' as const,
      t: 'Comprobación de pendiente mínima y fijación antivibratoria de colectores suspendidos',
      n: 'CTE DB-HS 5 (Pendiente mín. 1.5% a 2%)',
      c: 'Verificación con nivel láser y comprobación de abrazaderas con manguito elástico.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full flex flex-col overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Nuevo Ensayo de Control de Calidad</h3>
              <p className="text-xs text-slate-500">Añadir ensayo normativo a la promoción de 88 viviendas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Quick Preset Buttons */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Cargar plantilla rápida:
            </span>
            <div className="flex flex-col gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setDiscipline(p.disc);
                    setTitle(p.t);
                    setNormative(p.n);
                    setTechnicalCriteria(p.c);
                  }}
                  className="text-left text-xs bg-white hover:bg-slate-100 p-2 rounded-lg border border-slate-200 text-slate-800 transition-colors flex items-center justify-between group cursor-pointer shadow-2xs"
                >
                  <span className="font-semibold group-hover:text-blue-600">{p.t}</span>
                  <span className="text-[10px] text-slate-500 shrink-0 ml-2 font-mono">[{p.n.split(' ')[0]}]</span>
                </button>
              ))}
            </div>
          </div>

          {/* Discipline & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Disciplina Técnica *
              </label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fontaneria">Fontanería y Climatización</option>
                <option value="saneamiento">Saneamiento y Evacuación</option>
                <option value="baja_tension">Baja Tensión y Electricidad</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ubicación Asignada *
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <optgroup label="Zonas Comunes">
                  <option value="General / Infraestructuras Comunes">General / Infraestructuras Comunes</option>
                  <option value="Centralización de Contadores / RITI">Centralización de Contadores / RITI</option>
                </optgroup>
                <optgroup label="88 Viviendas">
                  {LOCATIONS_LIST.filter(l => l.startsWith('Vivienda')).map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nombre / Descripción del Ensayo *
            </label>
            <input
              type="text"
              required
              placeholder="p. ej. Prueba de presión en circuito primario de aerotermia"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Normative & Technical Criteria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Normativa de Referencia *
              </label>
              <input
                type="text"
                required
                placeholder="p. ej. CTE DB-HS 4 / RITE IT 1.3"
                value={normative}
                onChange={(e) => setNormative(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Inspector / Técnico
              </label>
              <input
                type="text"
                placeholder="D. Carlos Méndez (DEO)"
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Criterio Técnico de Aceptación
            </label>
            <textarea
              rows={2}
              placeholder="p. ej. Presión constante durante 2 horas sin caída manométrica..."
              value={technicalCriteria}
              onChange={(e) => setTechnicalCriteria(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Initial Status */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Estado Inicial
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('conforme')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  status === 'conforme'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-sm'
                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                Conforme
              </button>
              <button
                type="button"
                onClick={() => setStatus('no_conforme')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  status === 'no_conforme'
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400 shadow-sm'
                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                No Conforme
              </button>
              <button
                type="button"
                onClick={() => setStatus('pendiente')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  status === 'pendiente'
                    ? 'bg-amber-500 text-white ring-2 ring-amber-400 shadow-sm'
                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                Pendiente
              </button>
            </div>
          </div>

          {/* Initial Observations */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Observaciones Iniciales (opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Anotaciones de obra, equipos utilizados, incidencias..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/30 cursor-pointer"
            >
              Crear Ensayo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
