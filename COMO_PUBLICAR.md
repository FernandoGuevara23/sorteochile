# Cómo Publicar tu Página de Rifa

¡Tu página está lista! Aquí tienes las formas más fáciles y rápidas de ponerla en internet para que todos puedan verla.

## Opción 1: Netlify Drop (La más fácil y rápida)
Esta opción es ideal si no quieres instalar nada ni usar comandos. Solo arrastras tu carpeta y listo.

1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Busca la carpeta de tu proyecto en tu computadora (**Sorteo-Chile**).
3. Arrástrala y suéltala en el cuadro que dice "Drag and drop your site output folder here".
4. Espera unos segundos y Netlify te dará un link (ej: `brave-curie-123456.netlify.app`).
5. **¡Listo!** Ya puedes compartir ese link.

**Tip:** Puedes cambiar el nombre del link en "Site settings" -> "Change site name" para que sea algo como `rifa-fernando-chile.netlify.app`.

## Opción 2: Vercel (Muy profesional y rápida)
Similar a Netlify, pero muy popular para desarrolladores.

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (puedes usar GitHub, Google, etc).
2. Instala Vercel CLI si quieres usar comandos, o simplemente usa la web.
3. Para hacerlo desde la web sin comandos:
   - Sube tu código a **GitHub** (ver Opción 3).
   - En Vercel, dale a "Add New..." -> "Project".
   - Importa tu repositorio de GitHub.
   - Dale a "Deploy".

## Opción 3: GitHub Pages (Si ya usas Git)
Si tienes tu código en GitHub, esta es una excelente opción gratuita.

1. Crea un repositorio en [github.com](https://github.com) y sube tus archivos.
2. Ve a la pestaña **Settings** (Configuración) de tu repositorio.
3. En el menú de la izquierda, busca **Pages**.
4. En "Branch", selecciona `main` o `master` y la carpeta `/root`.
5. Dale a **Save**.
6. En unos minutos, tu página estará disponible en `https://tu-usuario.github.io/tu-repositorio`.

---

### 📝 No olvides actualizar `config.js`
Antes de publicar, asegúrate de que en tu archivo `config.js` hayas puesto:
- Tu número de WhatsApp real.
- Los links correctos de tus redes sociales.
- La URL final de tu página (cuando ya la tengas) en la sección `pageUrl`.
