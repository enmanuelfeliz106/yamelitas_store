import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  imagenes: any = []

  constructor() {


    firebase.default.firestore().collection('productos').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.imagenes.push(doc.get('imagen'));
        
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
   }

  ngOnInit(): void {

    
  }

}
