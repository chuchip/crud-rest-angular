import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Locales } from '../locales';

@Injectable({
  providedIn: 'root'
})
export class DatosserverService {
    url:string;

  constructor(private _http:HttpClient) { 
    this.url="http://localhost:8080/restExample/api/locale";
  }
 
  getLocales(codigo,nombre): Observable<Locales[]>
  {
    //return this._http.get<Locales[]>(this.url);     
    if (!codigo || codigo.trim()=="")
      codigo="%"; 
    if (!nombre || nombre.trim()=="")
      nombre="%"; 
    codigo=encodeURI(codigo.trim());
    nombre=encodeURI(nombre.trim());
    console.log("Codigo: "+codigo+" Nombre: "+nombre);
    return this._http.get<Locales[]>(this.url+"/"+codigo+"/"+nombre);          
  }

}
