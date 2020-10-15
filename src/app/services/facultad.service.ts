import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facultad } from '../models/facultad';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getFacultades() {
    return this.http.get(`${this.baseUrl}/Facultades`);
  }
}
