import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';
import { event } from 'jquery';

export interface Producto{
  nombre: string;
  overview: string;
  imagen: string;
  precio: number;
  descripcion?: string;
  comentarios?: Array<string>;

}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  iconoDinero = fa.faDollarSign;
  iconoFuncion = fa.faVial;
  searchIcon = fa.faSearch;
  chevronLeft = fa.faChevronLeft;
  chevronRight = fa.faChevronRight;

  posicionHorizontalProductos = 0; // variable utilizada para mover los elementos horizontalmente
  leftMoves = 0; // Contar los pasos para evitar el swipe cuando se acabe la lista de productos
  rightMoves = 0;

  

  productos: Array<Producto> = [];

  productoElegido: any;

  filtroProductos: Array<Producto> = this.productos; 
  filtroTexto: string = '';

  constructor() {

    firebase.default.firestore().collection('productos').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let producto: Producto = {
          nombre: doc.data().nombre,
          overview: doc.data().overview,
          imagen: doc.data().imagen,
          precio: doc.data().precio,
          descripcion: doc.data().descripcion,
          comentarios: doc.data().comentarios

        }  

        this.productos.push(producto);
        this.productos.push(producto);
        this.productos.push(producto);
        this.productos.push(producto);
        this.productos.push(producto);


  
        
        
      });

      this.productoElegido = this.productos[0];
      this.leftMoves = Math.floor(this.filtroProductos.length / 2);
      this.rightMoves = Math.floor(this.filtroProductos.length / 2);
      

    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    
   }

  ngOnInit(): void {

    const BUSCADOR = document.getElementById('buscador');

    if(BUSCADOR){
      BUSCADOR.addEventListener('input', e => {
        this.filtrar(this.filtroTexto);
      });

    }
    
    

    addEventListener('keydown', e => {
      if(e.key === 'ArrowRight'){
        this.swipeRight();
      }
    });

    addEventListener('keydown', e => {
      if(e.key === 'ArrowLeft'){
        this.swipeLeft();
      }
    });
    
  }

  elegirProducto(productoIndex: any){

    $('.producto').removeClass('producto-elegido');

    $(`.producto${productoIndex}`).addClass('producto-elegido');


    this.productoElegido = this.productos[productoIndex];
    
  }


  swipeLeft(){
    const contenedorProductosElement = document.getElementById('lista-productos');

    
    
    if (contenedorProductosElement && this.leftMoves > 0 ){
      const listaProductosElements = Array.from(contenedorProductosElement.querySelectorAll('div')); 
      this.posicionHorizontalProductos += 295;

      listaProductosElements.forEach(producto => {
       producto.style.left = `${this.posicionHorizontalProductos}px`;
        
      });

      this.leftMoves -= 1;
      this.rightMoves += 1;

      
    }


    
    
  }

  filtrar(texto: string){

    if(texto === '' || texto === ' '){
      this.filtroProductos = this.productos;
      this.leftMoves = Math.floor(this.filtroProductos.length / 2);
      this.rightMoves = Math.floor(this.filtroProductos.length / 2);
      this.centralizarProductos();
    } else {
      this.filtroProductos =  this.productos.filter(producto => producto.nombre.includes(texto));
      this.leftMoves = Math.floor(this.filtroProductos.length / 2);
      this.rightMoves = Math.floor(this.filtroProductos.length / 2);
      this.centralizarProductos();
    }


    
  }

  centralizarProductos(){
    const contenedorProductosElement = document.getElementById('lista-productos');
    if (contenedorProductosElement){
      const listaProductosElements = Array.from(contenedorProductosElement.querySelectorAll('div')); 
      this.posicionHorizontalProductos = 0;

      listaProductosElements.forEach(producto => {
       producto.style.left = '0';
        
      });

    }
  }

  swipeRight(){
    const contenedorProductosElement = document.getElementById('lista-productos');
    
    if (contenedorProductosElement && this.rightMoves > 0){
      const listaProductosElements = Array.from(contenedorProductosElement.querySelectorAll('div')); 
      this.posicionHorizontalProductos -= 295;

      listaProductosElements.forEach(producto => {
       producto.style.left = `${this.posicionHorizontalProductos}px`;
        
      });


      this.leftMoves += 1;
      this.rightMoves -= 1;

      
    }

    

  
  }





}
