import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { InicioComponent } from './inicio/inicio.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { AcercaDeYamelitasComponent } from './acerca-de-yamelitas/acerca-de-yamelitas.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    InicioComponent,
    LoaderComponent,
    AcercaDeYamelitasComponent
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FontAwesomeModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
