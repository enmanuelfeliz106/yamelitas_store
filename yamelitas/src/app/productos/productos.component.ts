import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  iconoDinero = fa.faDollarSign;
  iconoFuncion = fa.faVial;
  searchIcon = fa.faSearch;

  productos: any = []

  productoElegido: any;

  constructor() {


    firebase.default.firestore().collection('productos').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.productos.push(doc.data());
        
        
      });

      this.productoElegido = this.productos[0];
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
   }

  ngOnInit(): void {

    
  }

  elegirProducto(productoIndex: any){

    $('.producto').removeClass('producto-elegido');

    $(`.producto${productoIndex}`).addClass('producto-elegido');


    this.productoElegido = this.productos[productoIndex];
    
  }

}
