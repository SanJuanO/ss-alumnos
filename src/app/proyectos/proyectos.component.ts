import { Component, OnInit, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Proyecto,filtro } from "../models/proyectos"
import { ProyectoService } from '../services/proyecto.service';
declare var $: any;
import { Empresa } from "../models/empresa"
import { OrganizationService } from '../services/organization.service';
import { GiroEmpresa } from "../models/giroempresa"
import { RubroEmpresa } from "../models/rubrosempresa"
import { AreaAccion } from "../models/areaaccion"
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public proyectos: Proyecto[] = [];
  public proyectosf: Proyecto[] = [];
  public empresaModel = new Empresa("","","","","","","","","","","","","","","","","","","",true,0,"",0,false,true,1,1,1,1,1,0,0,0,0,0,0,undefined,undefined,undefined)
  public areas: AreaAccion[] = [];
  public rubros: RubroEmpresa[] = [];
  public giro: GiroEmpresa[] = [];
  public filtrobusqueda = new filtro("0","0","0");

  @ViewChild('dataTable', { static: false }) table;

  dataTable: any;
  public validar = false;


  constructor(private organizacionService: OrganizationService,private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.obtenerProyectos();
    this.obtenerGiro();
    this.obtenerRubros();
    this.obtenerAreas();
        this.dataTable.DataTable();
    console.log(this.proyectos);
 


  }

  obtenerProyectos() {
    var idgiro=this.filtrobusqueda.idGiro;
    var idarea=this.filtrobusqueda.idAreaAccion;

    var idrubro=this.filtrobusqueda.idRubro;

    this.proyectoService
    .buscarfiltro(idgiro,idarea,idrubro)
     .subscribe((proyectos: Proyecto[]) => {
       this.proyectos = proyectos;
       for (var i = 0; i < this.proyectos.length; i++) {
         if (this.proyectos[i].activo = true) {
           this.proyectosf.push(this.proyectos[i]);
         }
       }
     });
    
      
  }
  obtenerGiro() {
    return this.organizacionService
      .getGiro()
      .subscribe((giro: GiroEmpresa[]) => this.giro = giro );
  }
  obtenerAreas() {
    return this.organizacionService
      .getAreas()
      .subscribe((areas: AreaAccion[]) => this.areas = areas );
  }
  obtenerRubros() {
    return this.organizacionService
      .getRubros()
      .subscribe((rubros: RubroEmpresa[]) => this.rubros = rubros );
  }
  eliminar(id) {
    this.proyectoService.eliminar(id).subscribe((res: any) => {
      
      if (res) {
        this.validar = true;
        location.reload();
      } else {
        alert("¡Algo salio mal!");
      }
    }, error => {
      alert(error.error)
    })
  }

  modaleliminar(id) {
    console.log("dfdsfdsfds" + id);
    $('#delete-modal-preview-' + id).modal('show');
  }

  ngAfterViewInit() {
    Feather.replace();
  }
  limpiar(){
  
    this.proyectoService
    .getAll()
     .subscribe((proyectos: Proyecto[]) => {
       this.proyectos = proyectos;
       for (var i = 0; i < this.proyectos.length; i++) {
         if (this.proyectos[i].activo = true) {
           this.proyectosf.push(this.proyectos[i]);
         }
       }
     });

  }
  buscar(){
this.proyectos=[];

this.proyectosf=[];

    var idgiro=this.filtrobusqueda.idGiro;
    var idarea=this.filtrobusqueda.idAreaAccion;

    var idrubro=this.filtrobusqueda.idRubro;

    this.proyectoService
    .buscarfiltro(idgiro,idarea,idrubro)
     .subscribe((proyectos: Proyecto[]) => {
       this.proyectos = proyectos;
       for (var i = 0; i < this.proyectos.length; i++) {
         if (this.proyectos[i].activo = true) {
           this.proyectosf.push(this.proyectos[i]);
         }
       }
     });
     console.log(this.proyectos);

console.log(this.proyectosf);

    }

}
