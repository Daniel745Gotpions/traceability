import { Component, OnInit } from '@angular/core';
import {AppHandleService} from "../app-handle.service";

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent implements OnInit {
  sesstionId:number;
  constructor(private appService:AppHandleService) { }

  ngOnInit(): void {
    this.sesstionId = this.appService.getSession();
  }

  returnStep1(){
    this.appService.setStep(1);
  }
}
