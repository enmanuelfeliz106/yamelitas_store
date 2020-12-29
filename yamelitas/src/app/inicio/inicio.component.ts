import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

interface publicacion{
  titulo: string;
  imagen_portada: string;
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
    contexto: '',
    contexto_desarrollo: '',
    productos_titulo: '',
    productos_desarrollo: '',
    productos_productos: [],
    hashtags: []
  };

  titulo: any;

  publicaciones: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
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


}
