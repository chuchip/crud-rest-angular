import { Component, OnInit } from '@angular/core';
import { Locales } from '../locales';
import { DatosserverService } from '../services/datosserver.service'
@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {
  idioma:Locales;
  introducido=-1;
  mensajeErr="";

  constructor(private _datosserver: DatosserverService) { 
   this.idioma=new Locales();   
  }

  ngOnInit() {
  }
  onSubmit()
  {
    this._datosserver.introducirLocales(this.idioma).subscribe(
      resp => {          
        this.mensajeErr ="";
        this.introducido=1;   
        this.idioma.codigo="";
        this.idioma.nombre="";       
      },
        error => {        
          this.introducido=0;  
          this.mensajeErr ="";
          if (error instanceof ErrorEvent) 
            {
              this.mensajeErr = error.error.message;
            }
            else if  (error.status == 409) {
              this.introducido=0; 
              this.mensajeErr="Pais ya existe";
            }else
            {
              this.mensajeErr = "Error status: "+error.status;
            }
          }
        );
  }
}
