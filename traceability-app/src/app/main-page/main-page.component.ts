import { Component, OnInit } from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {Routes,ActivatedRoute,Router} from "@angular/router";
import {AuthenticationResult} from "@azure/msal-browser";
import {FormBuilder,Validators,FormGroup, FormControl} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {AppHandleService} from "./app-handle.service";
import {stringify} from "@angular/compiler/src/util";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private msalService:MsalService,private router:Router,private fb: FormBuilder,private http:HttpClient,private appService:AppHandleService) { }

  displayPlatform:boolean = false;
  username:string='';
  step:number = 1 ;
  doneFlag:string ='';

  ngOnInit(){
    this.appService.getDomain();
    this.appService.step.subscribe(
      (step:number)=>{
        this.step = step;
      }
    );

    if(!this.isLoggedIn()) {
      this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
        if(this.isLoggedIn()){
          this.displayPlatform = true;
          this.sliceUsername();

        }
      })
    }else{
      this.displayPlatform = true;
      this.sliceUsername();
    }
  }

  returnStep1(){
    this.step = 1;
  }

  reloadPage(){
    window.location.reload();
  }

  sliceUsername(){
     let slicer = this.msalService.instance.getActiveAccount().username.split('@');
     this.username = slicer[0];
     this.appService.setUser(this.username);
  }

  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }

  logout(){
    this.msalService.logout();
  }

  clearSession(){
    let json = {username:this.username};
    this.http.post("https://bi-new.mellanox.com/bi-apps/traceability/api/cleanSession.php",JSON.stringify(json)).subscribe(()=>{
        this.doneFlag = 'Done';
    });
  }
}
