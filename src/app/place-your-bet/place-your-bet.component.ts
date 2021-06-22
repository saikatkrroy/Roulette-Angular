import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedAuthTokenServiceService } from '../services/shared-auth-token-service.service';
import { rouletteNumbers } from '../Content/RouletteNumbers';


@Component({
  selector: 'app-place-your-bet',
  templateUrl: './place-your-bet.component.html',
  styleUrls: ['./place-your-bet.component.css']
})
export class PlaceYourBetComponent implements OnInit {
  returnUrl: string;
  authToken;
  errors:string;

  bet : number;
  money = '';
  Data = [];
  HotNumbers : {Number:any;color:any};
  CoolNumbers : {Number:any,color:any};
  OddEvenStats : {Even:any,Odd:any};
  ColorStats : {Red:any, Black:any};
  LastTwelveBets : {Number:any,color:any};
  RouletteEvent = '';
  BetPlaced = false;
  ActionFailed = false;
  NumberLoadFailed = false;
  UpdateUserInput = false;
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
  Zero : {Zero:any};
  userList = [];
  supervisor = '';


  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authTokenService:SharedAuthTokenServiceService) {}

  ngOnInit() {
    this.authTokenService.currentAuthToken.subscribe(token=>(this.authToken=token));
    console.log("authToken"+localStorage.getItem('authToken'))
    this.RetrieveStats();
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
  RetrieveStats() {
      this.http.get('http://localhost:52459/api/RouletteEntry/RetrieveOddEvenStats/true')
      .pipe(first())
      .subscribe(response=> {
                  if (response["Odd"] == undefined && response["Even"] == undefined)
                      this.OddEvenStatsFailure = true;
                  else
                      this.OddEvenStats = JSON.parse(JSON.stringify(response));
              },
              error=> {
                  this.OddEvenStatsFailure = true;
              });
      this.http.get('http://localhost:52459/api/RouletteEntry/RetrieveColorStats/true')
          .pipe(first())
    .subscribe(response=> {
                  if (response["Black"] == undefined && response["Red"] == undefined)
                      this.ColorStatsFailure = true;
                  else
                      this.ColorStats = JSON.parse(JSON.stringify(response));
                
              },
              error=> {
                  this.ColorStatsFailure = true;
              });
      this.http.get('http://localhost:52459/api/RouletteEntry/RetrieveCoolNumber/true')
          .pipe(first())
    .subscribe(response=> {
                  if (response["length"] === 0)
                      this.CoolNumberFailure = true;
                  else
                      this.CoolNumbers = JSON.parse(JSON.stringify(response));
              },
              error=> {
                  this.CoolNumberFailure = true;
              });
      this.http.get('http://localhost:52459/api/RouletteEntry/RetrieveHotNumber/true')
          .pipe(first())
    .subscribe(response=> {
                  if (response["length"] === 0)
                      this.HotNumberFailure = true;
                  else
                      this.HotNumbers = JSON.parse(JSON.stringify(response));
              },
              error=> {
                  this.HotNumberFailure = true;
              });
      this.http.get('http://localhost:52459/api/RouletteEntry/RetrieveZeroPercentage/true')
          .pipe(first())
    .subscribe(response=> {
                  this.Zero = JSON.parse(JSON.stringify(response));
              },
              error=> {
                  this.ZeroFailure = true;

              });
      this.http.get('http://localhost:52459/api/RouletteEntry/LastTwelveBet/true')
          .pipe(first())
    .subscribe(response=> {
                  if (response["length"] === 0)
                      this.LastTwelveBetFailure = true;
                  else
                      this.LastTwelveBets = JSON.parse(JSON.stringify(response));
              },
              error=> {
                  this.LastTwelveBetFailure = true;
              });
      this.StatsVisible = true;
  }
  PlaceYourBet() {
    this.RouletteEvent="RA 01 (Min 2 € Max 20 €)"
    this.formValidated = this.ValidateUserInput();

    if (this.UpdateUserInput === false && this.formValidated === true) {
        this.userSelectedBet = this.bet.toString();
        var betModel = {
            "value": this.bet,
            "rouletteEventName": this.RouletteEvent
        };
        this.http.post('http://localhost:52459/api/RouletteEntry/CreateUserInput/', betModel).pipe(first())
    .subscribe(
            response=> {
                if (response["status"] === 204)
                    this.BetPlaced = true;

            },
            error=>{
                this.ActionFailed = true;
            });
    }
    if (this.UpdateUserInput === true) {
        this.UpdateBet();
    }
  }
  ValidateUserInput() {
    if (this.bet === null || this.RouletteEvent === "")
        return false;
        return true;
  }
  UpdateBet() {
    this.http.put('http://localhost:52459/api/RouletteEntry/UpdateUserInput/' + this.bet + '/' + this.userSelectedBet,"").pipe(first())
    .subscribe(
        response=> {
            if (response["status"] === 204)
                this.BetPlaced = true;
            this.UpdateUserInput = false;
            this.userSelectedBet = this.bet.toString();
        },
        error=>{
            this.ActionFailed = true;
            this.UpdateUserInput = false;
        });
  }
  UserInputUpdate() {
    this.UpdateUserInput = true;
    this.http.get('http://localhost:52459/api/RouletteEntry/UserInputUpdate').pipe(first())
    .subscribe(
        response=> {
            if (response["status"] === 200) {
                this.BetPlaced = true;
            }

        },
        error=> {
            this.ActionFailed = true;
        });
  }
  DeleteBet() {
    this.http.delete('http://localhost:52459/api/RouletteEntry/DeleteUserInput/' + this.userSelectedBet).pipe(first())
    .subscribe(
        response=> {
            if (response["status"] === 204)
                this.DeleteUserInput = true;
        },
        error=> {
            this.DeleteUserInput = false;
        });
}
}
