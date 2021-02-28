import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'yamelitas';

  
  inicio = firebase.default.initializeApp(environment.firebaseConfig);



  constructor(){
    
  }

  ngOnInit(){
    $('.yamelisticamente ul').hide();
    
    $('.yamelisticamente').on("mouseenter", function(){

      $('.yamelisticamente ul').stop().slideDown( 500, function() {
        
        
      });

      

    }).on("mouseleave", function(){

      $('.yamelisticamente ul').stop().slideUp( 500, function() {
        
      });
      
    });
  }

  

}
