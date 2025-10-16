# Million Luxury - Real Estate Property Management System

[![.NET](https://img.shields.io/badge/.NET-9.0-purple)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

Una aplicación full-stack moderna para gestionar propiedades inmobiliarias con una API RESTful en .NET y una interfaz de usuario profesional en Next.js.

## 📋 Descripción del Proyecto

Este proyecto fue desarrollado como parte de una prueba técnica para Senior Frontend Developer. Incluye:

- **Backend**: API RESTful construida con .NET 9 y MongoDB
- **Frontend**: Aplicación web moderna con Next.js 15, React 19 y TailwindCSS
- **Base de Datos**: MongoDB para almacenamiento de propiedades y propietarios
- **Testing**: Tests unitarios con NUnit
- **Documentación**: Swagger/OpenAPI para la API

## ✨ Características

### Backend (API)
- ✅ API RESTful con endpoints CRUD completos
- ✅ Filtros avanzados por nombre, dirección y rango de precio
- ✅ Arquitectura limpia con separación de capas (Models, DTOs, Services, Controllers)
- ✅ Manejo robusto de errores y logging
- ✅ Documentación automática con Swagger
- ✅ CORS configurado para desarrollo
- ✅ Tests unitarios con NUnit

### Frontend (Web)
- ✅ Interfaz moderna y responsive con TailwindCSS
- ✅ Componentes reutilizables y bien estructurados
- ✅ Sistema de filtros en tiempo real
- ✅ Vista de detalles de propiedades en modal
- ✅ Diseño profesional con animaciones suaves
- ✅ Optimización de imágenes con Next.js
- ✅ TypeScript para type-safety
- ✅ Manejo de estados de carga y errores

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────────┐     │
│  │   Pages    │  │ Components  │  │    Services      │     │
│  │            │  │             │  │    (API Calls)   │     │
│  └────────────┘  └─────────────┘  └──────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                             ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                       Backend (.NET 9)                       │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────────┐     │
│  │Controllers │  │  Services   │  │      Models      │     │
│  │            │  │             │  │      & DTOs      │     │
│  └────────────┘  └─────────────┘  └──────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                             ↕ MongoDB Driver
┌─────────────────────────────────────────────────────────────┐
│                        MongoDB Database                      │
│  ┌────────────────────┐     ┌──────────────────────┐        │
│  │   Properties       │     │       Owners         │        │
│  │   Collection       │     │     Collection       │        │
│  └────────────────────┘     └──────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Framework**: .NET 9 (ASP.NET Core Web API)
- **Database**: MongoDB 7.0+
- **ORM/Driver**: MongoDB.Driver 3.5.0
- **Documentation**: Swashbuckle (Swagger/OpenAPI)
- **Testing**: NUnit 3
- **Language**: C# 12

### Frontend
- **Framework**: Next.js 15.5 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS 4.1
- **HTTP Client**: Axios 1.12
- **Language**: TypeScript 5.9
- **Build Tool**: Next.js built-in compiler

## 📦 Estructura del Proyecto

```
frontend-million/
├── Backend/
│   ├── PropertyApi/
│   │   ├── Configuration/
│   │   │   └── MongoDbSettings.cs
│   │   ├── Controllers/
│   │   │   └── PropertiesController.cs
│   │   ├── DTOs/
│   │   │   └── PropertyDto.cs
│   │   ├── Models/
│   │   │   ├── Owner.cs
│   │   │   └── Property.cs
│   │   ├── Services/
│   │   │   ├── IPropertyService.cs
│   │   │   └── PropertyService.cs
│   │   ├── Scripts/
│   │   │   └── seed-data.js
│   │   ├── Program.cs
│   │   └── appsettings.json
│   └── PropertyApi.Tests/
│       └── PropertyServiceTests.cs
├── Frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── PropertyCard.tsx
│   │   │   ├── PropertyFilters.tsx
│   │   │   └── PropertyModal.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── types.ts
│   ├── public/
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- [.NET SDK 9.0+](https://dotnet.microsoft.com/download)
- [Node.js 18.0+](https://nodejs.org/)
- [MongoDB 7.0+](https://www.mongodb.com/try/download/community)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/wagarcia27/frontend-million.git
cd frontend-million
```

### 2. Configurar MongoDB

#### Opción A: MongoDB Local

1. Instalar MongoDB Community Edition
2. Iniciar el servicio MongoDB:
   ```bash
   # Windows
   net start MongoDB
   
   # Linux/Mac
   sudo systemctl start mongod
   ```

3. Cargar datos de ejemplo:
   ```bash
   cd Backend/PropertyApi/Scripts
   mongosh < seed-data.js
   ```

#### Opción B: MongoDB Atlas (Nube)

1. Crear una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster gratuito
3. Obtener la cadena de conexión
4. Actualizar `Backend/PropertyApi/appsettings.json`:
   ```json
   {
     "MongoDbSettings": {
       "ConnectionString": "tu-cadena-de-conexion-atlas",
       "DatabaseName": "PropertyDb",
       ...
     }
   }
   ```

### 3. Configurar y Ejecutar el Backend

```bash
cd Backend/PropertyApi

# Restaurar dependencias
dotnet restore

# Ejecutar la aplicación
dotnet run
```

La API estará disponible en: `http://localhost:5000`
Swagger UI: `http://localhost:5000/swagger`

### 4. Configurar y Ejecutar el Frontend

```bash
cd Frontend

# Instalar dependencias (si no están instaladas)
npm install

# Configurar variables de entorno
# Crear archivo .env.local con:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación web estará disponible en: `http://localhost:3000`

### 5. Ejecutar Tests

```bash
cd Backend/PropertyApi.Tests
dotnet test
```

## 📚 Documentación de la API

### Endpoints Principales

#### GET /api/properties
Obtiene todas las propiedades con filtros opcionales.

**Query Parameters:**
- `name` (string, opcional): Filtrar por nombre o dirección
- `minPrice` (decimal, opcional): Precio mínimo
- `maxPrice` (decimal, opcional): Precio máximo

**Ejemplo:**
```bash
GET http://localhost:5000/api/properties?name=apartment&minPrice=400000&maxPrice=1000000
```

#### GET /api/properties/{id}
Obtiene una propiedad específica por ID.

**Ejemplo:**
```bash
GET http://localhost:5000/api/properties/prop1
```

#### POST /api/properties
Crea una nueva propiedad.

**Body:**
```json
{
  "name": "Beautiful Villa",
  "address": "123 Main St, City, State",
  "price": 750000,
  "codeInternal": "PROP-001",
  "year": 2024,
  "idOwner": "owner1",
  "imageUrl": "https://example.com/image.jpg"
}
```

#### PUT /api/properties/{id}
Actualiza una propiedad existente.

#### DELETE /api/properties/{id}
Elimina una propiedad.

## 🎨 Características del Frontend

### Componentes Principales

1. **Header**: Barra de navegación con logo y menú
2. **PropertyFilters**: Sistema de filtros avanzado con búsqueda en tiempo real
3. **PropertyCard**: Tarjetas de propiedades con diseño moderno
4. **PropertyModal**: Vista detallada de propiedades con información del propietario

### Características UX/UI

- ✨ Diseño responsive para móviles, tablets y escritorio
- 🎭 Animaciones suaves y transiciones elegantes
- 🔍 Búsqueda y filtrado en tiempo real
- 📱 Optimizado para dispositivos móviles
- 🎨 Paleta de colores profesional
- ♿ Accesibilidad considerada

## 🧪 Testing

El proyecto incluye tests unitarios para el backend:

```csharp
// Ejemplo de test
[Test]
public async Task GetAllPropertiesAsync_WithPriceRange_ReturnsFilteredProperties()
{
    var filter = new PropertyFilterDto 
    { 
        MinPrice = 100000, 
        MaxPrice = 500000 
    };
    
    var result = await _propertyService.GetAllPropertiesAsync(filter);
    
    Assert.That(result, Is.Not.Null);
    Assert.That(result.All(p => p.Price >= 100000 && p.Price <= 500000), Is.True);
}
```

## 🔐 Seguridad y Mejores Prácticas

- ✅ Validación de entrada en controladores
- ✅ Manejo robusto de errores
- ✅ Logging estructurado
- ✅ CORS configurado apropiadamente
- ✅ Variables de entorno para configuración sensible
- ✅ Type-safety con TypeScript
- ✅ Arquitectura limpia y mantenible

## 🚢 Deployment

### Backend (.NET API)

**Azure App Service:**
```bash
dotnet publish -c Release
# Deploy to Azure App Service
```

**Docker:**
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "PropertyApi.dll"]
```

### Frontend (Next.js)

**Vercel (Recomendado):**
```bash
npm run build
vercel --prod
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

## 📊 Base de Datos

### Esquema de Propiedades

```javascript
{
  "idProperty": "string",
  "name": "string",
  "address": "string",
  "price": "decimal",
  "codeInternal": "string",
  "year": "int",
  "idOwner": "string",
  "imageUrl": "string"
}
```

### Esquema de Propietarios

```javascript
{
  "idOwner": "string",
  "name": "string",
  "address": "string",
  "photo": "string",
  "birthday": "DateTime"
}
```

## 🤝 Contribución

Este proyecto fue desarrollado como prueba técnica. Para sugerencias o mejoras:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas de Desarrollo

### Decisiones Técnicas

1. **MongoDB**: Elegido por su flexibilidad y escalabilidad para datos de propiedades
2. **Next.js App Router**: Para aprovechar las últimas características de Next.js
3. **TailwindCSS**: Para desarrollo rápido con diseño consistente
4. **TypeScript**: Para mejor mantenibilidad y prevención de errores
5. **Arquitectura en Capas**: Para facilitar testing y mantenimiento

### Mejoras Futuras

- [ ] Autenticación y autorización con JWT
- [ ] Paginación en el backend y frontend
- [ ] Sistema de favoritos
- [ ] Comparador de propiedades
- [ ] Chat en tiempo real
- [ ] Integración con mapas (Google Maps)
- [ ] Sistema de notificaciones
- [ ] Panel de administración completo
- [ ] Análisis y reportes

## 📧 Contacto

- **Email**: crios@millionluxury.com
- **GitHub**: [@wagarcia27](https://github.com/wagarcia27)
- **Proyecto**: [frontend-million](https://github.com/wagarcia27/frontend-million)

## 📄 Licencia

Este proyecto fue desarrollado como prueba técnica para Million Luxury Real Estate.

---

**Desarrollado con ❤️ para Million Luxury Real Estate - 2025**
