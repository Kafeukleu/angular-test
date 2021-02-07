import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ContentApiService {
  private readonly CONTENT_URL = ' http://dev4.wizzcad.com:8081/';

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  public getContent(limit = 1000, page = 0): Observable<any> {
    let params = new HttpParams();
    params = params.append('_limit', '' + limit);
    params = params.append('_page', '' + page);

    return this.http.get(
      this.CONTENT_URL + this.authenticationService.getCurrentUserToken(),
      {
        params
      }
    );
  }
}
