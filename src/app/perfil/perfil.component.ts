import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Universidad } from "../models/universidad"
import { UsuarioServices } from '../services/usuario.service';
import { Usuario } from "../models/usuario"
import { SessionService } from '../services/session.service';

import { ProyectoService } from '../services/proyecto.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public usuarios = new Usuario("","","","","",1,1,false);

  constructor( private usuarioservices: UsuarioServices,public session: SessionService) { 
  
  }


  ngOnInit(): void {
    var id=this.session.getToken();
console.log(id);
    this.usuarioservices.getUsuarioid(id).subscribe((usuarios: Usuario) => this.usuarios = usuarios);


 


  }

  ngAfterViewInit() {
    Feather.replace();

  }


  


}
