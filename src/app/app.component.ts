import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mantenimiento de Idiomas';
  swAlta=false;
  swConsulta=false;
  
  irConsultar()
  {
    this.swAlta=false;
    this.swConsulta=true;
  }
  irAlta()
  {
    this.swAlta=true;
    this.swConsulta=false;
  }
}
