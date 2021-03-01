import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';

interface publicacion{
  titulo: string;
  imagen_portada: string;
  tiempo_lectura: number;
  fecha: string;
  contexto: string;
  contexto_desarrollo: string;
  productos_titulo: string;
  productos_desarrollo: string;
  productos_productos: Array<string>;
  hashtags: Array<string>;

}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})


export class InicioComponent implements OnInit {

  publicacion: publicacion = {
    titulo: '',
    imagen_portada: '',
    tiempo_lectura: 0,
    fecha: '',
    contexto: '',
    contexto_desarrollo: '',
    productos_titulo: '',
    productos_desarrollo: '',
    productos_productos: [],
    hashtags: []
  };

  footerMessage = 'Ver contenido'
  slide = 'assets/iconos/slide-down-icon.svg';

  titulo: any;

  publicaciones: Array<any> = [];

  loader: boolean = true;

  constructor() {}

  ngOnInit(){
    this.cargarPublicaciones('todas');


  }



  cargarPublicaciones(filtro: string){

    this.loader = true;

    $('#barra_lateral nav ul li').hide();

    this.publicaciones = []

    setTimeout( () => {
      $('#barra_lateral nav ul li').show(500);
    }, 500);

    if(filtro === 'todas'){
      firebase.default.firestore().collection('publicaciones').get()
      .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.publicaciones.push(doc.data());
            

          });

          this.publicaciones.reverse();
          this.loader = false;
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

    } else {
      firebase.default.firestore().collection('publicaciones').where('hashtags', 'array-contains', filtro).get()
      .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.publicaciones.push(doc.data());
            

          });

          this.publicaciones.reverse();
          this.loader = false;
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
    }

    

  }

  contenidoToggle(){
    $('.contenido').toggle(500);

    switch(this.footerMessage){
      case 'Ver contenido':
        this.footerMessage = 'Ocultar contenido';
        this.slide = 'assets/iconos/slide-up-icon.svg';
        $('footer').css('border-top', '1px solid rgba(0, 0, 0, .5)')
        break

      default:
        this.footerMessage = 'Ver contenido';
        this.slide = 'assets/iconos/slide-down-icon.svg';
        $('footer').css('border-top', 'none')
    }
  }

  recargarPagina(){
    window.location.reload();
  }


}
