import {Component, OnInit,OnDestroy} from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {AuthenticationResult} from "@azure/msal-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'traceability-app';

  constructor(private msalService:MsalService) {

  }

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

    //debugger;
    //alert(this.msalService.instance.getActiveAccount().username);
  }


  isLoggedIn():boolean{
   return this.msalService.instance.getActiveAccount() != null;
  }

  login(){
    /*this.msalService.loginPopup().subscribe((response:AuthenticationResult)=>{
      this.msalService.instance.setActiveAccount(response.account);
    });*/
    this.msalService.loginRedirect();
  }

  logout(){
    this.msalService.logout();
  }

}
