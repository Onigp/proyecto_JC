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

## Fotografías del catálogo

Las fotos referenciales de infraestructura, Wi-Fi y llave USB se descargaron desde Unsplash y se almacenan localmente en `public/assents/img/`. Se utilizan bajo la [licencia de Unsplash](https://unsplash.com/license), que permite su uso gratuito en proyectos comerciales y no comerciales. No representan necesariamente los modelos Fortinet listados.

- Infraestructura de red: [foto Unsplash](https://images.unsplash.com/photo-1558494949-ef010cbdcc31)
- Router Wi-Fi: [foto Unsplash](https://images.unsplash.com/photo-1606904825846-647eb07f5be2)
- Conexiones Ethernet: [foto Unsplash](https://images.unsplash.com/photo-1544197150-b99a580bb7a8)
- Llave USB: [foto Unsplash](https://images.unsplash.com/photo-1551818014-7c8ace9c1b5c)
