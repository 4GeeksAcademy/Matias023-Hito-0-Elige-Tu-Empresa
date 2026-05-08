# TrackFlow Public Site

## Objetivo
Desarrollar la interfaz pública inicial de TrackFlow para presentar la propuesta de valor logística B2B y captar solicitudes comerciales mediante un formulario accesible y validado.

## Tecnologías
- HTML5 semántico
- Tailwind CSS v4 vía CDN
- JavaScript vanilla

## Archivos
- `index.html`: landing corporativa con hero, servicios, cobertura, beneficios, contacto y footer.
- `application.html`: formulario de solicitud completo, accesible y responsive.
- `validation.js`: validación integral del formulario, mensajes de error, foco en primer error, contador de caracteres y simulación de éxito.

## Cómo ejecutar
1. Abrir la carpeta `uis/public-site` en el navegador o con servidor local.
2. Cargar `index.html` para revisar la landing.
3. Navegar a `application.html` y probar validaciones del formulario.

## Checklist funcional
- [x] Landing corporativa completa de TrackFlow.
- [x] Navegación responsive y mobile-first.
- [x] Tailwind CSS v4 por CDN.
- [x] Sin `styles.css`, sin `<style>` y sin `style=""`.
- [x] HTML semántico y accesible con jerarquía correcta.
- [x] SEO básico implementado (title, description, canonical, meta social).
- [x] Schema.org JSON-LD implementado.
- [x] Formulario con labels e IDs asociados correctamente.
- [x] Fieldsets y mensajes de error por campo.
- [x] Validación de inputs, select, radio, checkbox y textarea.
- [x] `aria-invalid` y foco en primer error.
- [x] Contador de caracteres del textarea.
- [x] Mensaje de éxito sin `alert()`.
