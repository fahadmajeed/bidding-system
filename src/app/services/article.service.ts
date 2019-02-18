import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, Bid } from '../../../models/models';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _http: HttpClient) { }

  createArticle(params) {

    const article = environment.SERVER_URL + 'articles';
    return this._http.post<Article>(article, {params});

  }

  getArticles(status: string = 'active'): Observable<Article[]> {

    const article_end_point = environment.SERVER_URL + 'articles';
    return this._http.get<Article[]>(article_end_point,  {
      params: {
        status
      }
    });

  }

  placeBid(bid: Bid): any {

    const bid_end_point = environment.SERVER_URL + 'articles/bid';
    return this._http.post<Bid[]>(bid_end_point, {
        bid
    });

  }

}
