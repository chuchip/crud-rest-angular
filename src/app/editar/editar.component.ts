import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Locales } from '../locales';
import { DatosserverService } from '../services/datosserver.service'
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  idioma: Locales;
  @Input() codigo: string;
  @Input() nombre: string;
  @Output() visible = new EventEmitter<Locales>();
  mensajeErr="";
  editado=-1;

  private constructor (private _datosserver: DatosserverService) { 
    this.idioma=new Locales();   
   }

  ngOnInit() {
    this.idioma=new Locales();
    this.idioma.codigo=this.codigo;
    this.idioma.nombre=this.nombre;
    //console.log("codigo: "+this.codigo);
  }

  cancel()
  {
    console.log("Cancelado");
    this.visible.emit(null); 
  }
  onSubmit()
  {
    this._datosserver.editarLocale(this.idioma).subscribe(
      resp => {          
        this.mensajeErr ="";
        this.editado=1;            
        this.visible.emit(this.idioma);      
      },
        error => {        
          this.editado=0;  
          this.mensajeErr ="";
          if (error instanceof ErrorEvent) 
            {
              this.mensajeErr = error.error.message;
            }
            else if  (error.status == 409) {
              this.editado=0; 
              this.mensajeErr="Pais no existe";
            }else
            {
              this.mensajeErr = "Error status: "+error.status;
            }
          }
        );
  }

}
