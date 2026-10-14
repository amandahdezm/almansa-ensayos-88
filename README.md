# Control de Ensayos de Obra — Promoción 88 Viviendas (C/ Almansa)

Aplicación web profesional interactiva para el seguimiento, control de calidad y validación de ensayos de instalaciones de edificación (CTE DB-HS 4, CTE DB-HS 5, REBT y RITE) para la **Dirección Facultativa** y la **Constructora**.

---

## 🚀 Características Principales

1. **Control de Acceso y Modo de Edición:**
   - Modo protegido "Solo Lectura" por defecto.
   - Desbloqueo mediante clave maestra (por defecto: `88OBRA`).
   - Botón de bloqueo instantáneo para evitar modificaciones no deseadas.
2. **Panel Resumen, KPIs y Selector Dinámico:**
   - Tarjetas métricas: Total Ensayos, Conformes, No Conformes / Fallos y Pendientes.
   - Barra animada de progreso global de conformidad.
   - Selector dinámico de las **88 viviendas individuales** y zonas comunes (Centralización de Contadores / RITI e Infraestructuras Generales).
   - Filtro por disciplina: *Fontanería y Clima*, *Saneamiento*, *Baja Tensión* y *Todas*.
3. **Base Técnica Normativa Precargada:**
   - Más de 500 ensayos estructurados con criterios de aceptación cuantitativos según el Código Técnico de la Edificación y el Reglamento Electrotécnico de Baja Tensión.
4. **Ficha de Ensayo y Registro Fotográfico:**
   - Selector táctil de 3 estados (Conforme, No Conforme, Pendiente).
   - Observaciones técnicas editables con sugerencias rápidas.
   - Galería de evidencias fotográficas con visor modal de alta resolución y soporte de cámara móvil en obra.
   - Persistencia local en el navegador mediante `localStorage`.
5. **Exportación Oficial de Acta en PDF:**
   - Generación instantánea de acta oficial maquetada con `jsPDF` y `jspdf-autotable`.
   - Encabezado técnico formal, desglose de ensayos filtrados y casillas de firma colegial y de empresa constructora.

---

## 🛠️ Tecnologías

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Lucide Icons**
- **jsPDF** & **jspdf-autotable**
- **Canvas-Confetti**

---

## ⚡ Despliegue en Vercel

1. Inicia sesión en [Vercel](https://vercel.com).
2. Haz clic en **"Add New..."** > **"Project"**.
3. Selecciona el repositorio de GitHub: `almansa-ensayos-88`.
4. Vercel detectará automáticamente la configuración de **Vite**:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Haz clic en **"Deploy"**. En menos de 1 minuto tendrás la aplicación desplegada y accesible desde cualquier dispositivo móvil, tablet o PC.

---

## 📄 Créditos y Derechos

© 2026 Amanda Hernández Montesdeoca – AHM Ingeniería. Todos los derechos reservados.  
**Email de contacto:** [amanda@ahmingenieria.com](mailto:amanda@ahmingenieria.com)
