import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorage';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  title: string;
  price: number;
  message: string;
  user: any;
  constructor(private articleService: ArticleService,
              private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(this.localStorage.getStorageData().toString());
  }
  create(): void {

    const params = {title: this.title, price: this.price, creator: this.user.id};
    this.articleService.createArticle(params).subscribe(response => {
      this.message = 'Article Created';

    });
  }

}
