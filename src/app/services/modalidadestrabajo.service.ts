import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalidadesTrabajo } from '../models/alumno';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Injectable({
  providedIn: 'root'
})
export class ModalidadesTrabajoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getModalidadesTrabajo() {
    return this.http.get(`${this.baseUrl}/ModalidadesTrabajo`);
  }


}
