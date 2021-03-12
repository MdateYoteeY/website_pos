export interface Orders {
  id: number;
  method?: string;
  table_id: number;
  receipt_id: number;
  status_order_id: number;
  store_id: number;
  user_id: number;
  order_number: string;
  order_list?: any;
  order_amount?: any;
  created_at: string;
  updated_at: string;
  table: string;
  status: string;
  staff: string;
  zone: string;
  store: Store;
  product_item: Productitem[];
  promotion_item: Promotionitem[];
  receipt: Receipt;
}

export interface Receipt {
  id: number;
  receipt_number: string;
  phone_number: string;
  vat: number;
  discount?: any;
  price_all?: any;
  cash?: any;
  change?: any;
  created_at: string;
  updated_at: string;
}

export interface Productitem {
  id: number;
  order_id: number;
  product_id: number;
  order_amount: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  name: string;
  price: number;
}
export interface Promotionitem {
  id: number;
  order_id: number;
  promotion_amount: number;
  promotion_id: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  name: string;
  price: number;
}
export interface Store {
  id: number;
  name: string;
  branch: string;
  address: string;
  created_at: string;
  updated_at: string;
}
