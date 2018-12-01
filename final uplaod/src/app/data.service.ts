import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class DataService {

  private carnamesrc = new Subject<string>();
  private mpgsrc = new Subject<string>();
  private carcostsrc = new Subject<string>();
  private servicecostsrc = new Subject<string>();
  private yearssrc = new Subject<string>();
  private distancesrc = new Subject<string>();
  private tripcostsrc = new Subject<string>();
  private ubernamesrc = new Subject<string>();


  currentMessage = this.carnamesrc.asObservable();
  currentMessage1 = this.mpgsrc.asObservable();
  currentMessage2 = this.carcostsrc.asObservable();
  currentMessage3 = this.servicecostsrc.asObservable();
  currentMessage4 = this.yearssrc.asObservable();
  currentMessage5 = this.distancesrc.asObservable();
  currentMessage6 = this.tripcostsrc.asObservable();
  currentMessage7 = this.ubernamesrc.asObservable();

  constructor() { }
  
  
 
  
  
  
 

  changeMessage(message: string) {
    this.carnamesrc.next(message)
  }
  changeMessage1(message: string) {
    this.mpgsrc.next(message)
  }

  changeMessage2(message: string) {
    this.carcostsrc.next(message)
  }
  changeMessage3(message: string) {
    this.servicecostsrc.next(message)
  }

  changeMessage4(message: string) {
    this.yearssrc.next(message)
  }

  changeMessage5(message: string) {
    this.distancesrc.next(message)
  }

  changeMessage6(message: string) {
    this.tripcostsrc.next(message)
  }

  changeMessage7(message: string) {
    this.ubernamesrc.next(message)
  }


  onChangeMessage() {
    return this.currentMessage
  }
  onChangeMessage1() {
    return this.currentMessage1
  }
  onChangeMessage2() {
    return this.currentMessage2
  }
  onChangeMessage3() {
    return this.currentMessage3
  }
  onChangeMessage4() {
    return this.currentMessage4
  }
  onChangeMessage5() {
    return this.currentMessage5
  }
  onChangeMessage6() {
    return this.currentMessage6
  }
  onChangeMessage7() {
    return this.currentMessage7
  }







}