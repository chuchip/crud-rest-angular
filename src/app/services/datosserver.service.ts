import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Locales } from '../locales';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DatosserverService {
    url:string;

  constructor(private _http:HttpClient) { 
    this.url="http://localhost:8080/crudJavaEE/api/locale";
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
  introducirLocales(local:Locales ): Observable<any>
  {    
    return this._http.post(this.url,local,httpOptions);
  }
  borrarLocale(codigo)
  {
    codigo=encodeURI(codigo.trim());
    return this._http.delete(this.url+"/"+codigo);
  }
  editarLocale(local:Locales)
  {
    console.log("-Codigo local: "+local.codigo);
    local.codigo=encodeURI(local.codigo.trim());
    console.log("*Codigo local: "+local.codigo);
    return this._http.put(this.url+"/"+local.codigo,local,httpOptions);
  }
}
