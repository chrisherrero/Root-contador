# Contador de Puntos para Root 🌳🦊🐰🐦🐱🦎🦦🐀🦅🐻‍❄️

Una aplicación web completa y fácil de usar para llevar la cuenta de los puntos y facilitar las partidas del juego de mesa Root.

## Descripción 📜

Este contador digital reemplaza el tablero de puntuación físico. Permite configurar la partida, registrar puntos fácilmente, consultar reglas de preparación y guardar el progreso, todo desde una interfaz web accesible en cualquier dispositivo.

---
## Características ✨

### Configuración de Partida
* **Selección de Jugadores:** Elige entre **2 y 6 jugadores**.
* **Asignación de Facciones:** Cada jugador puede seleccionar su facción de una lista desplegable. La tarjeta del jugador adopta el **color característico** de la facción seleccionada.
* **Nombres Personalizados:** Escribe el nombre de cada jugador. Si no se especifica, se usa el nombre de la facción por defecto.
* **Validación de Alcance (Reach):**
    * Muestra el **alcance mínimo requerido** según el número de jugadores.
    * Calcula y muestra el **alcance actual** de las facciones seleccionadas, aplicando la regla especial de los Vagabundos (5 puntos si hay uno, 5/2 si están ambos).
    * **Interruptor (✓):** Permite **activar o desactivar** la validación. Si está activa, el botón "Comenzar Partida" se deshabilita si el alcance es insuficiente o si faltan facciones por asignar, mostrando un mensaje de error.
* **Aviso de secuaces:** Permite activar o desactivar el aviso para contratar un Hireling a llevar a los puntajes 4, 8 y 12 (por defecto desactivado).
* **Puntaje Máximo:** Define el **objetivo de puntos** para ganar la partida (por defecto 30).
* **Botón Reiniciar:** Restaura la configuración a los valores por defecto (4 jugadores, facciones predeterminadas).

---
### Contador de Puntos (Pantalla de Juego)
* **Interfaz Clara:** Muestra las tarjetas de cada jugador con su nombre, color de facción y puntaje.
* **Suma y Resta Fácil:** Botones grandes `+` y `-` para modificar los puntos de cada jugador.
    * **Prevención de Zoom:** El doble-tap en los botones `+` / `-` está **deshabilitado** en móviles para evitar zooms accidentales.
    * **Animación "Pop":** El número de puntos tiene una pequeña animación al cambiar para feedback visual.
* **Detección de Ganador:** Cuando un jugador alcanza o supera el puntaje máximo, aparece un **mensaje destacado** anunciando al ganador y su puntaje. Los botones de puntos se desactivan.
* **Detección de Hirelings:** Cuando un jugador alcanza los puntajes 4, 8 y 12, aparece un **mensaje destacado** anunciando que el jugador puede contratar un hireling.
* **Persistencia (LocalStorage):** La partida actual (facciones, nombres, puntos, puntaje máximo) se **guarda automáticamente** en el navegador. Si cierras o recargas la página, la partida se **restaura** al volver a abrirla.
* **Botón Volver:** Permite regresar a la pantalla de configuración. Requiere **confirmación** ("¿Estás seguro?") para evitar salidas accidentales y pérdida de la partida actual (la partida guardada se borra al volver).
* **Orden customizable:** se pueden reordenar las facciones en el tablero de juego sosteniendo y desplazandola.

---
### Asistente de Preparación (Modal)
* **Acceso Rápido:** Un **botón flotante "Preparaciones"** siempre visible.
* **Sugerencia de facciones:** elige aleatoriamente las facciones +1, con la posibilidad de exceptuar a las facciones que tengan a su hireling correspondiente en el tablero, estas se pueden seleccionar y configurar todas las veces que se quiera hasta que comience el juego.
* **Lista de Facciones:** Muestra todas las facciones disponibles, cada una con su color característico.
* **Reglas de Setup:** Para cada facción, botones "Normal" y/o "Avanzada" que abren una ventana de detalle con las **instrucciones de preparación** correspondientes (extraídas de las reglas oficiales). Los botones solo aparecen si existen esas reglas para la facción (ej: Señor de los Cientos solo tiene "Avanzada").
* **Navegación Intuitiva:** Se puede cerrar el detalle para volver a la lista, o cerrar todo clicando el fondo gris o la '✕'.
* **Bloqueo de Scroll:** Mientras los modales de preparación están abiertos, el **scroll de la página principal se bloquea**.

---
### Utilidades Adicionales
* **Enlace a Reglas Oficiales:** En los modales de preparación, un **enlace directo** al sitio web *Root Seiyria Companion* (`https://root.seiyria.com/`) para consultas más profundas. 📖
* **Código QR Dinámico:**
    * En ambos modales de preparación (lista y detalle), un enlace "QR".
    * Abre un modal con un **código QR generado al momento** que apunta al sitio *Root Seiyria Companion*. Útil para compartir rápidamente el enlace a las reglas con otros jugadores. 📲
* **Diseño Responsive:** La interfaz se adapta a pantallas de móviles, tablets y escritorio.
* **Preparado para PWA (Parcialmente):** Incluye los iconos (`apple-touch-icon`) y el archivo `manifest` necesarios para la funcionalidad básica de "Añadir a pantalla de inicio" en iOS y otras plataformas.

---
## Tecnologías Utilizadas 🛠️

* **HTML5:** Estructura semántica.
* **CSS3:** Estilos base, variables y animaciones.
* **Tailwind CSS:** Framework CSS para estilos utilitarios y responsivos.
* **JavaScript (Vanilla):** Toda la lógica interactiva, manipulación del DOM, manejo de eventos y `localStorage`.
* **qrcode.js:** Librería para la generación dinámica del código QR.

---
## Uso 🚀

1.  Abre el archivo `index.html` en tu navegador web.
2.  **Configura la partida:** Selecciona el número de jugadores, elige las facciones, ajusta el puntaje máximo si lo deseas y decide si quieres validar el alcance.
3.  Haz clic en "Comenzar Partida".
4.  Usa los botones `+` y `-` para actualizar los puntos durante el juego.
5.  Consulta las reglas de preparación usando el botón flotante si es necesario.
6.  La partida se guarda automáticamente. Si cierras la página, se restaurará al volver a abrirla.

Para un acceso más fácil, puedes alojar estos archivos en un servicio gratuito como GitHub Pages.

---
## Estructura del Proyecto 📁

* `index.html`: La estructura HTML principal.
* `style.css`: Todos los estilos CSS.
* `datos.js`: Variables con los datos de facciones (`facciones`, `alcanceMinimoPorJugadores`) y reglas de preparación (`prepData`, `factionColors`).
* `app.js`: Lógica principal del contador (configuración, suma/resta de puntos, guardado/carga).
* `modales.js`: Lógica de las ventanas emergentes (Preparación y QR).
* `rootIcon/`: Carpeta con los iconos para favicon y PWA (incluyendo `site.webmanifest`).
