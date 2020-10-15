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
    return this.proyectoService
      .getAll()
      .subscribe((proyectos: Proyecto[]) => this.proyectos = proyectos);
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
