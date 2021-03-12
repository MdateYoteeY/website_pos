interface RootObject {
  stock: Stock;
}

export interface Stock {
  stoct_list: Stoctlist[];
}

interface Stoctlist {
  product_id: number;
  list_amount: number;
  price: number;
}

export interface Stocks {
  id: number;
  amount_all: number;
  price_all: number;
  stock_date: string;
  created_at: string;
  updated_at: string;
  items?: any;
}

