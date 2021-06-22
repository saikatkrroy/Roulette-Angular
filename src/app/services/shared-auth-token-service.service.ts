import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedAuthTokenServiceService {

  constructor() { }
  public editAuthToken: any = [];
  public subject = new Subject<any>();
  private authTokenSource = new  BehaviorSubject(this.editAuthToken);
  currentAuthToken = this.authTokenSource.asObservable();
  SetAuthToken(authToken: string) {
  this.authTokenSource.next(authToken)
  }
}
