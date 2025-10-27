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
const openGuiaModalBtn = document.getElementById('openGuiaModal');
const guiaModal = document.getElementById('guiaModal');
const closeGuiaModalBtn = document.getElementById('closeGuiaModal');

openBtn.addEventListener("click", () => {
overlay.classList.remove("hidden");
prepWindow.classList.remove("hidden");
document.body.classList.add("no-scroll");
});



    
const qrTriggers = document.querySelectorAll('.showQR-trigger'); 
const qrModal = document.getElementById('qrModal');
const closeQR = document.getElementById('closeQR');
const qrPlaceholder = document.getElementById('qr-placeholder');
let qrCode = null; // Para no generarlo más de una vez

const linkParaElQR = "https://chrisherrero.github.io/Root-contador/";

// Función reutilizable para abrir el modal
function openQRModal(e) {
    e.preventDefault();
    
    // Generar el QR solo la primera vez que se abre
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

// Opcional: cerrar si hace clic fuera del contenido
qrModal.addEventListener('click', function(e) {
    if (e.target === qrModal) {
    qrModal.classList.add('hidden');
    qrModal.classList.remove('flex');
    document.body.classList.remove("no-scroll");
    }
});


Object.entries(prepData).forEach(([faction, data]) => { const div = document.createElement("div");
const color = factionColors[faction] || "#444"; // color por defecto si falta alguno
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


// Cerrar lista
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


    prepWindow.classList.add("hidden");
    details.classList.remove("hidden");
});

toggleSummaryBtn.addEventListener("click", () => {
    const currentState = details.dataset.showing;

    if (currentState === "prep") {
        // CAMBIAR A MODO RESUMEN
        detailsText.textContent = details.dataset.summaryText;
        detailsMode.textContent = details.dataset.summaryMode;
        toggleSummaryBtn.textContent = "Ver Preparación"; // Cambiar texto del botón
        details.dataset.showing = "summary";
    } else {
        // CAMBIAR DE VUELTA A MODO PREPARACIÓN
        detailsText.textContent = details.dataset.prepText;
        detailsMode.textContent = details.dataset.prepMode;
        toggleSummaryBtn.textContent = "Ver Resumen"; // Cambiar texto del botón
        details.dataset.showing = "prep";
    }
});

closeDetails.addEventListener("click", () => {
details.classList.add("hidden");
prepWindow.classList.remove("hidden");
});


overlay.addEventListener("click", (e) => {

    if (e.target === overlay) {
        overlay.classList.add("hidden");
        prepWindow.classList.add("hidden");
        details.classList.add("hidden");

    
        qrModal.classList.add("hidden");
        qrModal.classList.remove("flex");
        guiaModal.classList.add("hidden");
        guiaModal.classList.remove("flex");

        document.body.classList.remove("no-scroll");
    }
});


