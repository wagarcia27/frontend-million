# PropertyApi - Backend

API RESTful para gestión de propiedades inmobiliarias construida con .NET 9 y MongoDB.

## 🚀 Inicio Rápido

### Requisitos
- .NET SDK 9.0+
- MongoDB 7.0+

### Instalación

1. Restaurar dependencias:
```bash
cd PropertyApi
dotnet restore
```

2. Configurar MongoDB en `appsettings.json`:
```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "PropertyDb",
    "PropertiesCollectionName": "Properties",
    "OwnersCollectionName": "Owners"
  }
}
```

3. Ejecutar la aplicación:
```bash
dotnet run
```

La API estará disponible en `http://localhost:5000`
Swagger UI en `http://localhost:5000/swagger`

## 🧪 Tests

```bash
cd PropertyApi.Tests
dotnet test
```

## 📚 Endpoints

- `GET /api/properties` - Obtener todas las propiedades con filtros opcionales
- `GET /api/properties/{id}` - Obtener una propiedad por ID
- `POST /api/properties` - Crear nueva propiedad
- `PUT /api/properties/{id}` - Actualizar propiedad
- `DELETE /api/properties/{id}` - Eliminar propiedad

## 🏗️ Arquitectura

```
PropertyApi/
├── Configuration/    # Configuraciones y settings
├── Controllers/      # API Controllers
├── DTOs/            # Data Transfer Objects
├── Models/          # Modelos de base de datos
├── Services/        # Lógica de negocio
└── Scripts/         # Scripts de utilidad
```

