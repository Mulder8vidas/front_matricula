import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgxSpinnerComponent,
    NgxSpinnerModule,
    DialogModule,
    ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'matriculafrontend';


}
