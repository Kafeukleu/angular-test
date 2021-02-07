import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginModel} from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private readonly LOGINS_URL = 'http://demo.wizzcad.com:8081/logins';

  constructor(private http: HttpClient) {
  }

  public getLogin(userName: string, password: string): Observable<LoginModel[]> {
    let params = new HttpParams();
    params = params.append('username', userName);
    params = params.append('password', password);

    return this.http.get<LoginModel[]>(
      this.LOGINS_URL,
      {
        params
      },
    );
  }
}
