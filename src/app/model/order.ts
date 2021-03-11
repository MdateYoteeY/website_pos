export interface Orders {
  id: number;
  method?: string;
  table_id: number;
  receipt_id: number;
  status_order_id: number;
  store_id: number;
  user_id: number;
  order_number: string;
  order_list: number
  order_amount: number
  created_at: Date;
  updated_at: Date;
  table: string;
  status: string;
  staff: string;
  zone: string;
  store: string;
  product_item: ProductItem[];
  promotion_item: PromotionItem[];
  receipt: string;
}

 export interface ProductItem {
  id: number;
  order_id: number;
  product_id: number;
  order_amount: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  price: number;
}

export interface PromotionItem {
  id: number;
  promotion_id: number;
  order_id: number;
  promotion_amount: number;
  Total_price: number;
  created_at: Date;
  updated_at: Date;
  name: string;
}



