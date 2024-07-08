import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {ApiService} from "../../../../servicios/api.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  cantidadAlumnos: number=0;
  cantidadAulas:number=0;

  constructor(private router: Router, private apiService: ApiService) {
  }

  registro() {
    this.router.navigate(["/registro"])
  }

  aulas() {
    this.router.navigate(["/aulas"])
  }

  ngOnInit(): void {
    this.apiService.MostrarAlumno().subscribe(alumnos => {
      this.cantidadAlumnos = alumnos.length;
    });
    this.apiService.mostrarAulas().subscribe((value: any) => {
      this.cantidadAulas = value.length;
    });
  }
}

