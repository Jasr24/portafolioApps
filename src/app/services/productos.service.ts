import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor(public http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {
      this.http.get("https://angular-html-7e9a6-default-rtdb.firebaseio.com/productos_idx.json")
      .subscribe ((resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve('');
      });
    });

  };

  getProducto (id: string) {
    return this.http.get(`https://angular-html-7e9a6-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string){

    if(this.productos.length === 0) {
      //Cargar los productos
      this.cargarProductos().then(() => {
        //Se ejecuto despues de tener los productos y aplicamos el filtro
        this.filtrarProductos(termino);
      });
    } else {
      //aplicamos el filtro
      this.filtrarProductos(termino);
    }

    /*this.productosFiltrado = this.productos.filter( producto => {
      return true;
    });
    console.log(this.productosFiltrado)*/
  }

  private filtrarProductos (termino: string) {

    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach (prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    })
  }

}
