import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [ServicioService]
})
export class RegistroComponent implements OnInit {

  public registroForm: FormGroup;

  constructor(public servicio: ServicioService) {
    this.registroForm = new FormGroup({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
  }

  registrar(){
    console.log(this.registroForm.value);
    this.servicio.registrar(this.registroForm.value).subscribe(res => {
      console.log(res);
    })
  }

}
