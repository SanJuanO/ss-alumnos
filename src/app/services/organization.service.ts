import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Empresa,estadoActualizar } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  api = environment.baseUrl


  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(`${this.api}/Organizaciones`);
  }
  getOrganizacion(id: string | number){
    const uri = `${this.api}/Organizaciones/${id}`;
         console.log(uri);
    return this.http.get(uri, { withCredentials: false });
  }



  getAreas(){
    const uri = `${this.api}/AreasAccion`;
    return this.http.get(uri, { withCredentials: false });
  }
  getdocumentos(){
    const uri = `${this.api}/Documentos`;
    return this.http.get(uri, { withCredentials: false });
  }

  getRubros(){
    const uri = `${this.api}/Rubros`;
    return this.http.get(uri, { withCredentials: false });
  }
  getUniversidades(){
    const uri = `${this.api}/Universidades`;
    return this.http.get(uri, { withCredentials: false });
  }
  getTipo(){
    const uri = `${this.api}/TiposOrganizaciones`;
    return this.http.get(uri, { withCredentials: false });
  }

  getGiro(){
    const uri = `${this.api}/GirosOrganizaciones`;
    return this.http.get(uri, { withCredentials: false });
  }
  getClasificacion(){
    const uri = `${this.api}/ClasificacionesOrganizaciones`;
    return this.http.get(uri, { withCredentials: false });
  }
  getEstado(){
    const uri = `${this.api}/EstadosOrganizaciones
    `;
    return this.http.get(uri, { withCredentials: false });
  }
  eliminar(id : string | number){
    const uri = `${this.api}/Organizaciones/${id}`;
    return this.http.delete(uri, { withCredentials: false });
  }
 
  subirdocumentos(model){
    const uri = `${this.api}/DocumentosOrganizaciones/UploadFile`
    return this.http.post(uri, model, { withCredentials: false });
  }
  subirdocumentoscadena(model){
    const uri = `${this.api}/DocumentosOrganizaciones/saveDocuments`
    return this.http.post(uri, model, { withCredentials: false });
  }


  create(model){
    const uri = `${this.api}/Organizaciones`
    return this.http.post(uri, model, { withCredentials: false });
  }
  createWithDetails(model){
    const uri = `${this.api}/CreateWithDetails`
    return this.http.post(uri, model, { withCredentials: false });
  }
  updateempresa(id: string | number,empresa: Empresa) {
    empresa.id = Number(id);
    empresa.activo = true;
    return this.http.put(`${this.api}/Organizaciones/${id}`, empresa, { withCredentials: false });
  }
  updateestado(estadoAct: estadoActualizar) {
    let estado=estadoAct;
console.log(estado);


    return this.http.put(`${this.api}/Organizaciones/actualizaEstado?idOrganizacion=${estado.idOrganizacion}&idEstado=${estado.idEstado}&observaciones=${estado.observaciones}`, estado, { withCredentials: false });
  }
}
