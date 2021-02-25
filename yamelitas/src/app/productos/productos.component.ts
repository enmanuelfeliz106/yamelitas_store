import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';
import { event } from 'jquery';
import { text } from '@fortawesome/fontawesome-svg-core';

export interface Producto{
  nombre: string;
  categoria: string;
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
  chevronDown = fa.faChevronDown;
  clipboardList = fa.faClipboardList;

  categorias: any[] = ['cabello', 'piel (cara)', 'piel (cuerpo)', 'nails'];
  allCategories: any[] = ['cabello', 'piel (cara)', 'piel (cuerpo)', 'nails'];
  

  categoriaElegida = 'Todos';
  slideDown = false;

  posicionHorizontalProductos = 0; // variable utilizada para mover los elementos horizontalmente
  leftMoves = 0; // Contar los pasos para evitar el swipe cuando se acabe la lista de productos
  rightMoves = 0;

  

  productos: Array<Producto> = [];

  productoElegido: Producto = {
    nombre: '',
    categoria: '',
    overview: '',
    imagen: '',
    precio: 0
  };

  filtroTexto: string = '';
  sugerenciasBuscador: Producto[] = [];


  constructor() {

    this.cargarProductos('categoria', 'in', this.categorias);

    
    
    
  }

  ngOnInit(): void {

    const BUSCADOR = document.getElementById('buscador');
    const CATEGORIA = document.getElementById('categoria-elegida');

    if(BUSCADOR){
      BUSCADOR.addEventListener('input', e => {
        this.mostrarSugerencias(this.filtroTexto);
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

    //Funcion slide down/slide up para las categorias

    $('#categorias-container .categorias').hide();

    // Elegir Categoria

    const categoria = document.getElementById('categorias');

    if(categoria){

      categoria.addEventListener('click', e => {

        this.categorias = Array.from(categoria.querySelectorAll('li'));

        let antiguaCategoriaElegida = this.categoriaElegida;

        let t: any = e.target;
        let elemento = this.categorias.indexOf(t);
        
        for(let categoria of this.categorias){
          this.categorias[this.categorias.indexOf(categoria)] = categoria.textContent;
        }
        
        this.categoriaElegida = this.categorias[elemento];

        

        this.categorias[elemento] = antiguaCategoriaElegida; 

        
      });
    }

    //------------------------------------------------------------

    if(BUSCADOR){


      BUSCADOR.addEventListener('focus', () => {
        this.mostrarSugerencias(this.filtroTexto);
      });
      
    }

    

  }

  cargarProductos(filtro: string, query: any, valor: any){

    this.productos = [];
    
    firebase.default.firestore().collection('productos').where(filtro, query, valor).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let producto: Producto = {
          nombre: doc.data().nombre,
          categoria: doc.data().categoria,
          overview: doc.data().overview,
          imagen: doc.data().imagen,
          precio: doc.data().precio,
          descripcion: doc.data().descripcion,
          comentarios: doc.data().comentarios

        }  

        this.productos.push(producto);
        

      });

      this.productoElegido = this.productos[0];
      this.leftMoves = Math.floor(this.productos.length / 2);
      this.rightMoves = Math.floor(this.productos.length / 2);
      
      

    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  }

  desplegarCategorias(){
    if(!this.slideDown){

      $('#categorias-container .categorias').stop().slideDown( 300, function() {

        
  
      });

      $('#categorias-container fa-icon').addClass('rotar');

      this.slideDown = true;

    } else {


      $('#categorias-container .categorias').stop().slideUp( 300, function() {

        

      });

      $('#categorias-container fa-icon').removeClass('rotar');
        


      this.slideDown = false;

    }

    
  }

  filtrarCategoria(categoria: string){

    if(categoria === 'Todos'){
      this.cargarProductos('categoria', 'in', this.allCategories);
    } else {
      this.cargarProductos('categoria', 'in', [categoria]);
    }

    
  }


  elegirProducto(productoIndex: number){

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


  mostrarSugerencias(texto: string){
    
    this.sugerenciasBuscador = [];

    if(texto.trim() === ''){
      

    } else {

      
      this.sugerenciasBuscador = this.productos.filter( producto => producto.nombre.includes(texto));
      
    }


    
  }

  filtrarPorNombre(producto: Producto){
    
    let i = this.productos.indexOf(producto);

    let antiguo = this.productos[0];

    this.productos[0] = this.productos[i];
    this.productos[i] = antiguo;

    
    
    this.sugerenciasBuscador = [];

    this.elegirProducto(i);

    this.productoElegido = this.productos[0];

    
    
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
