
import express = require('express');
import { Articles } from './Articles';

export const articlesObj = new Articles();

class ArticleRoutes {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
  }

  addArticle(req: express.Request, res: express.Response): void {
    const params  = { ... req.body.params };
    const added = articlesObj.addArticle(params);
    res.status(201).json({ data: added });
  }
  getArticles(req: express.Request, res: express.Response): void {
    const status  = req.query.status ;
    const articles = articlesObj.getArticlesByStatus(status);
    res.status(200).json({ data: articles });
  }

  placeBid(req: express.Request, res: express.Response): void {
    const params  = { ...req.body };
    const added = articlesObj.placeBid(params.bid);
    res.status(201).json({ data: added });
  }
  routes() {
    this.router.post('/', this.addArticle);
    this.router.post('/bid', this.placeBid);
    this.router.get('/', this.getArticles);
  }
}
const articleRoutes = new ArticleRoutes();
articleRoutes.routes();

export default articleRoutes.router;
