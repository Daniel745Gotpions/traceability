import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {MaslGuard} from "./masl.guard";
import {ApplicationComponent} from "./application/application.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [

  {path:"",redirectTo: 'sn-query', pathMatch: 'full' },
  {path:"sn-query",component:MainPageComponent},
  {path:"**",component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
