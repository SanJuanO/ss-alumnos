import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../services/alumno.service';
import { UniversidadService } from '../services/universidad.service';
import { CarreraService } from '../services/carrera.service';
import { FacultadService } from '../services/facultad.service';
import { Universidad } from "../models/universidad";
import { Carrera } from "../models/carrera";
import { Facultad } from "../models/facultad";
import { Alumno,AlumnoProyecto } from '../models/alumno';
import { DocumentosRequeridosAlumnos, DocumentosAlumno, Documentosfile } from "../models/documentosalumnos";
import { SessionService } from '../services/session.service';

import { respuesta } from "../models/alumno";
import { OrganizationService } from '../services/organization.service';


import {Location} from '@angular/common';


import { Router,ActivatedRoute } from '@angular/router';
import { Binary } from '@angular/compiler';
import { NgModel } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-empresa-ver',
  templateUrl: './empresa-evaluar.component.html',
  styleUrls: ['./empresa-evaluar.component.scss']
})
export class EmpresaevaluarComponent implements OnInit {
  activo = true;

  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];
  public documentos: DocumentosRequeridosAlumnos[] = [];
  public documentoscadena = new DocumentosAlumno();
  public documentosfile = new Documentosfile()

public uno="siempre";
public dos="siempre";
public tres="siempre";
public cuatro="siempre";
public cinco="siempre";
public seis="siempre";
public siete="siempre";
public ocho="siempre";

public idOrganizacion: string;

  public idAlumno: string;
  public alumnoproyecto: AlumnoProyecto = new AlumnoProyecto("", "", "", 0, 0, 0,0);
  public respuestas: respuesta = new respuesta(1,1,true,"");
  public respuestas2: respuesta = new respuesta(1,1,true,"");
  public respuestas3: respuesta = new respuesta(1,1,true,"");
  public respuestas4: respuesta = new respuesta(1,1,true,"");
  public respuestas5: respuesta = new respuesta(1,1,true,"");
  public respuestas6: respuesta = new respuesta(1,1,true,"");
  public respuestas7: respuesta = new respuesta(1,1,true,"");
  public respuestas8: respuesta = new respuesta(1,1,true,"");
  public respuestas9: respuesta = new respuesta(1,1,true,"");
  public respuestas10: respuesta = new respuesta(1,1,true,"");
  public respuestas11: respuesta = new respuesta(1,1,true,"");
  public respuestas12: respuesta = new respuesta(1,1,true,"");
  public respuestas13: respuesta = new respuesta(1,1,true,"");
  public idproyectoalumno:number;
  public proyectoalumno:string="";
  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0, "", "", "", "", "", "", "", "", "", "", true,0 ,"","","");

  constructor(private org: OrganizationService,private route: ActivatedRoute, private router: Router, 
    private facultadService: FacultadService, private carreraService: CarreraService,
     private universidadService: UniversidadService, private alumnoService: AlumnoService, 
     private _location: Location,public session: SessionService) { }



  ngOnInit(): void {
    this.idAlumno = this.route.snapshot.paramMap.get("id");
    this.alumnoService.getAlumno(this.idAlumno).subscribe((alumno: Alumno) => this.alumno = alumno);
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerproyectoalumno();
    console.log(this.alumno);
    this.onchage();
  }
  obtenerproyectoalumno() {
    var iduser=Number(this.session.getToken());
console.log(iduser);
   this.alumnoService.getProyectosAlumno(iduser).subscribe((res: any) => {
     console.log(res);
this.alumnoproyecto=res;
     this.proyectoalumno= res['proyectoNombre'];
     this.idproyectoalumno= res['idProyecto'];
this.idOrganizacion= res['idOrganizacion'];

   }, error => {
   })


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
crearform(){
  var model1=this.respuestas;
  var model2=this.respuestas2;
  var model3=this.respuestas3;
  var model4=this.respuestas4;
  var model5=this.respuestas5;
  var model6=this.respuestas6;
  var model7=this.respuestas7;
  var model8=this.respuestas8;
  var model9=this.respuestas9;
  var model10=this.respuestas10;
  var model11=this.respuestas11;
  var model12=this.respuestas12;
  var model13=this.respuestas13;


  model1.idPregunta=1;
  model1.idOrganizacion=Number(this.idOrganizacion);
  model1.respuesta=this.uno;
  model1.activo=true;

  model2.idPregunta=2;
  model2.idOrganizacion=Number(this.idOrganizacion);
  model2.respuesta=this.dos;
  model2.activo=true;

  model3.idPregunta=3;
  model3.idOrganizacion=Number(this.idOrganizacion);
  model3.respuesta=this.tres;
  model3.activo=true;

  model4.idPregunta=4;
  model4.idOrganizacion=Number(this.idOrganizacion);
  model4.respuesta=this.cuatro;
  model4.activo=true;

  model5.idPregunta=5;
  model5.idOrganizacion=Number(this.idOrganizacion);
  model5.respuesta=this.cinco;
  model5.activo=true;

  model6.idPregunta=6;
  model6.idOrganizacion=Number(this.idOrganizacion);
  model6.respuesta=this.seis;
  model6.activo=true;

  model7.idPregunta=7;
  model7.idOrganizacion=Number(this.idOrganizacion);
  model7.respuesta=this.siete;
  model7.activo=true;

  model8.idPregunta=8;
  model8.idOrganizacion=Number(this.idOrganizacion);
  model8.respuesta=this.ocho;
  model8.activo=true;

  model9.idPregunta=9;
  model9.idOrganizacion=Number(this.idOrganizacion);
  model9.respuesta=$('#nueve').val();
  model9.activo=true;

  model10.idPregunta=10;
  model10.idOrganizacion=Number(this.idOrganizacion);
  model10.respuesta=$('#diez').val();
  model10.activo=true;

  model11.idPregunta=11;
  model11.idOrganizacion=Number(this.idOrganizacion);
  model11.respuesta=$('#once').val();
  model11.activo=true;

  model12.idPregunta=12;
  model12.idOrganizacion=Number(this.idOrganizacion);
  model12.respuesta=$('#doce').val();
  model12.activo=true;
  
  model13.idPregunta=13;
  model13.idOrganizacion=Number(this.idOrganizacion);
  model13.respuesta=$('#trece').val();
  model13.activo=true;
var arreglo=[model1,model2,model3,model4,model5,model6,model7,model8,model9,model10,model11,model12,model13];

console.log(arreglo);

this.alumnoService.respuestapreguntas(arreglo).subscribe(() => {

   this._location.back();


 })

}
onchage(){
  // the selector will match all input controls of type :checkbox
// and attach a click event handler 
$("input:checkbox").on('click', function() {
  // in the handler, 'this' refers to the box clicked on
  var $box = $(this);
  if ($box.is(":checked")) {
    // the name of the box is retrieved using the .attr() method
    // as it is assumed and expected to be immutable
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    // the checked state of the group/box on the other hand will change
    // and the current value is retrieved using .prop() method
    $(group).prop("checked", false);
    $box.prop("checked", true);
    if($box.attr("name")=="uno[1][]"){
    this.uno=  $box.val();
    console.log(this.uno);
    }
    if($box.attr("name")=="dos[1][]"){
      this.uno=  $box.val();
      console.log(this.uno);
      }
      if($box.attr("name")=="tres[1][]"){
        this.uno=  $box.val();
        console.log(this.uno);
        }
        if($box.attr("name")=="cuatro[1][]"){
          this.uno=  $box.val();
          console.log(this.uno);
          }
          if($box.attr("name")=="cinco[1][]"){
            this.uno=  $box.val();
            console.log(this.uno);
            }
            if($box.attr("name")=="seis[1][]"){
              this.uno=  $box.val();
              console.log(this.uno);
              }
              if($box.attr("name")=="siete[1][]"){
                this.uno=  $box.val();
                console.log(this.uno);
                }
                if($box.attr("name")=="ocho[1][]"){
                  this.uno=  $box.val();
                  console.log(this.uno);
                  }

  } else {
    $box.prop("checked", false);
  }


});

}
check(){
  console.log($('#uno[1][]').val());
}

}
