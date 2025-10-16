# 🚀 Guía de Configuración Rápida

Esta guía te ayudará a ejecutar el proyecto en menos de 5 minutos.

## Paso 1: Instalar MongoDB (si no lo tienes)

### Windows
1. Descargar desde: https://www.mongodb.com/try/download/community
2. Instalar con configuración predeterminada
3. MongoDB se ejecutará automáticamente como servicio

### Linux/Mac
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Mac (con Homebrew)
brew install mongodb-community
brew services start mongodb-community
```

## Paso 2: Cargar Datos de Ejemplo

```bash
cd Backend/PropertyApi/Scripts
mongosh < seed-data.js
```

Esto creará:
- 4 propietarios de ejemplo
- 8 propiedades de ejemplo

## Paso 3: Ejecutar el Backend

```bash
cd Backend/PropertyApi
dotnet restore
dotnet run
```

✅ Backend corriendo en: http://localhost:5000
📚 Swagger UI: http://localhost:5000/swagger

## Paso 4: Ejecutar el Frontend

**En una nueva terminal:**

```bash
cd Frontend
npm install
npm run dev
```

✅ Frontend corriendo en: http://localhost:3000

## 🎉 ¡Listo!

Abre tu navegador en `http://localhost:3000` y disfruta de la aplicación.

## 🔧 Solución de Problemas

### El backend no inicia
- Verifica que MongoDB esté corriendo: `mongosh` (debe conectarse)
- Verifica que el puerto 5000 esté libre

### El frontend no muestra datos
- Verifica que el backend esté corriendo en http://localhost:5000
- Revisa la consola del navegador para errores
- Verifica el archivo `.env.local` en la carpeta Frontend

### MongoDB no se conecta
- Asegúrate de que MongoDB esté corriendo
- Verifica la cadena de conexión en `Backend/PropertyApi/appsettings.json`

## 📱 Para Testing

### Ejecutar tests del backend:
```bash
cd Backend/PropertyApi.Tests
dotnet test
```

### Probar la API con Swagger:
1. Ir a http://localhost:5000/swagger
2. Probar los diferentes endpoints
3. Ver las respuestas en tiempo real

## 🌐 Variables de Entorno

### Backend (`appsettings.json`)
```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "PropertyDb"
  }
}
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

**¿Necesitas ayuda?** Consulta el README.md principal para más detalles.

