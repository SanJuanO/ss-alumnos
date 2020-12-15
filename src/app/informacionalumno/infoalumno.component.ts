import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { AreasVidaUniversitariaService } from '../services/areasvidauniversitaria.service';

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
  alumno: AlumnoEdit = new AlumnoEdit("", "", "", "", 0, 0, 0, "", "", "", 0, 0, "", "", 0, "", "", "", "", "", "", "", "", "", 0, "", false, true, this.alumnosAreasVidaUniviresitariaParticipado, this.alumnosAreasVidaUniviresitariaParticipado, 0, "", "", "");
  nombre: string = "";
  apellidos: string = "";
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
  public idsPasados: any = "";
  public idsActuales: any = "";
  public idAlumno: string;
  public idobtenido: string;
  public generaciones: any = [];
  myForm: FormGroup;

  constructor(private alumnoService: AlumnoService, public session: SessionService,
    private areasVidaUniversitaria: AreasVidaUniversitariaService,
    private facultadService: FacultadService, private carreraService: CarreraService,
    private universidadService: UniversidadService, private modalidadesTrabajoService: ModalidadesTrabajoService,
    private activatedRoute: ActivatedRoute, private router: Router,
    //public fb: FormBuilder
  ) {
    /*
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      paterno: ['', [Validators.required]],
      materno: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      idUniversidad: ['', [Validators.required]],
      idFacultad: ['', [Validators.required]],
    });*/
    /*
    this.activatedRoute.queryParams.subscribe(params => {
      this.idobtenido = params['idProyecto'];
    });*/
  }

  ngOnInit(): void {
    this.idobtenido = <string><any>(this.activatedRoute.snapshot.paramMap.get("idProyecto"));

    this.nombre = this.session.getnombre();
    this.apellidos = this.session.getapellidos();
    this.obtenerPerfil();
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerModalidadesTrabajo()
    this.obtenerAreasVidaUniversitaria();
    this.ComboAno();
    //console.log(this.alumno);
    //console.log("idObtenido: " + this.idobtenido)

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

  obtenerUniversidades() {

    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }


  obtenerCarreras() {

    return this.carreraService
      .getCarreras()
      .subscribe((carreras: Carrera[]) => { this.carreras = carreras; console.log(carreras); });

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

    return this.areasVidaUniversitaria
      .getAreasVidaUniversitaria()
      .subscribe((listaAreasUniversidad: AreasVidaUniversitaria[]) => this.listaAreasUniversidad = listaAreasUniversidad);

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
    //console.log(this.myForm.value);

    //var temporal = (data.value);

    //console.log(temporal);

    //console.log(temporal['universidad']);
    //console.log(this.alumno);
    if (this.alumno.nombre == null || this.alumno.nombre == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');
      $('#nombre').css("border", "red solid 1px");
      return false;
    } else {
      $('#nombre').css("border", "#dee2e6 solid 1px");

    }

    if (this.alumno.matricula == null || this.alumno.matricula == "") {
      this.mensajevalidacion = "No puedes dejar el campo de matricula vacío"
      $('#validacion').modal('show');
      $('#matricula').css("border", "red solid 1px");
      return false;

    } else {
      $('#matricula').css("border", "#dee2e6 solid 1px");

    }

    if (this.alumno.paterno == null || this.alumno.paterno == "") {
      this.mensajevalidacion = "No puedes dejar el campo de paterno vacío"
      $('#validacion').modal('show');
      $('#paterno').css("border", "red solid 1px");
      return false;
    } else {
      $('#paterno').css("border", "#dee2e6 solid 1px");

    }
    if (this.alumno.materno == null || this.alumno.materno == "") {
      this.mensajevalidacion = "No puedes dejar el campo de materno vacío"
      $('#validacion').modal('show');
      $('#materno').css("border", "red solid 1px");
      return false;
    } else {
      $('#materno').css("border", "#dee2e6 solid 1px");

    }
    if (this.alumno.celular == null || this.alumno.celular == "") {
      this.mensajevalidacion = "No puedes dejar el campo de celular vacío"
      $('#validacion').modal('show');
      $('#celular').css("border", "red solid 1px");
      return false;
    } else {
      $('#celular').css("border", "#dee2e6 solid 1px");

    }

    
    if (this.alumno.porcentaje == null || this.alumno.porcentaje == 0) {

      this.mensajevalidacion = "No puedes dejar el campo de porcentaje vacío"
      $('#validacion').modal('show');
      $('#porcentaje').css("border", "red solid 1px");
      return false;
    } else {
      $('#porcentaje').css("border", "#dee2e6 solid 1px");

    }
    if (this.alumno.noCuatrimestreSemestre == null || this.alumno.noCuatrimestreSemestre < 0 || this.alumno.noCuatrimestreSemestre > 14) {

      this.mensajevalidacion = "Número de Semestre/Cuatrimestre* debe estar en el rango 0 - 14"
      $('#validacion').modal('show');
      $('#noCuatrimestreSemestre').css("border", "red solid 1px");
      return false;
    } else {
      $('#noCuatrimestreSemestre').css("border", "#dee2e6 solid 1px");

    }
    if (this.alumno.esquemaPeriodo == null || this.alumno.esquemaPeriodo == "") {
      this.mensajevalidacion = "No puedes dejar el campo de esquema de periodo vacío"
      $('#validacion').modal('show');

      $('#esquemaPeriodo').css("border", "red solid 1px");
      return false;
    } else {
      $('#esquemaPeriodo').css("border", "#dee2e6 solid 1px");

    }

    if (this.alumno.generacion == null || this.alumno.generacion == "") {

      this.mensajevalidacion = "No puedes dejar el campo de generaciòn vacío"
      $('#validacion').modal('show');
      $('#generacion').css("border", "red solid 1px");
      return false;
    } else {
      $('#generacion').css("border", "#dee2e6 solid 1px");

    }

    if (this.alumno.fechaEstimadaGraduacion == "") {
      this.mensajevalidacion = "No puedes dejar el campo de fecha estimada de graduaciòn vacío"
      $('#validacion').modal('show');
      $('#fechaEstimadaGraduacion').css("border", "red solid 1px");
      return false;
    } else {
      $('#fechaEstimadaGraduacion').css("border", "#dee2e6 solid 1px");

    }

    if (this.alumno.correoInstitucional == null || this.alumno.correoInstitucional == "") {
      this.mensajevalidacion = "No puedes dejar el campo de correo institucional vacío"
      $('#validacion').modal('show');
      $('#correoInstitucional').css("border", "red solid 1px");
      return false;
    } else {
      $('#correoInstitucional').css("border", "#dee2e6 solid 1px");

    }

    if (!this.validarEmail(this.alumno.correoPersonal)) {
      this.mensajevalidacion = "Introduce una dirección de correo válido"
      $('#validacion').modal('show');
      $('#correoPersonal').css("border", "red solid 1px");
      return false;
    } else {
      $('#correoPersonal').css("border", "#dee2e6 solid 1px");

    }

    if (this.alumno.fechaNacimiento == null || this.alumno.fechaNacimiento == "") {
      this.mensajevalidacion = "No puedes dejar el campo de fecha de nacimiento vacío"
      $('#validacion').modal('show');
      $('#fechaNacimiento').css("border", "red solid 1px");
      return false;
    } else {
      $('#fechaNacimiento').css("border", "#dee2e6 solid 1px");

    }

    if (this.alumno.sexo == null || this.alumno.sexo == "") {

      this.mensajevalidacion = "No puedes dejar el campo de sexo vacío"
      $('#validacion').modal('show');
      $('#sexo').css("border", "red solid 1px");
      return false;
    } else {
      $('#sexo').css("border", "#dee2e6 solid 1px");

    }

    if (this.alumno.participacionAsua == null || this.alumno.participacionAsua == "") {

      this.mensajevalidacion = "No puedes dejar el campo de participacion ASUA vacío"
      $('#validacion').modal('show');
      $('#participacionAsua').css("border", "red solid 1px");
      return false;
    } else {
      $('#participacionAsua').css("border", "#dee2e6 solid 1px");

    }

    if (this.alumno.trabajas == null || this.alumno.trabajas == "") {

      this.mensajevalidacion = "No puedes dejar el campo de trabajas vacío"
      $('#validacion').modal('show');
      $('#trabajas').css("border", "red solid 1px");
      return false;
    } else {
      $('#trabajas').css("border", "#dee2e6 solid 1px");

    }

    if (this.alumno.trabajas == "si" && (this.alumno.idModalidadTrabajo == null || this.alumno.idModalidadTrabajo == undefined)) {

      this.mensajevalidacion = "No puedes dejar el campo de modalidad de trabajo vacío"
      $('#validacion').modal('show');
      $('#idModalidadTrabajo').css("border", "red solid 1px");
      return false;
    } else {
      $('#idModalidadTrabajo').css("border", "#dee2e6 solid 1px");

    }

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


  ComboAno() {

    var d = new Date();
    var n = d.getFullYear();
    this.generaciones = new Array();
    //var select = document.getElementById("generacion");
    for (var i = n; i >= 2000; i--) {
      this.generaciones.push(""+i);
      /*var opc = document.createElement("option");
      opc.text = i;
      opc.value = i;
      select.add(opc);*/
    }

  }
  

  validarEmail(valor) {
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(valor) == false) {
      return false
    } else {
      return true;
    }
  }

}

