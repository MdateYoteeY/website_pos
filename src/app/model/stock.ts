export interface StockList {
  id: number;
  amount_all: number;
  price_all: number;
  stock_date: string;
  created_at: string;
  updated_at: string;
  Item: Item[];
}

interface Item {
  id: number;
  name: string;
  product_id: number;
  stock_id: number;
  list_amount: number;
  price: number;
  price_amount: number;
  created_at: string;
  updated_at: string;
}
interface RootObject {
  stock: StockProduct;
}

 interface StockProduct {
  stock_list: stocklistproduct[];
}
export interface stocklistproduct {
  product_id: number;
  list_amount: number;
  price: number;
}
