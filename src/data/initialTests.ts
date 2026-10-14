import type { TestItem } from '../types';
import { SAMPLE_EVIDENCE } from './sampleImages';

// Generate 88 dwelling locations: "Vivienda 01", "Vivienda 02", ..., "Vivienda 88"
export const LOCATIONS_LIST = [
  'General / Infraestructuras Comunes',
  'Centralización de Contadores / RITI',
  ...Array.from({ length: 88 }, (_, i) => `Vivienda ${String(i + 1).padStart(2, '0')}`)
];

export const INITIAL_TESTS: TestItem[] = [
  // --- INFRAESTRUCTURAS COMUNES ---
  {
    id: 'test-gen-01',
    code: 'ENS-FON-GEN-01',
    discipline: 'fontaneria',
    title: 'Prueba de presión y estanqueidad en columnas montantes generales AF y ACS',
    normative: 'CTE DB-HS 4 (Apdo. 5.2.2)',
    technicalCriteria: 'Presión de prueba a 1,5 veces la de trabajo, mínimo 10 bar, durante 60 minutos sin apreciarse descenso manométrico.',
    location: 'General / Infraestructuras Comunes',
    status: 'conforme',
    observations: 'Prueba realizada en batería de montantes norte y sur a 11 bar. Estanqueidad garantizada sin descensos en 2 horas.',
    dateInspected: '2026-10-08',
    inspectorName: 'D. Carlos Méndez (DEO)',
    photos: [
      {
        id: 'p-gen-01',
        url: SAMPLE_EVIDENCE.manometerPressure,
        name: 'Presion_Montantes_Generales.jpg',
        timestamp: '2026-10-08 11:30',
        notes: 'Manómetro calibrado a 11.0 bar en cuadro de valvulería general.'
      }
    ]
  },
  {
    id: 'test-gen-02',
    code: 'ENS-SAN-GEN-01',
    discipline: 'saneamiento',
    title: 'Prueba de estanqueidad hidráulica con agua en bajantes y colectores colgados de sótano',
    normative: 'CTE DB-HS 5 (Apdo. 5.4.1)',
    technicalCriteria: 'Llenado con columna de agua de al menos 1 m hasta cota de rebose. Ausencia de fugas en juntas y registros durante 4 horas.',
    location: 'General / Infraestructuras Comunes',
    status: 'conforme',
    observations: 'Inspeccionados colectores colgados en techo de garaje -1 y -2. Todas las abrazaderas fonoabsorbentes y juntas en perfecto estado.',
    dateInspected: '2026-10-09',
    inspectorName: 'D. Carlos Méndez (DEO)',
    photos: [
      {
        id: 'p-gen-02',
        url: SAMPLE_EVIDENCE.drainageSeal,
        name: 'Estanqueidad_Colectores_Sotano.jpg',
        timestamp: '2026-10-09 16:45',
        notes: 'Verificación de columna de agua y estanqueidad en colectores principales.'
      }
    ]
  },
  {
    id: 'test-gen-03',
    code: 'ENS-SAN-GEN-02',
    discipline: 'saneamiento',
    title: 'Ensayo de estanqueidad con humo para detección de fugas u olores en bajantes y registros',
    normative: 'CTE DB-HS 5 / UNE-EN 12056',
    technicalCriteria: 'Inyección de humo no tóxico a presión controlada (25 mm c.d.a.). Ninguna fuga visible por ventilaciones primarias ni sumideros.',
    location: 'General / Infraestructuras Comunes',
    status: 'conforme',
    observations: 'Prueba de humo satisfactoria en bajantes 1 a 6. Salida limpia por coronación de cubierta sin reflujos en plantas intermedias.',
    dateInspected: '2026-10-10',
    inspectorName: 'Dña. Elena Rubio (Constructora)',
    photos: []
  },
  {
    id: 'test-gen-04',
    code: 'ENS-BT-GEN-01',
    discipline: 'baja_tension',
    title: 'Medida de resistencia de puesta a tierra general y continuidad del conductor de protección',
    normative: 'REBT ITC-BT-18 / ITC-BT-26',
    technicalCriteria: 'Resistencia del anillo de tierra < 15 Ohms (óptimo < 10 Ohms) y continuidad galvánica de armaduras de cimentación.',
    location: 'General / Infraestructuras Comunes',
    status: 'conforme',
    observations: 'Telurómetro mide 6.4 Ohms en arqueta general de seccionamiento. Conductor de cobre desnudo de 35 mm² y picas verificadas.',
    dateInspected: '2026-10-06',
    inspectorName: 'D. Javier Sanz (Ing. Instalaciones)',
    photos: []
  },

  // --- CENTRALIZACIÓN DE CONTADORES / RITI ---
  {
    id: 'test-riti-01',
    code: 'ENS-BT-RITI-01',
    discipline: 'baja_tension',
    title: 'Comprobación de equilibrado de fases en centralización de contadores',
    normative: 'REBT ITC-BT-14 / ITC-BT-16',
    technicalCriteria: 'Reparto simétrico de las 88 derivaciones individuales entre las tres fases R-S-T con desequilibrio de intensidad < 10%.',
    location: 'Centralización de Contadores / RITI',
    status: 'conforme',
    observations: 'Reparto en módulos de contadores: Fase R (29 viv), Fase S (30 viv), Fase T (29 viv). Simetría comprobada.',
    dateInspected: '2026-10-11',
    inspectorName: 'D. Carlos Méndez (DEO)',
    photos: []
  },
  {
    id: 'test-riti-02',
    code: 'ENS-BT-RITI-02',
    discipline: 'baja_tension',
    title: 'Verificación de sección, conexionado y marcado de cables libres de halógenos según unifilares de proyecto',
    normative: 'REBT ITC-BT-19 / CPR Clase Cca-s1b,d1,a1',
    technicalCriteria: 'Comprobación de etiquetado identificativo de cada vivienda, aislamiento 0,6/1 kV, no propagador del fuego y baja emisión de humos.',
    location: 'Centralización de Contadores / RITI',
    status: 'no_conforme',
    observations: 'Falta etiquetar derivaciones individuales de Viviendas 41 a 48 en el embarrado del cuarto de contadores. Subsanación solicitada.',
    dateInspected: '2026-10-12',
    inspectorName: 'D. Carlos Méndez (DEO)',
    photos: []
  },

  // --- ENSAYOS DE LAS 88 VIVIENDAS (Plantilla base para cada vivienda) ---
  // Generaremos los ensayos sistemáticos de Fontanería, Saneamiento y Baja Tensión
  ...generateDwellingTests()
];

function generateDwellingTests(): TestItem[] {
  const tests: TestItem[] = [];

  for (let i = 1; i <= 88; i++) {
    const vivNum = String(i).padStart(2, '0');
    const vivName = `Vivienda ${vivNum}`;

    // Status logic:
    // 1-15: Almost all completed and conforme
    // 16-25: In progress with a couple of realistic non-conformities
    // 26-88: Mostly pending or partially executed
    let statusPlumbing: 'conforme' | 'no_conforme' | 'pendiente' = 'pendiente';
    let statusFlows: 'conforme' | 'no_conforme' | 'pendiente' = 'pendiente';
    let statusAero: 'conforme' | 'no_conforme' | 'pendiente' = 'pendiente';
    let statusSanSiphons: 'conforme' | 'no_conforme' | 'pendiente' = 'pendiente';
    let statusElecDiff: 'conforme' | 'no_conforme' | 'pendiente' = 'pendiente';
    let statusElecEquip: 'conforme' | 'no_conforme' | 'pendiente' = 'pendiente';

    let obsPlumbing = 'Pendiente de prueba manométrica tras conexionado de griferías.';
    let obsFlows = 'Pendiente de verificación de aireadores y caudalímetros.';
    let obsAero = 'Pendiente de conexión eléctrica definitiva y puesta en marcha de bomba de calor.';
    let obsSanSiphons = 'Pendiente de comprobación de sello hidráulico y estanqueidad.';
    let obsElecDiff = 'Pendiente de energización del cuadro general de distribución de la vivienda.';
    let obsElecEquip = 'Pendiente de comprobación de unifilar y rotulación de circuitos.';

    let photoPlumbing: any[] = [];
    let photoDiff: any[] = [];
    let photoAero: any[] = [];
    let photoSan: any[] = [];

    if (i <= 18) {
      statusPlumbing = 'conforme';
      statusFlows = 'conforme';
      statusAero = 'conforme';
      statusSanSiphons = 'conforme';
      statusElecDiff = 'conforme';
      statusElecEquip = 'conforme';

      obsPlumbing = 'Prueba manométrica a 10 bar durante 60 min. Sin fugas en colectores ni llaves de corte.';
      obsFlows = 'Caudales verificados: Lavabos 0.10 l/s, Ducha 0.20 l/s, Fregadero 0.15 l/s. Conforme CTE DB-HS 4.';
      obsAero = 'Unidad interior y exterior operativas. Producción de ACS a 52ºC y purga de suelo radiante completa.';
      obsSanSiphons = 'Sello de agua en bote sifónico y plato de ducha > 50 mm. Cierre hidráulico óptimo.';
      obsElecDiff = 'Disparo verificado con analizador: ID general 30mA a los 24 ms. IDs secundarios < 30 ms.';
      obsElecEquip = 'Cables H07Z1-K libres de halógenos. Secciones conformes a unifilar de proyecto (PIA C1-C5).';

      if (i === 1) {
        photoPlumbing = [{
          id: `p-viv-01-plumb`,
          url: SAMPLE_EVIDENCE.manometerPressure,
          name: `Prueba_Presion_Vivienda_01.jpg`,
          timestamp: '2026-10-10 10:15',
          notes: 'Manómetro a 10.5 bar en colector principal de baño suite.'
        }];
        photoDiff = [{
          id: `p-viv-01-diff`,
          url: SAMPLE_EVIDENCE.electricalTester,
          name: `Disparo_Diferencial_Vivienda_01.jpg`,
          timestamp: '2026-10-10 12:40',
          notes: 'Lectura de disparo a 23ms y 21mA en cuadro eléctrico CGMP.'
        }];
        photoAero = [{
          id: `p-viv-01-aero`,
          url: SAMPLE_EVIDENCE.aerothermiaCheck,
          name: `Aerotermia_Puesta_Marcha_V01.jpg`,
          timestamp: '2026-10-10 15:20',
          notes: 'Parámetros de impulsión y COP conforme a RITE.'
        }];
        photoSan = [{
          id: `p-viv-01-san`,
          url: SAMPLE_EVIDENCE.drainageSeal,
          name: `Sello_Hidraulico_V01.jpg`,
          timestamp: '2026-10-10 16:10',
          notes: 'Comprobación de lámina estanca y sello de 58 mm en bote sifónico.'
        }];
      }
    } else if (i === 19) {
      statusPlumbing = 'no_conforme';
      obsPlumbing = 'Detectada caída de presión de 10 a 7.5 bar en 20 min. Fuga localizada en prensado de codo multicapa en colector baño 2. Subsanar y repetir.';
      statusFlows = 'pendiente';
      statusAero = 'pendiente';
      statusSanSiphons = 'conforme';
      obsSanSiphons = 'Sello hidráulico comprobado y conforme en todos los aparatos sanitarios.';
      statusElecDiff = 'conforme';
      obsElecDiff = 'Diferenciales verificados correctamente.';
      statusElecEquip = 'conforme';
      obsElecEquip = 'Rotulación y peines de conexión correctos.';
    } else if (i === 20) {
      statusPlumbing = 'conforme';
      obsPlumbing = 'Estanqueidad correcta a 10 bar.';
      statusFlows = 'conforme';
      obsFlows = 'Caudales ajustados y limpios de impurezas.';
      statusAero = 'no_conforme';
      obsAero = 'Error E04 en display de unidad interior por burbuja de aire en intercambiador de placas. Requiere purgado adicional y revisión de presostato.';
      statusSanSiphons = 'conforme';
      obsSanSiphons = 'Desagües comprobados.';
      statusElecDiff = 'pendiente';
      statusElecEquip = 'pendiente';
    } else if (i === 24) {
      statusPlumbing = 'conforme';
      statusFlows = 'conforme';
      statusAero = 'pendiente';
      statusSanSiphons = 'no_conforme';
      obsSanSiphons = 'Sifón de fregadero presenta gota en junta de apriete cónico. Reponer junta tórica defectuosa.';
      statusElecDiff = 'no_conforme';
      obsElecDiff = 'Interruptor diferencial del circuito C4 (Lavadora) dispara a 230 ms (> 200 ms). Sustituir mecanismo.';
      statusElecEquip = 'pendiente';
    } else if (i <= 30) {
      statusPlumbing = 'conforme';
      obsPlumbing = 'Prueba manométrica a 10 bar superada con éxito.';
      statusFlows = 'conforme';
      obsFlows = 'Caudales nominales conformes.';
      statusAero = 'pendiente';
      statusSanSiphons = 'pendiente';
      statusElecDiff = 'pendiente';
      statusElecEquip = 'pendiente';
    }

    // Test 1: Prueba de presión y estanqueidad AF y ACS
    tests.push({
      id: `test-viv-${vivNum}-01`,
      code: `ENS-FON-${vivNum}-01`,
      discipline: 'fontaneria',
      title: 'Prueba de presión y estanqueidad en tuberías AF y ACS',
      normative: 'CTE DB-HS 4: 1,5x presión de servicio, mín. 10 bar',
      technicalCriteria: 'Someter la instalación interior a 10 bar durante 60 minutos sin apreciarse descenso manométrico ni fuga.',
      location: vivName,
      status: statusPlumbing,
      observations: obsPlumbing,
      dateInspected: statusPlumbing !== 'pendiente' ? '2026-10-10' : undefined,
      inspectorName: statusPlumbing !== 'pendiente' ? 'D. Carlos Méndez (DEO)' : undefined,
      photos: photoPlumbing
    });

    // Test 2: Comprobación de caudales mínimos y griferías
    tests.push({
      id: `test-viv-${vivNum}-02`,
      code: `ENS-FON-${vivNum}-02`,
      discipline: 'fontaneria',
      title: 'Comprobación de caudales mínimos y correcto funcionamiento de griferías y fluxores',
      normative: 'CTE DB-HS 4 (Apéndice A)',
      technicalCriteria: 'Verificar caudales mínimos instantáneos (Lavabo: 0.10 l/s, Ducha: 0.20 l/s, Fregadero: 0.15 l/s).',
      location: vivName,
      status: statusFlows,
      observations: obsFlows,
      dateInspected: statusFlows !== 'pendiente' ? '2026-10-10' : undefined,
      inspectorName: statusFlows !== 'pendiente' ? 'Dña. Elena Rubio' : undefined,
      photos: []
    });

    // Test 3: Aerotermia y ACS
    tests.push({
      id: `test-viv-${vivNum}-03`,
      code: `ENS-FON-${vivNum}-03`,
      discipline: 'fontaneria',
      title: 'Puesta en marcha, purgado de circuito y verificación de rendimiento de equipo de aerotermia / ACS',
      normative: 'RITE IT 1.3 / CTE DB-HE 4',
      technicalCriteria: 'Comprobación de purgado, presión hidráulica de primario (1.5 - 2.0 bar), temperatura de impulsión ACS > 50ºC y balance térmico.',
      location: vivName,
      status: statusAero,
      observations: obsAero,
      dateInspected: statusAero !== 'pendiente' ? '2026-10-11' : undefined,
      inspectorName: statusAero !== 'pendiente' ? 'D. Javier Sanz (Ing.)' : undefined,
      photos: photoAero
    });

    // Test 4: Desagües y sifones individuales
    tests.push({
      id: `test-viv-${vivNum}-04`,
      code: `ENS-SAN-${vivNum}-01`,
      discipline: 'saneamiento',
      title: 'Comprobación de desagües de aparatos y funcionamiento de sifones individuales',
      normative: 'CTE DB-HS 5 (Art. 3.3)',
      technicalCriteria: 'Evacuación sin estancamiento ni ruidos anómalos. Conservación del sello de agua tras desagüe simultáneo.',
      location: vivName,
      status: statusSanSiphons,
      observations: obsSanSiphons,
      dateInspected: statusSanSiphons !== 'pendiente' ? '2026-10-10' : undefined,
      inspectorName: statusSanSiphons !== 'pendiente' ? 'D. Carlos Méndez (DEO)' : undefined,
      photos: photoSan
    });

    // Test 5: Disparo de interruptores diferenciales
    tests.push({
      id: `test-viv-${vivNum}-05`,
      code: `ENS-BT-${vivNum}-01`,
      discipline: 'baja_tension',
      title: 'Ensayo de tiempo y sensibilidad de disparo de interruptores diferenciales',
      normative: 'REBT ITC-BT-18/24, < 200 ms',
      technicalCriteria: 'Disparo a corriente diferencial asignada IΔn (30 mA) con tiempo de desconexión inferior a 200 ms.',
      location: vivName,
      status: statusElecDiff,
      observations: obsElecDiff,
      dateInspected: statusElecDiff !== 'pendiente' ? '2026-10-11' : undefined,
      inspectorName: statusElecDiff !== 'pendiente' ? 'D. Javier Sanz (Ing.)' : undefined,
      photos: photoDiff
    });

    // Test 6: Verificación de unifilar y conductores
    tests.push({
      id: `test-viv-${vivNum}-06`,
      code: `ENS-BT-${vivNum}-02`,
      discipline: 'baja_tension',
      title: 'Verificación de sección, conexionado y marcado de cables libres de halógenos según unifilares de proyecto',
      normative: 'REBT ITC-BT-19 / ITC-BT-25',
      technicalCriteria: 'Verificación de sección nominal (C1: 1.5mm², C2: 2.5mm², C3: 6mm², C4: 4mm², C5: 2.5mm²) y aislamiento clase Cca.',
      location: vivName,
      status: statusElecEquip,
      observations: obsElecEquip,
      dateInspected: statusElecEquip !== 'pendiente' ? '2026-10-11' : undefined,
      inspectorName: statusElecEquip !== 'pendiente' ? 'Dña. Elena Rubio' : undefined,
      photos: []
    });
  }

  return tests;
}
