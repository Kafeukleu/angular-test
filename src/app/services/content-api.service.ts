import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ContentApiService {
  private readonly CONTENT_URL = ' http://dev4.wizzcad.com:8081/';

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  public getContent(): Observable<any> {
    return this.http.get(
      this.CONTENT_URL + this.authenticationService.getCurrentUserToken()
    );
  }
}
