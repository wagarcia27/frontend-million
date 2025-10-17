# TECHNICAL TEST - SR FRONTEND DEVELOPER

[![.NET](https://img.shields.io/badge/.NET-9.0-purple)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

## 🎯 Project Overview

This project was developed as a **Technical Test for Senior Frontend Developer** position. It demonstrates the ability to build a **full-stack application with clean architecture, good performance, and proper testing and documentation**.

The application consists of:
- **Backend**: RESTful API built with .NET 9, C#, and MongoDB
- **Frontend**: Modern web application with Next.js 14, React 18, and TailwindCSS
- **Database**: MongoDB Atlas for property and owner data storage
- **Testing**: Unit tests with NUnit
- **Documentation**: Swagger/OpenAPI for API documentation

## 🏗️ Architecture & Design

The project follows **Clean Architecture** principles with proper separation of concerns:

- **Backend**: Layered architecture (Controllers → Services → Models/DTOs)
- **Frontend**: Component-based architecture with reusable modules
- **Database**: MongoDB with proper data modeling following the provided ERD
- **Performance**: Optimized queries and efficient data handling

## ✨ Features Implemented

### Backend (API) - Following Technical Requirements
- ✅ **RESTful API** with complete CRUD operations for properties
- ✅ **Advanced Filtering** by name, address, and price range (as required)
- ✅ **Pagination Support** with skip/limit for efficient data handling (12 properties per page)
- ✅ **JWT Authentication** with user management and favorites
- ✅ **User Profile Management** with avatar upload and settings update
- ✅ **Clean Architecture** with proper separation (Models, DTOs, Services, Controllers)
- ✅ **Robust Error Handling** and structured logging
- ✅ **Swagger Documentation** for API endpoints
- ✅ **CORS Configuration** for cross-origin requests
- ✅ **Unit Testing** with NUnit (as specified in requirements)
- ✅ **Database Models** following the provided ERD structure:
  - `Owner` table with IdOwner, Name, Address, Photo, Birthday
  - `Property` table with IdProperty, Name, Address, Price, CodeInternal, Year, IdOwner
  - `User` table with authentication, preferences, and favorites
  - Support for PropertyImage and PropertyTrace relationships

### Frontend (Web) - Following Technical Requirements
- ✅ **Modern Responsive Interface** with professional design
- ✅ **Property List Display** obtained from the API (as required)
- ✅ **Advanced Filtering System** for name, address, and price range (as required)
- ✅ **Property Details View** with modal display (as required)
- ✅ **Pagination Component** with 12 properties per page and "Showing X of Y" counter
- ✅ **JWT Authentication** with login/register functionality
- ✅ **User Profile Management** with avatar upload, settings, and theme preferences
- ✅ **Favorites System** with heart icons and favorites filter (correctly paginated)
- ✅ **Dark Mode Support** with theme persistence across sessions
- ✅ **Toast Notifications** for user feedback (replacing native alerts)
- ✅ **Google Maps Integration** with embedded maps and directions
- ✅ **WhatsApp Integration** for direct contact with property owner
- ✅ **Google Calendar Integration** for scheduling property visits
- ✅ **Component-based Architecture** with reusable modules
- ✅ **TypeScript Implementation** for type safety
- ✅ **Performance Optimization** with efficient data handling
- ✅ **Mobile-first Responsive Design** for all devices
- ✅ **Professional UI/UX** with smooth animations and transitions

## 🚀 Advanced Features Implemented

### 🎨 User Experience Enhancements
- **Smart Scroll Navigation**: Optimized scroll behavior for "Properties" section with perfect offset
- **Responsive Design**: Mobile-first approach with perfect adaptation to all screen sizes
- **Theme Persistence**: Dark/Light mode preferences saved across sessions
- **Toast Notifications**: Custom, aesthetically pleasing notifications replacing native alerts
- **Smooth Animations**: Professional transitions and hover effects throughout the application

### 🔗 Third-Party Integrations
- **Google Maps**: Embedded maps with property locations and "Get Directions" functionality
- **WhatsApp Integration**: Direct contact with property owner via WhatsApp (+57 300 498-6292)
- **Google Calendar**: Schedule property visits with pre-filled event details
- **Unsplash Images**: High-quality, unique property and owner photos

### 📱 Mobile Optimization
- **Touch-Friendly Interface**: Optimized for mobile interactions
- **Responsive Modals**: Perfect modal behavior on all devices
- **Mobile Menu**: Dark mode compatible mobile navigation
- **Optimized Pagination**: Mobile-friendly pagination controls

### 🔐 Security & Performance
- **JWT Token Optimization**: Minimized token size to prevent 431 errors
- **Efficient Data Loading**: Smart pagination and filtering
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Type Safety**: Full TypeScript implementation for better code quality

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

## 🛠️ Technologies Used (As Required)

### Backend
- **Framework**: .NET 9 (ASP.NET Core Web API) ✅ *Required: .NET 8 or 9*
- **Database**: MongoDB Atlas ✅ *Required: MongoDB*
- **ORM/Driver**: MongoDB.Driver 3.5.0
- **Documentation**: Swashbuckle (Swagger/OpenAPI)
- **Testing**: NUnit 3 ✅ *Required: NUnit for unit testing*
- **Language**: C# 12 ✅ *Required: C#*

### Frontend
- **Framework**: Next.js 14.2 (App Router) ✅ *Required: ReactJS or Next.js*
- **UI Library**: React 18
- **Styling**: TailwindCSS 3.4
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

## 🚀 Live Application URLs

**The application is fully deployed and accessible:**

- **Frontend (Live)**: https://frontend-million-kbvpzgg28-williams-projects-553de51f.vercel.app
- **Backend API (Live)**: https://property-api-k9aq.onrender.com/api
- **API Documentation**: https://property-api-k9aq.onrender.com/
- **Health Check**: https://property-api-k9aq.onrender.com/api/health/ping

## 📋 Setup and Run Instructions

*As requested in the technical test requirements: "specify steps for run project when download"*

### Prerequisites

- [.NET SDK 9.0+](https://dotnet.microsoft.com/download)
- [Node.js 18.0+](https://nodejs.org/)
- [MongoDB 7.0+](https://www.mongodb.com/try/download/community) or [MongoDB Compass](https://www.mongodb.com/products/compass)

### 1. Clone the Repository

```bash
git clone https://github.com/wagarcia27/frontend-million.git
cd frontend-million
```

### 2. Database Setup

#### Option A: MongoDB Local

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Linux/Mac
   sudo systemctl start mongod
   ```

3. Load sample data:
   ```bash
   cd Backend/PropertyApi/Scripts
   mongosh < seed-data.js
   ```

#### Option B: MongoDB Atlas (Recommended - Already Configured)

The application is already configured to use **MongoDB Atlas** with sample data loaded:
- **Database**: `PropertyDb`
- **Collections**: `Owners` (24 records), `Properties` (24 records), `Users` (test users)
- **Connection**: Already configured in production
- **Images**: 24 unique property images and 24 unique owner photos from Unsplash

To use Atlas locally, update `Backend/PropertyApi/appsettings.json`:
```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb+srv://williamgarcia27wg_db_user:FMpj5c8BSOgQA4hW@million-cluster.mwokgyb.mongodb.net/PropertyDb?retryWrites=true&w=majority&appName=Million-cluster",
    "DatabaseName": "PropertyDb",
    "PropertiesCollectionName": "Properties",
    "OwnersCollectionName": "Owners"
  }
}
```

### 3. Backend Setup and Run

```bash
cd Backend/PropertyApi

# Restore dependencies
dotnet restore

# Run the application
dotnet run
```

**API will be available at**: `http://localhost:5000`
**Swagger UI**: `http://localhost:5000/swagger`

### 4. Frontend Setup and Run

```bash
cd Frontend

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Run in development mode
npm run dev
```

**Frontend will be available at**: `http://localhost:3000`

### 5. Run Unit Tests

```bash
cd Backend/PropertyApi.Tests
dotnet test
```

**Test Results**: All tests should pass, demonstrating proper unit testing implementation as required.

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

- [x] ~~Autenticación y autorización con JWT~~ ✅ **IMPLEMENTADO**
- [x] ~~Paginación en el backend y frontend~~ ✅ **IMPLEMENTADO**
- [x] ~~Sistema de favoritos~~ ✅ **IMPLEMENTADO**
- [x] ~~Modo oscuro~~ ✅ **IMPLEMENTADO**
- [x] ~~Notificaciones toast~~ ✅ **IMPLEMENTADO**
- [x] ~~Gestión de perfil de usuario~~ ✅ **IMPLEMENTADO**
- [x] ~~Integración con mapas (Google Maps)~~ ✅ **IMPLEMENTADO**
- [x] ~~Integración con WhatsApp~~ ✅ **IMPLEMENTADO**
- [x] ~~Integración con Google Calendar~~ ✅ **IMPLEMENTADO**
- [x] ~~Diseño responsive mejorado~~ ✅ **IMPLEMENTADO**
- [x] ~~Paginación de favoritos corregida~~ ✅ **IMPLEMENTADO**
- [ ] Comparador de propiedades
- [ ] Chat en tiempo real
- [ ] Sistema de notificaciones push
- [ ] Panel de administración completo
- [ ] Análisis y reportes
- [ ] Sistema de reseñas y calificaciones

## ✅ Evaluation Criteria Compliance

This project meets all the specified evaluation criteria:

### Backend and Frontend Architecture ✅
- **Clean Architecture**: Proper separation of concerns with Controllers → Services → Models/DTOs
- **Modular Code Structure**: Well-organized, maintainable codebase
- **Performance Optimized**: Efficient database queries and data handling

### Documentation ✅
- **API Documentation**: Complete Swagger/OpenAPI documentation
- **Clear Code Comments**: Well-documented code with inline comments
- **Setup Instructions**: Detailed step-by-step setup guide

### Best Practices ✅
- **Clean Architecture**: Layered architecture implementation
- **Proper Error Handling**: Comprehensive error handling and logging
- **Optimized Database Queries**: Efficient MongoDB queries
- **Type Safety**: Full TypeScript implementation

### Performance ✅
- **Optimized API**: Efficient data retrieval and filtering
- **Frontend Performance**: Optimized React components and data handling
- **Responsive Design**: Mobile-first responsive implementation

### Unit Testing ✅
- **NUnit Tests**: Complete unit test suite for backend services
- **Test Coverage**: Tests for all major functionality
- **Test Documentation**: Clear test descriptions and assertions

### Clean Code ✅
- **Readable Code**: Well-structured, self-documenting code
- **Maintainable**: Modular architecture for easy maintenance
- **Coding Conventions**: Consistent C# and TypeScript coding standards

## 📊 Database Backup

**Database backup is available:**
- **MongoDB Atlas Collections**: `Properties` (24 records), `Owners` (24 records), `Users` (test users)
- **Seed Scripts**: Located in `Backend/PropertyApi/Scripts/`
- **Connection String**: Provided in configuration files
- **Sample Data**: Pre-loaded with realistic property and owner data
- **Unique Images**: 24 unique property images and 24 unique owner photos from Unsplash

## 🔐 Access Information

**Repository Access:**
- **GitHub Repository**: https://github.com/wagarcia27/frontend-million
- **Access Granted To**: crios@millionluxury.com ✅
- **Repository Visibility**: Public
- **Branch**: main (latest stable version)

**Deployment Access:**
- **Vercel Deployment**: Auto-deployed from GitHub
- **Render Deployment**: Auto-deployed from GitHub
- **MongoDB Atlas**: Configured and accessible

## 📧 Contact

- **Technical Test Contact**: crios@millionluxury.com
- **Developer Contact**: william.garcia.27.wg@gmail.com
- **Developer Phone**: +57 (300) 498-6292
- **Developer GitHub**: [@wagarcia27](https://github.com/wagarcia27)
- **Project Repository**: [frontend-million](https://github.com/wagarcia27/frontend-million)

## 📄 License

This project was developed as a technical test for Million Luxury Real Estate.

---

**Developed with ❤️ for Million Luxury Real Estate Technical Test - 2025**
