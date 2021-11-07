import { Component, OnInit } from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {Routes,ActivatedRoute,Router} from "@angular/router";
import {AuthenticationResult} from "@azure/msal-browser";
import {FormBuilder,Validators,FormGroup, FormControl} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  displayPlatform:boolean = false;
  username:string;
  step:number = 1;
  session:string;
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

  fetchData = [{
    'dataFound': [],
    'totalFetch': 0,
    'selectedOption': 'SERIAL_NUMBER',
    'totalSearch':0,
    notFound:[]
  }];

  onChange(e){
    this.fetchData[0].selectedOption = e.target.value;;
  }

  constructor(private msalService:MsalService,private router:Router,private fb: FormBuilder,private http:HttpClient) { }

  myForm:any = this.fb.group({
    batchOption: ['SERIAL_NUMBER',Validators.required],
    sns:['', Validators.required],
    username:['',Validators.required]
  });

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
    if (!this.myForm.valid) {
      return false;
    } else {

       this.http.post<any>('https://bi-new.mellanox.com/bi-apps/traceability/api/search.php',JSON.stringify(this.myForm.value)).subscribe((data:any)=>{
         this.step = 2;
         this.fetchData[0].dataFound = data.FOUND_DATA;
         this.fetchData[0].totalFetch = data.TOTAL_FETCH;
         this.fetchData[0].totalSearch = data.SENT_SNS.length
         this.fetchData[0].notFound = data.NOT_FOUND_DATA.join(', ');


          debugger
      });

    }
  }

  sliceUsername(){
     let slicer = this.msalService.instance.getActiveAccount().username.split('@');
     this.username = slicer[0];
     this.myForm.controls.username.patchValue(this.username);
  }

  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }

  logout(){
    this.msalService.logout();
  }

}
