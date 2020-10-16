import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Usuario } from '../models/usuario';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  api = environment.baseUrl;

  constructor(private http:HttpClient) { }


  login(user,pass) {

    const uri = `${this.api}/Alumnos/login?email=${user}&contrase%C3%B1a=${pass}`;
    return this.http.get(uri,user);
 
  } 
  
}
