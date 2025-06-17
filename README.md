# MVP Landing Page - Reclutamiento Polonia

Landing page para reclutamiento de trabajadores latinoamericanos para Polonia.

## Requisitos

- Node.js (opcional, solo para desarrollo local)
- Cuenta de Supabase

## Configuración

1. Crear un proyecto en Supabase
2. Crear una tabla `candidates` con los siguientes campos:
   - id (uuid, primary key)
   - nombre (text)
   - email (text)
   - habilidades (text[])
   - experiencia (integer)
   - idiomas (text[])
   - pais (text)
   - cv_pdf_url (text)
   - fecha_subida (timestamp with time zone)
3. Habilitar Supabase Storage y crear un bucket llamado `cvs`
4. Actualizar las credenciales en `scripts/config.js`

## Despliegue

Puedes desplegar este proyecto en cualquier servicio de hosting estático como:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- Supabase Storage (para archivos estáticos)

## Estructura de la Base de Datos

Ejecuta este SQL en Supabase para crear la tabla:

```sql
CREATE TABLE candidates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    habilidades TEXT[] NOT NULL,
    experiencia INTEGER NOT NULL,
    idiomas TEXT[] NOT NULL,
    pais TEXT NOT NULL,
    cv_pdf_url TEXT NOT NULL,
    fecha_subida TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_candidates_email ON candidates(email);