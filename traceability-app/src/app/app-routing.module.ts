import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {MaslGuard} from "./masl.guard";
import {ApplicationComponent} from "./application/application.component";

const routes: Routes = [

  {path:"",redirectTo: 'sn-query', pathMatch: 'full' },
  {path:"**",component:MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
