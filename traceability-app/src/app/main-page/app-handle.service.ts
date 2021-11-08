import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppHandleService {
  private selectedOption = 'SERIAL_NUMBER';
  private $eventStep = new Subject<number>();
  public  $dataEvent = new Subject<any>();
  public  dataBuffer:any;
  public  step = this.$eventStep.asObservable();
  public  username:string;
  public totalSerial = [];
  private sessionId:number;

  constructor() { }

  setSessionId(sessionId:number){
    this.sessionId = sessionId;
  }

  getSession(){
    return this.sessionId;
  }

  setData(data){
    this.dataBuffer = data;
  }
  setUser(user:string){
    this.username = user;
  }

  setReceiveData(data:any){
    this.$dataEvent.next(data);
  }

  setStep(number:number){
    this.$eventStep.next(number);
  }

  getUsername(){
    return this.username;
  }

  getStep(){
    return this.step;
  }

  setSelectedOption(selectedOption){
    this.selectedOption = selectedOption;
  }

  getSelectedOption(){
    return this.selectedOption;
  }
}
