import express = require('express');
import bodyParser = require('body-parser');
import articlesRoutes, { articlesObj } from './articlesRoutes';
import { connections } from './connections';
import { notifyClients } from './eventManager';
import LoginRoutes from './loginRoutes';

class Server {
  public app: express.Application;
  public router: express.Router;
  constructor() {
    this.app = express();
    this.router = express.Router();
    this.config();
    this.routes();


  }
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

  }
  routes() {
    this.app.use((req: express.Request, res: express.Response, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
      if ('OPTIONS' === req.method) {
        res.sendStatus(200);
      } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
      }
    });
    this.app.use('/', this.router);
    this.app.use('/api/v1/auth', LoginRoutes);
    this.app.use('/api/v1/articles', articlesRoutes);
    this.app.use('/api/v1/data', (req, res) => {
        req.socket.setTimeout(50000000);
        res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
     });

      res.write('/n');
      connections.push(res);

      req.on('close', () => {
        let rem = 0;
        for (let i = 0; i < connections.length; i++) {
          if (connections[i] === res) {
            rem = i;
            break;
          }
        }
        connections.splice(rem, 1);

      });

     });

    setInterval(() => {
      const articles = articlesObj.getArticles();
      notifyClients('');
    }, 1000);

  }
}

export default new Server().app;
