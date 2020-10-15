import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../../services/organization.service';
import { Empresa,Responsablemodel,check } from "../../models/empresa"
import { AreaAccion } from "../../models/areaaccion"

import { RubroEmpresa } from "../../models/rubrosempresa"
import { Universidad } from "../../models/universidad"
import { TipoEmpresa } from "../../models/tipoempresa"
import { GiroEmpresa } from "../../models/giroempresa"
import { ClasificacionEmpresa } from "../../models/clasificacionempresa"
import { EstadoEmpresa } from "../../models/estadoempresa"
import {Location} from '@angular/common';



import { Router,ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-organization-add',
  templateUrl: './empresas-edit.component.html',
  styleUrls: ['./empresas-edit.component.scss']
})
export class EmpresasEditComponent implements OnInit {
  public areas: AreaAccion[] = [];
  public responsable: Responsablemodel[] = [];
  public rubros: RubroEmpresa[] = [];
  public universidades: Universidad[] = [];
  public tipo: TipoEmpresa[] = [];
public idobtenido:string;
  public giro: GiroEmpresa[] = [];
  public estado: EstadoEmpresa[] = [];
  public listaAreasAccion = [];
  public listaRubros = [];
  public idRubro:any;
  public idAreaAccion:any;
public validar=false;
  public contactos = [];
  public clasificacion: ClasificacionEmpresa[] = [];
  horasAlumno = [];

  public responsablemodel = new Responsablemodel("","","","","","","","","",true,true)
  checkmodel = new check("false","false")
  empresaModel = new Empresa("","","","","","","","","","","","","","","","","","","",true,0,"",null,false,true,1,1,1,1,1,0,0,0,0,0,0,this.listaAreasAccion,this.listaRubros,this.responsablemodel)


  constructor(private organizacionService: OrganizationService,private router: Router,private activatedRoute: ActivatedRoute,private _location: Location) { 
  
  }
  

  ngOnInit(): void {
    this.idobtenido=this.activatedRoute.snapshot.paramMap.get("id");
    this.organizacionService.getOrganizacion(this.idobtenido).subscribe((empresaModel: Empresa) => this.empresaModel = empresaModel);
    this.getempresa(this.idobtenido);
    this.obtenerAreas();
    this.obtenerRubros();
    this.obtenerUniversidades();
    this.obtenerTipo();
    this.obtenerGiro();
    this.obtenerClasificacion();
    this.obtenerEstado();

  }
  toggleArea(checked, id){
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

  ngAfterViewInit() {
    Feather.replace();
  }
  getempresa(id){
    this.organizacionService.getOrganizacion(id).subscribe((res: any[])=>{
      this.horasAlumno = res;
      console.log(this.horasAlumno);
      this.responsablemodel=res['responsable'];
      this.listaAreasAccion=res['listaAreasAccion'];
      this.listaRubros=res['listaRubros'];

      console.log(this.listaAreasAccion);
      this.idRubro =  this.listaRubros.map(({ idRubro }) => idRubro);
      this.idAreaAccion =  this.listaAreasAccion.map(({ idAreaAccion }) => idAreaAccion);


      
    })
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
  obtenerUniversidades() {
    return this.organizacionService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades );
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



  onSubmit() {
    let model = this.empresaModel;

   
    model.responsable = this.responsablemodel;

    model.listaAreasAccion = this.listaAreasAccion;
    model.listaRubros = this.listaRubros ;

    console.log(model);

    this.organizacionService.updateempresa(this.idobtenido,model).subscribe(() => {
          $('#success-modal-preview').modal('show');

    this._location.back();

     
    })


  }
}
