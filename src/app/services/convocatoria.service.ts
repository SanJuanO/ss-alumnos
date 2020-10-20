import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Convocatoria } from '../models/convocatoria';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaServices {

  api = environment.baseUrl;

  constructor(private http:HttpClient) { }


  getConvocatoria() {
    const uri = `${this.api}/Convocatorias`;
    console.log(uri);
    return this.http.get(uri, { withCredentials: false });
 
  } 
  eliminar(id : string | number){
    const uri = `${this.api}/Convocatorias/${id}`;
    return this.http.delete(uri, { withCredentials: false });
  }
   create(model){
    const uri = `${this.api}/Convocatorias`
     return this.http.post(uri, model, { withCredentials: false });
  }
  getPeriodo(){
    const uri = `${this.api}/Periodos`;
    console.log(uri);
    return this.http.get(uri, { withCredentials: false });
  }
  getUniversidad(){
    const uri = `${this.api}/Universidades`;
    console.log(uri);
    return this.http.get(uri, { withCredentials: false });
  }
  getConvocatoriaid(id){
    const uri = `${this.api}/Convocatorias/${id}`;
         console.log(uri);
    return this.http.get(uri, { withCredentials: false });
  }
  getConvocatoriatipo(model){
    const uri = `${this.api}/Convocatorias/getConvocatoriaByTipo?tipo=${model.tipo}`;
         console.log(uri);
    return this.http.post(uri, model, { withCredentials: false });
  }

  updateconvocatoria(id: string | number,convocatoria: Convocatoria) {
    convocatoria.id = Number(id);
    return this.http.put(`${this.api}/Convocatorias/${id}`, convocatoria, { withCredentials: false });
  }
}
