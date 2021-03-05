import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcercaDeYamelitasComponent } from './acerca-de-yamelitas/acerca-de-yamelitas.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [{path: "", redirectTo: "inicio", pathMatch: "full"},
                        {path: "inicio", component:InicioComponent, pathMatch: "full"},
                        {path: "productos", component:ProductosComponent, pathMatch: "full"},
                        {path: "acerca-de-yamelitas", component:AcercaDeYamelitasComponent, pathMatch: "full"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
