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

  displayPlatform:boolean = false;
  username:string;
  step:number = 1;
  options = [
    {key:'SERIAL_NUMBER',value:'Serial Number'},
    {key:'SHIP_PACK',value:'Shipment Box Number'},
    {key:'SHIP_NUMBER',value:'Shipment Number'},
    {key:'MNF_JOB',value:'Manufacturer Batch'},
    {key:'JOB_NAME',value:'Completion Batch'},
    {key:'JOB_NAME_ISSUED',value:'Issued SN for rework job'},
    {key:'FW_GUID',value:'GUID'},
    {key:'SFG_SN',value:'SFG Serial Number from Logistics Traceability'},
    {key:'COMP2',value:'Child Serial Number from Components Traceability'},
    {key:'SFG_MNF_JOB',value:'SFG Manufacturer Batch'},
    {key:'IC_LOT',value:'IC Lot'},
    {key:'ORDER_NUMBER',value:'Sales Order for shipped items'},
    {key:'PURCHASE_ORDER',value:'Customer Purchase Order for shipped items'},
    {key:'RMA_NUMBER',value:'RMA Order for returned items'},
    {key:'RMA_PACK',value:'RMA Order for returned items'},
    {key:'RMA_PACK',value:"RMA Box Number"},
    {key:'DELIVERY_ID',value:'Derlivery ID'},
    {key:'JOB_REWORK',value:'Rework Job'},
    {key:'IR_MOVE_ORDER',value:'IR Number'},
    {key:'PO',value:'Purchase order'},
    {key:'PO_LINE',value:'Purchase order Line'},
  ];

  constructor(private msalService:MsalService,private router:Router) { }

  ngOnInit(){

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

  onSubmit(){

  }

  sliceUsername(){
     let slicer = this.msalService.instance.getActiveAccount().username.split('@');
    this.username = slicer[0];
  }

  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }

  logout(){
    this.msalService.logout();
  }

}
