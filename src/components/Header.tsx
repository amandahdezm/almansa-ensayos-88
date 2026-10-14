import React, { useState } from 'react';
import { 
  Building2, 
  Lock, 
  Unlock, 
  FileDown, 
  Printer, 
  PlusCircle, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Layers,
  KeyRound,
  ShieldCheck,
  Check
} from 'lucide-react';
import type { SiteStatistics } from '../types';

interface HeaderProps {
  stats: SiteStatistics;
  filteredCount: number;
  isEditMode: boolean;
  onToggleEditMode: (password: string) => boolean;
  onLockEditMode: () => void;
  onExportPdf: () => void;
  onPrint: () => void;
  onOpenNewTestModal: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  filteredCount,
  isEditMode,
  onToggleEditMode,
  onLockEditMode,
  onExportPdf,
  onPrint,
  onOpenNewTestModal,
  onResetData
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorShake, setErrorShake] = useState(false);
  const [unlockSuccess, setUnlockSuccess] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onToggleEditMode(pinInput);
    if (success) {
      setPinInput('');
      setUnlockSuccess(true);
      setTimeout(() => setUnlockSuccess(false), 2000);
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 800);
    }
  };

  return (
    <header className="bg-slate-100 text-slate-800">
      {/* Top Banner / Navigation - STICKY COMPACT NAVBAR (LIGHT THEME) */}
      <div className="sticky top-0 z-30 bg-white/95 border-b border-slate-200 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Promotion Brand & Title */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-md shadow-blue-500/20 text-white flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Promoción 88 Viviendas
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                  <span className="text-xs text-slate-500 hidden sm:inline font-medium">C/ Almansa</span>
                </div>
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  Control de Ensayos de Obra
                  <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 hidden sm:inline">
                    D.F. & Constructora
                  </span>
                </h1>
              </div>
            </div>

            {/* Action Center: Edit Mode Access & PDF Export */}
            <div className="flex flex-wrap items-center justify-end gap-2 w-full md:w-auto">
              {/* Access Control Box */}
              {!isEditMode ? (
                <form onSubmit={handleUnlock} className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200 shadow-inner">
                  <div className="flex items-center pl-1.5 text-slate-600">
                    <KeyRound className="w-3.5 h-3.5 text-amber-600 mr-1" />
                    <span className="text-xs text-slate-600 font-medium hidden sm:inline">Modo:</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Clave (88OBRA)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className={`bg-white text-xs px-2 py-1 rounded border text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-24 sm:w-28 transition-all ${
                      errorShake ? 'border-rose-500 ring-1 ring-rose-500 animate-bounce' : 'border-slate-300'
                    }`}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                    title="Desbloquear modo edición (Clave por defecto: 88OBRA)"
                  >
                    <Unlock className="w-3 h-3" />
                    <span>Editar</span>
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg shadow-sm">
                  <div className="flex items-center gap-1 text-xs text-emerald-800 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Edición Habilitada</span>
                    <span className="sm:hidden">Edición</span>
                  </div>
                  <button
                    onClick={onLockEditMode}
                    className="bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-xs px-2 py-0.5 rounded transition-colors flex items-center gap-1 border border-slate-300 hover:border-rose-300 cursor-pointer shadow-xs"
                    title="Bloquear y volver a Solo Lectura"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Bloquear</span>
                  </button>
                </div>
              )}

              {/* In edit mode: Add Test Button */}
              {isEditMode && (
                <button
                  onClick={onOpenNewTestModal}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm shadow-emerald-600/20 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Nuevo Ensayo</span>
                </button>
              )}

              {/* Print native view */}
              <button
                onClick={onPrint}
                className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 border border-slate-300 hover:border-slate-400 cursor-pointer shadow-xs"
                title="Vista previa e impresión directa"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Imprimir</span>
              </button>

              {/* PDF Export Button (Highlighted as requested) */}
              <button
                onClick={onExportPdf}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 border border-blue-500 cursor-pointer active:scale-95"
                title="Descargar Acta Oficial maquetada en PDF para firmas"
              >
                <FileDown className="w-3.5 h-3.5 text-white" />
                <span>Exportar Acta PDF</span>
              </button>

              {/* Reset Defaults (Edit mode only) */}
              {isEditMode && (
                <button
                  onClick={onResetData}
                  className="text-slate-400 hover:text-amber-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Restablecer datos de fábrica"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Access mode banner status feedback */}
          {unlockSuccess && (
            <div className="mt-2 bg-emerald-50 border border-emerald-300 rounded-md p-1.5 text-xs text-emerald-800 flex items-center gap-2 transition-all">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span><strong>¡Modo Edición Activado!</strong> Ahora puedes cambiar estados, agregar notas, subir fotos de evidencias y crear nuevos ensayos.</span>
            </div>
          )}
        </div>
      </div>

      {/* KPI Summary Cards & Progress Bar (In normal page flow) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Total Ensayos */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Ensayos</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-slate-900">{stats.total}</span>
                {filteredCount !== stats.total && (
                  <span className="text-xs text-blue-600 font-medium">({filteredCount} filtrados)</span>
                )}
              </div>
            </div>
            <div className="p-2.5 bg-slate-100 rounded-lg text-slate-600 border border-slate-200">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          {/* Conformes */}
          <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Conformes</p>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-emerald-700">{stats.conforme}</span>
                <span className="text-xs text-emerald-700 font-semibold">
                  {stats.total > 0 ? Math.round((stats.conforme / stats.total) * 100) : 0}%
                </span>
              </div>
            </div>
            <div className="p-2.5 bg-emerald-100 rounded-lg text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          {/* No Conformes / Fallos */}
          <div className={`bg-rose-50/70 rounded-xl p-3 border shadow-sm flex items-center justify-between ${
            stats.noConforme > 0 ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${stats.noConforme > 0 ? 'bg-rose-600 animate-ping' : 'bg-slate-400'}`}></span>
                <p className="text-xs font-semibold text-rose-800 uppercase tracking-wider">No Conformes</p>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-rose-700">{stats.noConforme}</span>
                {stats.noConforme > 0 && (
                  <span className="text-xs font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded border border-rose-200">
                    Atención
                  </span>
                )}
              </div>
            </div>
            <div className="p-2.5 bg-rose-100 rounded-lg text-rose-700 border border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          {/* Pendientes */}
          <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Pendientes</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-amber-700">{stats.pendiente}</span>
                <span className="text-xs text-amber-700 font-medium">por ensayar</span>
              </div>
            </div>
            <div className="p-2.5 bg-amber-100 rounded-lg text-amber-700 border border-amber-200">
              <Clock className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="mt-3 bg-white rounded-lg p-2.5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Progreso Global de Ensayos Conformes:</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
              {stats.progressPercentage}%
            </span>
            <span className="text-xs text-slate-500">({stats.conforme} de {stats.total} ensayos aprobados)</span>
          </div>

          <div className="w-full sm:w-64 h-2.5 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
            <div 
              className="bg-emerald-500 transition-all duration-500 ease-out" 
              style={{ width: `${stats.progressPercentage}%` }}
              title={`Conformes: ${stats.progressPercentage}%`}
            />
            <div 
              className="bg-rose-500 transition-all duration-500 ease-out" 
              style={{ width: `${stats.total > 0 ? (stats.noConforme / stats.total) * 100 : 0}%` }}
              title={`No Conformes: ${stats.noConforme}`}
            />
            <div 
              className="bg-amber-400 transition-all duration-500 ease-out" 
              style={{ width: `${stats.total > 0 ? (stats.pendiente / stats.total) * 100 : 0}%` }}
              title={`Pendientes: ${stats.pendiente}`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
