import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Article } from 'models/models';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '../localStorage';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-successful-articles-list-component',
  templateUrl: './successful-articles-list.component.html',
  styleUrls: ['./successful-articles-list.component.css']

})
export class SuccessfulArticlesListComponent implements OnInit {

  articles: Article[];
  breakpoint: number;
  currentUser: String;
  sse: any;

  constructor(private articleService: ArticleService,
    private zone: NgZone,
    private localStorage: LocalStorageService,
    private snackBar: MatSnackBar

) {
  const EventSource = window['EventSource'];
  this.sse = new EventSource('http://localhost:3001/api/v1/data');
}

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
    this.getArticleList();
    const user =  JSON.parse(this.localStorage.getStorageData().toString());
    this.currentUser = user['id'];
    this.getMessages().subscribe(data => {
      const res = data;

      if (res.length > 1 && res !== 'update price') {

        this.snackBar.open(data, '', {
          duration: 4000,
        });
      }
    });
  }

  getMessages(): Observable<any> {
    return new Observable<any>(observer => {
      this.sse.onmessage = evt => {
        this.zone.run(() => observer.next(evt.data));
      };
      return () => this.sse.close();
    });
  }


  getArticleList(): void {
    const status = 'ended-successfully';
    this.articleService.getArticles(status).subscribe(response => {
      this.articles = response['data'];
      console.log('succes list', this.articles);
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }
}

