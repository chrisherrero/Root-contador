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

openBtn.addEventListener("click", () => {
overlay.classList.remove("hidden");
prepWindow.classList.remove("hidden");
document.body.classList.add("no-scroll");
});



    // CAMBIO: Seleccionamos por clase, no por ID
const qrTriggers = document.querySelectorAll('.showQR-trigger'); 
const qrModal = document.getElementById('qrModal');
const closeQR = document.getElementById('closeQR');
const qrPlaceholder = document.getElementById('qr-placeholder'); // El div que creamos
let qrCode = null; // Para no generarlo más de una vez

const linkParaElQR = "https://root.seiyria.com/"; 

// Función reutilizable para abrir el modal
function openQRModal(e) {
    e.preventDefault();
    
    // Generar el QR solo la primera vez que se abre
    if (!qrCode) {
    qrPlaceholder.innerHTML = ''; // Limpiamos el div por si acaso
    qrCode = new QRCode(qrPlaceholder, {
        text: linkParaElQR,
        width: 256, // 256px (equivale a w-64 de Tailwind)
        height: 256, // 256px (equivale a h-64 de Tailwind)
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    }
    
    qrModal.classList.remove('hidden');
    qrModal.classList.add('flex');
    document.body.classList.add("no-scroll");
}

// CAMBIO: Aplicamos el evento a CADA botón encontrado
qrTriggers.forEach(trigger => {
    trigger.addEventListener('click', openQRModal);
});



// Cerrar modal
closeQR.addEventListener('click', function() {
    qrModal.classList.add('hidden');
    qrModal.classList.remove('flex');
    document.body.classList.remove("no-scroll");
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

// Ajuste de color del texto si el fondo es muy claro
if (["Marquesado", "Compañía del Río", "Culto Reptiliano", "Ducado Subterráneo", "Vagabundo (B)"].includes(faction)) {
div.style.color = "#222"; // texto oscuro para fondos claros
}

// --- INICIO DEL CAMBIO ---
// 1. Crear un array para los botones
const buttons = [];

if (data.normal) {
    // 2. Añadir el botón "Normal" si existe
buttons.push(
    `<button class="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg" data-faction="${faction}" data-mode="normal">Normal</button>`
    );
}

if (data.avanzada) {
    // 3. Añadir el botón "Avanzada" si existe
buttons.push(
    `<button class="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg" data-faction="${faction}" data-mode="avanzada">Avanzada</button>`
    );
}

// 4. Unir los botones con un solo espacio (la clase gap-2 se encarga del resto)
const buttonsHtml = buttons.join(' ');
// --- FIN DEL CAMBIO ---

// 5. CONSTRUIR EL HTML FINAL SIN SALTOS DE LÍNEA
// Usamos concatenación (+) en lugar de una plantilla (`) para
// asegurar que no haya ningún espacio en blanco (newline) extra.
div.innerHTML = 
`<div class="text-lg font-semibold mb-2 text-center">${faction}</div>` +
`<div class="flex justify-center gap-2">${buttonsHtml}</div>`;


prepList.appendChild(div);

});
// FIN DEL BLOQUE DE REEMPLAZO

// Cerrar lista
closePrep.addEventListener("click", () => {
overlay.classList.add("hidden");
prepWindow.classList.add("hidden");
document.body.classList.remove("no-scroll");
});

// Mostrar detalle
prepList.addEventListener("click", (e) => {
const btn = e.target.closest("button[data-faction]");
if (!btn) return;

const faction = btn.dataset.faction;
const mode = btn.dataset.mode;
const text = prepData[faction][mode];

detailsTitle.textContent = faction;
detailsMode.textContent = mode === "normal" ? "Preparación Básica" : "Preparación Avanzada";
detailsText.textContent = text;

prepWindow.classList.add("hidden");
details.classList.remove("hidden");
});

// Cerrar detalle
closeDetails.addEventListener("click", () => {
details.classList.add("hidden");
prepWindow.classList.remove("hidden");
});

// Cerrar todo con overlay
overlay.addEventListener("click", () => {
overlay.classList.add("hidden");
prepWindow.classList.add("hidden");
details.classList.add("hidden");
document.body.classList.remove("no-scroll");
});

