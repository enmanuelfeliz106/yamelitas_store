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

  constructor() {}

  ngOnInit(){
    this.cargarPublicaciones('todas');


  }



  cargarPublicaciones(filtro: string){

    this.publicaciones = []

    if(filtro == 'todas'){
        firebase.default.firestore().collection('publicaciones').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.publicaciones.push(doc.data());
          

        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

    } else {
        firebase.default.firestore().collection('publicaciones').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let publicacion = doc.data();

          if(publicacion.hashtags.includes(filtro)){
            this.publicaciones.push(publicacion);
          }
          
          
          
        });
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


}
