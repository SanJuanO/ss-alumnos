import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoEdit } from "../models/alumno"
import { SessionService } from '../services/session.service';
import { AlumnoService } from '../services/alumno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from "ngx-cookie-service";

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
  public asistio: boolean = true;

  constructor(private alumnoService: AlumnoService, public session: SessionService,
    private activatedRoute: ActivatedRoute, private router: Router,private cookies: CookieService
  ) {
    /*
    this.activatedRoute.queryParams.subscribe(params => {
      this.idobtenido = params['idProyecto'];
    });*/
  }

  ngOnInit(): void {
    this.cookies.set("mostraralumno", "1");
    this.cookies.set("mostrarproyectos", "1");
    this.idobtenido = <string><any>(this.activatedRoute.snapshot.paramMap.get("idProyecto"));
    this.obtenerPerfil();
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
      console.log(this.alumno);
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
  ocultar(){
    console.log("vista");
    var menu = document.getElementById("menu");
if(menu.style.display=="none"){
    menu.style.display = "block";
}else{
  menu.style.display = "none";

}
  }
  logout() {
    this.session.Signoff();
    this.router.navigate(['/login']);

  }


}


