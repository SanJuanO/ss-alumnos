import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto, listaApoyosModel, listaLineasTrabajoModel, ApoyosModel, LineasTrabajoModel, ProyectosAreasModel, ProyectosRangosModel, ProyectosPoblacionesModel, PeriodosModel, EstadosProyectosModel } from "../../models/proyectos";
import { Empresa } from "../../models/empresa";
import { OrganizationService } from '../../services/organization.service';
import { Universidad } from "../../models/universidad";
import { UniversidadService } from '../../services/universidad.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import {Location} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-proyectos-add',
  templateUrl: './proyectos-add.component.html',
  styleUrls: ['./proyectos-add.component.scss']
})
export class ProyectosAddComponent implements OnInit {
   public form: FormGroup;
   public idempresa:number;
   public empresa:string;

  public proyectoModel = new Proyecto();
  public listaApoyos = new Array<listaApoyosModel>();
  public listaLineasTrabajo = new Array<listaLineasTrabajoModel>();
  public validar = false;
  public organizaciones: Empresa[] = [];
  public proyectosAreas: ProyectosAreasModel[] = [];
  public proyectosRangos: ProyectosRangosModel[] = [];
  public proyectosPoblaciones: ProyectosPoblacionesModel[] = [];
  public periodos: PeriodosModel[] = [];
  public universidades: Universidad[] = [];
  public estadosProyectos: EstadosProyectosModel[] = [];
  public apoyos: ApoyosModel[] = [];
  public lineasTrabajo: LineasTrabajoModel[] = [];

  //public empresaModel = new Empresa("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", true, 0, "", 0, false, true, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, undefined, undefined, undefined)

  /*
  public areas: AreaAccion[] = [];
  public rubros: RubroEmpresa[] = [];
  public universidades: Universidad[] = [];
  public tipo: TipoEmpresa[] = [];
  public responsablemodel = new Responsablemodel("","","","","","","","","",true,true)

  public giro: GiroEmpresa[] = [];
  public estado: EstadoEmpresa[] = [];
  public listaAreasAccion = [];
  public listaRubros = [];
  public clasificacion: ClasificacionEmpresa[] = [];

  public contactos = [];
  */
  //checkmodel = new check("false","false")


  constructor(private proyectoService: ProyectoService, private organizacionService: OrganizationService,
    private universidadService: UniversidadService, private router: Router,public session: SessionService,private _location: Location) {
  }


  ngOnInit(): void {
    this.idempresa=Number(this.session.getToken());
    this.empresa=this.session.getnombre();

    this.obtenerOrganizaciones();
    this.obtenerProyectosAreas();
    this.obtenerProyectosRangos();
    this.obtenerProyectosPoblaciones();
    this.obtenerPeriodos();
    this.obtenerUniversidades();
    this.obtenerEstadosProyectos();
    this.obtenerApoyos();
    this.obtenerLineasTrabajo();
  }
  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerOrganizaciones() {
    return this.organizacionService
      .getAll()
      .subscribe((organizaciones: Empresa[]) => this.organizaciones = organizaciones);
  }
  obtenerProyectosAreas() {
    return this.proyectoService
      .getProyectosAreas()
      .subscribe((proyectosAreas: ProyectosAreasModel[]) => this.proyectosAreas = proyectosAreas);
  }
  obtenerProyectosRangos() {
    return this.proyectoService
      .getProyectosRangos()
      .subscribe((proyectosRangos: ProyectosRangosModel[]) => this.proyectosRangos = proyectosRangos);
  }
  obtenerProyectosPoblaciones() {
    return this.proyectoService
      .getProyectosPoblaciones()
      .subscribe((proyectosPoblaciones: ProyectosPoblacionesModel[]) => this.proyectosPoblaciones = proyectosPoblaciones);
  }
  obtenerPeriodos() {
    return this.proyectoService
      .getPeriodos()
      .subscribe((periodos: PeriodosModel[]) => this.periodos = periodos);
  }
  obtenerUniversidades() {
    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);
  }
  obtenerEstadosProyectos() {
    return this.proyectoService
      .getEstadosProyectos()
      .subscribe((estadosProyectos: EstadosProyectosModel[]) => this.estadosProyectos = estadosProyectos );
  }
  obtenerLineasTrabajo() {
    return this.proyectoService
      .getLineasTrabajo()
      .subscribe((lineasTrabajo: LineasTrabajoModel[]) => this.lineasTrabajo = lineasTrabajo);
  }
  obtenerApoyos() {
    return this.proyectoService
      .getApoyos()
      .subscribe((apoyos: ApoyosModel[]) => this.apoyos = apoyos);
  }
  toggleApoyos(checked, id) {
    console.log(checked);
    var valor = { "idApoyo": id, "activo": true };

    var area = this.listaApoyos.find(x => x.idApoyo === id);
    if (checked) this.listaApoyos.push(valor);
    else this.listaApoyos = this.listaApoyos.filter(item => item.idApoyo !== id);

    console.log(this.listaApoyos);
  }
  toggleLineasTrabajo(checked, id) {
    console.log(checked);
    var valor = { "idLineaTrabajo": id, "activo": true };

    var area = this.listaLineasTrabajo.find(x => x.idLineaTrabajo === id);
    if (checked) this.listaLineasTrabajo.push(valor);
    else this.listaLineasTrabajo = this.listaLineasTrabajo.filter(item => item.idLineaTrabajo !== id);

    console.log(this.listaApoyos);
  }

  /*
  toggleArea(checked, id){
    console.log(checked);
var valor= { "idAreaAccion": id ,"activo": true};

    var area = this.areas.find(x=>x.id===id);
    if(checked) this.listaAreasAccion.push(valor);
    else this.listaAreasAccion = this.listaAreasAccion.filter(item => item.idAreaAccion !== id);   
    
    console.log(this.listaAreasAccion);
  }
  togleRubros(checked, id){
    console.log(checked);
var valor= { "idRubro": id ,"activo": true};

    var area = this.areas.find(x=>x.id===id);
    if(checked) this.listaRubros.push(valor);
    else this.listaRubros = this.listaRubros.filter(item => item.idRubro !== id);   
    
    console.log(this.listaRubros);

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
  obtenerTipo() {
    return this.organizacionService
      .getTipo()
      .subscribe((tipo: TipoEmpresa[]) => this.tipo = tipo );
  }
 
  obtenerEstado() {
    return this.organizacionService
      .getEstado()
      .subscribe((estado: EstadoEmpresa[]) => this.estado = estado );
  }
  obtenerGiro() {
    return this.organizacionService
      .getGiro()
      .subscribe((giro: GiroEmpresa[]) => this.giro = giro );
  }
  obtenerClasificacion() {
    return this.organizacionService
      .getClasificacion()
      .subscribe((clasificacion: ClasificacionEmpresa[]) => this.clasificacion = clasificacion );
  }


  
  */
  create() {

    let model = this.proyectoModel;

    model.listaApoyos = this.listaApoyos;
    model.listaLineasTrabajo = this.listaLineasTrabajo;

    model.activo = true;
    
    console.log(this.listaApoyos);
    console.log(this.listaLineasTrabajo);
    console.log(model)
    
    
    this.proyectoService.create(model).subscribe((res: any) => {
      //console.log(res.message);
      if (res) {
        this._location.back();
      }

    }, error => {
      alert(error.error)
    })

   
  }
}
