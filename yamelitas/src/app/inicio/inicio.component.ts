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

  publicaciones: Array<object> = [];

  constructor() { }

  ngOnInit(): void {
    
    firebase.default.firestore().collection('publicaciones').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.publicaciones.push(doc.data());
        
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
   

  }


}
