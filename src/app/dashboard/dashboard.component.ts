import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa } from "../models/empresa"
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria"

import { ProyectoService } from '../services/proyecto.service';
import { AlumnosProyectos, AlumnosModel } from "../models/proyectos"
import { SessionService } from '../services/session.service';
import { AlumnosProyectosAsignados, ReportesAlumnos, AlumnosActividades } from '../models/alumno';
import { AlumnoService } from '../services/alumno.service';
import { AlumnosActividadesServices } from '../services/alumnosactividades.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public empresa: Empresa[] = [];
  public empresacantidad: number;
  public empresaactiva: Empresa[] = [];
  public empresadesaciva: Empresa[] = [];
  public d: Date = new Date();
  public tipoModel = new Tipo(2);
  public convocatorias: Convocatoria[] = [];
  public convocatoriasalumnos: Convocatoria[] = [];
  public project: AlumnosProyectosAsignados = null;
  public projectArray: Array<AlumnosProyectosAsignados> = null;
  public projectArrayTerminados: Array<AlumnosProyectosAsignados> = [];

  public convocatoriasf: Convocatoria[] = [];
  public convocatoriasalumnosf: Convocatoria[] = [];

  public idproyecto: string;
  public proyecto: string = "";
  public estadoInscripcion = 0;
  public fileToUpload: File;
  public reportes: Array<ReportesAlumnos> = [];
  public alumno: AlumnosModel = null;
  public noHoras: number = 0;
  public noHoras0: number = 240;
  public bandNoHoras: boolean = true;

  public alumnoActividad: AlumnosActividades = new AlumnosActividades();
  public alumnoActividadActualiza: AlumnosActividades = new AlumnosActividades();
  public alumnoActividadD: AlumnosActividades = new AlumnosActividades();
  public actividades: Array<AlumnosActividades> = [];
  public idArchivo: number = 0;
  public ocultarTerminados: boolean = true;
  

  constructor(private convocatoriaService: ConvocatoriaServices, private alumnosActividadesService: AlumnosActividadesServices, private proyectoService: ProyectoService, private alumnoService: AlumnoService, public session: SessionService) {

  }

  ngOnInit(): void {
    this.obtenerPerfil();
    this.convocatorias = [];
    this.convocatoriasalumnos = [];
    this.convocatoriasf = [];
    this.convocatoriasalumnosf = [];
    this.obtenerProyectos();
    if (this.project == null) {
      this.obtenerConvocatoria2();
      //this.getReportes();
    }
  }

  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerConvocatoria2() {
    let model = this.tipoModel;
    model.tipo = 2;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[]) => {
      this.convocatoriasalumnos = res;
      //console.log(this.convocatoriasalumnos);
      var options = { year: 'numeric', month: 'long', day: 'numeric' };

      for (var i = 0; i < this.convocatoriasalumnos.length; i++) {
        var fech = Date.parse(this.convocatoriasalumnos[i].fechaTermino.toString().substr(0, 10));
        var fechI = Date.parse(this.convocatoriasalumnos[i].fechaInicio.toString().substr(0, 10));

        var fech0 = new Date(this.convocatoriasalumnos[i].fechaTermino.toString().substr(0, 10));
        var fechI0 = new Date(this.convocatoriasalumnos[i].fechaInicio.toString().substr(0, 10));

        if (fechI < Date.now() && fech > Date.now()) {
          this.convocatoriasalumnos[i].fechaInicioString = fechI0.toLocaleString("es-ES", options);
          this.convocatoriasalumnos[i].fechaTerminoString = fech0.toLocaleString("es-ES", options);
          this.convocatoriasalumnosf.push(this.convocatoriasalumnos[i]);
        }
        //this.convocatoriasalumnosf.push(this.convocatoriasalumnos[i]);
        
      }
      
    })
  }

  obtenerProyectos() {
    var id = this.session.getToken();
    //console.log(id);

    this.proyectoService.getProyectoalumno(id).subscribe((res: AlumnosProyectosAsignados[]) => {
      this.projectArray = res;
      //console.log(this.projectArray);
      if (res != null && res.length > 0) {
        var i = 0;
        var projectArray2: Array<AlumnosProyectosAsignados> = [];

        for (i = 0; i < res.length; i++) {
          var proyectoAsignado = res[i];
          //console.log(proyectoAsignado);
          if (proyectoAsignado.idEstado == 1 || proyectoAsignado.idEstado == 2 || proyectoAsignado.idEstado == 3 || proyectoAsignado.idEstado == 4 || proyectoAsignado.idEstado == 5) {
            if (proyectoAsignado.idEstado == 1 || proyectoAsignado.idEstado == 2 || proyectoAsignado.idEstado == 3) {

              projectArray2.push(proyectoAsignado);

            } else if (proyectoAsignado.idEstado == 4) {
                this.project = proyectoAsignado;
                this.estadoInscripcion = proyectoAsignado.idEstado;
                this.idproyecto = "" + proyectoAsignado.idProyecto;
                this.proyecto = proyectoAsignado.proyectoNombre;
                this.noHoras = proyectoAsignado.noHoras;
                if (this.noHoras > 0) {
                  this.bandNoHoras = false;
              }
              console.log(this.project);
            } else {
                this.obtenerActividadesByIdAlumnoProyectoAsignado2(proyectoAsignado);
                this.projectArrayTerminados.push(proyectoAsignado);
              //console.log(proyectoAsignado);
              }
          }
          
        }
      }

      this.projectArray = projectArray2;

      if (this.project != null) {
        this.obtenerActividadesByIdAlumnoProyectoAsignado();
      }
      //console.log(res);
      
    });

  }

  
  //TODO SERGIO
  abrirsubir() {

    //console.log("dfdsfdsfds" + id);
    //this.idDocumento = id;
    $('#subirreporte').modal('show');

  }
  descargar(id) {
    var i = 0;
    var doc = null;
    for (i = 0; i < this.reportes.length; i++) {
      if (this.reportes[i].id == id) {
        doc = this.reportes[i];
      }
    }
    if (doc != null) {
      let pdfWindow = window.open("")
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(doc.archivo) + "'></iframe>"
      )
    }
  }

  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  subeArchivoreporte() {
    var id = this.session.getToken();
    this.alumnoService.postFile(this.fileToUpload, id,this.idproyecto).subscribe(data => {
      if (data.resultado == 1) {
        $('#subirreporte').modal('hide');
        $('#success-modal-preview-file').modal('show');
        location.reload();
      }
    }, error => {
      console.log(error);
    });
  }

  getReportes() {
    var id = this.session.getToken();
    this.alumnoService.getReportsByIdAlumno(id).subscribe(data => {
      this.reportes = data;
      //console.log(this.reportes);
    }, error => {
      console.log(error);
    });
  }


  obtenerPerfil() {
    var id = this.session.getToken();
    //console.log(id);

    this.alumnoService.getAlumno(id).subscribe((res: AlumnosModel) => {
      this.alumno = res;

      //console.log(res);

    });

  }

  actualizaHoras() {
    //console.log(this.project.id + " " + this.noHoras)
    if (this.noHoras0 != -1) {
      this.noHoras = this.noHoras0;
    }
    if (this.noHoras < 0 || this.noHoras > 600 || this.noHoras==null) {
      alert("Número de horas a cumplir debe estar en el rango 0 - 600");
      return;
    }
    
    this.alumnoService.updateHorasACuplirEnProyecto(this.project.id, this.noHoras).subscribe((res) => {
      
      if (res) {
        $('#success-modal-actualizaHoras').modal('show');
        location.reload();
      }
      //console.log(res);

    });
    
  }

  obtenerActividadesByIdAlumnoProyectoAsignado() {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    if (this.project.id > 0) {
      this.alumnosActividadesService.getAlumnosActividadesByIdAlumnoProyectoAsignado(this.project.id).subscribe(data => {
        this.actividades = <Array<AlumnosActividades>><any>data;
        var i = 0;
        for (i = 0; i < this.actividades.length; i++) {
          var fech = new Date(this.actividades[i].fechaCreacion);
          this.actividades[i].fechaCreacion = fech.toLocaleDateString("es-ES", options);
        }

        //console.log(data)
        /*if (data.resultado == 1) {
          $('#subirreporte').modal('hide');
          $('#success-modal-preview-file').modal('show');
          location.reload();
        }*/
      }, error => {
        console.log(error);
      });
    }
  }

  obtenerActividadesByIdAlumnoProyectoAsignado2(projectoTerminado) {
      var options = { year: 'numeric', month: 'long', day: 'numeric' };


    if (projectoTerminado.id > 0) {
      this.alumnosActividadesService.getAlumnosActividadesByIdAlumnoProyectoAsignado(projectoTerminado.id).subscribe(data => {
        projectoTerminado.actividades = data;
        var i=0;
        for (i = 0; i < projectoTerminado.actividades.length; i++) {
          var fech = new Date(projectoTerminado.actividades[i].fechaCreacion);
          projectoTerminado.actividades[i].fechaCreacion = fech.toLocaleDateString("es-ES",options);
        }
        //console.log(projectoTerminado);
      }, error => {
        console.log(error);
      });
    }
  }

  agregaActividad() {
    this.alumnoActividad.idAlumnoProyectoAsignado = this.project.id;
    this.alumnoActividad.activo = true;
    this.alumnoActividad.validaEmpresa = false;
    if (this.alumnoActividad.titulo == "") {
      return false;
    }else if (this.alumnoActividad.actividad== "") {
      return false;
    }
    //console.log(this.alumnoActividad);

    this.alumnosActividadesService.CreateActivityWithFile(this.fileToUpload, this.alumnoActividad).subscribe(data => {
      if (data.resultado) {
        this.alumnoActividad = new AlumnosActividades();
        this.fileToUpload = undefined;
        $("#adjunto").val("");
        $('#subirreporte').modal('hide');
        $('#success-modal-preview-file').modal('show');
        this.obtenerActividadesByIdAlumnoProyectoAsignado();
        //location.reload();
      }
    }, error => {
      console.log(error);
    });
  }

  actualizaActividad() {
    this.alumnoActividad.idAlumnoProyectoAsignado = this.project.id;
    this.alumnoActividad.activo = true;
    this.alumnoActividad.validaEmpresa = false;
    if (this.alumnoActividad.titulo == "") {
      return false;
    }else if (this.alumnoActividad.actividad== "") {
      return false;
    }
    //console.log(this.alumnoActividad);

    this.alumnosActividadesService.CreateActivityWithFile(this.fileToUpload, this.alumnoActividad).subscribe(data => {
      if (data.resultado) {
        this.alumnoActividad = new AlumnosActividades();
        this.fileToUpload = undefined;
        $("#adjunto").val("");
        $('#subirreporte').modal('hide');
        $('#success-modal-preview-file').modal('show');
        this.obtenerActividadesByIdAlumnoProyectoAsignado();
        //location.reload();
      }
    }, error => {
      console.log(error);
    });
  }

  mostarMas(actividad) {
    //console.log("abrir mas");
    this.alumnoActividadD = actividad;
  }

  editar(actividad) {
    console.log(actividad);
    this.alumnoActividadActualiza.id = actividad.id;
    this.alumnoActividadActualiza.actividad = actividad.actividad;
    this.alumnoActividadActualiza.titulo = actividad.titulo;
    this.alumnoActividadActualiza.ruta = actividad.ruta;
    this.alumnoActividadActualiza.idAlumnoProyectoAsignado = actividad.idAlumnoProyectoAsignado;
  }

  abrirSubirCarta(opc) {
    this.idArchivo = opc;
    //console.log("dfdsfdsfds" + this.idArchivo);
    //this.idDocumento = id;
    $('#subirCarta').modal('show');

  }

  subeArchivoCarta() {
    //console.log(this.project.id.toString());

    this.alumnoService.subeCarta(this.fileToUpload, this.project.id.toString(), this.idArchivo).subscribe(data => {
      if (data) {
        $('#subirCarta').modal('hide');
        $('#success-modal-preview-carta').modal('show');
        this.obtenerProyectos();
        //OnInit();
      }
    }, error => {
      console.log(error);
    });
    
  }

  descargarCarta(id) {

    if (id == 0 && this.project.archivoCartaInicio != null && this.project.archivoCartaInicio!='') {
      let pdfWindow = window.open("")
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(this.project.archivoCartaInicio) + "'></iframe>"
      )
    } else if (id==1 && this.project.archivoCartaTermino != null && this.project.archivoCartaTermino != ''){
      let pdfWindow = window.open("")
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(this.project.archivoCartaTermino) + "'></iframe>"
      )
    }
  }

  descargarCartaEnded(archivo) {

      let pdfWindow = window.open("")
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(archivo) + "'></iframe>"
      )
  }

  ocultaMuestraTerminados() {
    this.ocultarTerminados = !this.ocultarTerminados;
  }

}


