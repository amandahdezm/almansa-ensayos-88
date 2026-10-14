// Technical vector-rendered photographic evidence mockups for construction inspections (Light Theme)

export const SAMPLE_EVIDENCE = {
  // Manometer test showing 10.5 bar for AF/ACS pressure test
  manometerPressure: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="%23f1f5f9"/>
    <rect x="20" y="20" width="560" height="360" rx="12" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2"/>
    <circle cx="300" cy="180" r="125" fill="%23ffffff" stroke="%2394a3b8" stroke-width="6"/>
    <circle cx="300" cy="180" r="115" fill="none" stroke="%23e2e8f0" stroke-width="2"/>
    <!-- Manometer scale -->
    <path d="M 205 235 A 105 105 0 1 1 395 235" fill="none" stroke="%2364748b" stroke-width="4" stroke-dasharray="2,6"/>
    <!-- Target zone green -->
    <path d="M 330 80 A 105 105 0 0 1 385 130" fill="none" stroke="%2310b981" stroke-width="10"/>
    <text x="300" y="135" font-family="sans-serif" font-size="13" font-weight="bold" fill="%2364748b" text-anchor="middle">MANÓMETRO CALIBRADO</text>
    <text x="300" y="160" font-family="sans-serif" font-size="28" font-weight="900" fill="%230f172a" text-anchor="middle">10.5 BAR</text>
    <text x="300" y="180" font-family="sans-serif" font-size="12" fill="%2364748b" text-anchor="middle">CTE DB-HS 4 (1.5 x P. Serv)</text>
    <!-- Needle pointing to 10.5 bar -->
    <line x1="300" y1="180" x2="350" y2="100" stroke="%23dc2626" stroke-width="4" stroke-linecap="round"/>
    <circle cx="300" cy="180" r="9" fill="%230f172a"/>
    <!-- Stamp overlay -->
    <rect x="40" y="315" width="520" height="45" rx="6" fill="%23f0fdf4" stroke="%2310b981" stroke-width="1.5"/>
    <text x="55" y="343" font-family="monospace" font-size="13" font-weight="bold" fill="%23047857">✓ PRESIÓN ESTABLE: 60 MINUTOS SIN CAÍDA (P=10.5 bar)</text>
  </svg>`,

  // Differential electrical tester showing 23ms and 21mA
  electricalTester: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="%23f1f5f9"/>
    <rect x="30" y="25" width="540" height="350" rx="16" fill="%23ffffff" stroke="%233b82f6" stroke-width="2"/>
    <!-- LCD Display -->
    <rect x="80" y="55" width="440" height="180" rx="8" fill="%23f0fdf4" stroke="%23059669" stroke-width="2"/>
    <text x="100" y="90" font-family="monospace" font-size="13" font-weight="bold" fill="%23047857">PROBADOR DIFERENCIAL REBT ITC-BT-24</text>
    <text x="100" y="145" font-family="monospace" font-size="44" font-weight="bold" fill="%23065f46">tΔ: 23 ms</text>
    <text x="320" y="145" font-family="monospace" font-size="36" font-weight="bold" fill="%23047857">IΔ: 21 mA</text>
    <text x="100" y="190" font-family="monospace" font-size="19" font-weight="bold" fill="%23047857">ESTADO: CONFORME (&lt; 200 ms)</text>
    <text x="100" y="215" font-family="monospace" font-size="12" fill="%23059669">Tensión red: 231.4 V | Frecuencia: 50.0 Hz</text>
    <!-- Buttons -->
    <rect x="80" y="260" width="100" height="45" rx="6" fill="%232563eb"/>
    <text x="130" y="288" font-family="sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">TEST AUTO</text>
    <rect x="200" y="260" width="100" height="45" rx="6" fill="%23059669"/>
    <text x="250" y="288" font-family="sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">RAMP (mA)</text>
    <rect x="320" y="260" width="200" height="45" rx="6" fill="%23f8fafc" stroke="%23cbd5e1" stroke-width="1.5"/>
    <text x="420" y="288" font-family="monospace" font-size="12" font-weight="bold" fill="%23334155" text-anchor="middle">CUADRO GENERAL CGMP</text>
    <text x="300" y="345" font-family="sans-serif" font-size="12" fill="%2364748b" text-anchor="middle">Comprobación de sensibilidad y tiempo de corte a 30mA</text>
  </svg>`,

  // Aerothermia Commissioning display & piping
  aerothermiaCheck: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="%23f1f5f9"/>
    <rect x="40" y="25" width="520" height="350" rx="12" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2"/>
    <!-- Unit panel -->
    <rect x="70" y="55" width="460" height="150" rx="8" fill="%23f0f9ff" stroke="%230284c7" stroke-width="1.5"/>
    <text x="90" y="90" font-family="sans-serif" font-size="14" font-weight="bold" fill="%230369a1">SISTEMA AEROTERMIA R-32 - CONTROL DIGITAL</text>
    <text x="90" y="130" font-family="monospace" font-size="28" font-weight="bold" fill="%230f172a">Tª Impulsión ACS: 52.8 ºC</text>
    <text x="90" y="160" font-family="monospace" font-size="18" fill="%23334155">COP Estimado: 4.15 | P. Circuito: 1.8 bar</text>
    <text x="90" y="185" font-family="monospace" font-size="13" font-weight="bold" fill="%23059669">● ESTADO: COMPRESOR ACTIVO / PURGA OK</text>
    <!-- Visual indicators -->
    <circle cx="100" cy="265" r="28" fill="%230284c7"/>
    <text x="100" y="270" font-family="sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">ACS</text>
    <circle cx="180" cy="265" r="28" fill="%230d9488"/>
    <text x="180" y="270" font-family="sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">CLIMA</text>
    <circle cx="260" cy="265" r="28" fill="%23059669"/>
    <text x="260" y="270" font-family="sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">PURGA</text>
    <rect x="320" y="235" width="210" height="60" rx="8" fill="%23f8fafc" stroke="%23cbd5e1" stroke-width="1.5"/>
    <text x="425" y="260" font-family="sans-serif" font-size="12" font-weight="bold" fill="%230f172a" text-anchor="middle">VASO DE EXPANSIÓN</text>
    <text x="425" y="280" font-family="monospace" font-size="12" fill="%230284c7" text-anchor="middle">Presión precarga: 1.5 bar</text>
    <text x="300" y="340" font-family="sans-serif" font-size="12" fill="%2364748b" text-anchor="middle">Puesta en marcha y verificación de ciclo termodinámico conforme a RITE</text>
  </svg>`,

  // Siphonic drain & water seal test
  drainageSeal: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="%23f1f5f9"/>
    <rect x="30" y="25" width="540" height="350" rx="12" fill="%23ffffff" stroke="%23818cf8" stroke-width="2"/>
    <!-- Siphon schematic diagram -->
    <path d="M 120 95 L 120 215 Q 120 275 180 275 L 260 275 Q 320 275 320 175 L 320 125" fill="none" stroke="%23cbd5e1" stroke-width="35" stroke-linecap="round"/>
    <!-- Water level in siphon -->
    <path d="M 120 205 L 120 215 Q 120 265 180 265 L 260 265 Q 310 265 310 205" fill="none" stroke="%2338bdf8" stroke-width="25"/>
    <!-- Measurement indicator -->
    <line x1="360" y1="205" x2="360" y2="265" stroke="%23d97706" stroke-width="3" stroke-dasharray="3,3"/>
    <text x="380" y="238" font-family="monospace" font-size="18" font-weight="bold" fill="%23b45309">h = 58 mm</text>
    <text x="380" y="258" font-family="sans-serif" font-size="11" fill="%2364748b">(Mínimo CTE DB-HS 5: 50 mm)</text>
    <!-- Inspection box -->
    <rect x="80" y="295" width="440" height="50" rx="8" fill="%23f0fdf4" stroke="%2310b981" stroke-width="1.5"/>
    <text x="300" y="325" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23047857" text-anchor="middle">✓ CIERRE HIDRÁULICO VERIFICADO CON LÁMINA ESTANCA</text>
  </svg>`
};
