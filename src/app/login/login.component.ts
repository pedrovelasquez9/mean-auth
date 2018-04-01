import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from '../servicio.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ServicioService, AppComponent]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public servicio: ServicioService, private app: AppComponent) {
    this.loginForm = new FormGroup({
      "login": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
  }

  iniciarSesion(){
    console.log(this.loginForm.value);
    this.servicio.iniciarSesion(this.loginForm.value).subscribe(res => {
      this.change.emit(true);
    }, err => {
      console.log(err);
    })
  }

}
