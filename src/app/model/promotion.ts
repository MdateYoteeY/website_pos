export interface PromotionList {
  promotion: Promotion;
  item: Item[];
}

interface Item {
  id: number;
  promotion_id: number;
  product_id: number;
  promotion_item_amount: number;
  promotion_item_price: number;
  created_at: string;
  updated_at: string;
  product: string;
  promotion: string;
}

export interface Promotion {
  id: number;
  status_promotion_id: number;
  promotion_name: string;
  promotion_discount: number;
  date_start: string;
  date_end: string;
  created_at: string;
  updated_at: string;
  image: string;
  status: string;
  price: number;
}
export interface promotionitem {
  id: number;
  status_promotion_id: number;
  promotion_name: string;
  promotion_discount: number;
  date_start: string;
  date_end: string;
  created_at: string;
  updated_at: string;
  image: string;
  status: string;
  price: number;
  promotion_items: Promotionitem[];
}

export interface Promotionitem {
  id: number;
  promotion_id: number;
  product_id: number;
  promotion_item_amount: number;
  promotion_item_price: number;
  created_at: string;
  updated_at: string;
  product: string;
  promotion: string;
}
