import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {MSAL_INSTANCE, MsalModule, MsalService} from "@azure/msal-angular";
import {IPublicClientApplication, PublicClientApplication} from "@azure/msal-browser";
import { MainPageComponent } from './main-page/main-page.component';
import { ApplicationComponent } from './application/application.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StepOneComponent } from './main-page/step-one/step-one.component';
import { StepTwoComponent } from './main-page/step-two/step-two.component';
import { StepThreeComponent } from './main-page/step-three/step-three.component';


export function MSALInstanceFactory():IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId:'b62fa12e-3907-4827-a458-250a8fbd7769',
      redirectUri:'https://bi-new.mellanox.com/bi-apps/traceability/application/'
    }
  });
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ApplicationComponent,
    NotFoundComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:MSAL_INSTANCE,
      useFactory:MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
