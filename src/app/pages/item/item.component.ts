import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{

  producto!: ProductoDescripcion;
  productoid!: string;

  constructor (private route: ActivatedRoute,
              public productoService: ProductosService) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe(parametros => {
        this.productoService.getProducto(parametros.get("id")!)
          .subscribe((producto: any) => {
            this.producto = producto;
            this.productoid = parametros.get("id")!;
            console.log(this.producto);
          })
      })
  }

}
