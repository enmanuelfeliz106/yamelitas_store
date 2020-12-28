import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yamelitas';
  
  inicio = firebase.default.initializeApp(environment.firebaseConfig);

}
