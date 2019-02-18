import { Article, Bid } from '../../models/models';
import { pubsub } from './eventManager';
import { auth } from './loginRoutes';

export class Articles {

  private _id: number;
  private _bidMaxTimeInMinutes = 5;

  constructor() {
    this._id = 1;
  }

  private articles: Article[] = [];

  getArticles() {
    return this.articles;
  }
  scheduleBidEnd(id: number) {

    const currentBid = this.articles.findIndex(article => article.id === id);
    let inc = 0;
    const OneMinuteInterval = 60000;
    const intId = setInterval(() => {

      const cPrice = this.articles[currentBid].price;
      this.articles[currentBid].price = Math.floor(cPrice * (0.8));
      let msg;
      inc++;

      if (inc >= this._bidMaxTimeInMinutes) {
        console.log('ending bid',  this.articles[currentBid]);
        msg = this.decideWinner(this.articles[currentBid]);
        pubsub.emit('articleEnded', msg);
        clearInterval(intId);
      }
      msg = 'update price';
      pubsub.emit('articlePriceDown', msg);

    }, OneMinuteInterval);
  }
  decideWinner(article: any): any {
    if (article.bids.length) {
      const maxBid = Math.max.apply(Math, article.bids.map(o => o.value));
      const filterTopBidders = article.bids.filter(art => art.value.toString() === maxBid.toString());
      let bidWinner;
      if (filterTopBidders.length > 1) {
        bidWinner = filterTopBidders.reduce(function (a, b) { return a.bidTime < b.bidTime ? a : b; });
      } else if (filterTopBidders.length === 1) {
        bidWinner =  filterTopBidders[0];
      }
      // console.log('filterTop', filterTopBidders, 'bidwinner', bidWinner);

      article['bidWinner'] = bidWinner;
      article['status'] = 'ended-successfully';
      return `${bidWinner.name} won auction of ${article.title} for ${bidWinner.value}`;
    } else {
      article['status'] = 'ended-unsuccessfully';
      return `Auction of ${article.title} ended unsuccessfully`;
    }

  }

  addArticle(article: Article): boolean {
    const endsAt = new Date();
    endsAt.setMinutes( endsAt.getMinutes() + this._bidMaxTimeInMinutes );
    const completeArticle = { ...article,
      startPrice: article.price,
      id: this._id,
      created: new Date(),
      endsAt,
      bids: [],
      status: 'active'
    };

    this.articles.push(completeArticle);
    const user = auth.getUserById(completeArticle['creator']);
    const msg = `${article.title} was put on auction by ${user.name} for ${article.price}`;
    pubsub.emit('articleAdded', msg);
    this.scheduleBidEnd(this._id);
    this._id++;
    return true;

  }

  getArticlesByStatus(status: string): Article[] {
    const res = this.articles.filter(article => article.status === status);
    return res;
  }

  placeBid(params): Bid[] | Object {
    const { articleId, user, value } = params;
    const bidder = auth.getUserById(user);

    const bid = {
      user,
      name: bidder.name,
      bidTime: new Date(),
      status: 'active',
      value,
    };

    const found = this.articles.findIndex(article => article.id === articleId);
    const art = this.articles[found];

    if (art.status === 'active') {

      this.articles[found]['bids'].push(bid);
      const msg = `${bidder.name} placed a bid on article [${art.title}]`;
      pubsub.emit('bidPlaced', msg);
      return this.articles[found]['bids'];

    } else {
      return {
        error: 'Bidding time has ended for this article'
      };
    }

  }

}
