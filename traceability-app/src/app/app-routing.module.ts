import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {MaslGuard} from "./masl.guard";
import {ApplicationComponent} from "./application/application.component";

const routes: Routes = [
  {path:"",redirectTo: 'home', pathMatch: 'full' },
  {path:"sn-query",component:ApplicationComponent,canActivate:[MaslGuard]},
  {path:"**",component:MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
