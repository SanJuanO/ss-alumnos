import { Component, OnInit, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Proyecto } from "../models/proyectos"
import { ProyectoService } from '../services/proyecto.service';
declare var $: any;

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public proyectos: Proyecto[] = [];
  public proyectosf: Proyecto[] = [];

  @ViewChild('dataTable', { static: false }) table;

  dataTable: any;
  public validar = false;


  constructor(private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.obtenerProyectos();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
    console.log(this.proyectos);
  }

  obtenerProyectos() {
     this.proyectoService
      .getAll()
       .subscribe((proyectos: Proyecto[]) => {
         this.proyectos = proyectos;
         for (var i = 0; i < this.proyectos.length; i++) {
           if (this.proyectos[i].idEstadoProyecto == 3) {//3 -> aprobado
             this.proyectosf.push(this.proyectos[i]);
           }
         }
       });
    
      
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


}
