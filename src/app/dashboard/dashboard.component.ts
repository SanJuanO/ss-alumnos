import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa } from "../models/empresa"
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria"
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../environments/environment";

import { ProyectoService } from '../services/proyecto.service';
import { AlumnosProyectos, AlumnosModel } from "../models/proyectos"
import { SessionService } from '../services/session.service';
import { AlumnosProyectosAsignados, ReportesAlumnos, AlumnosActividades, RespuestasAlumnosOrganizaciones } from '../models/alumno';
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
  public   api = environment.baseUrl;

  public convocatoriasf: Convocatoria[] = [];
  public convocatoriasalumnosf: Convocatoria[] = [];

  public idproyecto: string;
  public proyecto: string = "";
  public estadoInscripcion = 0;
  public fileToUpload: File;
  public RespuestasEvaluaciones1: any = [];
  public RespuestasEvaluaciones2: any = [];
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
  

  constructor(private convocatoriaService: ConvocatoriaServices, 
    private alumnosActividadesService: AlumnosActividadesServices, private proyectoService: ProyectoService,
     private alumnoService: AlumnoService, public session: SessionService,private cookies: CookieService) {

  }

  ngOnInit(): void {
    this.obtenerPerfil();
    this.convocatorias = [];
    this.convocatoriasalumnos = [];
    this.convocatoriasf = [];
    this.convocatoriasalumnosf = [];
    this.obtenerProyectos();
  
    if(this.cookies.get("mostrarproyectos")){
      this.cookies.delete("mostrarproyectos");
    this.mostrarmodal();


    
    }
    //this.obtenerConvocatoria2();

   
    
  }

  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerConvocatoria2() {
    let model = this.tipoModel;
    model.tipo = 2;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[]) => {
      this.convocatoriasalumnos = res;
      console.log(res);
      //console.log(this.convocatoriasalumnos);
      var options = { year: 'numeric', month: 'long', day: 'numeric' };

      for (var i = 0; i < this.convocatoriasalumnos.length; i++) {
        var fech = Date.parse(this.convocatoriasalumnos[i].fechaTermino.toString().substr(0, 10) + "T23:59:59");
        var fechI = Date.parse(this.convocatoriasalumnos[i].fechaInicio.toString().substr(0, 10) + "T23:59:59");

        var fech0 = new Date(this.convocatoriasalumnos[i].fechaTermino.toString().substr(0, 10)+"T23:59:59");
        var fechI0 = new Date(this.convocatoriasalumnos[i].fechaInicio.toString().substr(0, 10) + "T23:59:59");

        console.log("fechaINicio: " + fech0 + " FechaTermino" + fechI0);
        if (fechI <= Date.now() && fech >= Date.now()) {
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
     
      console.log(this.projectArray);
      if (res != null && res.length > 0) {
        var i = 0;
        var projectArray2: Array<AlumnosProyectosAsignados> = [];

        for (i = 0; i < res.length; i++) {
          var proyectoAsignado = res[i];
          //console.log(proyectoAsignado);
          if (proyectoAsignado.idEstado == 1 || proyectoAsignado.idEstado == 2 || proyectoAsignado.idEstado == 3 || proyectoAsignado.idEstado == 4 || proyectoAsignado.idEstado == 5) {
            projectArray2.push(proyectoAsignado);
            /*
            if (proyectoAsignado.idEstado == 1 || proyectoAsignado.idEstado == 2 || proyectoAsignado.idEstado == 3) {

              projectArray2.push(proyectoAsignado);

            } else */if (proyectoAsignado.idEstado == 4) {
              this.project = proyectoAsignado;
              this.estadoInscripcion = proyectoAsignado.idEstado;
              this.idproyecto = "" + proyectoAsignado.idProyecto;
              this.proyecto = proyectoAsignado.proyectoNombre;
              this.noHoras = proyectoAsignado.noHoras;
              if (this.noHoras > 0) {
                this.bandNoHoras = false;
              }
              //this.getEvaluacionesProyectoOrganizacion();
              console.log(this.project);
            } else {
              //this.obtenerActividadesByIdAlumnoProyectoAsignado2(proyectoAsignado);
              this.projectArrayTerminados.push(proyectoAsignado);

              //console.log(proyectoAsignado);
            }
          }

        }
      }

      this.projectArray = projectArray2;
      /*
      if (this.project != null) {
        this.obtenerActividadesByIdAlumnoProyectoAsignado();
      }*/
      //console.log(res);
      document.getElementById("convocatorii").style.display = "block";
      document.getElementById("carg").style.display = "none";
      if (this.project == null) {
        this.obtenerConvocatoria2();
        //this.getReportes();
      }
      
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

    });

  }

  

  


  
  mostrarmodal() {
    console.log("adentro");
    $('#warning-modal-preview').modal('show');
  }


  
}


