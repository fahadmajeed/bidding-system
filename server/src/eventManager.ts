
const EventEmitter = require('events').EventEmitter;
export const pubsub = new EventEmitter();
import { connections } from './connections';


pubsub.on('articleAdded', msg => {
  notifyClients(msg);
});

pubsub.on('bidPlaced', msg => {
  notifyClients(msg);
});

pubsub.on('articleEnded', msg => {
  notifyClients(msg);
});
pubsub.on('articlePriceDown', msg => {
  notifyClients(msg);
});
export function notifyClients(msg: any) {

  connections.forEach(res => {
    res.write(`data:${msg}\n\n`);
  });

}
