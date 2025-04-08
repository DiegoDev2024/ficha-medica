export class FichaModel {
    constructor() {
      this.fichas = JSON.parse(localStorage.getItem("fichas")) || [];
    }
  
    guardarFicha(ficha) {
      const index = this.fichas.findIndex(f => f.rut === ficha.rut);
      if (index >= 0) {
        const sobreescribir = confirm("Ficha ya existe. ¿Desea sobrescribir?");
        if (!sobreescribir) return false;
        this.fichas[index] = ficha;
      } else {
        this.fichas.push(ficha);
      }
      localStorage.setItem("fichas", JSON.stringify(this.fichas));
      return true;
    }
  
    buscarPorApellido(apellido) {
      return this.fichas.filter(f => f.apellidos.toLowerCase().includes(apellido.toLowerCase()));
    }
  }
  