import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(params) {
    const auth = environment.SERVER_URL + 'auth';
    return this._http.post(auth, {params});
  }
}