import { Component, OnInit,OnDestroy } from '@angular/core';
import {AppHandleService} from "../app-handle.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
  fetchData = {};
  serials = [];
  username:string;
  constructor(private appService:AppHandleService,private http:HttpClient) { }

  ngOnInit(): void {
    this.username = this.appService.username;
    this.fetchData = this.appService.dataBuffer;
    this.serials = this.appService.dataBuffer.dataFound;
  }

  returnStep1(){
    this.appService.setStep(1);
  }

  createSession(){
    //sns,batchOption,username
    if(this.serials){
      let sns = [];
      for(let i = 0 ; i<this.serials.length;i++){
        if(this.serials[i].isSelected){
          sns.push(this.serials[i].SERIAL_NUMBER);
        }
      }
      let json = {
        sns:sns,
        batchOption:this.appService.getSelectedOption(),
        username:this.username
      }

      this.http.post("https://bi-new.mellanox.com/bi-apps/traceability/api/createSession.php",JSON.stringify(json)).subscribe((respond:any)=>{
        this.appService.setSessionId(parseInt(respond.sessionId));
        this.appService.setStep(3);
      });
    }
  }
}
