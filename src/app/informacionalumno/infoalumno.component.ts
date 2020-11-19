import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoEdit } from "../models/alumno"
import { SessionService } from '../services/session.service';
import { AlumnoService } from '../services/alumno.service';
import { UniversidadService } from '../services/universidad.service';
import { CarreraService } from '../services/carrera.service';
import { FacultadService } from '../services/facultad.service';
import { Universidad } from "../models/universidad";
import { Carrera } from "../models/carrera";
import { Facultad } from "../models/facultad";
import { AreasVidaUniversitaria, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales, ModalidadesTrabajo } from '../models/alumno';
import { ModalidadesTrabajoService } from '../services/modalidadestrabajo.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-infoalumno',
  templateUrl: './infoalumno.component.html',
  styleUrls: ['./infoalumno.component.css']
})

export class InfoAlumnoComponent implements OnInit {
  public d: Date = new Date();
  public alumnosAreasVidaUniviresitariaParticipado: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public alumnosAreasVidaUniviresitariaActuales: AlumnosAreasVidaUniversitariaActuales[] = [];
  alumno: AlumnoEdit = new AlumnoEdit("", "", "", "", 0, 0, 0, "", "", "", 0, 0, "", "", 0, "", "", "", "", "", "", "", "", "", 0, "", false, true, this.alumnosAreasVidaUniviresitariaParticipado, this.alumnosAreasVidaUniviresitariaParticipado,0,"","","");
  nombre: string="";
  apellidos: string="";
  activo = true;
  public mensajevalidacion = "";
  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];
  public listaAreasUniversidad: AreasVidaUniversitaria[] = [];
  public listaAreasUniversidadParticipado: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActuales: AlumnosAreasVidaUniversitariaActuales[] = [];
  public listaAreasUniversidadParticipadoNew: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActualesNew: AlumnosAreasVidaUniversitariaActuales[] = [];
  public listaModalidadesTrabajo: ModalidadesTrabajo[] = [];
  public idsPasados: any;
  public idsActuales: any;
  public idAlumno: string;
  public idobtenido: string;
  constructor(private alumnoService: AlumnoService, public session: SessionService,
    private facultadService: FacultadService, private carreraService: CarreraService,
    private universidadService: UniversidadService, private modalidadesTrabajoService: ModalidadesTrabajoService,
    private activatedRoute: ActivatedRoute, private router: Router,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idobtenido = params['idProyecto'];
    });
  }

  ngOnInit(): void {
    this.nombre = this.session.getnombre();
    this.apellidos = this.session.getapellidos();
    this.obtenerPerfil();
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerModalidadesTrabajo()
    this.obtenerAreasVidaUniversitaria();
    //console.log(this.alumno);
  }

  ngAfterViewInit() {
    Feather.replace();
  }
  
  obtenerPerfil() {
    var id = this.session.getToken();

    this.alumnoService.getAlumno(id).subscribe((res: AlumnoEdit) => {
      this.alumno = res;
      if (res.fechaEstimadaGraduacionString != "0001-01-01") {
        this.alumno.fechaEstimadaGraduacion = res.fechaEstimadaGraduacionString;
      } else {
        this.alumno.fechaEstimadaGraduacion = "";
      }
      if (res.fechaNacimientoString != "0001-01-01") {
        this.alumno.fechaNacimiento = res.fechaNacimientoString;
      } else {
        this.alumno.fechaNacimiento = "";
      }
      if (res.fechaInicioServicioSocialString != "0001-01-01") {
        this.alumno.fechaInicioServicioSocial = res.fechaInicioServicioSocialString;
      } else {
        this.alumno.fechaInicioServicioSocial = "";
      }
      this.idsPasados = this.alumno.listaAreaVidaUniversitariaParticipado.map(({ idAreaVidaUniversitaria }) => idAreaVidaUniversitaria);
      this.idsActuales = this.alumno.listaAreaVidaUniversitariaActuales.map(({ idAreaVidaUniversitaria }) => idAreaVidaUniversitaria);

      console.log(this.alumno);
      console.log(res);
    });

  }

  aceptaTerminos() {
    var id = this.session.getToken();
    this.alumnoService.aceptaTerminosCondiciones(id).subscribe(data => {
      console.log(data);
      if (data["resultado"] == 1) {
        location.reload();
      }
    }, error => {
      console.log(error);
    });
  }

  obtenerUniversidades() {

    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }


  obtenerCarreras() {

    return this.carreraService
      .getCarreras()
      .subscribe((carreras: Carrera[]) => this.carreras = carreras);

  }

  obtenerFacultades() {

    return this.facultadService
      .getFacultades()
      .subscribe((facultades: Facultad[]) => this.facultades = facultades);

  }


  obtenerModalidadesTrabajo() {

    return this.modalidadesTrabajoService
      .getModalidadesTrabajo()
      .subscribe((listaModalidadesTrabajo: ModalidadesTrabajo[]) => this.listaModalidadesTrabajo = listaModalidadesTrabajo);

  }
  
  obtenerAreasVidaUniversitaria() {
    /*
    return this.areasVidaUniversitaria
      .getAreasVidaUniversitaria()
      .subscribe((listaAreasUniversidad: AreasVidaUniversitaria[]) => this.listaAreasUniversidad = listaAreasUniversidad);
      */
  }
  
  toggleAreasVidaUniversitariaParticipado(checked, id) {
    console.log(checked);
    id = Number(id)
    var valor = { "idAreaVidaUniversitaria": id, "activo": true };

    var competencia = this.listaAreasUniversidad.find(x => x.id === id);
    if (checked) this.alumno.listaAreaVidaUniversitariaParticipado.push(valor);
    else this.alumno.listaAreaVidaUniversitariaParticipado = this.alumno.listaAreaVidaUniversitariaParticipado.filter(item => item.idAreaVidaUniversitaria !== id);

    console.log(this.alumno.listaAreaVidaUniversitariaParticipado);
  }

  toggleAreasVidaUniversitariaActuales(checked, id) {
    console.log(checked);
    var valor = { "idAreaVidaUniversitaria": id, "activo": true };

    var area = this.listaAreasUniversidad.find(x => x.id === id);
    if (checked) this.alumno.listaAreaVidaUniversitariaActuales.push(valor);
    else this.alumno.listaAreaVidaUniversitariaActuales = this.alumno.listaAreaVidaUniversitariaActuales.filter(item => item.idAreaVidaUniversitaria !== id);

    console.log(this.alumno.listaAreaVidaUniversitariaActuales);
  }


  onSubmit(data) {

    //var temporal = (data.value);

    //console.log(temporal);

    //console.log(temporal['universidad']);
    //console.log(this.alumno);
    if (this.alumno.nombre ==null || this.alumno.nombre == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');

    }
    else if (this.alumno.matricula==null || this.alumno.matricula == "") {
      this.mensajevalidacion = "No puedes dejar el campo de matricula vacío"
      $('#validacion').modal('show');

    }

    else if (this.alumno.paterno==null || this.alumno.paterno == "") {
      this.mensajevalidacion = "No puedes dejar el campo de paterno vacío"
      $('#validacion').modal('show');

    }
    else if (this.alumno.materno==null || this.alumno.materno == "") {
      this.mensajevalidacion = "No puedes dejar el campo de materno vacío"
      $('#validacion').modal('show');

    } else if (this.alumno.celular == null || this.alumno.celular == "") {
      this.mensajevalidacion = "No puedes dejar el campo de celular vacío"
      $('#validacion').modal('show');

    }
    else if (this.alumno.correoPersonal==null || this.alumno.correoPersonal == "") {
      this.mensajevalidacion = "No puedes dejar el campo de correo personal vacío"
      $('#validacion').modal('show');

    }
    else if (this.alumno.porcentaje ==null || this.alumno.porcentaje == 0) {

      this.mensajevalidacion = "No puedes dejar el campo de porcentaje vacío"
      $('#validacion').modal('show');
    }
    else if (this.alumno.esquemaPeriodo == null || this.alumno.esquemaPeriodo =="") {
      this.mensajevalidacion = "No puedes dejar el campo de esquema de periodo vacío"
      $('#validacion').modal('show');

    } else if (this.alumno.generacion == null || this.alumno.generacion == "") {

      this.mensajevalidacion = "No puedes dejar el campo de generaciòn vacío"
      $('#validacion').modal('show');
    } else if (this.alumno.fechaEstimadaGraduacion == "") {
      this.mensajevalidacion = "No puedes dejar el campo de fecha estimada de graduaciòn vacío"
      $('#validacion').modal('show');

    }
    else if (this.alumno.correoInstitucional ==null || this.alumno.correoInstitucional == "") {
      this.mensajevalidacion = "No puedes dejar el campo de correo institucional vacío"
      $('#validacion').modal('show');

    }
    else if (this.alumno.fechaNacimiento ==null || this.alumno.fechaNacimiento == "") {
      this.mensajevalidacion = "No puedes dejar el campo de fecha de nacimiento vacío"
      $('#validacion').modal('show');

    }
    else if (this.alumno.sexo == null || this.alumno.sexo == "") {

      this.mensajevalidacion = "No puedes dejar el campo de sexo vacío"
      $('#validacion').modal('show');
    }
    else {
      console.log(JSON.stringify(data.value));
      this.alumnoService.updateAlumno0(this.alumno.id, this.alumno).subscribe(() => {
        $('#success-modal-preview').modal('show');

        if (this.idobtenido == null) {
          this.router.navigate(['/dashboard']);
          //console.log(user);

        } else {
          this.router.navigate(['/proyectos/ver', this.idobtenido]);
        }
      })
    }
  }


}


