import { Component, OnInit } from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {Routes,ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private msalService:MsalService,private router:Router) { }

  ngOnInit(){
    //debugger;
    this.msalService.instance.handleRedirectPromise().then(
      res=>{
        if(res !=null && res.account !=null){

          this.msalService.instance.setActiveAccount(res.account);
        }
      }
    ).catch(err => {
      console.error(err);
    });

    if(this.isLoggedIn()){
      this.router.navigate(['sn-query']);
    }
    //alert(this.msalService.instance.getActiveAccount().username);
  }

  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }

  login(){
    this.msalService.loginRedirect();
  }

  logout(){
    this.msalService.logout();
  }

}
