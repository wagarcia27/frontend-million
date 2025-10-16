# Frontend - Million Luxury

Aplicación web moderna para gestión de propiedades inmobiliarias construida con Next.js 15 y React 19.

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18.0+
- npm o yarn

### Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estructura

```
app/
├── components/       # Componentes React reutilizables
│   ├── Header.tsx           # Barra de navegación
│   ├── PropertyCard.tsx     # Tarjeta de propiedad
│   ├── PropertyFilters.tsx  # Sistema de filtros
│   └── PropertyModal.tsx    # Modal de detalles
├── services/        # Servicios API
│   └── api.ts              # Cliente API con Axios
├── globals.css      # Estilos globales
├── layout.tsx       # Layout principal
├── page.tsx         # Página principal
└── types.ts         # Definiciones TypeScript
```

## 🎨 Características

- ✨ Diseño responsive y moderno
- 🔍 Búsqueda y filtrado en tiempo real
- 📱 Optimizado para móviles
- 🎭 Animaciones suaves
- ♿ Accesible

## 🛠️ Scripts

- `npm run dev` - Modo desarrollo
- `npm run build` - Build de producción
- `npm run start` - Iniciar producción
- `npm run lint` - Linter

## 📦 Tecnologías

- Next.js 15.5
- React 19
- TypeScript 5.9
- TailwindCSS 4.1
- Axios 1.12

