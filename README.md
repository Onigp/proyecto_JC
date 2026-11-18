# CyberGuard Pyme

Sitio comercial responsive para servicios de ciberseguridad y productos Fortinet.

## Ejecutar localmente

```bash
npm start
```

Abrir `http://localhost:3000`.

## Páginas

- `index.html`: inicio, servicios, catálogo y asistente IA.
- `servicios.html`: servicios y formulario de cotización.
- `contacto.html`: formulario de consulta.
- `acerca_de.html`: metodología y marca.
- `admin.html`: panel administrativo.

## Demostración del panel

Usuario: `admin`  
Contraseña: `cyberguard2026`

El panel es una demostración frontend con `localStorage`. Para producción se debe sustituir por autenticación real en el backend.

## Backend

`backend/server.js` sirve el frontend y expone:

- `GET /api/catalogo`
- `POST /api/contacto`

## Publicación

Para GitHub Pages publicar la raíz del repositorio. Las rutas relativas están preparadas para el dominio principal del proyecto.
