
import express = require('express');
import { Authenticate } from './Authenticate';

export const auth = new Authenticate();

class LoginRoutes {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
  }

  getAuthToken(req: express.Request, res: express.Response): void {
    const params  = { ... req.body.params };
    const token = auth.login(params);
    res.status(200).json({ data: token });
  }
  routes() {
    this.router.post('/', this.getAuthToken);
  }
}
const loginRoutes = new LoginRoutes();
loginRoutes.routes();

export default loginRoutes.router;

