import {Component, OnInit, signal} from '@angular/core';
import {ApiService} from "../../../../servicios/api.service";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-aulas-list',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    ButtonModule,
    DialogModule,
    FormsModule
  ],
  templateUrl: './aulas-list.component.html',
  styleUrl: './aulas-list.component.scss'
})
export class AulasListComponent implements OnInit{
  cantidadAulas: number=0;
  data:any[]=[];
  currentDataSelected:any[]=[]
  visible: boolean = false;
  visibleEdit: boolean = false;
  currentAlumnos:any;
  visibleEliminar: boolean = false;

  constructor(private apiService:ApiService) {
  }

  ngOnInit(): void {
    this.apiService.mostrarAulas().subscribe((value: any) => {
      this.data = value;
      this.cantidadAulas = value.length;
    });
  }

  ver(item: any) {
    const id =item.id;

    this.apiService.MostrarAlumnosxAula(id).subscribe((value:any) => {
      this.currentDataSelected=value;
      console.log(value)
    })
  }
  getColor(cantidad: number): string {
    if (cantidad < 10) {
      return 'yellow';
    } else if (cantidad >= 10 && cantidad <= 30) {
      return 'green';
    } else {
      return 'red';
    }
  }
  trackByFn(index: number, item: any): any {
    return item.id; // unique id corresponding to the item
  }
  showDialog(item:any){
    this.visible=true;
    this.ver(item)
  }


  editar() {
    this.apiService.EditarAlumno(this.currentAlumnos,this.currentAlumnos.Id).subscribe((value:any)=>{
      alert("Alumno editado correctamente")})
  }

  eliminarModal(item:any){
    console.log(item);
    this.currentAlumnos=item;
    this.visibleEliminar=true;
    console.log(this.visibleEliminar);
  }
  eliminar() {
    this.apiService.EliminarAlumno(this.currentAlumnos.Id).subscribe((value:any)=>{
      alert("Alumno eliminado correctamente")
      this.currentDataSelected=this.currentDataSelected.filter((value:any)=>{
        return value.Id!=this.currentAlumnos.Id
      } )
      this.apiService.mostrarAulas().subscribe((value: any) => {
        this.data = value;
        this.cantidadAulas = value.length;
        this.visibleEliminar=false;
      });
    })
  }

  showEditar(item: any) {
  this.currentAlumnos=item;
    console.log(item);
    this.visibleEdit=true;

  }

  cancelar() {
    this.visibleEliminar=false;
  }
}
