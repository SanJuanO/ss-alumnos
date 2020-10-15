// src/app/users/users.service.ts

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user): Observable<any> {
    return this.http.post("https://reqres.in/api/login", user);
  }
  register(user): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
  }
  setToken(token) {
    this.cookies.set("sesionid", token);
  }
  setnombre(token) {
    this.cookies.set("nombre", token);
  }
  setapellidos(token) {
    this.cookies.set("apellidos", token);
  }
  getapellidos() {
    return this.cookies.get("apellidos");
  } 
   getnombre() {
    return this.cookies.get("nombre");
  }

  getToken() {
    return this.cookies.get("sesionid");
  }
  Signoff() {
    this.cookies.delete("sesionid");
    this.cookies.delete("apellidos");
    this.cookies.delete("nombre");


  }

}