import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import {LoginComponent} from "./paginas/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginService} from "../../servicios/login.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../../servicios/api.service";
import {AuthInterceptor} from "../../interceptores/auth.interceptor";
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import {environment} from "../../../environments/environment";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    HttpClientModule
    , ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule, FormsModule,

  ],
  providers:[LoginService,ApiService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },]
})
export class InicioModule { }
