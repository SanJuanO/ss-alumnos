import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute   } from '@angular/router';
import { LoginServices } from '../services/login.service';
import { SessionService } from '../services/session.service';
import { AlumnoEdit } from '../models/alumno';
import { AlumnoService } from '../services/alumno.service';
import { RecaptchaModule } from "ng-recaptcha";
  
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
  public validado=false;
  public url:string;

  constructor(public session: SessionService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private loginservice: LoginServices,
    private alumnoService: AlumnoService) {
    // this.activatedRoute.queryParams.subscribe(params => {

    
      

        
    //       this.idobtenido = params['idProyecto'];
    //       console.log(this.idobtenido);
    //   });
  }
  resolved(captchaResponse: string) {
    this.validado=true;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  ngOnInit(): void {
    var URLactual = window.location;
    this.url=String(URLactual);
    console.log(this.url);
    if(this.url.includes("idProyecto")){
      var t=this.url.split("idProyecto=")
     this.idobtenido = t[1];
     console.log(this.idobtenido);

    }

    var id = this.session.getToken();
    //console.log("id" + id);
  
    if (id != null && id != undefined && id != "") {
      this.obtenerPerfil();
    } else {
      this.session.Signoff();
    }
    
  }

  onSubmit(data) {
    var user=$('#email').val();
    var pass = $('#contraseña').val();
    if(this.validado){
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
        //$('#success-modal-preview').modal('show');
        var x = document.getElementById("alerta");
        x.style.display = "block";

      }
    

    }, error => {
      alert(error.error)
    })
  }else{
    this.mensaje=("Falta el captcha");
    var x = document.getElementById("alerta");
      x.style.display = "block";

  }
  }

  validaDatosAlumno() {
    console.log(this.alumno);
    if (this.alumno.nombre == null || this.alumno.nombre == "") {

      console.log("false nombre");
      return false;

    } else if (this.alumno.paterno == null || this.alumno.paterno == "") {

      console.log("false paterno");
      return false;

    } else if (this.alumno.materno == null || this.alumno.materno == "") {

      console.log("false materno");
      return false;

    } else if (this.alumno.matricula == null || this.alumno.matricula == "") {

      console.log("false matricula");
      return false;

    } else if (this.alumno.idUniversidad == 0) {

      console.log("false id universidad");
      return false;

    } else if (this.alumno.idFacultad == 0) {

      console.log("false id facultad");
      return false;

    } else if (this.alumno.idCarrera== 0) {

      console.log("false id carrera");
      return false;

    }else if (this.alumno.porcentaje == 0) {

      console.log("false porcentaje");
      return false;

    } else if (this.alumno.noCuatrimestreSemestre == 0) {

      console.log("false no semestre cuatrimestre");
      return false;

    } else if (this.alumno.esquemaPeriodo == null || this.alumno.esquemaPeriodo == "") {
      console.log("false esquema de periodo");
      return false;

    }else if (this.alumno.generacion == null || this.alumno.generacion == "") {

      console.log("false generacion");
      return false;
    }
    else if (this.alumno.fechaEstimadaGraduacion == null || this.alumno.fechaEstimadaGraduacion == "") {
      console.log("false fecha graduacion estimada");
      return false;

    }
    else if (this.alumno.correoInstitucional == null || this.alumno.correoInstitucional == "") {

      console.log("false porcentaje");
      return false;

    }else if (this.alumno.correoPersonal == null || this.alumno.correoPersonal == "") {

      console.log("false porcentaje");
      return false;

    }else if (this.alumno.celular == null || this.alumno.celular == "") {

      console.log("false celular");
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

  obtenerPerfil() {
    var id = this.session.getToken();
    this.alumnoService.getAlumno(id).subscribe((res: AlumnoEdit) => {
      this.alumno = res;
        var datosvalue = res;

      if (datosvalue['terminosCondiciones'] == null || datosvalue['terminosCondiciones'] == false) {

        if (this.idobtenido == null) {
          this.router.navigate(['/terminoscondiciones']);
        } else {
          this.router.navigate(['/terminoscondiciones', this.idobtenido]);
        }

      } else if (datosvalue['terminosCondiciones'] != null && !this.validaDatosAlumno()) {
        
        console.log(datosvalue['terminosCondiciones']);

        if (this.idobtenido == null) {
          this.router.navigate(['/informacionalumno']);
        } else {
          this.router.navigate(['/proyectos/ver', this.idobtenido]);
        }

      } else if (datosvalue['terminosCondiciones'] != null && this.validaDatosAlumno()) {

        if (this.idobtenido == null) {
          this.router.navigate(['/dashboard']);
          console.log("adentro");

        } else {
          this.router.navigate(['/proyectos/ver', this.idobtenido]);
        }
      }
    });

  }
  ocultar() {
    var x = document.getElementById("alerta");
      x.style.display = "none";

    

  

  }

}
