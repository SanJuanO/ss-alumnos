import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alumno, AlumnoEdit } from '../models/alumno';
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
  getAlumnoProyectoAsignadoById(id: string | number) {
    let idalumno=Number(id);
    //console.log(idalumno);
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignados/${idalumno}`,{ withCredentials: false });
  }
  getProyectosAlumno(id: string | number) {
    let idalumno=Number(id);
    //console.log(idalumno);
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignados/getByIdAlumno?idAlumno=${idalumno}`,{ withCredentials: false });
  }
  updateHorasACuplirEnProyecto(id: string | number,horas :string|number) {
    return this.http.put(`${this.baseUrl}/AlumnosProyectosAsignados/actualizaNoHorasACumplirAlumno?id=${id}&horas=${horas}`,{ withCredentials: false });
  }
  getHorasCuplidasEnProyecto(idAlumnoProyectoAsignado: string | number) {
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignadosHoras/getHorasByIdProyectoAsignado?idAlumnoProyectoAsignado=${idAlumnoProyectoAsignado}`, { withCredentials: false });
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
  updateAlumno0(id: string | number,alumno: AlumnoEdit) {
    alumno.id = Number(id);
    alumno.activo = true;
    return this.http.put(`${this.baseUrl}/Alumnos/${id}`, alumno);
  }
  subirdocumentos(model) {
    const uri = `${this.baseUrl}/DocumentosAlumnos/UploadFile`
    return this.http.post(uri, model);
  }
  subirdocumentoscadena(model) {
    const uri = `${this.baseUrl}/DocumentosAlumnos/saveDocuments`
    return this.http.post(uri, model);
  }
  getdocumentosRequeridos() {
    const uri = `${this.baseUrl}/DocumentosRequeridosAlumnos`;
    return this.http.get(uri);
  }
  postFile(fileToUpload: File, idAlumno: string, idProyecto: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.baseUrl}/ReportesAlumnos/UploadFile2`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('idAlumno', idAlumno);
    formData.append('idProyecto', idProyecto);
    return this.http.post(endpoint, formData);
  }

  getReportsByIdAlumno(idAlumno: string): Observable<any> {
    const uri = `${this.baseUrl}/ReportesAlumnos/getByIdAlumno`;
    return this.http.get(uri + "?idAlumno" + idAlumno);
  }
 
  getPreguntasEvaluacionAlumnoOrganizacion(idAlumnoProyectoAsignado: string | number, configuracion: string | number) {
    return this.http.get(`${this.baseUrl}/PreguntasEvaluacionAlumnoOrganizacion/GetListWithIdAlumnoProyectoAsignadoAndAnswers?idAlumnoProyectoAsignado=${idAlumnoProyectoAsignado}&configuracion=${configuracion}`);
  }
  getRespuestasEvaluacion(id: string | number,version: string | number) {
    return this.http.get(`${this.baseUrl}/RespuestasEvaluacionAlumnoOrganizacion/getByIdAlumnoProyectoAsignadoAndVersion?IdAlumnoProyectoAsignado=${id}&version=${version}`);
  }
  addRespuestasPreguntas(model){
    const uri = `${this.baseUrl}/RespuestasEvaluacionAlumnoOrganizacion/addRespuestas`;
         console.log(uri);
    return this.http.post(uri,model);
  }
  aceptaTerminosCondiciones(id,asistio) {
    const uri = `${this.baseUrl}/Alumnos/aceptaTerminosCondiciones`;
    //console.log(uri);
    return this.http.post(uri + "?id=" + id + "&asistio=" + asistio, id);
  }

  subeCarta(fileToUpload: File, idAlumnoProyectoAsignado: string,opc:number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    var endpoint = "";
    if (opc == 0) {
      endpoint = `${this.baseUrl}/AlumnosProyectosAsignados/actualizaCartaInicioByIdAlumnoProyectoAsignado`;
    } else {
      endpoint = `${this.baseUrl}/AlumnosProyectosAsignados/actualizaCartaTerminoByIdAlumnoProyectoAsignado`;
    }
    const formData: FormData = new FormData();
    if (opc == 0) {
      formData.append('cartaInicio', fileToUpload, fileToUpload.name);
    } else {
      formData.append('cartaTermino', fileToUpload, fileToUpload.name);
    }
    formData.append('idAlumnoProyectoAsignado', idAlumnoProyectoAsignado);
    return this.http.post(endpoint, formData);
  }
  getAlumnoRequisitosLiberacion(id: string | number) {
    return this.http.post(`${this.baseUrl}/Alumnos/requisitosLiberacion?idAlumno=${id}`,id);
  }

  updateLiberar(id: string | number, liberar: string | number) {
    return this.http.put(`${this.baseUrl}/Alumnos/actualizaLiberar?id=${id}&liberar=${liberar}`, { withCredentials: false });
  }
  horas(id) {

    var i = Number(id);
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignadosHoras/getHorasByIdProyectoAsignado?idAlumnoProyectoAsignado=${i}`);

  }


}
