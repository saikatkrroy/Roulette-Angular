import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedAuthTokenServiceService } from '../services/shared-auth-token-service.service'; 
import { AuthServiceService } from '../services/auth-service.service';
import { LoginModel } from '../Models/LoginModel';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authToken;
  userId;
  password;
  createNewUser=true;
  returnUrl: string;
  errors:"";
  submitted = false;
  admin=false;
  loginModel:LoginModel;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authTokenService:SharedAuthTokenServiceService,
              private authService:AuthServiceService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ;
  }
  get f() { return this.loginForm.controls; }

  Login() {
    this.submitted = true;  
    this.loginModel={ Username: this.f.userId.value, Password: this.f.password.value };
    this.authService.SignIn(this.loginModel);
  
}
LogOff() {
  this.http.post('http://localhost:52459/api/Account/LogOff', this.authToken)
  .pipe(first())
  .subscribe(
    data=>{this.router.navigate(['']);},
    error=>{
      this.f.errors=error.statusText;
    }
  );
  }
}
