var formularioPresupuesto = document.getElementById("formularioPresupuesto");
var resultadoPresupuesto = document.getElementById("resultadoPresupuesto");
var mensajeResultado = document.getElementById("mensajeResultado");

var precioConsultoria = 1500;
var precioAuditoria = 2000;
var precioImplementacion = 3000;
var precioCapacitacion = 1000;

function mostrarResultado(texto) {
    resultadoPresupuesto.classList.remove("hidden");
    mensajeResultado.textContent = texto;
}

function procesarEnvio(event) {
    event.preventDefault();

    var nombre = formularioPresupuesto.elements.nombre.value;
    var email = formularioPresupuesto.elements.email.value;
    var telefono = formularioPresupuesto.elements.telefono.value;
    var servicio = formularioPresupuesto.elements.servicio.value;

    if (nombre === "" || email === "" || telefono === "") {
        mostrarResultado("Por favor completa todos los campos.");
    } else {
        var precio = 0;

        if (servicio === "consultoria") {
            precio = precioConsultoria;
        } else if (servicio === "auditoria") {
            precio = precioAuditoria;
        } else if (servicio === "implementacion") {
            precio = precioImplementacion;
        } else if (servicio === "capacitacion") {
            precio = precioCapacitacion;
        }

        var texto = "Hola " + nombre + ", el presupuesto estimado es $" + precio + ". Te contactaremos a " + email + " y al teléfono " + telefono + ".";

        mostrarResultado(texto);
        formularioPresupuesto.reset();
    }
}

formularioPresupuesto.addEventListener("submit", procesarEnvio);
