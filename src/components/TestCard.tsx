import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Camera, 
  Image as ImageIcon, 
  Trash2, 
  FileText, 
  Calendar, 
  User, 
  Lock, 
  Sparkles,
  Info
} from 'lucide-react';
import type { TestItem, TestStatus, PhotoEvidence } from '../types';
import { compressImage } from '../utils/storage';

interface TestCardProps {
  test: TestItem;
  isEditMode: boolean;
  onUpdateStatus: (id: string, status: TestStatus) => void;
  onUpdateObservations: (id: string, observations: string) => void;
  onAddPhoto: (id: string, photo: PhotoEvidence) => void;
  onDeletePhoto: (testId: string, photoId: string) => void;
  onDeleteTest?: (id: string) => void;
  onOpenPhoto: (photo: PhotoEvidence, testTitle: string, location: string) => void;
  onRequestUnlock: () => void;
}

export const TestCard: React.FC<TestCardProps> = ({
  test,
  isEditMode,
  onUpdateStatus,
  onUpdateObservations,
  onAddPhoto,
  onDeletePhoto,
  onDeleteTest,
  onOpenPhoto,
  onRequestUnlock
}) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(test.observations);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Discipline styling
  const getDisciplineBadge = () => {
    switch (test.discipline) {
      case 'fontaneria':
        return {
          label: 'Fontanería y Clima',
          badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200'
        };
      case 'saneamiento':
        return {
          label: 'Saneamiento',
          badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200'
        };
      case 'baja_tension':
        return {
          label: 'Baja Tensión',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
        };
      default:
        return {
          label: 'Instalaciones',
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-200'
        };
    }
  };

  const discInfo = getDisciplineBadge();

  // Status border color (Light Theme)
  const getStatusBorder = () => {
    switch (test.status) {
      case 'conforme':
        return 'border-l-4 border-l-emerald-500 border-slate-200 bg-white';
      case 'no_conforme':
        return 'border-l-4 border-l-rose-500 border-slate-200 bg-white';
      case 'pendiente':
        return 'border-l-4 border-l-amber-500 border-slate-200 bg-white';
      default:
        return 'border-slate-200 bg-white';
    }
  };

  const handleStatusClick = (newStatus: TestStatus) => {
    if (!isEditMode) {
      onRequestUnlock();
      return;
    }
    onUpdateStatus(test.id, newStatus);
  };

  const handleSaveNotes = () => {
    onUpdateObservations(test.id, tempNotes);
    setIsEditingNotes(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const file = files[0];
      const compressedDataUrl = await compressImage(file);
      const now = new Date();
      const timestamp = `${now.toLocaleDateString('es-ES')} ${now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;

      const newPhoto: PhotoEvidence = {
        id: `photo-${Date.now()}`,
        url: compressedDataUrl,
        name: file.name || `Evidencia_${test.code}.jpg`,
        timestamp,
        notes: `Evidencia en ${test.location}`
      };

      onAddPhoto(test.id, newPhoto);
    } catch (err) {
      console.error('Error procesando imagen:', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Quick insertion snippets for notes
  const quickNotesSnippets = [
    'Estanqueidad comprobada sin pérdidas.',
    'Disparo diferencial < 200 ms Conforme.',
    'Sello hidráulico > 50 mm Conforme.',
    'Fuga localizada, pendiente de reapriete.',
    'Puesta en marcha y rendimiento OK.'
  ];

  return (
    <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between gap-4 ${getStatusBorder()}`}>
      
      {/* Top Header: Discipline, Code & Location */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${discInfo.badgeClass}`}>
              {discInfo.label}
            </span>
            <span className="text-[11px] font-mono text-slate-600 font-semibold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              {test.code}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{test.location}</span>
          </div>
        </div>

        {/* Test Title & Normative */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {test.title}
        </h3>

        {/* Normative Reference & Technical Criteria */}
        <div className="mt-2 bg-blue-50/70 rounded-lg p-2.5 border border-blue-200 text-xs">
          <div className="flex items-start gap-1.5 text-blue-900 font-bold mb-1">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
            <span>Normativa: {test.normative}</span>
          </div>
          {test.technicalCriteria && (
            <p className="text-slate-600 text-[11px] pl-5 leading-relaxed font-medium">
              {test.technicalCriteria}
            </p>
          )}
        </div>
      </div>

      {/* Quick 3-State Status Selector */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            Estado de Validación:
            {!isEditMode && <Lock className="w-3 h-3 text-amber-600 inline ml-0.5" />}
          </span>
          {test.dateInspected && (
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {test.dateInspected}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Conforme Button */}
          <button
            type="button"
            onClick={() => handleStatusClick('conforme')}
            className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              test.status === 'conforme'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400'
                : 'bg-slate-100 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${test.status === 'conforme' ? 'text-white' : 'text-emerald-600'}`} />
            <span>Conforme</span>
          </button>

          {/* No Conforme Button */}
          <button
            type="button"
            onClick={() => handleStatusClick('no_conforme')}
            className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              test.status === 'no_conforme'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-400'
                : 'bg-slate-100 text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200'
            }`}
          >
            <AlertTriangle className={`w-4 h-4 ${test.status === 'no_conforme' ? 'text-white' : 'text-rose-600'}`} />
            <span>No Conforme</span>
          </button>

          {/* Pendiente Button */}
          <button
            type="button"
            onClick={() => handleStatusClick('pendiente')}
            className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              test.status === 'pendiente'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 ring-2 ring-amber-400'
                : 'bg-slate-100 text-slate-600 hover:text-amber-700 hover:bg-amber-50 border border-slate-200'
            }`}
          >
            <Clock className={`w-4 h-4 ${test.status === 'pendiente' ? 'text-white' : 'text-amber-600'}`} />
            <span>Pendiente</span>
          </button>
        </div>
      </div>

      {/* Observations / Notes Section */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Observaciones / Dirección de Obra:</span>
          </div>
          {isEditMode && !isEditingNotes && (
            <button
              onClick={() => {
                setTempNotes(test.observations);
                setIsEditingNotes(true);
              }}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
            >
              Editar notas
            </button>
          )}
        </div>

        {isEditingNotes ? (
          <div className="space-y-2">
            <textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              rows={3}
              className="w-full bg-white border border-blue-400 rounded-md p-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
              placeholder="Anota valores manométricos, tiempos de disparo, incidencias o conformidad técnica..."
            />

            {/* Quick phrases snippets */}
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] text-slate-500 flex items-center gap-1 mr-1 font-medium">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                Sugerencias:
              </span>
              {quickNotesSnippets.map((snip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTempNotes((prev) => prev ? `${prev} ${snip}` : snip)}
                  className="text-[10px] bg-white hover:bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300 cursor-pointer font-medium shadow-2xs"
                >
                  +{snip.slice(0, 22)}...
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsEditingNotes(false)}
                className="text-xs px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="text-xs px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs"
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-700 italic min-h-[1.5rem] leading-relaxed">
            {test.observations || (
              <span className="text-slate-400 not-italic">
                Sin notas registradas. {isEditMode ? 'Haz clic en "Editar notas" para registrar mediciones.' : 'Desbloquea edición para anotar.'}
              </span>
            )}
          </p>
        )}

        {test.inspectorName && (
          <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              <User className="w-3 h-3 text-slate-400" />
              Inspector: {test.inspectorName}
            </span>
          </div>
        )}
      </div>

      {/* Photographic Evidence Gallery */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Evidencias Fotográficas ({test.photos?.length || 0}):</span>
          </div>

          {/* Add photo trigger */}
          {isEditMode ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
                id={`upload-${test.id}`}
              />
              <label
                htmlFor={`upload-${test.id}`}
                className="text-xs bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 px-2.5 py-1 rounded-md border border-blue-300 flex items-center gap-1 font-semibold cursor-pointer transition-colors shadow-2xs"
                title="Subir foto desde archivo o cámara de móvil"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{uploading ? 'Procesando...' : 'Adjuntar Foto'}</span>
              </label>
            </div>
          ) : (
            <button
              onClick={onRequestUnlock}
              className="text-[11px] text-slate-500 hover:text-amber-600 flex items-center gap-1 cursor-pointer font-medium"
              title="Requiere modo edición para adjuntar fotos"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Adjuntar foto (Bloqueado)</span>
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        {test.photos && test.photos.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {test.photos.map((photo) => (
              <div 
                key={photo.id}
                className="group relative aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-2xs cursor-pointer hover:border-blue-500 transition-all"
                onClick={() => onOpenPhoto(photo, test.title, test.location)}
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Overlay hover badge */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                  <span className="text-[10px] text-white font-semibold bg-black/60 px-1.5 py-0.5 rounded">
                    Ampliar
                  </span>
                </div>

                {/* Delete button in edit mode */}
                {isEditMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('¿Eliminar esta evidencia fotográfica?')) {
                        onDeletePhoto(test.id, photo.id);
                      }
                    }}
                    className="absolute top-1 right-1 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
                    title="Eliminar foto"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-lg p-2.5 border border-dashed border-slate-300 text-center">
            <p className="text-[11px] text-slate-500 font-medium">
              No hay fotos adjuntas a este ensayo.
            </p>
          </div>
        )}
      </div>

      {/* Delete custom test if applicable */}
      {isEditMode && test.isCustom && onDeleteTest && (
        <div className="pt-2 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              if (confirm(`¿Eliminar el ensayo personalizado "${test.title}"?`)) {
                onDeleteTest(test.id);
              }
            }}
            className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer font-semibold"
          >
            <Trash2 className="w-3 h-3" />
            <span>Eliminar ensayo personalizado</span>
          </button>
        </div>
      )}

    </div>
  );
};
