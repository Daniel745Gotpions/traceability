import { Component, OnInit } from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {Routes,ActivatedRoute,Router} from "@angular/router";
import {AuthenticationResult} from "@azure/msal-browser";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  displayPlatform = false;
  username:string;

  constructor(private msalService:MsalService,private router:Router) { }

  ngOnInit(){
    //debugger;




    /*this.msalService.instance.handleRedirectPromise().then(
      res=>{
        if(res !=null && res.account !=null){

          this.msalService.instance.setActiveAccount(res.account);
        }
      }
    ).catch(err => {
      console.error(err);
    });


    if(this.isLoggedIn()){
      this.router.navigateByUrl("/sn-query");
      //this.router.navigate(['sn-query']);
    }*/
    //alert(this.msalService.instance.getActiveAccount().username);

    if(!this.isLoggedIn()) {
      this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
        if(this.isLoggedIn()){
          this.displayPlatform = true;
        }
      })
    }

    //alert(this.msalService.instance.getActiveAccount().username);

  }

  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }

  logout(){
    this.msalService.logout();
  }

}
