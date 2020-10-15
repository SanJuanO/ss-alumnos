import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../../services/organization.service';
import { Empresa,Responsablemodel,check,estadoActualizar } from "../../models/empresa"
import { AreaAccion } from "../../models/areaaccion"
import { Documentos,DocumentosCadena,Documentosfile   } from "../../models/documentos"

import { RubroEmpresa } from "../../models/rubrosempresa"
import { Universidad } from "../../models/universidad"
import { TipoEmpresa } from "../../models/tipoempresa"
import { GiroEmpresa } from "../../models/giroempresa"
import { ClasificacionEmpresa } from "../../models/clasificacionempresa"
import { EstadoEmpresa } from "../../models/estadoempresa"

import { SessionService } from '../../services/session.service';


import { Router,ActivatedRoute } from '@angular/router';
import { Binary } from '@angular/compiler';
import { NgModel } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-organization-ver',
  templateUrl: './empresas-ver.component.html',
  styleUrls: ['./empresas-ver.component.scss']
})
export class EmpresasverComponent implements OnInit {
  public areas: AreaAccion[] = [];
  public estadoact = new estadoActualizar(0,"",0)

  public responsable: Responsablemodel[] = [];
  public rubros: RubroEmpresa[] = [];
  public universidades: Universidad[] = [];
  public tipo: TipoEmpresa[] = [];
public idobtenido:string;
  public giro: GiroEmpresa[] = [];
  public documentos: Documentos[] = [];

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
  public documentoscadena = new DocumentosCadena(1,1,1,"","",undefined)
  public  binary: number = 0b1010;

  public documentosfile = new Documentosfile("")

  checkmodel = new check("false","false")
  empresaModel = new Empresa("","","","","","","","","","","","","","","","","","","",true,0,"",null,false,true,1,1,1,1,1,0,0,0,0,0,0,this.listaAreasAccion,this.listaRubros,this.responsablemodel)


  constructor(private organizacionService: OrganizationService,private router: Router,private activatedRoute: ActivatedRoute,public session: SessionService) { 
  
  }
  ngOnInit(): void {
    this.idobtenido=(this.session.getToken());

    this.organizacionService.getOrganizacion(this.idobtenido).subscribe((empresaModel: Empresa) => this.empresaModel = empresaModel);
    this.getempresa(this.idobtenido);
    this.obtenerAreas();
    this.obtenerRubros();
    this.obtenerUniversidades();
    this.obtenerTipo();
    this.obtenerGiro();
    this.obtenerClasificacion();
    this.obtenerEstado();
    this.obtenerdocumentos();

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
  obtenerdocumentos() {
    return this.organizacionService
      .getdocumentos()
      .subscribe((documentos: Documentos[]) => this.documentos = documentos );
  }


  onSubmit() {
    let model = this.empresaModel;

   
    model.responsable = this.responsablemodel;

    model.listaAreasAccion = this.listaAreasAccion;
    model.listaRubros = this.listaRubros ;

    console.log(model);

    this.organizacionService.updateempresa(this.idobtenido,model).subscribe(() => {
      
      this.validar=true;

     
    })

if(this.validar){
    this.router.navigate(['/empresas']);
    $('#success-modal-preview').modal('show');

}
  }


  abrirsubir(id){

    console.log("dfdsfdsfds"+ id);
    $('#abrirsubir-'+id).modal('show');

  }


  subirarchivo(){
    console.log("subir");

    this.documentosfile.file=this.documentoscadena.file;
    console.log(this.documentosfile);
  
    this.organizacionService.subirdocumentos(this.documentosfile).subscribe((res: any)=>{
      console.log(res);

      this.documentoscadena.ruta=res.ruta;

this.subirarchivoconcadena(); 

    }, error=>{
      alert(error.error)
    })


  }

  subirarchivoconcadena(){
    
    this.organizacionService.subirdocumentoscadena(this.documentoscadena).subscribe((res: any)=>{
      console.log(res);


    }, error=>{
      alert(error.error)
    })

    
  }



   subeArchivo() {

    var selecttedFile = ($("#Imagen"))[0].files[0];
    var dataString = new FormData();
    dataString.append("file", selecttedFile);
    
    $.ajax({  
       headers: { 
         "Access-Control-Allow-Origin":"http://localhost:4200,https://serviciosocial.gesdesapplication.com/api/DocumentosOrganizaciones/UploadFile',https://localhost:4200", 
         "Access-Control-Allow-Headers":"X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
         "Access-Control-Allow-Methods":" POST", 
        "Allow":" POST"
        },
        url: "https://serviciosocial.gesdesapplication.com/api/DocumentosOrganizaciones/UploadFile",
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



  actualizarestado(){
    
    this.estadoact.idOrganizacion=Number(this.empresaModel.id);
    this.estadoact.observaciones=this.empresaModel.observaciones;
    this.estadoact.idEstado=Number(this.empresaModel.idEstadoOrganizacion);
let model=this.estadoact;
console.log(model);
    this.organizacionService.updateestado(model).subscribe(() => {
      
      $('#success-modal-preview').modal('show');

    }, error=>{
      alert(error.error)
    })

    
  }

}
