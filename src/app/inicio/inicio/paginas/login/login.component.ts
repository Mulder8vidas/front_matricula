import {AfterViewInit, Component} from '@angular/core';
import {LoginService} from "../../../../servicios/login.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoadingService} from "../../../../servicios/loading.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: false,
  providers:[],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit{
  formLogin= new FormGroup({
    username:new FormControl(""),
    password:new FormControl("")
  })
  token: any="";
  constructor(private service:LoginService, private loading:LoadingService, private router:Router) {
  }

  ngAfterViewInit(): void {
        if(localStorage.getItem("token")!=null){
          this.router.navigate(["/home"])
        }
    }
  logearse() {
    this.loading.show()
    this.service.login(this.formLogin.getRawValue().username,this.formLogin.getRawValue().password).subscribe((value:any) => {

      localStorage.setItem("token",value.token)
      this.router.navigate(["/home"])
      this.loading.hide()
    })
  }
}
