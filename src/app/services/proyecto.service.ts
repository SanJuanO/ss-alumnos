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
    return this.http.get(`${this.api}/Proyectos`, { withCredentials: false });

  }
  getProyecto(id: string | number) {
    const uri = `${this.api}/Proyectos/${id}`;
    console.log(uri);
    return this.http.get(uri, { withCredentials: false });
  }
  getProyectoEmpresa(id: string | number) {
    const uri = `${this.api}/Proyectos/GetByIdOrganizacion?idOrganizacion=${id}`;
    console.log(uri);
    return this.http.get(uri, { withCredentials: false });
  }
  getProyectoalumno(id: string | number) {
    const uri = `${this.api}/AlumnosProyectosAsignados/getByIdAlumno?idAlumno=${id}`;
    return this.http.get(uri, { withCredentials: false });
  }

  getUniversidades() {
    const uri = `${this.api}/Universidades`;
    return this.http.get(uri, { withCredentials: false });
  }
  getEstadosProyectos() {
    const uri = `${this.api}/EstadosProyectos
    `;
    return this.http.get(uri, { withCredentials: false });
  }
  getProyectosAreas() {
    const uri = `${this.api}/ProyectosAreas
    `;
    return this.http.get(uri, { withCredentials: false });
  }
  getProyectosRangos() {
    const uri = `${this.api}/ProyectosRangos
    `;
    return this.http.get(uri, { withCredentials: false });
  }
  getProyectosPoblaciones() {
    const uri = `${this.api}/ProyectosPoblaciones
    `;
    return this.http.get(uri, { withCredentials: false });
  }
  getPeriodos() {
    const uri = `${this.api}/Periodos
    `;
    return this.http.get(uri, { withCredentials: false });
  }
  getLineasTrabajo() {
    const uri = `${this.api}/LineasTrabajo
    `;
    return this.http.get(uri, { withCredentials: false });
  }
  getApoyos() {
    const uri = `${this.api}/Apoyos
    `;
    return this.http.get(uri, { withCredentials: false });
  }

  create(model) {
    const uri = `${this.api}/Proyectos`
    return this.http.post(uri, model, { withCredentials: false });
  }
  updateproyecto(id: string | number, proyecto: Proyecto) {
    proyecto.id = Number(id);
    proyecto.activo = true;
    return this.http.put(`${this.api}/Proyectos/${id}`, proyecto, { withCredentials: false });
  }
  eliminar(id: string | number) {
    const uri = `${this.api}/Proyectos/${id}`;
    return this.http.delete(uri, { withCredentials: false });
  }
  updateestado(estadoAct: estadoProyectoActualizar) {
    let estado = estadoAct;
    console.log(estado);
    return this.http.put(`${this.api}/Proyectos/actualizaEstado?idProyecto=${estado.idProyecto}&idEstado=${estado.idEstado}&observaciones=${estado.observaciones}`, estado, { withCredentials: false });
  }
  getSucesosByIdProyecto(idProyecto: string | number) {
    return this.http.get(`${this.api}/ProyectosSucesos/getByIdProyecto?idProyecto=${idProyecto}`, { withCredentials: false });
  }
  getActividadesByIdProyecto(idProyecto: string | number) {
    return this.http.get(`${this.api}/ProyectosActividades/getByIdProyecto?idProyecto=${idProyecto}`, { withCredentials: false });
  }
  getAlumnosInscritosByIdProyecto(idProyecto: string | number) {
    return this.http.get(`${this.api}/AlumnosProyectosAsignados/getByIdProyecto?idProyecto=${idProyecto}`, { withCredentials: false });
  }

  getPerfilesActividades() {
    const uri = `${this.api}/PerfilesActividades
    `;
    return this.http.get(uri, { withCredentials: false });
  }
  createProyectosActividades(model) {
    const uri = `${this.api}/ProyectosActividades`
    return this.http.post(uri, model, { withCredentials: false });
  }
  obtenerAlumnos() {
    const uri = `${this.api}/Alumnos`
    return this.http.get(uri, { withCredentials: false });
  }
  asignarAlumnosProyectos(model) {
    const uri = `${this.api}/AlumnosProyectosAsignados`
    return this.http.post(uri, model, { withCredentials: false });
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
