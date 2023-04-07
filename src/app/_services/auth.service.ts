import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(firstName :string,lastName:string, username:string, cin:number, email:string, phone:number, password:string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        firstName,
        lastName,
         username,
          cin,
           email,
            phone,
             password
      },
      httpOptions
    );
  }

  registerConstat(firstName :string,lastName:string, username:string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        firstName,
        lastName,
         username,
          
      },
      httpOptions
    );
  }




  logout(): Observable<any> {
    const USER_KEY = 'auth-user';
    window.sessionStorage.removeItem(USER_KEY);
    return this.http.post(AUTH_API + 'logout', { }, httpOptions)
  }
}
