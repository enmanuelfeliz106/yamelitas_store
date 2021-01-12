import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { InicioComponent } from './inicio/inicio.component'



@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    InicioComponent
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
=======

>>>>>>> estructura-inicial
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
