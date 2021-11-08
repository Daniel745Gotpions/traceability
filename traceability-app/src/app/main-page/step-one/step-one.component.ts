import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {Routes,ActivatedRoute,Router} from "@angular/router";
import {AuthenticationResult} from "@azure/msal-browser";
import {FormBuilder,Validators,FormGroup, FormControl} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {AppHandleService} from "../app-handle.service";

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {
  username:string;
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
    this.fetchData[0].selectedOption = e.target.value;
    this.appService.setSelectedOption(e.target.value);
  }

  constructor(private msalService:MsalService,private router:Router,private fb: FormBuilder,private http:HttpClient,private appService:AppHandleService) { }

  myForm:any = this.fb.group({
    batchOption: ['SERIAL_NUMBER',Validators.required],
    sns:['', Validators.required],
    username:['',Validators.required]
  });

  ngOnInit(): void {

    this.appService.setStep( 1 );
    this.username = this.appService.username;
    this.myForm.controls.username.patchValue(this.username);
  }

  onSubmit(){

    if (!this.myForm.valid) {
      return false;
    } else {

      this.http.post<any>('https://bi-new.mellanox.com/bi-apps/traceability/api/search.php',JSON.stringify(this.myForm.value)).subscribe((data:any)=>{

        this.appService.setStep(2);
        let serials = [];

        if(data.FOUND_DATA.length){
          for (var i=0;i<data.FOUND_DATA.length;i++){
            serials.push({SERIAL_NUMBER:data.FOUND_DATA[i].SERIAL_NUMBER,isSelected:true});
          }
        }

        this.appService.setData({
          dataFound : serials,
          totalFetch : data.TOTAL_FETCH,
          totalSearch : data.SENT_SNS.length,
          notFound : data.NOT_FOUND_DATA.join(', '),
          selectedOption : data.SELECTED_OPTIONS,
        });

      });
    }
  }
}
