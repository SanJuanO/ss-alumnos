import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Empresa } from "../models/empresa"
import { OrganizationService } from '../services/organization.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({ 
  selector: 'app-empresas-projects',
  templateUrl: './empresas-home.component.html',
  styleUrls: ['./empresas-home.component.scss']
})
export class EmpresashomeComponent implements OnInit {
  public empresa: Empresa[] = [  ];
  @ViewChild('dataTable', {static: false}) table;

  dataTable:any;
  public validar=true;

  constructor(private organizacionService: OrganizationService,private router: Router) { 
  
  }
  ngOnInit() {

    this.obtenerorganizaciones();

            this.dataTable.DataTable();

  }

  obtenerorganizaciones() {
    return this.organizacionService
      .getAll()
      .subscribe((empresa: Empresa[]) => this.empresa = empresa);
  }
  eliminar(id) {
       this.organizacionService.eliminar(id).subscribe((res: any)=>{
        this.validar=true;
        location.reload();
  
      }, error=>{
        alert(error.error)
      })

   

    
    }

    modaleliminar(id) {
      console.log("dfdsfdsfds"+ id);
      $('#delete-modal-preview-'+id).modal('show');

     }



    
  ngAfterViewInit() {

 

    Feather.replace();
  }
}
