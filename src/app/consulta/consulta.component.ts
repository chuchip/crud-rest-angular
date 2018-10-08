import { Component, OnInit } from '@angular/core';
import { Locales } from '../locales';
import { DatosserverService } from '../services/datosserver.service'
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
   idioma:Locales;
   idiomas:Locales[];
   mensajeErr="";
   filtrado=-1;

  constructor( private _datosserver: DatosserverService) { 
   this.idioma=new Locales();   
  }

  ngOnInit() {
  }
	onSubmit(){
    console.log("en onsubmit")  ;
    this._datosserver.getLocales(this.idioma.codigo,this.idioma.nombre).subscribe(datos => {
      this.idiomas = datos;
      this.filtrado=1;  
//      console.log("Longitud respuesta: "+this.idiomas.length)  ;
      },
        error => {        
          this.filtrado=0;  
          this.mensajeErr ="";
          if (error instanceof ErrorEvent) 
            {
              this.mensajeErr = error.error.message;
            }
            else if  (error.status == 404) {
              this.filtrado=0; 
            }else
            {
              this.mensajeErr = "Error status: "+error.status;
            }
          }
        );
  }
}
