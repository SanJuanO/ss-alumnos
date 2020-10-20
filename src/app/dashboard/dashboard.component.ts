import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa } from "../models/empresa"
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria"

import { ProyectoService } from '../services/proyecto.service';
import { AlumnosProyectos } from "../models/proyectos"
import { SessionService } from '../services/session.service';
import { AlumnoService } from '../services/alumno.service';
import { Alumno, AlumnoProyecto } from '../models/alumno';
import { DocumentosRequeridosAlumnos, DocumentosAlumno, Documentosfile } from "../models/documentosalumnos";

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public empresa: Empresa[] = [  ];
  public empresacantidad: number;
  public empresaactiva: Empresa[] = [  ];
  public empresadesaciva: Empresa[] = [  ];
  public d: Date = new Date(); 
  public tipoModel = new Tipo(1);
  public convocatorias:Convocatoria [] = [ ];
  public convocatoriasalumnos:Convocatoria [] = [ ];
  public project: AlumnosProyectos[] = [];

  public convocatoriasf:Convocatoria [] = [ ];
  public convocatoriasalumnosf:Convocatoria [] = [ ];

  public idproyecto:string;
  public proyecto:string;

  public documentos: DocumentosRequeridosAlumnos[] = [];
  public documentoscadena = new DocumentosAlumno();
  public documentosfile = new Documentosfile()


  constructor(private organizacionService: OrganizationService, private convocatoriaService: ConvocatoriaServices, private proyectoService: ProyectoService, public session: SessionService, private alumnoService: AlumnoService,) { 
  
  }


  ngOnInit(): void {




       this.convocatorias = [ ];
     this.convocatoriasalumnos = [ ];
     this.convocatoriasf = [ ];
     this.convocatoriasalumnosf = [ ];
     this.obtenerProyectos();

    this.obtenerConvocatoria2();
    this.obtenerdocumentosRequeridos();




  }

  ngAfterViewInit() {
    Feather.replace();

  }


  obtenerConvocatoria2() {
    let model = this.tipoModel;
    model.tipo=2;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{
this.convocatoriasalumnos=res;
for(var i=0;i<this.convocatoriasalumnos.length;i++){
  var fech= Date.parse(this.convocatoriasalumnos[i].fechaTermino.toString());


if(fech < Date.now() ){


this.convocatoriasalumnosf.push(this.convocatoriasalumnos[i]);

}

}
console.log(this.convocatoriasalumnosf);



})
  }

  obtenerProyectos() {
    var id=this.session.getToken();
console.log(id);
     this.proyectoService.getProyectoalumno(id).subscribe((res: any[])=>{        
this.idproyecto=res["idProyecto"];
this.proyecto=res["proyectoNombre"];

});
}

  obtenerdocumentosRequeridos() {
    return this.alumnoService
      .getdocumentosRequeridos()
      .subscribe((documentos: DocumentosRequeridosAlumnos[]) => this.documentos = documentos);
  }
  abrirsubir(id) {

    console.log("dfdsfdsfds" + id);
    $('#abrirsubir-' + id).modal('show');

  }
  abrirsubirr() {


    $('#abrirsubirr').modal('show');

  }

  subirarchivo() {
    console.log("subir");

    this.documentosfile.file = this.documentoscadena.file;
    console.log(this.documentosfile);

    this.alumnoService.subirdocumentos(this.documentosfile).subscribe((res: any) => {
      console.log(res);

      this.documentoscadena.ruta = res.ruta;

      this.subirarchivoconcadena();

    }, error => {
      alert(error.error)
    })


  }

  subirarchivoconcadena() {

    this.alumnoService.subirdocumentoscadena(this.documentoscadena).subscribe((res: any) => {
      console.log(res);


    }, error => {
      alert(error.error)
    })


  }
  subeArchivoreporte() {


  }

  subeArchivo() {

    var selecttedFile = ($("#Imagen"))[0].files[0];
    var dataString = new FormData();
    dataString.append("file", selecttedFile);

    $.ajax({
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:4200,https://serviciosocial.gesdesapplication.com/api/DocumentosOrganizaciones/UploadFile',https://localhost:4200",
        "Access-Control-Allow-Headers": "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
        "Access-Control-Allow-Methods": " POST",
        "Allow": " POST"
      },
      url: "https://serviciosocial.gesdesapplication.com/api/DocumentosAlumnos/UploadFile",
      type: "POST",
      data: dataString,
      contentType: false,
      processData: false,
      async: true,

      success: function (data) {
        if (parseInt(data.resultado)) {

          alert("archivo agregado " + data);
        }
      },
      error: function (data) {
        alert("Error al agregado archivo" + data);
      }

    });
  }


}
