import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Universidad } from "../models/universidad"
import { UsuarioServices } from '../services/usuario.service';
import { Usuario } from "../models/usuario"
import { SessionService } from '../services/session.service';

import { ProyectoService } from '../services/proyecto.service';
import { AlumnoService } from '../services/alumno.service';
import { AlumnoEdit, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales } from '../models/alumno';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public alumnosAreasVidaUniviresitariaParticipado: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public alumnosAreasVidaUniviresitariaActuales: AlumnosAreasVidaUniversitariaActuales[] = [];

  public alumno: AlumnoEdit = new AlumnoEdit("", "", "", "", 0, 0, 0, "", "", "", 0, 0, "", "", 0, "", "", "", "", "", "", "", "", "", 0, "", false, true, this.alumnosAreasVidaUniviresitariaParticipado, this.alumnosAreasVidaUniviresitariaParticipado,0,"","","");
  public idsPasados: any = "";
  public idsActuales: any = "";


  constructor(private alumnoService: AlumnoService, public session: SessionService) { 
  
  }


  ngOnInit(): void {
    var id=this.session.getToken();
    this.obtenerPerfil();

  }
  obtenerPerfil() {
    var id = this.session.getToken();

    this.alumnoService.getAlumno(id).subscribe((res: AlumnoEdit) => {
      this.alumno = res;
      //console.log(res);
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      if (res.fechaEstimadaGraduacionString != "0001-01-01") {
        var fecha = new Date(res.fechaEstimadaGraduacion.substr(0, 10));
        this.alumno.fechaEstimadaGraduacion = fecha.toLocaleString("es-ES", options);
      } else {
        this.alumno.fechaEstimadaGraduacion = "";
      }
      if (res.fechaNacimientoString != "0001-01-01") {
        var fecha = new Date(res.fechaNacimientoString.substr(0, 10));
        this.alumno.fechaNacimiento = fecha.toLocaleString("es-ES", options);
      } else {
        this.alumno.fechaNacimiento = "";
      }
      if (res.fechaInicioServicioSocialString != "0001-01-01") {
        var fecha = new Date(res.fechaInicioServicioSocialString);
        this.alumno.fechaInicioServicioSocial = fecha.toLocaleString("es-ES", options);
      } else {
        this.alumno.fechaInicioServicioSocial = "";
      }
      this.idsPasados = this.alumno.listaAreaVidaUniversitariaParticipado.map(({ idAreaVidaUniversitaria }) => idAreaVidaUniversitaria);
      this.idsActuales = this.alumno.listaAreaVidaUniversitariaActuales.map(({ idAreaVidaUniversitaria }) => idAreaVidaUniversitaria);

      console.log(this.alumno);
      console.log(res);
    });

  }

  ngAfterViewInit() {
    Feather.replace();

  }


  mostrarmodal() {
    $('#entrevista').modal('show');
  }

}
