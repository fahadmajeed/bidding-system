
export interface Bid {
  user: number;
  value: number;
  bidTime: Date;
  status: string;
}

export interface Article {
  id: number;
  title: string;
  price: number;
  startPrice: number;
  created: Date;
  status: string;
  bids: Bid[];
}
