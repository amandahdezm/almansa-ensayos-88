import React from 'react';
import { 
  Filter, 
  MapPin, 
  Droplets, 
  Waves, 
  Zap, 
  Search, 
  X, 
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers
} from 'lucide-react';
import type { Discipline, TestStatus } from '../types';
import { LOCATIONS_LIST } from '../data/initialTests';

interface FilterBarProps {
  selectedLocation: string;
  onSelectLocation: (loc: string) => void;
  selectedDiscipline: Discipline;
  onSelectDiscipline: (disc: Discipline) => void;
  selectedStatus: 'all' | TestStatus;
  onSelectStatus: (status: 'all' | TestStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  disciplineCounts: {
    all: number;
    fontaneria: number;
    saneamiento: number;
    baja_tension: number;
  };
  isEditMode: boolean;
  onBatchMarkConforme?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedLocation,
  onSelectLocation,
  selectedDiscipline,
  onSelectDiscipline,
  selectedStatus,
  onSelectStatus,
  searchQuery,
  onSearchChange,
  disciplineCounts,
  isEditMode,
  onBatchMarkConforme
}) => {
  return (
    <div className="bg-white/95 border-b border-slate-200 p-3 sm:p-4 sticky top-[53px] z-20 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col gap-3.5">
        
        {/* Row 1: Location Selector & Search Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Location Selector */}
          <div className="flex items-center gap-2 flex-1 max-w-xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Ubicación:</span>
            </div>
            
            <div className="relative flex-1">
              <select
                value={selectedLocation}
                onChange={(e) => onSelectLocation(e.target.value)}
                className="w-full bg-white border border-slate-300 hover:border-slate-400 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-colors shadow-xs"
              >
                <option value="all">Todas las Ubicaciones (88 Viviendas + Comunes)</option>
                <optgroup label="Zonas Comunes e Infraestructuras">
                  <option value="General / Infraestructuras Comunes">General / Infraestructuras Comunes</option>
                  <option value="Centralización de Contadores / RITI">Centralización de Contadores / RITI</option>
                </optgroup>
                <optgroup label="88 Viviendas de la Promoción">
                  {LOCATIONS_LIST.filter(l => l.startsWith('Vivienda')).map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Quick jump to specific dwelling helper or clear */}
            {selectedLocation !== 'all' && (
              <button
                onClick={() => onSelectLocation('all')}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-2 rounded-lg border border-slate-300 flex items-center gap-1 cursor-pointer font-medium"
                title="Ver todas las ubicaciones"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ver Todas</span>
              </button>
            )}

            {/* Batch action in Edit Mode for current dwelling */}
            {isEditMode && selectedLocation !== 'all' && onBatchMarkConforme && (
              <button
                onClick={onBatchMarkConforme}
                className="text-xs bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 px-2.5 py-2 rounded-lg flex items-center gap-1.5 font-semibold transition-colors cursor-pointer shrink-0 shadow-xs"
                title="Aprobar todos los ensayos pendientes de esta ubicación de una vez"
              >
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline">Aprobar todo ({selectedLocation})</span>
              </button>
            )}
          </div>

          {/* Search text filter */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por ensayo, norma, notas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white border border-slate-300 hover:border-slate-400 rounded-lg pl-9 pr-8 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Row 2: Discipline Tabs & Status Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-200">
          
          {/* Discipline Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => onSelectDiscipline('all')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedDiscipline === 'all'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todas</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                selectedDiscipline === 'all' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {disciplineCounts.all}
              </span>
            </button>

            <button
              onClick={() => onSelectDiscipline('fontaneria')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedDiscipline === 'fontaneria'
                  ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Droplets className={`w-3.5 h-3.5 ${selectedDiscipline === 'fontaneria' ? 'text-white' : 'text-cyan-600'}`} />
              <span>Fontanería y Clima</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                selectedDiscipline === 'fontaneria' ? 'bg-cyan-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {disciplineCounts.fontaneria}
              </span>
            </button>

            <button
              onClick={() => onSelectDiscipline('saneamiento')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedDiscipline === 'saneamiento'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Waves className={`w-3.5 h-3.5 ${selectedDiscipline === 'saneamiento' ? 'text-white' : 'text-indigo-600'}`} />
              <span>Saneamiento</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                selectedDiscipline === 'saneamiento' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {disciplineCounts.saneamiento}
              </span>
            </button>

            <button
              onClick={() => onSelectDiscipline('baja_tension')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedDiscipline === 'baja_tension'
                  ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${selectedDiscipline === 'baja_tension' ? 'text-white' : 'text-amber-600'}`} />
              <span>Baja Tensión</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                selectedDiscipline === 'baja_tension' ? 'bg-amber-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {disciplineCounts.baja_tension}
              </span>
            </button>
          </div>

          {/* Status Quick Filter Pills */}
          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-slate-500" />
              Estado:
            </span>
            <button
              onClick={() => onSelectStatus('all')}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                selectedStatus === 'all'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => onSelectStatus('conforme')}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                selectedStatus === 'conforme'
                  ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-400'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Conforme
            </button>
            <button
              onClick={() => onSelectStatus('no_conforme')}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                selectedStatus === 'no_conforme'
                  ? 'bg-rose-100 text-rose-800 ring-1 ring-rose-400'
                  : 'text-slate-600 hover:text-rose-700 hover:bg-rose-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              No Conforme
            </button>
            <button
              onClick={() => onSelectStatus('pendiente')}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                selectedStatus === 'pendiente'
                  ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-400'
                  : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Pendiente
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
