import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {MSAL_INSTANCE, MsalModule, MsalService} from "@azure/msal-angular";
import {IPublicClientApplication, PublicClientApplication} from "@azure/msal-browser";
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StepOneComponent } from './main-page/step-one/step-one.component';
import { StepTwoComponent } from './main-page/step-two/step-two.component';
import { StepThreeComponent } from './main-page/step-three/step-three.component';


export function MSALInstanceFactory():IPublicClientApplication{

  let clientId,redirectUrl;
  if(document.location.hostname == 'localhost'){
    clientId = '51d12da3-bca5-4fd2-ae6b-f09d6ab2a2ed';
    redirectUrl = "http://localhost:4200/sn-query";
  }else{
    clientId = '88e5e9e2-aed1-467d-92d2-9280b831790e';
    redirectUrl = "https://bi-new.mellanox.com/bi-apps/traceability/app/";
  }

  return new PublicClientApplication({
    auth:{
      clientId:clientId,
      redirectUri:redirectUrl
    }
  });
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,

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
