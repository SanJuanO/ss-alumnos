import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carrera } from '../models/carrera';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }


  getCarreras() {
    return this.http.get(`${this.baseUrl}/Carreras`);
  }
}
