import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto, listaApoyosModel, listaLineasTrabajoModel, ApoyosModel, LineasTrabajoModel, ProyectosAreasModel, ProyectosRangosModel, ProyectosPoblacionesModel, PeriodosModel, EstadosProyectosModel } from "../../models/proyectos";
import { Empresa } from "../../models/empresa";
import { OrganizationService } from '../../services/organization.service';
import { Universidad } from "../../models/universidad";
import { UniversidadService } from '../../services/universidad.service';
import { SessionService } from '../../services/session.service';

import {Location} from '@angular/common';

import { Router,ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-proyectos-add',
  templateUrl: './proyectos-edit.component.html',
  styleUrls: ['./proyectos-edit.component.scss']
})
export class ProyectosEditComponent implements OnInit {
  public form: FormGroup;
  public idobtenido: number;
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
  public idApoyo: any;
  public idLineasTrabajo: any;
  public idempresa:number;
  public empresa:string;
  constructor(private proyectoService: ProyectoService, private organizacionService: OrganizationService,
    private universidadService: UniversidadService, private router: Router,private activatedRoute: ActivatedRoute,public session: SessionService,private _location: Location) {

    
  }

  ngOnInit(): void {
    this.idempresa=Number(this.session.getToken());
    this.empresa=this.session.getnombre();
    this.idobtenido = <number><any>(this.activatedRoute.snapshot.paramMap.get("id"));
    //this.proyectoService.getProyecto(this.idobtenido).subscribe((proyectoModel: Proyecto) => this.proyectoModel = proyectoModel);
    this.getProyecto(this.idobtenido);
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
  
  getProyecto(id) {

    
    this.proyectoService.getProyecto(id).subscribe((res: any[]) => {
      
      this.proyectoModel = <Proyecto><any>res;
      this.listaApoyos = res['listaApoyos'];
      this.listaLineasTrabajo = res['listaLineasTrabajo'];

      //console.log(this.apoyos);
      //console.log(this.listaLineasTrabajo);
      
      this.idApoyo = this.listaApoyos.map(({ idApoyo }) => idApoyo);
      this.idLineasTrabajo = this.listaLineasTrabajo.map(({ idLineaTrabajo }) => idLineaTrabajo);
      //console.log(this.idApoyo);
      //console.log(this.idLineasTrabajo);
      
      
    })
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
      .subscribe((estadosProyectos: EstadosProyectosModel[]) => this.estadosProyectos = estadosProyectos);
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

  onSubmit() {
    let model = this.proyectoModel;
   
    model.listaApoyos = this.listaApoyos;
    model.listaLineasTrabajo = this.listaLineasTrabajo;

    model.activo = true;

    console.log(this.listaApoyos);
    console.log(this.listaLineasTrabajo);
    console.log(model)
    
    this.proyectoService.updateproyecto(this.idobtenido, model).subscribe((res: any) => {
      if (res) {
        this._location.back();
      }
    }, error => {
      alert(error.error)
    })

  
  }
}
