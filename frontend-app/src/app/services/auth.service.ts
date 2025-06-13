import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LoginReq } from '../models/loginReq.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly AUTH_URL: string = 'http://localhost:4000/api/auth';

  constructor(private http: HttpClient) {}

  public refreshToken(token: string): Observable<string> {
    return this.http.post<string>(AuthService.AUTH_URL + '/refresh-token', {
      token,
    });
  }

  public login(loginData: LoginReq): Observable<User> {
    return this.http.post<User>(AuthService.AUTH_URL + '/login', loginData);
  }
}
