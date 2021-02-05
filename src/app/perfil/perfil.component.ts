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
import { AlumnoEdit, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales, AlumnoRequisitos } from '../models/alumno';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public alumnosAreasVidaUniviresitariaParticipado: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public alumnosAreasVidaUniviresitariaActuales: AlumnosAreasVidaUniversitariaActuales[] = [];

  public alumno: AlumnoEdit = new AlumnoEdit("", "", "", "", 0, 0, 0, "", "", "", 0, 0, "", "", 0, "", "", "", "", "", "", "", "", "", 0, "", false, true, this.alumnosAreasVidaUniviresitariaParticipado, this.alumnosAreasVidaUniviresitariaParticipado, 0, "", "", "");
  public alumnoRequisitos: AlumnoRequisitos = new AlumnoRequisitos();
  public idsPasados: any = "";
  public idsActuales: any = "";
  public cubiertos: boolean = false;


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

      //console.log(this.alumno);
      //console.log(res);
      this.obtenerRequisitosCubiertos();
    });

  }

  ngAfterViewInit() {
    Feather.replace();

  }


  mostrarmodal() {
    $('#entrevista').modal('show');
  }

  obtenerRequisitosCubiertos() {
    var id = this.session.getToken();

    this.alumnoService.getAlumnoRequisitosLiberacion(id).subscribe((res: AlumnoRequisitos) => {
      this.alumnoRequisitos = res;
      if (this.alumnoRequisitos!=null && this.alumnoRequisitos.pago && this.alumnoRequisitos.cartaInicio
        && this.alumnoRequisitos.reportesMensuales
        && this.alumnoRequisitos.cartaTermino
        && this.alumnoRequisitos.evaluacionSS
        && this.alumnoRequisitos.horasSS && this.alumnoRequisitos.eventoSS
      ) {
        this.cubiertos = true;
      }
      //console.log(res);
    });

  }

  solicitaLiberacion() {
    var id = this.session.getToken();

    this.alumnoService.updateLiberar(id,1).subscribe((res) => {
      
      if (res["resultado"] == 1) {
        $('#solicitaLiberacion').modal('show');
        this.obtenerPerfil();
      }
      //console.log(res);
    });

  }
}
