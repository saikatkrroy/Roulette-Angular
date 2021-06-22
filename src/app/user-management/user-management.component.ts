import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { SharedAuthTokenServiceService } from '../services/shared-auth-token-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  returnUrl: string;
  authToken;
  errors:string;

  LoginFailed = false;
  userIdNew = '';
  passwordNew = '';
  createNewUser = false;
  deleteUser = false;
  userCreated = false;
  userDeleted = false;
  userCreationFailed = false;
  failedDelete = false;
  bet = '';
  money = '';
  Data = {};
  HotNumbers : {Number:any;color:any};
  CoolNumbers : {Number:any,color:any};
  OddEvenStats : {Even:any,Odd:any};
  ColorStats : {Red:any, Black:any};
  LastTwelveBets : {Number:any,color:any};
  RouletteEvent = '';
  BetPlaced = false;
  ActionFailed = false;
  NumberLoadFailed = false;
  updateUserInput = false;
  DeleteUserInput = false;
  userSelectedBet = '';
  range = '';
  formValidated = true;
  OddEvenStatsFailure = false;
  ColorStatsFailure = false;
  HotNumberFailure = false;
  CoolNumberFailure = false;
  LastTwelveBetFailure = false;
  ZeroFailure = false;
  StatsVisible = false;
  DisplayStats = false;
  Zero : {Zero:any};
  userList = {};
  selectedUser = '';
  userFirstName = '';
  userLastName = '';
  selectedUserforStat = '';


  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authTokenService:SharedAuthTokenServiceService) { }

  ngOnInit(){
    this.authTokenService.currentAuthToken.subscribe(token=>(this.authToken=token));
  }
  LogOff() {
      this.http.post('http://localhost:52459/api/Account/LogOff', this.authToken)
      .pipe(first())
      .subscribe(
        data=>{
            this.router.navigate(['']);
        },
        error=>{
          this.errors=error.statusText;
        }
      );
  }

  CreateNewUser(){
    var loginModel = { "Username": this.userIdNew, "Password": this.passwordNew, "FirstName": this.userFirstName, "LastName": this.userLastName};
    this.http.post('http://localhost:52459/api/Account/CreateNewUser', loginModel).pipe(first())
      .subscribe(
        response=> {
            if (response["status"] === 200)
                this.userCreated = true;
        },
        error=> {
console.log(error.ToString());
            this.userCreationFailed = true;
            this.userCreated = false;

        });
}
RetrieveUsers(){
    this.createNewUser = false;
    this.deleteUser = true;
    this.DisplayStats = false;
    this.http.get('http://localhost:52459/api/Account/RetrieveUsers').pipe(first())
      .subscribe(
        response=> {
            if (response["status"] === 200)
                this.userList = JSON.parse(JSON.stringify(response));
        },
        error=> {
console.log(error.ToString());
            
        }
    );
}
DeleteUser(){
    var response = confirm("Are you sure you want to Delete this user");
    if (response == true) {
        this.http.delete('http://localhost:52459/api/Account/DeleteUser/' + this.selectedUser).pipe(first())
      .subscribe(
            response=> {
                if (response["status"] === 200)
                    this.userDeleted = true;
                  this.RetrieveUsers();
            },
            error=> {
console.log(error.ToString());
                this.failedDelete = true;

            });
    }
  }

  RetrieveUserStat(){
        
    this.http.get('http://localhost:52459/api/RouletteEntry/RetrieveUserOddEvenStats/' + this.selectedUserforStat)
        .pipe(first())
      .subscribe(response=> {
            if (response["Odd"] == undefined && response["Even"] == undefined)
                this.OddEvenStatsFailure = true;
            else
                this.OddEvenStats = JSON.parse(JSON.stringify(response));
        },
            error=> {
console.log(error.ToString());
                this.OddEvenStatsFailure = true;
            });
    this.http.get('http://localhost:52459/api/RouletteEntry/RetrieveUserColorStats/' + this.selectedUserforStat)
        .pipe(first())
      .subscribe(response=> {
            if (response["Black"] == undefined && response["Red"] == undefined)
                this.ColorStatsFailure = true;
            else
                this.ColorStats = JSON.parse(JSON.stringify(response));
        },
            error=> {
                console.log(error.ToString());
                this.ColorStatsFailure = true;
            });
    this.http.get('http://localhost:52459/api/RouletteEntry/RetrieveUserCoolNumber/' + this.selectedUserforStat)
        .pipe(first())
      .subscribe(response=> {
            if (response === null)
                this.CoolNumberFailure = true;
            else
                this.CoolNumbers = JSON.parse(JSON.stringify(response));
        },
            error=> {
                console.log(error.ToString());
                this.CoolNumberFailure = true;
            });
    this.http.get('http://localhost:52459/api/RouletteEntry/RetrieveUserHotNumber/' + this.selectedUserforStat)
        .pipe(first())
      .subscribe(response=> {
            if (response === null)
                this.HotNumberFailure = true;
            else
                this.HotNumbers = JSON.parse(JSON.stringify(response));
        },
            error=> {
                console.log(error.ToString());
                this.HotNumberFailure = true;
            });
    this.http.get('http://localhost:52459/api/RouletteEntry/RetrieveUserZeroPercentage/' + this.selectedUserforStat)
        .pipe(first())
      .subscribe(response=> {
            this.Zero = JSON.parse(JSON.stringify(response));
        },
            error=> {
                console.log(error.ToString());
                this.ZeroFailure = true;

            });
    this.http.get('http://localhost:52459/api/RouletteEntry/UserLastTwelveBet/' + this.selectedUserforStat)
        .pipe(first())
      .subscribe(response=> {
            if (response === null)
                this.LastTwelveBetFailure = true;
            else
                this.LastTwelveBets = JSON.parse(JSON.stringify(response));
        },
            error=> {
                console.log(error.ToString());
                this.LastTwelveBetFailure = true;
            });
    this.StatsVisible = true;

};
EnableUserCreation(){
    this.DisplayStats = false;
    this.deleteUser = false;
    this.createNewUser = true;
    //this.$digest();
};
RetrieveUsersForStat = function() {
    this.RetrieveUsers();
    this.createNewUser = false;
    this.deleteUser = false;
    this.DisplayStats = true;
    this.$digest();

};

}
