import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServices {

  api = environment.baseUrl;

  constructor(private http:HttpClient) { }


  getUsuarios() {
    const uri = `${this.api}/Usuarios`;
    console.log(uri);
    return this.http.get(uri);
 
  } 
   create(model){
    const uri = `${this.api}/Usuarios`
    return this.http.post(uri, model);
  }
  eliminar(id : string | number){
    const uri = `${this.api}/Usuarios/${id}`;
    return this.http.delete(uri);
  }
  getUniversidad(){
    const uri = `${this.api}/Universidades`;
    console.log(uri);
    return this.http.get(uri);
  }
  getUsuarioid(id){
    const uri = `${this.api}/Usuarios/${id}`;
         console.log(uri);
    return this.http.get(uri);
  }
  updateusuarios(id: string | number,usuario: Usuario) {
    usuario.id = Number(id);
    return this.http.put(`${this.api}/Usuarios/${id}`, usuario);
  }
}
