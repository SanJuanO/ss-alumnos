import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
public nombre="";
public id=1;
public apellidos="";
  constructor(private router: Router,public session: SessionService) { 
    if(this.session.getToken()==""){
      this.router.navigate(['/'])    
    }
    this.id=Number(this.session.getToken());

    this.nombre=this.session.getnombre();
    this.apellidos=this.session.getapellidos();

  }
  ngOnInit(): void {
  }

  logout() {
    console.log("salir");

    this.session.Signoff();

    this.router.navigate(['/login']);

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
}
