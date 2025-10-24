
const pantallaConfig = document.getElementById('pantalla-config');
const pantallaJuego = document.getElementById('pantalla-juego');
const numJugadoresSelect = document.getElementById('numJugadores');
const tablero = document.getElementById('tablero');
const alcanceMinDiv = document.getElementById('alcanceMin');
const alcanceActualDiv = document.getElementById('alcanceActual');
const mensajeErrorDiv = document.getElementById('mensajeError');
const iniciarBtn = document.getElementById('iniciarBtn');
const resetBtn = document.getElementById('resetBtn');
const switchAlcance = document.getElementById('switchAlcance');
const maxPuntosInput = document.getElementById('maxPuntos');

const tableroJuego = document.getElementById('tableroJuego');
const volverBtn = document.getElementById('volverBtn');
const maxPuntosJuegoSpan = document.getElementById('maxPuntosJuego');
const mensajeGanadorDiv = document.getElementById('mensajeGanador');

numJugadoresSelect.addEventListener('change', generarTablero);
resetBtn.addEventListener('click', generarTablero);
iniciarBtn.addEventListener('click', comenzarPartida);
// reemplazo: doble confirm estilo "¿Estás seguro?"
let volverConfirmando = false;
let volverTimeoutId = null;

volverBtn.addEventListener('click', () => {
if (!volverConfirmando) {
    volverConfirmando = true;
    const originalText = volverBtn.textContent;
    volverBtn.textContent = '¿Estás seguro?';
    // volver al texto original pasados 3s si no se confirma
    volverTimeoutId = setTimeout(() => {
    volverConfirmando = false;
    volverBtn.textContent = originalText;
    }, 3000);
} else {
    // si ya estaba en modo confirmación, hacemos la acción real
    if (volverTimeoutId) { clearTimeout(volverTimeoutId); volverTimeoutId = null; }
    volverConfirmando = false;
    volverBtn.textContent = 'Volver';
    // llamar a la función que ya tenías
    volverAConfig();
}
});

/* util contraste */
function esColorOscuro(hex){
hex = hex.replace('#','');
const r = parseInt(hex.substring(0,2),16);
const g = parseInt(hex.substring(2,4),16);
const b = parseInt(hex.substring(4,6),16);
const brillo = (r*299 + g*587 + b*114) / 1000;
return brillo < 150;
}

/* genera selects por jugadores y preselecciona facciones únicas por orden */
function generarTablero(){
const n = parseInt(numJugadoresSelect.value);
alcanceMinDiv.textContent = alcanceMinimoPorJugadores[n];
mensajeErrorDiv.textContent = '';
iniciarBtn.disabled = true;
tablero.innerHTML = '';

// preselección única: las primeras n facciones del array
const preseleccion = facciones.slice(0,n).map(f=>f.nombre);

for(let i=0;i<n;i++){
    const card = document.createElement('div');
    card.className = 'jugador';

    // pintamos todo el card con color por defecto de la facción preseleccionada
    const facPre = facciones[i % facciones.length];
    card.style.background = facPre.color;
    // texto del nombre por defecto = nombre de la faccion
    const nombreInput = document.createElement('input');
    nombreInput.className = 'nombre-j';
    nombreInput.type = 'text';
    nombreInput.value = facPre.nombre;
    nombreInput.dataset.default = facPre.nombre;

    // selector y etiqueta alcance
    const selRow = document.createElement('div');
    selRow.className = 'selector-row';
    const select = document.createElement('select');
    select.id = `faccionSelect_${i}`;

    // construir opciones; para vagabundos mostramos (5/2) en la etiqueta

// opciones de facciones
facciones.forEach(f => {
let label = `${f.nombre} (${f.alcanceBase})`;
if(f.nombre === 'Vagabundo (B)' || f.nombre === 'Vagabundo (N)') {
    label = `${f.nombre} (5/2)`; 
}
const opt = document.createElement('option');
opt.value = f.nombre;
opt.textContent = label;
opt.style.color = '#000';       // <-- color oscuro fijo
select.appendChild(opt);
});


    // preselección de la facción única por defecto
    if(preseleccion[i]) select.value = preseleccion[i];

    const alcanceLabel = document.createElement('div');
    alcanceLabel.className = 'alcance-valor';
    alcanceLabel.id = `alcVal_${i}`;
    alcanceLabel.textContent = '-';

    selRow.appendChild(select);
    selRow.appendChild(alcanceLabel);

    // puntos display (sólo visual en config)
    const puntosDiv = document.createElement('div');
    puntosDiv.className = 'puntos';
    puntosDiv.textContent = ''; // quitamos el 0 inútil

    // montar card
    card.appendChild(nombreInput);
    card.appendChild(selRow);
    card.appendChild(puntosDiv);
    tablero.appendChild(card);

    // evento select
    select.addEventListener('change', manejarCambio);
    // si se cambia el nombre a vacío, devolver al nombre por defecto (faccion) cuando cambie facción
    nombreInput.addEventListener('input', ()=>{ /* nada por ahora */ });
}

// actualizar todo
manejarCambio();
}


/* maneja cambios: evita duplicados, actualiza colores de card y alcances por select */
function manejarCambio(){
const selects = Array.from(document.querySelectorAll("select[id^='faccionSelect_']"));
const seleccionadas = selects.map(s => s.value).filter(v=>v && v.length>0);

// deshabilitar duplicados (salvo en su propio select)
selects.forEach(sel => {
    const valorActual = sel.value;
    Array.from(sel.options).forEach(opt => {
        if(opt.value === '') { 
            opt.disabled = false; 
            opt.style.color = '#000';  // siempre negro
            return; 
        }

        if(opt.value !== valorActual && seleccionadas.includes(opt.value)) {
            opt.disabled = true;
            opt.style.color = '#888'; // gris clarito para los no disponibles
        } else {
            opt.disabled = false;
            opt.style.color = '#000'; // negro para los disponibles
        }
    }); // cierra Array.from(sel.options).forEach
}); // cierra selects.forEach



// actualizar color de cada card y el texto del nombre (si es el nombre default lo actualiza al nombre de la faccion)
selects.forEach((sel, idx) => {
    const val = sel.value;
    const card = sel.closest('.jugador');
    const nombreInput = card.querySelector('.nombre-j');
    if(val){
    const f = facciones.find(x=>x.nombre===val);
    card.style.background = f.color;
    // si el nombre coincide con el nombre por defecto anterior o está vacío, setear nombre por defecto
    if(!nombreInput.value || nombreInput.value === nombreInput.dataset.default) {
        nombreInput.value = f.nombre;
    }
    nombreInput.dataset.default = f.nombre;
    // colores de texto y puntos se adaptan para legibilidad
    nombreInput.style.color = esColorOscuro(f.color) ? '#fff' : '#000';
    nombreInput.style.background = esColorOscuro(f.color) ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.85)';
    const puntosDiv = card.querySelector('.puntos');
    sel.style.color = esColorOscuro(f.color) ? '#fff' : '#000';
    sel.style.background = esColorOscuro(f.color) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.95)';
    puntosDiv.style.color = esColorOscuro(f.color) ? '#fff' : '#000';
    puntosDiv.style.background = esColorOscuro(f.color) ? 'rgba(0,0,0,0.26)' : 'rgba(255,255,255,0.85)';
    } else {
    // sin selección: card neutro
    card.style.background = 'linear-gradient(135deg,#444,#222)';
    nombreInput.dataset.default = '';
    sel.style.color = '#000';
    sel.style.background = 'rgba(255,255,255,0.95)';
    }
});

// recalcular alcance total y actualizar alcances por select (regla vagabundos)
calcularAlcanceYActualizarUI();
}

/* calcula alcance total y fija el valor al lado de cada select */
function calcularAlcanceYActualizarUI(){
const selects = Array.from(document.querySelectorAll("select[id^='faccionSelect_']"));
const nombres = selects.map(s=>s.value);

const idxVB = nombres.indexOf('Vagabundo (B)');
const idxVN = nombres.indexOf('Vagabundo (N)');
const hayVB = idxVB !== -1;
const hayVN = idxVN !== -1;

let total = 0;

selects.forEach((sel, idx) => {
    const val = sel.value;
    const alcElem = document.getElementById(`alcVal_${idx}`);
    if(!val){ alcElem.textContent = '-'; return; }

    let f = facciones.find(x=>x.nombre === val);
    let alcanceAqui = f.alcanceBase;

    if(val === 'Vagabundo (B)' || val === 'Vagabundo (N)'){
    if(hayVB && hayVN){
        // ambos presentes -> primero en orden = 5, segundo = 2
        if(idxVB < idxVN){
        alcanceAqui = (val === 'Vagabundo (B)') ? 5 : 2;
        } else {
        alcanceAqui = (val === 'Vagabundo (N)') ? 5 : 2;
        }
    } else {
        // solo uno -> 5
        alcanceAqui = 5;
    }
    }

    alcElem.textContent = alcanceAqui;
    total += alcanceAqui;
});

const n = parseInt(numJugadoresSelect.value);
const minReq = alcanceMinimoPorJugadores[n];
alcanceActualDiv.textContent = `Alcance actual: ${total} / ${minReq}`;

const faltan = nombres.some(v=>!v || v.length===0);
const validarAlcance = switchAlcance.checked;

if(faltan){
    mensajeErrorDiv.textContent = '⚠️ Faltan jugadores por asignar.';
    iniciarBtn.disabled = true;
} else if(validarAlcance && total < minReq){
    mensajeErrorDiv.textContent = `⚠️ Alcance mínimo requerido: ${minReq}. (actual ${total})`;
    iniciarBtn.disabled = true;
} else {
    mensajeErrorDiv.textContent = '';
    iniciarBtn.disabled = false;
}
}

/* Al comenzar partida: pasar a la pantalla de juego con los jugadores configurados */
function comenzarPartida(){
// armar estructura de jugadores
const selects = Array.from(document.querySelectorAll("select[id^='faccionSelect_']"));
const jugadores = selects.map((s, idx) => {
    const card = s.closest('.jugador');
    const nombre = card.querySelector('.nombre-j').value || s.value || `Jugador ${idx+1}`;
    const fac = facciones.find(f => f.nombre === s.value);
    return {
    nombre,
    faccion: s.value,
    color: fac ? fac.color : '#777',
    alcanceBase: fac ? fac.alcanceBase : 0
    };
});

// guardamos max puntos
const maxP = parseInt(maxPuntosInput.value) || 30;
maxPuntosJuegoSpan.textContent = maxP;

// construir pantalla de juego
tableroJuego.innerHTML = '';
mensajeGanadorDiv.classList.remove('activo');
mensajeGanadorDiv.textContent = '';

jugadores.forEach((j, idx) => {
    const div = document.createElement('div');
    div.className = 'jugador-juego';
    div.style.background = j.color;
    // texto claro u oscuro según contraste
    const textoClaro = esColorOscuro(j.color) ? '#fff' : '#000';
    div.dataset.faccion = j.faccion;

    const nombreInput = document.createElement('input');
    nombreInput.className = 'nombre-juego';
    nombreInput.type = 'text';
    nombreInput.value = j.nombre;
    nombreInput.style.color = textoClaro;
    nombreInput.style.background = 'transparent';


const puntosDiv = document.createElement('div');
puntosDiv.className = 'puntos';
puntosDiv.textContent = '0';

// nuevos botones a los lados del número
const botones = document.createElement('div');
botones.className = 'botones';
const btnMenos = document.createElement('button');
btnMenos.type = 'button';
btnMenos.className = 'btn-menos';
btnMenos.textContent = '−'; // signo largo
const btnMas = document.createElement('button');
btnMas.type = 'button';
btnMas.className = 'btn-mas';
btnMas.textContent = '+';
btnMenos.style.color = textoClaro;
btnMas.style.color = textoClaro;
puntosDiv.style.color = textoClaro;


// orden: menos - puntos - mas
botones.appendChild(btnMenos);
botones.appendChild(puntosDiv);
botones.appendChild(btnMas);

// añadimos solo nombreInput + botones (sin facLabel)
div.appendChild(nombreInput);
div.appendChild(botones);


    tableroJuego.appendChild(div);

    // listeners para +/- (controlan puntos y ganadores)
    btnMas.addEventListener('click', ()=>{
    let pts = parseInt(puntosDiv.textContent) || 0;
    pts++;
    puntosDiv.textContent = pts;

    puntosDiv.classList.remove('pop-anim'); // Resetea por si se clickea rápido
void puntosDiv.offsetWidth; // Truco para forzar el reinicio de la anim
puntosDiv.classList.add('pop-anim'); // ¡Aplica la animación!

    chequearGanador();
    guardarEstadoJuego();
    });
    btnMenos.addEventListener('click', ()=>{
    let pts = parseInt(puntosDiv.textContent) || 0;
    pts = Math.max(0, pts-1);
    puntosDiv.textContent = pts;
    guardarEstadoJuego();
    });
});

// cambiar pantalla
pantallaConfig.classList.remove('activa');
pantallaConfig.classList.add('pantalla');
pantallaJuego.classList.remove('pantalla');
pantallaJuego.classList.add('activa');
}

/* Chequeo ganador: si alguien llega al maxPuntos, mostrar mensaje */
function chequearGanador(){
const maxP = parseInt(maxPuntosInput.value) || 30;
const puntos = Array.from(document.querySelectorAll('#tableroJuego .puntos')).map(d=>parseInt(d.textContent)||0);
const ganadorIdx = puntos.findIndex(p=>p >= maxP);
if(ganadorIdx !== -1){
    const nombres = Array.from(document.querySelectorAll('#tableroJuego .nombre-juego')).map(n=>n.value);
    const ganador = nombres[ganadorIdx] || `Jugador ${ganadorIdx+1}`;
    mensajeGanadorDiv.textContent = ` ¡${ganador} ganó la partida con ${puntos[ganadorIdx]} puntos! `;
    mensajeGanadorDiv.classList.add('activo');
    // opcional: desactivar botones (si vos querés que siga el juego sacalo)
    Array.from(document.querySelectorAll('#tableroJuego .botones button')).forEach(b => b.disabled = true);
}
}
/* guardar estado del juego en localStorage */
function guardarEstadoJuego() {
    const jugadores = Array.from(document.querySelectorAll('#tableroJuego .jugador-juego')).map(j => {
        return {
            nombre: j.querySelector('.nombre-juego').value,
            faccion: j.dataset.faccion,
            color: j.style.background,
            puntos: parseInt(j.querySelector('.puntos').textContent) || 0
        };
    });
    const maxP = parseInt(maxPuntosInput.value) || 30;
    const numJugadores = parseInt(numJugadoresSelect.value);
    const validarAlcance = switchAlcance.checked;
    
    const estado = { jugadores, maxP, numJugadores, validarAlcance };
    localStorage.setItem('rootJuego', JSON.stringify(estado));
}

/* volver a configuracion */
function volverAConfig(){
localStorage.removeItem('rootJuego'); // limpiar el estado guardado

pantallaJuego.classList.remove('activa');
pantallaJuego.classList.add('pantalla');
pantallaConfig.classList.remove('pantalla');
pantallaConfig.classList.add('activa');
mensajeGanadorDiv.classList.remove('activo');
mensajeGanadorDiv.textContent = '';
generarTablero();
}

/* iniciar */
generarTablero();

/* Exponer una función por si querés recargar desde consola */
window.regenerar = generarTablero;
// Restaurar juego al recargar la página

window.addEventListener('load', ()=>{
const estado = localStorage.getItem('rootJuego');
if(estado){
    const data = JSON.parse(estado);

    maxPuntosInput.value = data.maxP || 30;
    numJugadoresSelect.value = data.numJugadores || 4;
    switchAlcance.checked = data.validarAlcance ?? true;

    generarTablero();

    const selectsConfig = Array.from(document.querySelectorAll("select[id^='faccionSelect_']"));
    selectsConfig.forEach((select, idx) => {
    if (!data.jugadores[idx]) return; // Seguridad
    const j = data.jugadores[idx];
    const card = select.closest('.jugador');
    card.querySelector('.nombre-j').value = j.nombre;
    select.value = j.faccion || '';
    card.querySelector('.puntos').textContent = j.puntos > 0 ? j.puntos : '';
    });

    manejarCambio();

    const hayPartidaGuardada = data.jugadores.some(j => j.puntos > 0);

    if (hayPartidaGuardada) {

    comenzarPartida();

    const puntosDivsJuego = Array.from(document.querySelectorAll('#tableroJuego .puntos'));
    puntosDivsJuego.forEach((puntosDiv, idx) => {
        if (data.jugadores[idx]) {
                puntosDiv.textContent = data.jugadores[idx].puntos || 0;
        }
    });

    chequearGanador();
    }
}
});


