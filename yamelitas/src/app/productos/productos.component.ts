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

  constructor() {


    firebase.default.firestore().collection('productos').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.productos.push(doc.get('imagen'));
        
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
