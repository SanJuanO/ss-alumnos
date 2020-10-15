import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServices } from '../services/login.service';
import { SessionService } from '../services/session.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public mensaje="";
  constructor(public session: SessionService,private router: Router,private loginservice: LoginServices){ }

  ngOnInit(): void {
    this.session.Signoff();

  }

  onSubmit(data) {
console.log(data);
    
    this.loginservice.login(data.value).subscribe((res: any)=>{
if(res['resultado']==1){
  var datosvalue=res['datos'];
  this.session.setToken(datosvalue['id']);
 
  this.session.setnombre(datosvalue['nombre']);
  this.session.setapellidos(datosvalue['apellidos']);

    this.router.navigate(['/dashboard']);

}else{
  this.mensaje=res['mensaje'];
  $('#success-modal-preview').modal('show');

}

    }, error=>{
      alert(error.error)
    })
    
    

  

  }

}
