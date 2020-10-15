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
    return this.http.get(uri);
 
  } 
  eliminar(id : string | number){
    const uri = `${this.api}/Convocatorias/${id}`;
    return this.http.delete(uri);
  }
   create(model){
    const uri = `${this.api}/Convocatorias`
    return this.http.post(uri, model);
  }
  getPeriodo(){
    const uri = `${this.api}/Periodos`;
    console.log(uri);
    return this.http.get(uri);
  }
  getUniversidad(){
    const uri = `${this.api}/Universidades`;
    console.log(uri);
    return this.http.get(uri);
  }
  getConvocatoriaid(id){
    const uri = `${this.api}/Convocatorias/${id}`;
         console.log(uri);
    return this.http.get(uri);
  }
  getConvocatoriatipo(model){
    const uri = `${this.api}/Convocatorias/getConvocatoriaByTipo?tipo=${model.tipo}`;
         console.log(uri);
    return this.http.post(uri,model);
  }

  updateconvocatoria(id: string | number,convocatoria: Convocatoria) {
    convocatoria.id = Number(id);
    return this.http.put(`${this.api}/Convocatorias/${id}`, convocatoria);
  }
}
