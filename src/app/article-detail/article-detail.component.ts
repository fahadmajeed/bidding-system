import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  @Input() article;
  @Input() currentUser;
  @Output() setBid = new EventEmitter<any>();

  title: string;
  bid: number;
  bids: any[];
  currentPrice: number;
  intervalId: any;
  remainingTime: any;
  articleTime: moment.Moment;
  disableBidding = false;
  showBidform = true;
  showMe = true;
  constructor() { }

  ngOnInit() {
    this.title = this.article.title;
    this.currentPrice = this.article.price;
    this.startCountDown();
    this.disableBidding = (this.currentUser !== this.article.creator) ? true : false;

  }
  startCountDown() {
    this.articleTime = moment(this.article.created);
    let i = 0;
    const end = moment(this.article.endsAt);
    let  start = moment();
    const diffInSec = Math.floor(moment.duration(end.diff(start)).asSeconds());
    start.format('mm:ss');
    this.intervalId = setInterval(() => {
      start = moment();
      const d = moment.duration(end.diff(start));
      const secs = Math.ceil(d.asSeconds());
      start.add(1, 'seconds');
      this.remainingTime = moment(+d).format('mm:ss');
      if (secs % 60 === 0) {
        this._reducePrice();
      }

      if (this.currentPrice <= 0 || secs <= 0) {
        this.endAuction();
      }

      i++;
    }, 1000);
  }
  endAuction() {
    clearInterval(this.intervalId);
    this.disableBidding = true;
    this.remainingTime = '00:00';
    this.showMe = false;

  }

  private _reducePrice() {
    this.currentPrice = Math.floor(this.currentPrice * 0.8);
  }
  placeBid() {

    const bid = {
      user: this.currentUser,
      value: this.bid,
      articleId: this.article.id
    };
    this.setBid.emit(bid);
  }
}
