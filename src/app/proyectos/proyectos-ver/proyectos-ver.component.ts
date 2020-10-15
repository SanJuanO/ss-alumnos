import { Component, OnInit, ViewChild} from '@angular/core';
import * as Feather from 'feather-icons';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto, listaApoyosModel, listaLineasTrabajoModel, ApoyosModel, LineasTrabajoModel, ProyectosAreasModel, ProyectosRangosModel, ProyectosPoblacionesModel, PeriodosModel, EstadosProyectosModel, estadoProyectoActualizar, ProyectosSucesosModel, ProyectosActividadesModel, AlumnosProyectosAsignadosModel } from "../../models/proyectos";
import { Empresa } from "../../models/empresa";
import { OrganizationService } from '../../services/organization.service';
import { Universidad } from "../../models/universidad";
import { UniversidadService } from '../../services/universidad.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-proyectos-ver',
  templateUrl: './proyectos-ver.component.html',
  styleUrls: ['./proyectos-ver.component.scss']
})
export class ProyectosVerComponent implements OnInit {
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
  public estadoact = new estadoProyectoActualizar();
  public sucesos: ProyectosSucesosModel[] = [];
  public proyectosActividades: ProyectosActividadesModel[] = [];
  public alumnos: AlumnosProyectosAsignadosModel[] = [];

  @ViewChild('dataTable', { static: false }) table;
  @ViewChild('dataTable1', { static: false }) table1;
  @ViewChild('dataTable2', { static: false }) table2;
  public dataTable: any;
  public dataTable1: any;
  public dataTable2: any;


  //public alumno: Alumnos[] = [];


  constructor(private proyectoService: ProyectoService, private organizacionService: OrganizationService,
    private universidadService: UniversidadService,private router: Router,private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
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
    this.obtenerSucesos();
    this.getActividadesByIdProyecto();
    this.obtenerAlumnosInscritos();

    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
    this.dataTable1 = $(this.table1.nativeElement);
    this.dataTable1.DataTable();
    this.dataTable2 = $(this.table2.nativeElement);
    this.dataTable2.DataTable();

  }
 
  ngAfterViewInit() {
    Feather.replace();
  }
  
  getProyecto(id) {

    this.proyectoService.getProyecto(id).subscribe((res: any[]) => {

    this.proyectoModel = <Proyecto><any>res;
    this.listaApoyos = res['listaApoyos'];
    this.listaLineasTrabajo = res['listaLineasTrabajo'];
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
  obtenerSucesos() {
    return this.proyectoService
      .getSucesosByIdProyecto(this.idobtenido)
      .subscribe((sucesos: ProyectosSucesosModel[]) => this.sucesos = sucesos);
  }
  getActividadesByIdProyecto() {
    return this.proyectoService
      .getActividadesByIdProyecto(this.idobtenido)
      .subscribe((proyectosActividades: ProyectosActividadesModel[]) => this.proyectosActividades = proyectosActividades);
  }
  obtenerAlumnosInscritos() {
    return this.proyectoService
      .getAlumnosInscritosByIdProyecto(this.idobtenido)
      .subscribe((alumnos: AlumnosProyectosAsignadosModel[]) => this.alumnos = alumnos);
  }
  toggleApoyos(checked, id) {
    //console.log(checked);
    var valor = { "idApoyo": id, "activo": true };

    var area = this.listaApoyos.find(x => x.idApoyo === id);
    if (checked) this.listaApoyos.push(valor);
    else this.listaApoyos = this.listaApoyos.filter(item => item.idApoyo !== id);

    //console.log(this.listaApoyos);
  }
  toggleLineasTrabajo(checked, id) {
    //console.log(checked);
    var valor = { "idLineaTrabajo": id, "activo": true };

    var area = this.listaLineasTrabajo.find(x => x.idLineaTrabajo === id);
    if (checked) this.listaLineasTrabajo.push(valor);
    else this.listaLineasTrabajo = this.listaLineasTrabajo.filter(item => item.idLineaTrabajo !== id);

    //console.log(this.listaApoyos);
  }

  onSubmit() {
    let model = this.proyectoModel;

    model.listaApoyos = this.listaApoyos;
    model.listaLineasTrabajo = this.listaLineasTrabajo;

    model.activo = true;
    /*
    console.log(this.listaApoyos);
    console.log(this.listaLineasTrabajo);
    console.log(model)
    */
    this.proyectoService.updateproyecto(this.idobtenido, model).subscribe((res: any) => {
      if (res) {
        this.validar = true;
      }
    }, error => {
      alert(error.error)
    })

    if (this.validar) {
      this.router.navigate(['/proyectos']);
      $('#success-modal-preview').modal('show');

    }
  }


  abrirsubir(id){

    //console.log("dfdsfdsfds"+ id);
    $('#abrirsubir-'+id).modal('show');

  }

  actualizarestado() {

    this.estadoact.idProyecto = Number(this.proyectoModel.id);
    this.estadoact.observaciones = this.proyectoModel.observaciones;
    this.estadoact.idEstado = Number(this.proyectoModel.idEstadoProyecto);
    let model = this.estadoact;
    console.log(model);
    this.proyectoService.updateestado(model).subscribe(() => {

      $('#success-modal-preview').modal('show');

    }, error => {
      alert(error.error)
    })


  }

}
