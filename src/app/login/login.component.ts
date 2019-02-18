
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../localStorage';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
              private loginService: LoginService,
              private localStorage: LocalStorageService
  ) { }
username: string;
password: string;
  ngOnInit() {
  }
  login(): void {
    const params = {username: this.username, password: this.password};
    this.loginService.login(params).subscribe(response => {
      console.log('response', response);
      this.localStorage.storeOnLocalStorage(JSON.stringify(response['data']));
      this.router.navigate(['create-article']);
    });
  }

}
