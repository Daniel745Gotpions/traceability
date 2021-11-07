import {Component, OnInit,OnDestroy} from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {AuthenticationResult} from "@azure/msal-browser";
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'traceability-app';
  displayPlatform = false;
  constructor( private  msalService: MsalService) {}

  ngOnInit(){}

}
