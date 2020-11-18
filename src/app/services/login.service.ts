import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Usuario } from '../models/usuario';
import { EmailValidator } from '@angular/forms';

//import * as soap from 'soap';
//import { AxiosInstance } from 'axios';
//import { soap } from 'soap';
//import { IProspectType } from './types';
//declare var angular: any;
//var soap = require('strong-soap').soap;

@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  api = environment.baseUrl;

  constructor(private http:HttpClient) { }


  login(user,pass) {

    const uri = `${this.api}/Alumnos/login?matricula=${user}&contrase%C3%B1a=${pass}`;
    return this.http.get(uri, { withCredentials: false });
 
  }
  
  callSoap2() {
    const sr =
      `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <getLogin xmlns="http://servicioSocialRUA.org/">
      <id>00283804</id>
      <nip>22081997</nip>
    </getLogin>
  </soap:Body>
</soap:Envelope>`;
    var model = { id: '00283804', nip:'22081997'}

    var url = 'https://uft-integ-prod.ec.lcred.net/wsServicioSocial/srvLogin.asmx';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'text/xml');
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/xml; charset=utf-8'
      })
    };

    return this.http.post(url, model, httpOptions);
    
  }
    

}
