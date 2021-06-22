import { LoginModel } from "../Models/LoginModel";

export interface IAuthService{
    SignIn(login:LoginModel);
}