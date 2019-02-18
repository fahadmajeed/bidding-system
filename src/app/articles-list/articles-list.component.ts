import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Article } from 'models/models';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '../localStorage';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

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
      // console.log('includes', res.includes('put on auction'), res.length, res);
      if (res.length > 1 && res !== 'update price') {

        this.snackBar.open(data, '', {
          duration: 4000,
        });
        if (res.includes('put on auction')) {
          // console.log('call update');
          this.getArticleList();
        }
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
    const status = 'active';
    this.articleService.getArticles(status).subscribe(response => {
      this.articles = response['data'];
    });
  }

  setBidParent($event) {
    console.log('event', $event);
    this.articleService.placeBid($event).subscribe(res => {});
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }
}
