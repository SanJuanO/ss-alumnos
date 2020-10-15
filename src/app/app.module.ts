import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectosAddComponent } from './proyectos/proyectos-add/proyectos-add.component';
import { ProyectosEditComponent } from './proyectos/proyectos-edit/proyectos-edit.component';
import { ProyectosVerComponent } from './proyectos/proyectos-ver/proyectos-ver.component';
import { ProyectosActividadesAddComponent } from './proyectos/proyectos-actividades-add/proyectos-actividades-add.component';
import { ProyectosAlumnosAddComponent  } from './proyectos/proyectos-alumnos-add/proyectos-alumnos-add.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresashomeComponent } from './empresas/empresas-home.component';
import { EmpresasAddComponent } from './empresas/empresas-add/empresas-add.component';
import { EmpresasEditComponent } from './empresas/empresas-edit/empresas-edit.component';
import { EmpresasverComponent } from './empresas/empresas-ver/empresas-ver.component';
import { PerfilComponent } from './perfil/perfil.component';


import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    PerfilComponent,
    ProyectosComponent,
    ProyectosAddComponent,
    ProyectosEditComponent,
    ProyectosVerComponent,
    ProyectosActividadesAddComponent,
    ProyectosAlumnosAddComponent,
    ConvocatoriasComponent,
    DashboardComponent,
    EmpresashomeComponent,
    EmpresasAddComponent,
    EmpresasEditComponent,
    EmpresasverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
