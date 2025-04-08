import { FichaModel } from "./model.js";
import { FichaView } from "./view.js";

const model = new FichaModel();

document.getElementById("fichaForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;

    // Validación nativa del navegador
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const datos = FichaView.obtenerDatosFormulario();

    // Validación de fecha de nacimiento
    const fechaNacimiento = new Date(datos.fechaNacimiento);
    const hoy = new Date();

    if (isNaN(fechaNacimiento.getTime())) {
        alert("Por favor, ingrese una fecha de nacimiento válida.");
        return;
    }

    const edadMs = hoy - fechaNacimiento;
    const edad = edadMs / (1000 * 60 * 60 * 24 * 365.25);

    if (edad < (1 / 365.25)) {
        alert("La fecha de nacimiento no puede ser menor a 1 día.");
        return;
    }

    if (edad > 120) {
        alert("La edad no puede ser mayor a 120 años.");
        return;
    }

    // Validación de RUT chileno
    if (!validarRutChileno(datos.rut)) {
        alert("El RUT ingresado no es válido. Recuerde usar el formato 12345678-9");
        return;
    }

    const guardado = model.guardarFicha(datos);
    if (guardado) alert("Ficha guardada correctamente.");
});

document.getElementById("cerrarBtn").addEventListener("click", () => {
    FichaView.cerrarAplicacion();
});

document.getElementById("buscarApellido").addEventListener("input", (e) => {
    const resultados = model.buscarPorApellido(e.target.value);
    FichaView.mostrarResultados(resultados);
});

function validarRutChileno(rut) {
    // Eliminar puntos y guión
    rut = rut.replace(/\./g, "").replace("-", "");

    const cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();

    if (!/^\d+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

    return dv === dvEsperado;
}
