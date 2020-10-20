import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proyecto, estadoProyectoActualizar } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  api = environment.baseUrl

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get(`${this.api}/Proyectos`);

  }
  getProyecto(id: string | number) {
    const uri = `${this.api}/Proyectos/${id}`;
    console.log(uri);
    return this.http.get(uri);
  }
  getProyectoEmpresa(id: string | number) {
    const uri = `${this.api}/Proyectos/GetByIdOrganizacion?idOrganizacion=${id}`;
    console.log(uri);
    return this.http.get(uri);
  }
  getProyectoalumno(id: string | number) {
    const uri = `${this.api}/AlumnosProyectosAsignados/getByIdAlumno?idAlumno=${id}`;
    return this.http.get(uri);
  }

  getUniversidades() {
    const uri = `${this.api}/Universidades`;
    return this.http.get(uri);
  }
  getEstadosProyectos() {
    const uri = `${this.api}/EstadosProyectos
    `;
    return this.http.get(uri);
  }
  getProyectosAreas() {
    const uri = `${this.api}/ProyectosAreas
    `;
    return this.http.get(uri);
  }
  getProyectosRangos() {
    const uri = `${this.api}/ProyectosRangos
    `;
    return this.http.get(uri);
  }
  getProyectosPoblaciones() {
    const uri = `${this.api}/ProyectosPoblaciones
    `;
    return this.http.get(uri);
  }
  getPeriodos() {
    const uri = `${this.api}/Periodos
    `;
    return this.http.get(uri);
  }
  getLineasTrabajo() {
    const uri = `${this.api}/LineasTrabajo
    `;
    return this.http.get(uri);
  }
  getApoyos() {
    const uri = `${this.api}/Apoyos
    `;
    return this.http.get(uri);
  }

  create(model) {
    const uri = `${this.api}/Proyectos`
    return this.http.post(uri, model);
  }
  updateproyecto(id: string | number, proyecto: Proyecto) {
    proyecto.id = Number(id);
    proyecto.activo = true;
    return this.http.put(`${this.api}/Proyectos/${id}`, proyecto);
  }
  eliminar(id: string | number) {
    const uri = `${this.api}/Proyectos/${id}`;
    return this.http.delete(uri);
  }
  updateestado(estadoAct: estadoProyectoActualizar) {
    let estado = estadoAct;
    console.log(estado);
    return this.http.put(`${this.api}/Proyectos/actualizaEstado?idProyecto=${estado.idProyecto}&idEstado=${estado.idEstado}&observaciones=${estado.observaciones}`, estado);
  }
  getSucesosByIdProyecto(idProyecto: string | number) {
    return this.http.get(`${this.api}/ProyectosSucesos/getByIdProyecto?idProyecto=${idProyecto}`);
  }
  getActividadesByIdProyecto(idProyecto: string | number) {
    return this.http.get(`${this.api}/ProyectosActividades/getByIdProyecto?idProyecto=${idProyecto}`);
  }
  getAlumnosInscritosByIdProyecto(idProyecto: string | number) {
    return this.http.get(`${this.api}/AlumnosProyectosAsignados/getByIdProyecto?idProyecto=${idProyecto}`);
  }

  getPerfilesActividades() {
    const uri = `${this.api}/PerfilesActividades
    `;
    return this.http.get(uri);
  }
  createProyectosActividades(model) {
    const uri = `${this.api}/ProyectosActividades`
    return this.http.post(uri, model);
  }
  obtenerAlumnos() {
    const uri = `${this.api}/Alumnos`
    return this.http.get(uri);
  }
  asignarAlumnosProyectos(model) {
    const uri = `${this.api}/AlumnosProyectosAsignados`
    return this.http.post(uri, model);
  }


  buscarfiltro(idgiro:string,idarea:string,idrubro:string) {
 

    var uri = ``;

if(idgiro==="0" && idarea==="0" && idrubro!="0"){
   uri = `${this.api}/Proyectos/obtenerProyectosFiltros?idRubro=${idrubro}`
   console.log(uri);
    return this.http.get(uri);
}
else if(idgiro==="0" && idarea!="0" && idrubro==="0"){
   uri = `${this.api}/Proyectos/obtenerProyectosFiltros?idAreaAccion=${idarea}`
   console.log(uri);
    return this.http.get(uri);
}
else if(idgiro==="0" && idarea!="0" && idrubro!="0"){

   uri = `${this.api}/Proyectos/obtenerProyectosFiltros?idAreaAccion=${idarea}&idRubro=${idrubro}`
   console.log(uri);
    return this.http.get(uri);
}
else if(idgiro!="0" && idarea==="0" && idrubro==="0"){
   uri = `${this.api}/Proyectos/obtenerProyectosFiltros?idGiro=${idgiro}`
   console.log(uri);
    return this.http.get(uri);
}
else if(idgiro!="0" && idarea==="0" && idrubro!="0"){
   uri = `${this.api}/Proyectos/obtenerProyectosFiltros?idGiro=${idgiro}&idRubro=${idrubro}`
   console.log(uri);
    return this.http.get(uri);
}
else if(idgiro!="0" && idarea!="0" && idrubro==="0"){
   uri = `${this.api}/Proyectos/obtenerProyectosFiltros?idGiro=${idgiro}&idAreaAccion=${idarea}`
   console.log(uri);
    return this.http.get(uri);
}
else if(idgiro!="0" && idarea!="0" && idrubro!="0"){
   uri = `${this.api}/Proyectos/obtenerProyectosFiltros?idGiro=${idgiro}&idAreaAccion=${idarea}&idRubro=${idrubro}`
   console.log(uri);
   return this.http.get(uri);
  }

else {
   uri = `${this.api}/Proyectos/obtenerProyectosFiltros`
   console.log(uri);
   return this.http.get(uri);
}

  }
}
