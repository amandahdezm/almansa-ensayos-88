import { useEffect } from 'react';
import { X, Calendar, FileText, Download } from 'lucide-react';
import type { PhotoEvidence } from '../types';

interface PhotoModalProps {
  photo: PhotoEvidence | null;
  testTitle?: string;
  location?: string;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photo,
  testTitle,
  location,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = photo.name || 'evidencia_ensayo_obra.jpg';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Evidencia de Ensayo
              </span>
              {location && (
                <span className="text-xs text-slate-700 font-bold bg-slate-200 px-2 py-0.5 rounded">
                  {location}
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
              {testTitle || photo.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer border border-slate-200 shadow-2xs"
              title="Descargar imagen"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer border border-slate-200 shadow-2xs"
              title="Cerrar modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image Viewer */}
        <div className="flex-1 bg-slate-100/70 flex items-center justify-center p-4 overflow-auto min-h-[300px] max-h-[65vh]">
          <img
            src={photo.url}
            alt={photo.name}
            className="max-w-full max-h-full object-contain rounded-lg shadow-md border border-slate-300"
          />
        </div>

        {/* Modal Footer: Timestamp & Notes */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{photo.timestamp || 'Fecha no registrada'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>{photo.name}</span>
            </div>
          </div>
          {photo.notes && (
            <p className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 italic font-medium">
              «{photo.notes}»
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
