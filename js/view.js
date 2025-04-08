export class FichaView {
    static obtenerDatosFormulario() {
      return {
        rut: document.getElementById("rut").value,
        nombres: document.getElementById("nombres").value,
        apellidos: document.getElementById("apellidos").value,
        direccion: document.getElementById("direccion").value,
        ciudad: document.getElementById("ciudad").value,
        telefono: document.getElementById("telefono").value,
        email: document.getElementById("email").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        estadoCivil: document.getElementById("estadoCivil").value,
        comentarios: document.getElementById("comentarios").value,
      };
    }
  
    static mostrarResultados(resultados) {
      const lista = document.getElementById("resultadosBusqueda");
      lista.innerHTML = "";
      resultados.forEach(f => {
        const item = document.createElement("li");
        item.textContent = `${f.nombres} ${f.apellidos} (${f.rut})`;
        lista.appendChild(item);
      });
    }
  
    static cerrarAplicacion() {
      window.close();
    }
  }
  