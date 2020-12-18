import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoEdit } from "../models/alumno"
import { SessionService } from '../services/session.service';
import { AlumnoService } from '../services/alumno.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-terminoscondiciones',
  templateUrl: './terminoscondiciones.component.html',
  styleUrls: ['./terminoscondiciones.component.css']
})

export class TerminosCondicionesComponent implements OnInit {
  public d: Date = new Date();
  alumno: AlumnoEdit;
  nombre: string="";
  apellidos: string="";
  activo = true;
  public mensajevalidacion = "";
  idobtenido: string = "";
  public asistio: boolean = false;

  constructor(private alumnoService: AlumnoService, public session: SessionService,
    private activatedRoute: ActivatedRoute, private router: Router,
  ) {
    /*
    this.activatedRoute.queryParams.subscribe(params => {
      this.idobtenido = params['idProyecto'];
    });*/
  }

  ngOnInit(): void {
    this.idobtenido = <string><any>(this.activatedRoute.snapshot.paramMap.get("idProyecto"));
    this.obtenerPerfil();
    console.log(this.alumno);
    console.log("idObtenido: " + this.idobtenido)
  }

  ngAfterViewInit() {
    Feather.replace();
  }
  
  obtenerPerfil() {
    var id = this.session.getToken();

    this.alumnoService.getAlumno(id).subscribe((res: AlumnoEdit) => {
      this.alumno = res;
      this.nombre = this.alumno.nombre;
    });

  }

  toggleAsistio(checked, id) {
    this.asistio = checked;
  }

  aceptaTerminos() {
    var id = this.session.getToken();
    this.alumnoService.aceptaTerminosCondiciones(id, this.asistio).subscribe(data => {
      console.log(data);
      if (data["resultado"] == 1) {
        //console.log("idobtenido: " + this.idobtenido);
        if (this.idobtenido != undefined) {
          this.router.navigate(['/informacionalumno',  this.idobtenido]);
        } else {
          this.router.navigate(['/informacionalumno']);
        }
      }
    }, error => {
      console.log(error);
    });
  }

}


