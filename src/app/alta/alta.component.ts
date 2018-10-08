import { Component, OnInit } from '@angular/core';
import { Locales } from '../locales';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {
  idioma:Locales;

  constructor() { 
   this.idioma=new Locales();   
  }

  ngOnInit() {
  }

}
