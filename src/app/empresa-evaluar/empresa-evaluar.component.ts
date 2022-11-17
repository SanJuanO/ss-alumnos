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

import { RespuestasAlumnosOrganizaciones } from "../models/alumno";
import { OrganizationService } from '../services/organization.service';


import {Location} from '@angular/common';


import { Router,ActivatedRoute } from '@angular/router';
import { Binary } from '@angular/compiler';
import { NgModel } from '@angular/forms';
declare var $: any;
import { environment } from "../../environments/environment";


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
  public preguntasArray:[] =[]

public uno="siempre";
public dos="siempre";
public tres="siempre";
public cuatro="siempre";
public cinco="siempre";
public seis="siempre";
public siete="siempre";
public ocho="siempre";

public idOrganizacion: string;

  public version: string;
  public idAlumnosProyectosAsignados: string;
  public alumnoproyecto: AlumnoProyecto = new AlumnoProyecto("", "", "", 0, 0, 0,0);
  public idproyectoalumno:number;
  public proyectoalumno:string="";
  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0, "", "", "", "", "", "", "", "", "", "", true,0 ,"","","");
  public preguntas: [] = [];

  constructor(private org: OrganizationService,private route: ActivatedRoute, private router: Router, 
    private facultadService: FacultadService, private carreraService: CarreraService,
     private universidadService: UniversidadService, private alumnoService: AlumnoService, 
     private _location: Location,public session: SessionService) { }

  ngOnInit(): void {
    this.version = this.route.snapshot.paramMap.get("id");
    this.idAlumnosProyectosAsignados = this.route.snapshot.paramMap.get("id2");
    console.log(this.version + " v, id: " + this.idAlumnosProyectosAsignados);
    if (this.version != undefined && this.idAlumnosProyectosAsignados != undefined) {
      this.idproyectoalumno = Number(this.idAlumnosProyectosAsignados);
      this.obtenerPreguntasAlumnoOrganizacion();
    }
    this.obtenerproyectoalumno();
    this.resetPosition();
  }
  obtenerproyectoalumno() {
    this.alumnoService.getAlumnoProyectoAsignadoById(this.idAlumnosProyectosAsignados).subscribe((res: any) => {
      console.log(res);
      this.alumnoproyecto = res;
      this.proyectoalumno = res['proyectoNombre'];
      this.idproyectoalumno = res['idProyecto'];
      this.idOrganizacion = res['idOrganizacion'];

    }, error => {
    })


  }

  obtenerPreguntasAlumnoOrganizacion() {
    this.alumnoService.getPreguntasEvaluacionAlumnoOrganizacion(this.idAlumnosProyectosAsignados, this.version).subscribe((res: any) => {
      console.log(res);
      this.preguntasArray = res;
      
    }, error => {
    })

  }

  crearform() {

    var respuestas: RespuestasAlumnosOrganizaciones[] = [];
    var i = 0;
    var res: RespuestasAlumnosOrganizaciones;
    var valor: any;
    for (i = 0; i < this.preguntasArray.length; i++) {

      if (this.preguntasArray[i]["tipo"] == 'valor') {
        valor = $('input:radio[name=estrellas' + this.preguntasArray[i]["id"] + ']:checked').val();
        if (valor == undefined) {
          alert("Faltan preguntas por contestar");
          return;
        }
      } else {
        valor = $('#estrellas' + this.preguntasArray[i]["id"]).val();
      }

      res = new RespuestasAlumnosOrganizaciones(Number(this.idAlumnosProyectosAsignados), this.alumnoproyecto.idAlumno, Number(this.idOrganizacion), Number(this.preguntasArray[i]["id"]), true, valor, Number(this.version),"");
      respuestas.push(res);
    }

    console.log(respuestas);
    
    this.alumnoService.addRespuestasPreguntas(respuestas).subscribe((res) => {

      //this._location.back();
      if (res == true) {
        this.router.navigate(['/proyectos/ver/', this.idproyectoalumno]);
      } else {
        alert("add respuestas false");
      }
    }, error => {
      alert(error.error)
    })

  }

  resetPosition() {
    let myDiv = document.getElementById("detail");
    myDiv.scrollTop = 0;
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}
