import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginModel } from '../Models/LoginModel';
import { IAuthService } from '../Interfaces/IAuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements IAuthService{
authToken:string;
  constructor(private http: HttpClient,
    private router: Router) { }
  SignIn(login:LoginModel) {
    this.http.post('http://localhost:52459/api/Account/Login', login)
    .pipe(first())
    .subscribe(
      data=>{
      this.authToken = data["AuthToken"];
      //this.authTokenService.SetAuthToken(this.authToken);
      localStorage.setItem('userId',login.Username);
      localStorage.setItem('authToken', data["AuthToken"]);
      localStorage.setItem('loginData', JSON.stringify(data));
      console.log("navigating to placebet");
      this.router.navigate(['placebet']);
    },
    error=>{
      console.log(JSON.stringify(error));
    }
    );
  
}
}
