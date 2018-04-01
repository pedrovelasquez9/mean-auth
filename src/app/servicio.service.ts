import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ServicioService {

  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getPerfil(){
    return this.http.get(this.baseUrl+"/perfil");
  }

  iniciarSesion(credenciales){
    let headers = new HttpHeaders();
    headers = headers.set('content-type',"application/json");
    return this.http.post(this.baseUrl+'/usuario', credenciales, {headers: headers});
  }

  registrar(usuario){
    return this.http.post(this.baseUrl+"/usuario", usuario);
  }

  cerrarSesion(){
    return this.http.get(this.baseUrl+"/salir");
  }
}
