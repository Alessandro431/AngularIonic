import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';

//Modificato cambiato sintassi DAL MOMENTO CHE NON USO PIU' NativeStorage ma preferencies per ssalvare dati 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private env: EnvService,
  ) { }

  login(email: string, password: string): Observable <any> {
    return this.http.post<any>(`${this.env.API_URL}auth/login`, { email, password }).pipe(
      tap(async (token: any) => {
        await Preferences.set({
          key: 'token',
          value: JSON.stringify(token)
        });
        console.log('Token Stored');
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }
  

  register(fName: string, lName: string, email: string, password: string):Observable <any> {
    return this.http.post(this.env.API_URL + 'auth/register',
      { fName: fName, lName: lName, email: email, password: password }
    );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token["token_type"]} ${this.token["access_token"]}`
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers }).pipe(
      tap(async (data) => {
        await Preferences.remove({ key: 'token' });
        this.isLoggedIn = false;
        this.token = null;
      })
    );
  }


  async user(): Promise<User | undefined> {
    if (this.token) {
      const headers = new HttpHeaders({
        'Authorization': `${this.token["token_type"]} ${this.token["access_token"]}`
      });
      try {
        return await this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers }).toPromise();
      } catch (error) {
        console.error('Error fetching user:', error);
        return undefined;
      }
    }
    return undefined;
  }
  

  async getToken(): Promise<void>  {
    const { value } = await Preferences.get({ key: 'token' });
    this.token = value ? JSON.parse(value) : null;
    this.isLoggedIn = !!this.token;
  }
}
