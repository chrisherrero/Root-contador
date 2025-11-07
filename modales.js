const openBtn = document.getElementById("openPreparations");
const overlay = document.getElementById("prepOverlay");
const prepWindow = document.getElementById("prepWindow");
const prepList = document.getElementById("prepList");
const closePrep = document.getElementById("closePrep");
const details = document.getElementById("prepDetails");
const detailsTitle = document.getElementById("detailsTitle");
const detailsMode = document.getElementById("detailsMode");
const detailsText = document.getElementById("detailsText");
const closeDetails = document.getElementById("closeDetails");
const summaryToggleContainer = document.getElementById("summaryToggleContainer");
const toggleSummaryBtn = document.getElementById("toggleSummaryBtn");
const alcanceHelpBtn = document.getElementById('alcanceHelpBtn');
const openGuiaModalBtn = document.getElementById('openGuiaModal');
const guiaModal = document.getElementById('guiaModal');
const closeGuiaModalBtn = document.getElementById('closeGuiaModal');

openBtn.addEventListener("click", () => {
overlay.classList.remove("hidden");
prepWindow.classList.remove("hidden");
document.body.classList.add("no-scroll");
});

alcanceHelpBtn.addEventListener("click", () => {

    detailsTitle.textContent = "Explicación de 'Alcance' (Reach)";
    detailsMode.textContent = "Regla de Equilibrio de Partida";
    detailsText.textContent = alcanceHelpText;


    summaryToggleContainer.classList.add("hidden");


    details.dataset.openedFrom = 'config'; 

    overlay.classList.remove("hidden");
    details.classList.remove("hidden");
    document.body.classList.add("no-scroll");
});

    
const qrTriggers = document.querySelectorAll('.showQR-trigger'); 
const qrModal = document.getElementById('qrModal');
const closeQR = document.getElementById('closeQR');
const qrPlaceholder = document.getElementById('qr-placeholder');
let qrCode = null; 


const linkParaElQR = "https://chrisherrero.github.io/Root-contador/"; // <--- AQUI SE CAMBIA EL LINK PARA EL QR AUTOGENERADO

function closeAllModals() {
    overlay.classList.add("hidden");
    prepWindow.classList.add("hidden");
    details.classList.add("hidden");
    qrModal.classList.add("hidden");
    qrModal.classList.remove("flex");
    guiaModal.classList.add("hidden");
    guiaModal.classList.remove("flex");
    document.body.classList.remove("no-scroll");
}

function closeSubModal(modalToClose) {
    modalToClose.classList.add('hidden');
    modalToClose.classList.remove('flex');
    if (overlay.classList.contains('hidden') && qrModal.classList.contains('hidden') && guiaModal.classList.contains('hidden')) {
        document.body.classList.remove("no-scroll");
    }
}


function openQRModal(e) {
    e.preventDefault();
    

    if (!qrCode) {
    qrPlaceholder.innerHTML = '';
    qrCode = new QRCode(qrPlaceholder, {
        text: linkParaElQR,
        width: 256,
        height: 256, 
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    }
    
    qrModal.classList.remove('hidden');
    qrModal.classList.add('flex');
    document.body.classList.add("no-scroll");
}


qrTriggers.forEach(trigger => {
    trigger.addEventListener('click', openQRModal);
});

openGuiaModalBtn.addEventListener('click', () => {
    guiaModal.classList.remove('hidden');
    guiaModal.classList.add('flex');
    guiaModal.querySelector('.custom-scroll').scrollTop = 0;
    document.body.classList.add("no-scroll");
});




closeQR.addEventListener('click', function() {
    qrModal.classList.add('hidden');
    qrModal.classList.remove('flex');
    document.body.classList.remove("no-scroll");
});


closeGuiaModalBtn.addEventListener('click', () => {
    guiaModal.classList.add('hidden');
    guiaModal.classList.remove('flex');

    if (prepOverlay.classList.contains('hidden') && qrModal.classList.contains('hidden')) { // Check both overlay and QR modal
        document.body.classList.remove("no-scroll");
    }
});


qrModal.addEventListener('click', function(e) {
    if (e.target === qrModal) {
    qrModal.classList.add('hidden');
    qrModal.classList.remove('flex');
    document.body.classList.remove("no-scroll");
    }
});


Object.entries(prepData).forEach(([faction, data]) => { const div = document.createElement("div");
const color = factionColors[faction] || "#444"; 
div.className = "p-3 rounded-xl text-white shadow-md text-center";
div.style.backgroundColor = color;


if (["Marquesado", "Compañía del Río", "Culto Reptiliano", "Ducado Subterráneo", "Vagabundo (B)"].includes(faction)) {
div.style.color = "#222"; 
}


const buttons = [];

if (data.normal) {

buttons.push(
    `<button class="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg" data-faction="${faction}" data-mode="normal">Normal</button>`
    );
}

if (data.avanzada) {
    
buttons.push(
    `<button class="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg" data-faction="${faction}" data-mode="avanzada">Avanzada</button>`
    );
}


const buttonsHtml = buttons.join(' ');

div.innerHTML = 
`<div class="text-lg font-semibold mb-2 text-center">${faction}</div>` +
`<div class="flex justify-center gap-2">${buttonsHtml}</div>`;


prepList.appendChild(div);

if (faction === "Inicio de partida") {
        const separator = document.createElement('div');

        separator.className = 'h-[6px] w-11/12 mx-auto bg-gray-700 rounded-full my-1';
        prepList.appendChild(separator);
    }

});



closePrep.addEventListener("click", () => {
overlay.classList.add("hidden");
prepWindow.classList.add("hidden");
document.body.classList.remove("no-scroll");
});


prepList.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-faction]");
    if (!btn) return;

    const faction = btn.dataset.faction;
    const mode = btn.dataset.mode;
    
 
    const prepText = prepData[faction][mode];
    const prepModeText = mode === "normal" ? "Preparación Básica" : "Preparación Avanzada";
 
    const summaryText = (typeof factionSummaries !== 'undefined') ? factionSummaries[faction] : null;

 
    detailsTitle.textContent = faction;
    detailsMode.textContent = prepModeText;
    detailsText.textContent = prepText;


    if (summaryText) {

        details.dataset.prepText = prepText;
        details.dataset.prepMode = prepModeText;
        details.dataset.summaryText = summaryText;
        details.dataset.summaryMode = "Resumen de Facción";
        

        toggleSummaryBtn.textContent = "Ver Resumen";
        details.dataset.showing = "prep"; 


        summaryToggleContainer.classList.remove("hidden");
    } else {

        summaryToggleContainer.classList.add("hidden");
    }

    details.dataset.openedFrom = 'prep';
    
    prepWindow.classList.add("hidden");
    details.classList.remove("hidden");
});

toggleSummaryBtn.addEventListener("click", () => {
    const currentState = details.dataset.showing;

    if (currentState === "prep") {

        detailsText.textContent = details.dataset.summaryText;
        detailsMode.textContent = details.dataset.summaryMode;
        toggleSummaryBtn.textContent = "Ver Preparación"; // Cambiar texto del botón
        details.dataset.showing = "summary";
    } else {
  
        detailsText.textContent = details.dataset.prepText;
        detailsMode.textContent = details.dataset.prepMode;
        toggleSummaryBtn.textContent = "Ver Resumen"; // Cambiar texto del botón
        details.dataset.showing = "prep";
    }
});

closeDetails.addEventListener("click", () => {
    if (details.dataset.openedFrom === 'prep') {

        details.classList.add("hidden");
        prepWindow.classList.remove("hidden");
    } else {

        closeAllModals(); 
    }
});


overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        closeAllModals(); // Debe llamar a la función que cierra todo
    }
});

const sugerirBtn = document.getElementById('sugerirFaccionesBtn');
const sugerenciasResultado = document.getElementById('sugerenciasResultado');


let sugeridasGlobal = [];
let seleccionadasGlobal = [];
let faccionBloqueadaGlobal = null;
let belicosaGarantizadaGlobal = null;
let numJugadoresGlobal = 0;



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function renderSugerencias() {
    sugerenciasResultado.innerHTML = ''; 


    const belicosaElegida = seleccionadasGlobal.includes(belicosaGarantizadaGlobal);
    const seAlcanzoLimite = seleccionadasGlobal.length >= numJugadoresGlobal;


    sugerenciasResultado.innerHTML += `
        <div class="flex justify-between items-center mb-2">
            <div class="text-gray-300 text-sm">Grupo de ${sugeridasGlobal.length} facciones (Selecciona ${numJugadoresGlobal}):</div>
            <button id="closeSugerenciasBtn" type="button" title="Cerrar sugerencias" class="w-6 h-6 rounded-full bg-gray-700/80 hover:bg-gray-600 text-white flex items-center justify-center shadow-sm transition-colors">✕</button>
        </div>
    `;
    

    sugeridasGlobal.forEach(f => {

        const nombre = f.nombre;
        const isSelected = seleccionadasGlobal.includes(nombre);
        const isBlocked = (nombre === faccionBloqueadaGlobal && !belicosaElegida);
        const isDisabled = (!isSelected && seAlcanzoLimite && !isBlocked);

        let classes = "p-2.5 rounded-md font-semibold cursor-pointer transition-all duration-150 ease-in-out";
        let contentHTML = ""; 

        const esOscuro = esColorOscuro(f.color);
        classes += esOscuro ? ' text-white' : ' text-gray-900';
        
        if (isBlocked) {
            classes += " opacity-65 cursor-not-allowed";
            contentHTML = `
                <span class="line-through">${f.nombre}</span>
                <span class="font-bold text-base text-red-600"> (Bloqueada)</span>
            `;
        } else {
            const tipoText = f.tipo === 'belicosa' ? '(Belicosa)' : '(Insurgente)';
            contentHTML = `
                ${f.nombre}
                <span class="font-normal opacity-80 text-sm">${tipoText}</span>
            `;
            
            if (isSelected) {
                classes += " ring-4 ring-offset-2 ring-offset-gray-800 ring-blue-400";
            } else if (isDisabled) {
                classes += " opacity-40 cursor-not-allowed";
            } else {
                classes += " hover:scale-103 hover:shadow-lg";
            }
        }
        
        sugerenciasResultado.innerHTML += `
            <div class="${classes}" style="background-color: ${f.color};" data-faction-nombre="${nombre}">
                ${contentHTML}
            </div>
        `;
    });
    

    if (faccionBloqueadaGlobal) {
        sugerenciasResultado.innerHTML += `
            <div class="text-gray-400 text-xs mt-3 p-2 bg-gray-800 rounded-md">
                <strong>Regla 8.1.1:</strong> La facción <strong>"${faccionBloqueadaGlobal}"</strong> está bloqueada. No puede ser elegida hasta que la única facción Belicosa (<strong>${belicosaGarantizadaGlobal}</strong>) haya sido elegida.
            </div>
        `;
    }

 
    let botonAceptarHTML = '';
    if (seleccionadasGlobal.length === numJugadoresGlobal) {
        botonAceptarHTML = `<button id="aceptarSugerenciasBtn" class="mt-3 w-full bg-green-600 hover:bg-green-500 px-4 py-3 rounded-lg text-white font-semibold shadow-md transition text-lg">Aceptar y Configurar</button>`;
    } else {
        botonAceptarHTML = `<button class="mt-3 w-full bg-gray-600 px-4 py-3 rounded-lg text-gray-400 font-semibold shadow-md cursor-not-allowed text-lg" disabled>Aceptar y Configurar</button>`;
    }

    sugerenciasResultado.innerHTML += `
        <div class="mt-4 pt-4 border-t border-gray-600 text-center">
            <span class="text-lg text-white font-semibold">Seleccionadas: ${seleccionadasGlobal.length} / ${numJugadoresGlobal}</span>
            ${botonAceptarHTML}
        </div>
    `;
}


function aceptarSugerencias() {
 
    const selectsConfig = Array.from(document.querySelectorAll("select[id^='faccionSelect_']"));
    

    selectsConfig.forEach(sel => sel.value = "");

    seleccionadasGlobal.forEach((nombre, idx) => {
        if (selectsConfig[idx]) {
            selectsConfig[idx].value = nombre;
        }
    });

 
    manejarCambio();

    closeAllModals();

    sugeridasGlobal = [];
    seleccionadasGlobal = [];
    faccionBloqueadaGlobal = null;
    belicosaGarantizadaGlobal = null;
    numJugadoresGlobal = 0;
}


sugerirBtn.addEventListener('click', () => {
    
    
    const checks = document.querySelectorAll('.hireling-check:checked');

    let excluidas = Array.from(checks).map(cb => cb.value);

    if (excluidas.includes("Vagabundo (N)")) {
   
        excluidas.push("Vagabundo (B)");
    }



    numJugadoresGlobal = parseInt(document.getElementById('numJugadores').value) || 4;


    const belicosas = facciones.filter(f => 
        f.tipo === 'belicosa' && !excluidas.includes(f.nombre)
    );
    const insurgentes = facciones.filter(f => 
        f.tipo === 'insurgente' && !excluidas.includes(f.nombre)
    );
    
  
    if (belicosas.length === 0) {
        sugerenciasResultado.innerHTML = `<div class="text-red-400 text-sm p-2 bg-red-900/50 rounded-md">Error: Has excluido a todas las facciones Belicosas. No se puede generar un grupo.</div>`;
        return;
    }


    let poolBelicosas = shuffleArray([...belicosas]);
    let poolInsurgentes = shuffleArray([...insurgentes]);
    let sugeridas = [];


    const belicosaGarantizada = poolBelicosas.pop();
    if (belicosaGarantizada) {
        sugeridas.push(belicosaGarantizada);
    }


    let mazoRestante = shuffleArray([...poolBelicosas, ...poolInsurgentes]);
    for (let i = 0; i < numJugadoresGlobal; i++) {
        if (mazoRestante.length > 0) {
            sugeridas.push(mazoRestante.pop());
        }
    }
    

    const ultimaFaccion = sugeridas[sugeridas.length - 1];
    const numBelicosasTotal = sugeridas.filter(f => f.tipo === 'belicosa').length;
    let faccionBloqueada = null;
    
    if (ultimaFaccion && ultimaFaccion.tipo === 'insurgente' && numBelicosasTotal === 1) {
        faccionBloqueada = ultimaFaccion; 
    }
    

    sugeridasGlobal = shuffleArray(sugeridas); 
    seleccionadasGlobal = []; 
    faccionBloqueadaGlobal = faccionBloqueada ? faccionBloqueada.nombre : null;
    belicosaGarantizadaGlobal = belicosaGarantizada ? belicosaGarantizada.nombre : null;

sugerenciasResultado.addEventListener('click', (e) => {
    

    const closeBtn = e.target.closest('#closeSugerenciasBtn');
    if (closeBtn) {

        sugerenciasResultado.innerHTML = '';

        sugeridasGlobal = [];
        seleccionadasGlobal = [];
        faccionBloqueadaGlobal = null;
        belicosaGarantizadaGlobal = null;
        numJugadoresGlobal = 0;
        return;
    }


    const acceptBtn = e.target.closest('#aceptarSugerenciasBtn');
    if (acceptBtn) {
        aceptarSugerencias();
        return;
    }

    const factionDiv = e.target.closest('[data-faction-nombre]');
    if (!factionDiv) return;

    const faccionNombre = factionDiv.dataset.factionNombre;
    if (!faccionNombre) return;

    const belicosaElegida = seleccionadasGlobal.includes(belicosaGarantizadaGlobal);
    const isBlocked = (faccionNombre === faccionBloqueadaGlobal && !belicosaElegida);
    

    if (isBlocked) {
        return; 
    }


    const index = seleccionadasGlobal.indexOf(faccionNombre);
    
    if (index > -1) {

        seleccionadasGlobal.splice(index, 1);

  
        if (faccionNombre === belicosaGarantizadaGlobal) {

            const indexBloqueada = seleccionadasGlobal.indexOf(faccionBloqueadaGlobal);
            if (indexBloqueada > -1) {
                seleccionadasGlobal.splice(indexBloqueada, 1);
            }
        }


    } else {

        if (seleccionadasGlobal.length < numJugadoresGlobal) {
            seleccionadasGlobal.push(faccionNombre);
        } else {
  
            return;
        }
    }

    renderSugerencias();
});
    
    renderSugerencias();
});







