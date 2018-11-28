import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new Subject<string>();
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  onChangeMessage() {
    return this.currentMessage;
  }

}