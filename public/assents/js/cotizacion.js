var formularioPresupuesto = document.getElementById("formularioPresupuesto");
var resultadoPresupuesto = document.getElementById("resultadoPresupuesto");
var mensajeResultado = document.getElementById("mensajeResultado");

var precios = {
    consultoria: 1500,
    auditoria: 2000,
    implementacion: 3000,
    capacitacion: 1000
};

function mostrarResultado(texto, esError) {
    if (!resultadoPresupuesto || !mensajeResultado) return;
    resultadoPresupuesto.classList.remove("hidden");
    resultadoPresupuesto.classList.toggle("error", Boolean(esError));
    mensajeResultado.textContent = texto;
}

if (formularioPresupuesto) {
    formularioPresupuesto.addEventListener("submit", function (event) {
        event.preventDefault();
        var nombre = formularioPresupuesto.elements.nombre.value.trim();
        var email = formularioPresupuesto.elements.email.value.trim();
        var telefono = formularioPresupuesto.elements.telefono.value.trim();
        var servicio = formularioPresupuesto.elements.servicio.value;

        if (!nombre || !email || !telefono) {
            mostrarResultado("Por favor completa todos los campos.", true);
            return;
        }

        var precio = precios[servicio] || 1500;
        mostrarResultado("Gracias, " + nombre + ". Para este primer paso estimamos $" + precio + " ARS. Tu solicitud quedó registrada y te escribiremos a " + email + ".", false);

        var solicitudes = JSON.parse(localStorage.getItem("cyberguard_solicitudes") || "[]");
        solicitudes.push({ nombre: nombre, email: email, telefono: telefono, servicio: servicio, precio: precio, fecha: new Date().toISOString() });
        localStorage.setItem("cyberguard_solicitudes", JSON.stringify(solicitudes));
        formularioPresupuesto.reset();
    });
}

var catalogo = [
    { nombre: "FortiGate 40F", categoria: "Pyme", descripcion: "Seguridad compacta para sucursales y oficinas pequeñas.", precio: "Cotización" },
    { nombre: "FortiGate 60F", categoria: "Pyme", descripcion: "Protección SD-WAN y alto rendimiento para equipos en crecimiento.", precio: "Cotización" },
    { nombre: "FortiGate 90G", categoria: "Empresarial", descripcion: "Firewall de nueva generación para redes exigentes y múltiples sedes.", precio: "Cotización" },
    { nombre: "FortiAP", categoria: "Wi-Fi seguro", descripcion: "Red inalámbrica administrada con autenticación y segmentación.", precio: "Cotización" },
    { nombre: "FortiSwitch", categoria: "Conectividad", descripcion: "Switch administrado integrado con FortiGate para control centralizado.", precio: "Cotización" },
    { nombre: "FortiToken", categoria: "Identidad", descripcion: "Autenticación de dos factores para proteger cuentas críticas.", precio: "Cotización" }
];

var catalogoContenedor = document.getElementById("catalogoProductos");
if (catalogoContenedor) {
    catalogoContenedor.innerHTML = catalogo.map(function (producto) {
        return '<article class="catalog-card">' +
            '<p class="service-number">' + producto.categoria + '</p>' +
            '<h3>' + producto.nombre + '</h3>' +
            '<p>' + producto.descripcion + '</p>' +
            '<strong>' + producto.precio + '</strong>' +
            '</article>';
    }).join("");
}

var aiToggle = document.getElementById("aiToggle");
var aiPanel = document.getElementById("aiPanel");
var aiClose = document.getElementById("aiClose");
var aiForm = document.getElementById("aiForm");
var aiInput = document.getElementById("aiInput");
var aiMessages = document.getElementById("aiMessages");

function cambiarAsistente(abierto) {
    if (!aiPanel || !aiToggle) return;
    aiPanel.classList.toggle("hidden", !abierto);
    aiToggle.setAttribute("aria-expanded", String(abierto));
    if (abierto) aiInput.focus();
}

if (aiToggle) aiToggle.addEventListener("click", function () {
    cambiarAsistente(aiPanel.classList.contains("hidden"));
});
if (aiClose) aiClose.addEventListener("click", function () { cambiarAsistente(false); });

function responderIA(pregunta) {
    var texto = pregunta.toLowerCase();
    if (texto.includes("90g") || texto.includes("empres") || texto.includes("equipo")) {
        return "El FortiGate 90G puede ser adecuado para medianas cargas y varias sedes. Para recomendarlo con precisión necesito cantidad de usuarios, ancho de banda y aplicaciones críticas.";
    }
    if (texto.includes("precio") || texto.includes("costo") || texto.includes("cotiz")) {
        return "Los equipos se cotizan según licencias, soporte y configuración. Puedes completar el formulario de orientación para recibir una estimación inicial.";
    }
    if (texto.includes("contrase") || texto.includes("wifi") || texto.includes("correo")) {
        return "Te recomiendo MFA, contraseñas únicas en un gestor, segmentación de invitados y revisión de dispositivos. Una auditoría básica identifica prioridades.";
    }
    if (texto.includes("auditor") || texto.includes("revisión")) {
        return "Nuestra auditoría revisa accesos, equipos, red y cuentas. Entregamos hallazgos ordenados por riesgo y acciones recomendadas.";
    }
    return "Puedo ayudarte a definir el servicio adecuado. Indícame si trabajas con una oficina, sucursales o equipos remotos, y cuál es tu principal preocupación.";
}

if (aiForm) {
    aiForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var pregunta = aiInput.value.trim();
        if (!pregunta) return;
        aiMessages.insertAdjacentHTML("beforeend", '<p class="ai-message user">' + pregunta.replace(/[<>&]/g, "") + '</p>');
        aiInput.value = "";
        aiMessages.insertAdjacentHTML("beforeend", '<p class="ai-message bot loading">Analizando tu consulta...</p>');
        var loading = aiMessages.querySelector(".loading");
        window.setTimeout(function () {
            loading.classList.remove("loading");
            loading.textContent = responderIA(pregunta);
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }, 450);
    });
}
