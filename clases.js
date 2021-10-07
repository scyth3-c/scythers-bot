class Usuario{
    constructor(nombre, id, fondos, paykey) {
    this.nombre = nombre;
    this.id = id;
    this.fondos = fondos;
    this.paykey = paykey;
    }
  };
  class Registro {
    constructor(origen, destino, cantidad, cuando, fondo1,fondo2,id){
      this.origen = origen;
      this.destino = destino;
      this.cantidad = cantidad;
      this.cuando = cuando;
      this.fondo1 = fondo1;
      this.fondo2 = fondo2;
      this.id = id;
    }
  }
  module.exports = {Usuario, Registro};