import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from './localStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Numericode Decipher';
  input: string;
  decipher: string;
  error: string;
  private sse: any;
  private record: Observable<any>;
  serverMessage = '';

  constructor(private _http: HttpClient,
    private zone: NgZone,
    private router: Router,
    private storageService: LocalStorageService,
    private snackBar: MatSnackBar
  ) {
      const EventSource = window['EventSource'];
      this.sse = new EventSource('http://localhost:3001/api/v1/data');
    }
  ngOnInit() {
    this.loadInputFromLocalStorage();
    this.getMessages().subscribe(data => {

      const res = data;
      if (res.length > 1 && res !== 'update price') {
        this.snackBar.open(res, '', {
          duration: 4000,
        });
      }
    });
  }
  routeTo(status: string) {
    if (status) {
      this.router.navigate([status]);
    }
  }
  loadInputFromLocalStorage() {
    this.input = <string>this.storageService.getStorageData();
  }

  getMessages(): Observable<any> {
    return new Observable<any>(observer => {
      this.sse.onmessage = evt => {
        this.zone.run(() => observer.next(evt.data));
      };
      return () => this.sse.close();
    });
  }

}
