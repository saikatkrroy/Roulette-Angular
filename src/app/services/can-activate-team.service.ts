import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserToken,Permissions } from '../Content/Permissions';

@Injectable({
  providedIn: 'root'
})
export class CanActivateTeamService implements CanActivate{

  constructor(private permissions: Permissions, private currentUser: UserToken) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.permissions.canActivate(this.currentUser, localStorage.getItem('userId'));
  }
}
