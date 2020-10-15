import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria"
declare var $: any;

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css']
})
export class ConvocatoriasComponent implements OnInit {
  @ViewChild('dataTable1', {static: false}) table;

  dataTable: any;
  public convocatorias:Convocatoria [] = [ ];
  constructor(private convocatoriaService: ConvocatoriaServices) { }
  public tipoModel = new Tipo(1);

  ngOnInit(): void {
    this.obtenerConvocatoria(1);
    document.getElementById("empresa").style.backgroundColor ="blue";

    document.getElementById("alumnos").style.backgroundColor ="gray";

    this.dataTable.DataTable();

  }

  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerConvocatoria(tipo) {
    let model = this.tipoModel;
    model.tipo=tipo;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{
this.convocatorias=res;

})
  }

  eliminar(id) {
    this.convocatoriaService.eliminar(id).subscribe((res: any)=>{
     location.reload();

   }, error=>{
     alert(error.error)
   })



 
 }

 modaleliminar(id) {
   console.log("dfdsfdsfds"+ id);
   $('#delete-modal-preview-'+id).modal('show');
  }


  recargar()
  {


    this.convocatorias=[];
    var red = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    document.getElementById("empresa").style.backgroundColor ="blue";

    document.getElementById("alumnos").style.backgroundColor ="gray";

    this.obtenerConvocatoria(1);
    this.ngAfterViewInit();


  }

  recargar2()
  {

    document.getElementById("empresa").style.backgroundColor ="gray";

    document.getElementById("alumnos").style.backgroundColor ="blue";
    this.convocatorias=[];
    $('#empresa').backgroundColor="green";

  this.obtenerConvocatoria(2);
  this.ngAfterViewInit();


  }
}
