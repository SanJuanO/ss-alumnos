import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute   } from '@angular/router';
import { LoginServices } from '../services/login.service';
import { SessionService } from '../services/session.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public idobtenido:string;
  public mensaje:string="";

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
        this.session.setToken(datosvalue['id']);

        this.session.setnombre(datosvalue['nombre']);
        this.session.setapellidos(datosvalue['paterno'] + datosvalue['materno']);
        if (this.idobtenido == null) {
          this.router.navigate(['/dashboard']);
          console.log(user);

        } else {

          console.log("aLIU");

          this.router.navigate(['/proyectos/ver', this.idobtenido]);
        }

      } else {
        this.mensaje = res['mensaje'];
        $('#success-modal-preview').modal('show');

      }

    }, error => {
      alert(error.error)
    })
    

    /*
    this.loginservice.callSoap2().subscribe((res: any) => {
      console.log(res);
    }, error => {
      console.log(error);
      //alert(error.error)
    })*/

  }


}
