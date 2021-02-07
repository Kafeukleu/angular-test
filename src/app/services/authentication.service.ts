import {Injectable} from '@angular/core';
import {LoginApiService} from './login-api.service';
import {Observable} from 'rxjs';
import {LoginModel} from '../models/login.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userToken: string;
  private readonly USER_TOKEN = 'userToken';

  constructor(private loginApiService: LoginApiService) {
    this.userToken = localStorage.getItem(this.USER_TOKEN);
  }

  // Tries to find the userToken for the given userName and password
  // return of(true) if there is a matching user and of(false) otherwise
  public connect(userName: string, password: string): Observable<boolean> {
    return this.loginApiService.getLogin(userName, password).pipe(
      tap((logins: LoginModel[]) => {
        this.userToken = logins?.[0]?.token;
        localStorage.setItem(this.USER_TOKEN, this.userToken);
      }),
      map((logins: LoginModel[]) => logins?.length > 0));
  }

  public logout(): void {
    localStorage.removeItem(this.userToken);
    this.userToken = undefined;
  }

  public getCurrentUserToken(): string {
    return this.userToken;
  }
}
