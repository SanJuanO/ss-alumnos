import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute   } from '@angular/router';
import { LoginServices } from '../services/login.service';
import { SessionService } from '../services/session.service';
import { AlumnoEdit } from '../models/alumno';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public idobtenido:string;
  public mensaje: string = "";
  public alumno: AlumnoEdit;

  constructor(public session: SessionService,private activatedRoute: ActivatedRoute,private router: Router,private loginservice: LoginServices) {
    this.activatedRoute.queryParams.subscribe(params => {
          this.idobtenido = params['idProyecto'];
      });
  }

  ngOnInit(): void {
      this.session.Signoff();

  }

  onSubmit(data) {
    var user=$('#email').val();
    var pass = $('#contraseña').val();
    
    this.loginservice.login(user, pass).subscribe((res: any) => {
      if (res['resultado'] == 1) {
        var datosvalue = res['datos'];
        this.alumno = datosvalue;
        this.session.setToken(datosvalue['id']);
        this.session.setnombre(datosvalue['nombre']);
        this.session.setapellidos(datosvalue['paterno'] + datosvalue['materno']);

        console.log(datosvalue);
        if (datosvalue['terminosCondiciones'] == null || datosvalue['terminosCondiciones'] == false) {
          
          if (this.idobtenido == null) {
            this.router.navigate(['/terminoscondiciones']);
          } else {
            this.router.navigate(['/terminoscondiciones', this.idobtenido]);
          }

        } else if (datosvalue['terminosCondiciones'] != null && datosvalue['terminosCondiciones'] != false && !this.validaDatosAlumno()) {
          
          if (this.idobtenido == null) {
            this.router.navigate(['/informacionalumno']);
          } else {
            this.router.navigate(['/informacionalumno', this.idobtenido]);
          }

        } else if (datosvalue['terminosCondiciones'] != null && datosvalue['terminosCondiciones'] != false && this.validaDatosAlumno()) {

          if (this.idobtenido == null) {
            this.router.navigate(['/dashboard']);
            //console.log(user);

          } else {
            this.router.navigate(['/proyectos/ver', this.idobtenido]);
          }

        }
        
      } else {
        this.mensaje = res['mensaje'];
        $('#success-modal-preview').modal('show');

      }

    }, error => {
      alert(error.error)
    })
    
  }

  validaDatosAlumno() {
    console.log(this.alumno);
    if (this.alumno.nombre == null || this.alumno.nombre == "") {

      console.log("false nombre");
      return false;

    } else if (this.alumno.matricula == null || this.alumno.matricula == "") {

      console.log("false matricula");
      return false;

    } else if (this.alumno.paterno == null || this.alumno.paterno == "") {

      console.log("false paterno");
      return false;

    } else if (this.alumno.materno == null || this.alumno.materno == "") {

      console.log("false materno");
      return false;

    }else if (this.alumno.porcentaje == 0) {

      console.log("false porcentaje");
      return false;

    }
    else if (this.alumno.correoPersonal == null || this.alumno.correoPersonal == "") {

      console.log("false porcentaje");
      return false;

    }
    else if (this.alumno.correoInstitucional == null || this.alumno.correoInstitucional == "") {

      console.log("false porcentaje");
      return false;

    } else if (this.alumno.esquemaPeriodo == null || this.alumno.esquemaPeriodo == "") {
      console.log("false esquema de periodo");
      return false;

    } else if (this.alumno.generacion == null || this.alumno.generacion == "") {

      console.log("false generacion");
      return false;
    }
    else if (this.alumno.celular == null || this.alumno.celular == "") {

      console.log("false celular");
      return false;
    }
    else if (this.alumno.fechaEstimadaGraduacion == null || this.alumno.fechaEstimadaGraduacion == "") {
      console.log("false fecha graduacion estimada");
      return false;

    }
    else if (this.alumno.fechaNacimiento == null || this.alumno.fechaNacimiento == "") {
      console.log("false fecha nacimiento");
      return false;
    }
    else if (this.alumno.sexo == null || this.alumno.sexo == "") {
      console.log("false sexo");
      return false;
    }
    else {
      
      return true;
    }
    
  }

}
