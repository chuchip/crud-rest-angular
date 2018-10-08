import { Component, OnInit } from '@angular/core';
import { Locales } from '../locales';
import { DatosserverService } from '../services/datosserver.service'
import { interval } from 'rxjs';
//import { map } from 'rxjs/operators'
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  idioma: Locales;
  idiomas: Locales[];
  mensajeErr = "";
  filtrado = -1;
  borrado = -1;
  idiomaEditar: string;
  msgEditado: string = null;
  timer;

  constructor(private _datosserver: DatosserverService) {
    this.idioma = new Locales();
  }

  editado(local: Locales) {
    this.idiomaEditar = null;
    console.log("Idioma editado: "+local)
    if (local==null)
    {
      this.msgEditado = null;
      return;
    }
    //console.log("Editado: " + local.codigo + " nombre: " + local.nombre);
    this.msgEditado = local.codigo;    
    interval(3000).subscribe(
      val => this.msgEditado=null
    );

    var n;
    for (n = 0; n < this.idiomas.length; n++) {
      if (this.idiomas[n].codigo == local.codigo) {
        this.idiomas[n].nombre = local.nombre;
        break;
      }
    }



  }

  ngOnInit() {

  }
  editar(codigo: string) {
    this.idiomaEditar = codigo;
  }

  borrar(codigo: string) {
    this.idiomaEditar = null;
    this._datosserver.borrarLocale(codigo).subscribe(datos => {
      this.borrado = 1;
      console.log("Registro Borrado");
      var n;
      for (n = 0; n < this.idiomas.length; n++) {
        if (this.idiomas[n].codigo == codigo) {
          this.idiomas.splice(n, 1);
          break;
        }
      }
    },
      error => {
        this.borrado = 0;
        this.mensajeErr = "";
        if (error instanceof ErrorEvent) {
          this.mensajeErr = error.error.message;
        }
        else if (error.status == 404) {
          this.borrado = 0;
        } else {
          this.mensajeErr = "Error status: " + error.status;
        }
      }
    );
  }
  onSubmit() {
    this.idiomaEditar = null;
    this._datosserver.getLocales(this.idioma.codigo, this.idioma.nombre).subscribe(datos => {
      this.idiomas = datos;
      this.filtrado = 1;
      //      console.log("Longitud respuesta: "+this.idiomas.length)  ;
    },
      error => {
        this.filtrado = 0;
        this.mensajeErr = "";
        if (error instanceof ErrorEvent) {
          this.mensajeErr = error.error.message;
        }
        else if (error.status == 404) {
          this.filtrado = 0;
        } else {
          this.mensajeErr = "Error status: " + error.status;
        }
      }
    );
  }
}
