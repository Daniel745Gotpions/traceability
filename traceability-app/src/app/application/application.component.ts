import { Component, OnInit } from '@angular/core';
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  constructor(private msalService:MsalService) { }
  username:string;
  ngOnInit(): void {
    this.username = this.msalService.instance.getActiveAccount().username;
  }

  logout(){
    this.msalService.logout();
  }
}
