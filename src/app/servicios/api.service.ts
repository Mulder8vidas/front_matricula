import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "http://127.0.0.1:5000";

  constructor(private httpclient: HttpClient) {

  }

  nroAlumnos() {
    return
  }

  mostrarAulas() {
    return this.httpclient.get(this.url + "/aulas")
  }

  RegistrarAlumno(data: any) {
    return this.httpclient.post(this.url + "/alumnos", data)
  }

  MostrarAlumno() {
    return this.httpclient.get<any[]>(`${this.url}/alumnos`);
  }

  MostrarAlumnosxAula(id:any){
    return this.httpclient.get(`${this.url}/aulas/${id}`)
  }
  EditarAlumno(data:any,id:any){
    return this.httpclient.put(`${this.url}/alumnos/${id}`,data)
  }

  EliminarAlumno(id:any){
    return this.httpclient.delete(`${this.url}/alumnos/${id}`)
  }


}
