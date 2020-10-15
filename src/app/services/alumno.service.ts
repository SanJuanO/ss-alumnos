import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/alumno';
import { environment } from "../../environments/environment";


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getAlumnos() {

  // getAlumnos(dataTablesParameters: any) {
    return this.http.get(`${this.baseUrl}/Alumnos`);

    //  return this.http
    //       .get<DataTablesResponse>(
    //         `${this.baseUrl}/Alumnos/getAllTabla`,
    //         dataTablesParameters
    //       );

  }

  getAlumno(id: string | number) {
    return this.http.get(`${this.baseUrl}/Alumnos/${id}`);
  }
  getProyectoAlumno(id: string | number) {
    let idalumno=Number(id);
    console.log(idalumno);
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignados/getByIdAlumno?idAlumno=${idalumno}`);
  }
  addAlumno(alumno: Alumno) {
    return this.http.post(`${this.baseUrl}/Alumnos`, alumno);
  }

  deleteAlumno(alumno: Alumno) {
    return this.http.delete(`${this.baseUrl}/delete.php?idAlumno=${alumno.id}`);
  }

  updateAlumno(id: string | number,alumno: Alumno) {
    alumno.id = Number(id);
    alumno.activo = true;
    return this.http.put(`${this.baseUrl}/Alumnos/${id}`, alumno);
  }


}
