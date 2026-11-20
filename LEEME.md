# App instalable (PWA) de Permutas

Esta carpeta es una **app instalable**: una página pequeña que se publica en GitHub Pages y, por dentro, abre la app de Apps Script a pantalla completa. Usa el mismo enlace y los mismos datos que la app de siempre. Por eso, cuando actualizas la app en Apps Script, la versión instalada ve el cambio sin hacer nada más.

**Por qué no se hace directamente en Apps Script.** Apps Script no deja publicar el archivo de «manifiesto» ni registrar un «service worker». Son las dos piezas que el navegador exige para instalar una página como app.

| Archivo | Para qué |
|---|---|
| `config.js` | **El único que editas:** el enlace /exec de tu app |
| `index.html` | La página instalable: muestra la app, la pantalla «Sin conexión» y la invitación a instalar |
| `manifest.webmanifest` | Nombre, colores e íconos de la app instalada |
| `sw.js` | Guarda una copia de esta página para que abra sin internet y muestre el aviso |
| `iconos/` | Íconos generados con `python3 tools/pwa_iconos.py` |

## Publicarla en GitHub Pages (unos 10 minutos, sin terminal)

1. Entra a <https://github.com>. Si no tienes cuenta, crea una gratuita. Su nombre de usuario formará la dirección de la app.
2. Pulsa **New repository** (nuevo repositorio):
   - **Repository name:** `permutas`;
   - **Public**;
   - pulsa **Create repository**.
3. Edita `config.js` en tu computador: entre las comillas de `urlApp` pega el enlace de tu app que termina en **/exec**. Lo encuentras en Apps Script → Implementar → Gestionar implementaciones.
4. En el repositorio, pulsa **uploading an existing file** (o **Add file → Upload files**). Arrastra **todo el contenido** de esta carpeta: `index.html`, `config.js`, `manifest.webmanifest`, `sw.js` y la carpeta `iconos`. Pulsa **Commit changes**.
5. Ve a **Settings → Pages**. En **Branch** elige `main` y la carpeta `/ (root)`, y pulsa **Save**.
6. Espera uno o dos minutos. Arriba aparece la dirección: `https://TU-USUARIO.github.io/permutas/`. Esa es la app instalable.
7. En la app de Permutas entra como superadministrador y ve a **Administrar → Ajustes**. En «Enlace de la app instalable» pega esa dirección y guarda. Desde ahí, la portada ofrece **Instalar la app**.

**Para enlazarla desde tu página (impulso.click):** pon un botón o enlace a `https://TU-USUARIO.github.io/permutas/`. No la insertes dentro de Google Sites: para que se pueda instalar, debe abrirse en su propia pestaña.

## Instalarla

- **Android (Chrome):** abre la dirección. Arriba sale «Instala Permutas SED…» con el botón **Instalar**. También está en el menú ⋮ → «Instalar aplicación».
- **Computador (Chrome o Edge):** usa el botón Instalar de la barra o el ícono de instalar en la barra de direcciones.
- **iPhone o iPad (Safari):** toca **Compartir** y luego **Agregar a inicio**.

## Cosas que conviene saber

- **Necesita internet.** Los datos viven en Google. Sin conexión, la app muestra «Sin conexión» con el botón «Intentar de nuevo» y se abre sola cuando vuelve el internet.
- **La sesión va aparte.** La primera vez, dentro de la app instalada hay que entrar con el código del correo, aunque ya se haya entrado por el enlace directo.
- **Si cambias el enlace /exec** (no debería pasar si publicas con «Nueva versión»), edita `config.js` en GitHub y guarda. Para que todos reciban la copia nueva rápido, sube también el número de `VERSION` en `sw.js`.
- **No probado en iPhone real.** Las pruebas automáticas usan Chrome: allí la app es instalable y pasa la revisión de accesibilidad. Pruébala en un iPhone antes de anunciarla.
- **Dominio propio (opcional, más adelante).** En Settings → Pages → Custom domain puedes usar, por ejemplo, `permutas.impulso.click`. Para eso necesitas crear un registro CNAME en el DNS de tu dominio.
