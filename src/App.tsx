import { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  Lock, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

import type { TestItem, Discipline, TestStatus, PhotoEvidence } from './types';
import { 
  loadTestsFromStorage, 
  saveTestsToStorage, 
  resetTestsToDefaults,
  loadAuthMode,
  saveAuthMode
} from './utils/storage';
import { generateActaPdf } from './utils/pdfGenerator';

import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { TestCard } from './components/TestCard';
import { PhotoModal } from './components/PhotoModal';
import { NewTestModal } from './components/NewTestModal';
import { PrintActa } from './components/PrintActa';

const MASTER_PASSWORD = '88OBRA';
const ITEMS_PER_PAGE = 18;

export function App() {
  // Main State
  const [tests, setTests] = useState<TestItem[]>(() => loadTestsFromStorage());
  const [isEditMode, setIsEditMode] = useState<boolean>(() => loadAuthMode());

  // Filter States
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | TestStatus>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modals & Popups
  const [activePhoto, setActivePhoto] = useState<PhotoEvidence | null>(null);
  const [activePhotoInfo, setActivePhotoInfo] = useState<{ title: string; location: string }>({ title: '', location: '' });
  const [isNewTestModalOpen, setIsNewTestModalOpen] = useState<boolean>(false);
  const [showUnlockPrompt, setShowUnlockPrompt] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warn' } | null>(null);

  // Save tests automatically to localStorage
  useEffect(() => {
    saveTestsToStorage(tests);
  }, [tests]);

  // Toast notification auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (text: string, type: 'success' | 'info' | 'warn' = 'success') => {
    setToastMessage({ text, type });
  };

  // Auth Handlers
  const handleToggleEditMode = (inputPass: string): boolean => {
    if (inputPass.trim().toUpperCase() === MASTER_PASSWORD) {
      setIsEditMode(true);
      saveAuthMode(true);
      setShowUnlockPrompt(false);
      showToast('Modo Edición Activado (Clave verificada)', 'success');
      return true;
    } else {
      showToast('Clave incorrecta. Clave por defecto: 88OBRA', 'warn');
      return false;
    }
  };

  const handleLockEditMode = () => {
    setIsEditMode(false);
    saveAuthMode(false);
    showToast('Modo de Edición bloqueado. Volviendo a Solo Lectura', 'info');
  };

  // Global Statistics (Across all tests in the project)
  const stats = useMemo(() => {
    const total = tests.length;
    const conforme = tests.filter((t) => t.status === 'conforme').length;
    const noConforme = tests.filter((t) => t.status === 'no_conforme').length;
    const pendiente = tests.filter((t) => t.status === 'pendiente').length;
    const progressPercentage = total > 0 ? Math.round((conforme / total) * 100) : 0;

    return { total, conforme, noConforme, pendiente, progressPercentage };
  }, [tests]);

  // Discipline Counts
  const disciplineCounts = useMemo(() => {
    const byLoc = selectedLocation === 'all' ? tests : tests.filter((t) => t.location === selectedLocation);
    return {
      all: byLoc.length,
      fontaneria: byLoc.filter((t) => t.discipline === 'fontaneria').length,
      saneamiento: byLoc.filter((t) => t.discipline === 'saneamiento').length,
      baja_tension: byLoc.filter((t) => t.discipline === 'baja_tension').length
    };
  }, [tests, selectedLocation]);

  // Filtered Tests
  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      // Location filter
      if (selectedLocation !== 'all' && t.location !== selectedLocation) {
        return false;
      }
      // Discipline filter
      if (selectedDiscipline !== 'all' && t.discipline !== selectedDiscipline) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && t.status !== selectedStatus) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(query);
        const matchCode = t.code.toLowerCase().includes(query);
        const matchNorm = t.normative.toLowerCase().includes(query);
        const matchLoc = t.location.toLowerCase().includes(query);
        const matchObs = t.observations.toLowerCase().includes(query);
        if (!matchTitle && !matchCode && !matchNorm && !matchLoc && !matchObs) {
          return false;
        }
      }
      return true;
    });
  }, [tests, selectedLocation, selectedDiscipline, selectedStatus, searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLocation, selectedDiscipline, selectedStatus, searchQuery]);

  // Pagination slice
  const totalPages = Math.ceil(filteredTests.length / ITEMS_PER_PAGE) || 1;
  const paginatedTests = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTests.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTests, currentPage]);

  // Test Actions
  const handleUpdateStatus = (id: string, newStatus: TestStatus) => {
    setTests((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nowStr = new Date().toISOString().split('T')[0];
          return {
            ...t,
            status: newStatus,
            dateInspected: newStatus !== 'pendiente' ? nowStr : t.dateInspected
          };
        }
        return t;
      })
    );
    showToast(`Estado actualizado a: ${newStatus.toUpperCase()}`, 'info');

    // Trigger celebration if all tests in current selected dwelling become conforme!
    if (selectedLocation !== 'all' && newStatus === 'conforme') {
      const remainingInLocation = tests.filter(
        (t) => t.location === selectedLocation && t.id !== id && t.status !== 'conforme'
      );
      if (remainingInLocation.length === 0) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        showToast(`¡Enhorabuena! Todos los ensayos de ${selectedLocation} están CONFORMES`, 'success');
      }
    }
  };

  const handleUpdateObservations = (id: string, observations: string) => {
    setTests((prev) =>
      prev.map((t) => (t.id === id ? { ...t, observations } : t))
    );
    showToast('Observaciones técnicas guardadas', 'success');
  };

  const handleAddPhoto = (testId: string, photo: PhotoEvidence) => {
    setTests((prev) =>
      prev.map((t) =>
        t.id === testId
          ? { ...t, photos: [photo, ...(t.photos || [])] }
          : t
      )
    );
    showToast('Fotografía de evidencia adjuntada correctamente', 'success');
  };

  const handleDeletePhoto = (testId: string, photoId: string) => {
    setTests((prev) =>
      prev.map((t) =>
        t.id === testId
          ? { ...t, photos: (t.photos || []).filter((p) => p.id !== photoId) }
          : t
      )
    );
    showToast('Foto eliminada', 'info');
  };

  const handleAddNewTest = (newTest: TestItem) => {
    setTests((prev) => [newTest, ...prev]);
    showToast(`Nuevo ensayo "${newTest.title.slice(0, 30)}..." creado con éxito`, 'success');
  };

  const handleDeleteCustomTest = (id: string) => {
    setTests((prev) => prev.filter((t) => t.id !== id));
    showToast('Ensayo personalizado eliminado', 'info');
  };

  const handleBatchMarkConforme = () => {
    if (selectedLocation === 'all') return;
    if (!confirm(`¿Marcar todos los ensayos pendientes de "${selectedLocation}" como Conformes?`)) return;

    setTests((prev) =>
      prev.map((t) => {
        if (t.location === selectedLocation && t.status === 'pendiente') {
          return {
            ...t,
            status: 'conforme',
            dateInspected: new Date().toISOString().split('T')[0],
            observations: t.observations || 'Verificación en obra conforme con la Dirección Facultativa.'
          };
        }
        return t;
      })
    );

    confetti({ particleCount: 50, spread: 60 });
    showToast(`Ensayos de ${selectedLocation} aprobados por lote`, 'success');
  };

  const handleResetData = () => {
    if (confirm('¿Restablecer todos los datos a la configuración inicial de fábrica? Se perderán las modificaciones no guardadas.')) {
      const initial = resetTestsToDefaults();
      setTests(initial);
      showToast('Datos de ensayos restablecidos de fábrica', 'info');
    }
  };

  // Export PDF Handler
  const handleExportPdf = () => {
    generateActaPdf({
      tests: filteredTests,
      stats,
      currentLocationFilter: selectedLocation,
      currentDisciplineFilter: selectedDiscipline
    });
    showToast('Generando y descargando Acta Oficial en PDF...', 'success');
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  const handleOpenPhoto = (photo: PhotoEvidence, title: string, location: string) => {
    setActivePhoto(photo);
    setActivePhotoInfo({ title, location });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-bold border ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300' 
              : toastMessage.type === 'warn'
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-blue-50 text-blue-900 border-blue-300'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Unlock Prompt Banner Modal (When clicking in Read-only) */}
      {showUnlockPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-amber-600 mb-3">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-slate-900">Modo Solo Lectura Activo</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Para cambiar estados de ensayos, redactar observaciones, adjuntar fotos de evidencias o añadir nuevos controles, debes desbloquear el <strong>Modo Edición</strong> en la cabecera con la clave técnica autorizada (por defecto: <code className="bg-slate-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold border border-slate-200">88OBRA</code>).
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowUnlockPrompt(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header (Visible on screen, hidden in print) */}
      <div className="no-print">
        <Header
          stats={stats}
          filteredCount={filteredTests.length}
          isEditMode={isEditMode}
          onToggleEditMode={handleToggleEditMode}
          onLockEditMode={handleLockEditMode}
          onExportPdf={handleExportPdf}
          onPrint={handlePrint}
          onOpenNewTestModal={() => setIsNewTestModalOpen(true)}
          onResetData={handleResetData}
        />

        {/* Filter Navigation Bar */}
        <FilterBar
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
          selectedDiscipline={selectedDiscipline}
          onSelectDiscipline={setSelectedDiscipline}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          disciplineCounts={disciplineCounts}
          isEditMode={isEditMode}
          onBatchMarkConforme={handleBatchMarkConforme}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
          
          {/* Active Filter Pill Summary */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">
                Mostrando {filteredTests.length} de {tests.length} ensayos
              </span>
              {selectedLocation !== 'all' && (
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-bold">
                  {selectedLocation}
                </span>
              )}
              {selectedDiscipline !== 'all' && (
                <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded border border-slate-300 font-bold capitalize">
                  {selectedDiscipline.replace('_', ' ')}
                </span>
              )}
              {selectedStatus !== 'all' && (
                <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded border border-slate-300 font-bold uppercase">
                  {selectedStatus}
                </span>
              )}
            </div>

            {/* Pagination Controls in Header */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-medium">
                  Página {currentPage} de {totalPages}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Test Cards Grid */}
          {paginatedTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginatedTests.map((test) => (
                <TestCard
                  key={test.id}
                  test={test}
                  isEditMode={isEditMode}
                  onUpdateStatus={handleUpdateStatus}
                  onUpdateObservations={handleUpdateObservations}
                  onAddPhoto={handleAddPhoto}
                  onDeletePhoto={handleDeletePhoto}
                  onDeleteTest={handleDeleteCustomTest}
                  onOpenPhoto={handleOpenPhoto}
                  onRequestUnlock={() => setShowUnlockPrompt(true)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 max-w-lg mx-auto my-12 shadow-sm">
              <div className="p-3 bg-slate-100 rounded-full w-fit mx-auto mb-3 text-slate-500">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">No se encontraron ensayos</h3>
              <p className="text-xs text-slate-500 mb-4">
                No hay ensayos que coincidan con los filtros seleccionados o el criterio de búsqueda.
              </p>
              <button
                onClick={() => {
                  setSelectedLocation('all');
                  setSelectedDiscipline('all');
                  setSelectedStatus('all');
                  setSearchQuery('');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Restablecer todos los filtros
              </button>
            </div>
          )}

          {/* Bottom Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4">
              <p className="text-xs text-slate-500">
                Mostrando <span className="font-bold text-slate-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> a{' '}
                <span className="font-bold text-slate-900">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredTests.length)}
                </span>{' '}
                de <span className="font-bold text-slate-900">{filteredTests.length}</span> ensayos
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 7 && currentPage > 4) {
                      pageNum = currentPage - 4 + i;
                      if (pageNum > totalPages) pageNum = totalPages - (6 - i);
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-600 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
            <p className="text-slate-700 text-xs sm:text-sm font-normal">
              © 2026 Amanda Hernández Montesdeoca – AHM Ingeniería. Todos los derechos reservados. | Email:{' '}
              <a 
                href="mailto:amanda@ahmingenieria.com" 
                className="font-bold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
              >
                amanda@ahmingenieria.com
              </a>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
              <span>Promoción 88 Viviendas, Garajes y Trasteros — Control de Calidad CTE & REBT</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                {isEditMode ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> Edición Habilitada
                  </span>
                ) : (
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-600" /> Solo Lectura (Clave: 88OBRA)
                  </span>
                )}
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Official Print Layout (Visible only when window.print() is executed) */}
      <PrintActa
        tests={filteredTests}
        stats={stats}
        currentLocationFilter={selectedLocation}
        currentDisciplineFilter={selectedDiscipline}
      />

      {/* Fullscreen Photo Modal */}
      <PhotoModal
        photo={activePhoto}
        testTitle={activePhotoInfo.title}
        location={activePhotoInfo.location}
        onClose={() => setActivePhoto(null)}
      />

      {/* New Test Modal */}
      <NewTestModal
        isOpen={isNewTestModalOpen}
        onClose={() => setIsNewTestModalOpen(false)}
        onAddTest={handleAddNewTest}
        currentLocationFilter={selectedLocation}
      />

    </div>
  );
}

export default App;
