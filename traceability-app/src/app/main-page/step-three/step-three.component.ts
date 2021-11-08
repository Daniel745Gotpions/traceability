import { Component, OnInit } from '@angular/core';
import {AppHandleService} from "../app-handle.service";

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent implements OnInit {
  sessionId:number;
  domain:string='';
  constructor(private appService:AppHandleService) { }

  ngOnInit(): void {
    this.domain = this.appService.getDomain();
    this.sessionId = this.appService.getSession();
  }

  returnStep1(){
    this.appService.setStep(1);
  }
}
