export class UserToken {}
export class Permissions {
  canActivate(user: UserToken, id: string): boolean {
      if(id.toLowerCase().indexOf("admin")>-1)
    return true;
  }
}