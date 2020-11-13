import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa } from "../models/empresa"
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria"

import { ProyectoService } from '../services/proyecto.service';
import { AlumnosProyectos } from "../models/proyectos"
import { SessionService } from '../services/session.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public empresa: Empresa[] = [];
  public empresacantidad: number;
  public empresaactiva: Empresa[] = [];
  public empresadesaciva: Empresa[] = [];
  public d: Date = new Date();
  public tipoModel = new Tipo(1);
  public convocatorias: Convocatoria[] = [];
  public convocatoriasalumnos: Convocatoria[] = [];
  public project: AlumnosProyectos[] = [];

  public convocatoriasf: Convocatoria[] = [];
  public convocatoriasalumnosf: Convocatoria[] = [];

  public idproyecto: string;
  public proyecto: string = "";
  

  constructor(private convocatoriaService: ConvocatoriaServices, private proyectoService: ProyectoService, public session: SessionService) {

  }

  ngOnInit(): void {
    this.convocatorias = [];
    this.convocatoriasalumnos = [];
    this.convocatoriasf = [];
    this.convocatoriasalumnosf = [];
    this.obtenerProyectos();
    this.obtenerConvocatoria2();
  }

  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerConvocatoria2() {
    let model = this.tipoModel;
    model.tipo = 2;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[]) => {
      this.convocatoriasalumnos = res;
      console.log(this.convocatoriasalumnos);
      for (var i = 0; i < this.convocatoriasalumnos.length; i++) {
        /*
        var fech = Date.parse(this.convocatoriasalumnos[i].fechaTermino.toString());
        if (fech < Date.now()) {
          this.convocatoriasalumnosf.push(this.convocatoriasalumnos[i]);
        }
        */
        this.convocatoriasalumnosf.push(this.convocatoriasalumnos[i]);

      }

    })
  }

  obtenerProyectos() {
    var id = this.session.getToken();
    console.log(id);

    this.proyectoService.getProyectoalumno(id).subscribe((res: any[]) => {
      this.project = res;
      this.idproyecto = res["idProyecto"];
      this.proyecto = res["proyectoNombre"];
      console.log(res);
      
    });

  }

  subeArchivoreporte() {
  }

}
