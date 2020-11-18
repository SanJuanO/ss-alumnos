import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa } from "../models/empresa"
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria"

import { ProyectoService } from '../services/proyecto.service';
import { AlumnosProyectos, AlumnosModel } from "../models/proyectos"
import { SessionService } from '../services/session.service';
import { AlumnosProyectosAsignados, ReportesAlumnos } from '../models/alumno';
import { AlumnoService } from '../services/alumno.service';

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
  public tipoModel = new Tipo(1);
  public convocatorias: Convocatoria[] = [];
  public convocatoriasalumnos: Convocatoria[] = [];
  public project: AlumnosProyectosAsignados = null;
  public projectArray: Array<AlumnosProyectosAsignados> = null;

  public convocatoriasf: Convocatoria[] = [];
  public convocatoriasalumnosf: Convocatoria[] = [];

  public idproyecto: string;
  public proyecto: string = "";
  public estadoInscripcion = 0;
  public fileToUpload: File;
  public reportes: Array<ReportesAlumnos> = [];
  public alumno: AlumnosModel=null;

  constructor(private convocatoriaService: ConvocatoriaServices, private proyectoService: ProyectoService,private alumnoService: AlumnoService, public session: SessionService) {

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
      this.getReportes();
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
      console.log(this.convocatoriasalumnos);
      for (var i = 0; i < this.convocatoriasalumnos.length; i++) {
        /*var fech = Date.parse(this.convocatoriasalumnos[i].fechaTermino.toString());
        if (fech < Date.now()) {
          this.convocatoriasalumnosf.push(this.convocatoriasalumnos[i]);
        }
        */
        this.convocatoriasalumnosf.push(this.convocatoriasalumnos[i]);
        
      }

    })
  }

  obtenerProyectos() {
    var id = this.session.getToken();
    //console.log(id);

    this.proyectoService.getProyectoalumno(id).subscribe((res: AlumnosProyectosAsignados[]) => {
      this.projectArray = res;

      if (res != null && res.length > 0) {
        var i = 0;
        for (i = 0; i < res.length; i++) {
          var proyectoAsignado = res[i];
          //console.log(proyectoAsignado);
          if (proyectoAsignado.idEstado == 3) {
            this.project = proyectoAsignado;
            this.estadoInscripcion = proyectoAsignado.idEstado;
            this.idproyecto = ""+proyectoAsignado.idProyecto;
            this.proyecto = proyectoAsignado.proyectoNombre;
          }
        }
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

}


