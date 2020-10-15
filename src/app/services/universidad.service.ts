import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Universidad } from '../models/universidad';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UniversidadService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }


  getUniversidades() {
    return this.http.get(`${this.baseUrl}/Universidades`);
  }


}
