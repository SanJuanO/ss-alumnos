import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlumnosActividades } from '../models/alumno';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Observable';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Injectable({
  providedIn: 'root'
})
export class AlumnosActividadesServices {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getAlumnosActividades() {
    return this.http.get(`${this.baseUrl}/AlumnosActividades`);
  }
  getAlumnosActividadesByIdAlumnoProyectoAsignado(id) {
    return this.http.get(`${this.baseUrl}/AlumnosActividades/getByIdAlumnoProyectoAsignado?idAlumnoProyectoAsignado=${id}`);
  }
  addAlumnoActividad(alumnoActividad: AlumnosActividades) {
    return this.http.post(`${this.baseUrl}/AlumnosActividades`, alumnoActividad);
  }
  CreateActivityWithFile(fileToUpload: File, alumnoActividad: AlumnosActividades): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.baseUrl}/AlumnosActividades/CreateActivityWithFile`;
    const formData: FormData = new FormData();
    if (fileToUpload != undefined) {
      formData.append('file', fileToUpload, fileToUpload.name);
    }
    formData.append('idAlumnoProyectoAsignado', alumnoActividad.idAlumnoProyectoAsignado.toString());
    formData.append('titulo', alumnoActividad.titulo);
    formData.append('actividad', alumnoActividad.actividad);
    formData.append('validaEmpresa', "false");
    return this.http.post(endpoint, formData);
  }

  UpdateActivityWithFile(fileToUpload: File, alumnoActividad: AlumnosActividades): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.baseUrl}/AlumnosActividades/UpdateActivityWithFile`;
    const formData: FormData = new FormData();
    if (fileToUpload != undefined) {
      formData.append('file', fileToUpload, fileToUpload.name);
    }
    formData.append('id', alumnoActividad.id.toString());
    formData.append('idAlumnoProyectoAsignado', alumnoActividad.idAlumnoProyectoAsignado.toString());
    formData.append('titulo', alumnoActividad.titulo);
    formData.append('actividad', alumnoActividad.actividad);
    formData.append('validaEmpresa', "false");
    return this.http.post(endpoint, formData);
  }

  /*
  getByIdAlumnoProyectoAsignado(id: string | number) {
    return this.http.get(`${this.baseUrl}/AlumnosActividades/${id}`);
  }
  updateHorasACuplirEnProyecto(id: string | number,horas :string|number) {
    return this.http.put(`${this.baseUrl}/AlumnosProyectosAsignados/actualizaNoHorasACumplirAlumno?id=${id}&horas=${horas}`,{ withCredentials: false });
  }
  addAlumno(alumno: Alumno) {
    return this.http.post(`${this.baseUrl}/Alumnos`, alumno);
  }

  deleteAlumno(alumno: Alumno) {
    return this.http.delete(`${this.baseUrl}/delete.php?idAlumno=${alumno.id}`);
  }
  */
  
}
