import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {dataLista} from "../../testdata/datatest";
import {JsonPipe} from "@angular/common";
import {ApiService} from "../../../../servicios/api.service";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-registro-alumno',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        JsonPipe,
        SidebarComponent
    ],
  templateUrl: './registro-alumno.component.html',
  styleUrl: './registro-alumno.component.scss'
})
export class RegistroAlumnoComponent implements OnInit{
  formulario: FormGroup;

  data:any[]=dataLista;

  datanivel:any[]=[];
  datagrado:any[]=[];

  constructor(private fb: FormBuilder,private apiService:ApiService) {
    this.formulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      sexo: ['', Validators.required],
      apoderado: [''],
      nroTelefono: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
      direccion: ['', Validators.required],
      nivel:[''],
      grado:new FormControl("",control => {

        control.disable({
          emitEvent:false
        })

        return control;

      })

    });

    this.formulario.valueChanges.subscribe(value => {

      if(String(value.nivel).length==0){
        this.formulario.controls['grado'].disable({
          emitEvent:false,
        })
      }else{
        this.formulario.controls['grado'].enable({
          emitEvent:false
        })
      }

    })

  }

  ngOnInit(): void {


    this.apiService.mostrarAulas().subscribe((value:any) => {
      this.data = value
      let datanivel= this.data.map(value => {
        return value.Nivel;
      });
      this.datanivel=[...new Set(datanivel)]
    })



  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    } else {
      console.log('Formulario no válido');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.formulario.patchValue({
      foto: file
    });
  }

  cambioNivel() {

    this.datagrado=this.data.filter(value => {
      return value.Nivel==this.formulario.getRawValue().nivel
    })

  }

  Registrar() {
    this.apiService.RegistrarAlumno(this.formulario.getRawValue()).subscribe((value:any)=>{
      alert(value.message)

    },error => {alert(error.message)})
  }
}
