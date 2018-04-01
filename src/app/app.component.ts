import { Component, OnInit } from '@angular/core';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServicioService]
})
export class AppComponent implements OnInit{
  public logged: boolean = false;
  public data: any;
  constructor(public service: ServicioService){

  }  

  ngOnInit(){
    this.getSession();
  }

  getSession(data?){
    this.service.getPerfil().subscribe(res => {
        this.logged = true;
        this.data = res;
    }, err => {
      this.logged = false;
    })
  }

  cerrarSesion(){
    this.service.cerrarSesion().subscribe(res => {
      if(res){
        this.logged = false;
        this.data = undefined;
      }
    });
  }
}
