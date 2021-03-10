export interface PromotionItems {
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
interface RootObject {
  promotion: Promotions;
}

export interface Promotions {
  promotion_name: string;
  promotion_discount: number;
  date_start: string;
  date_end: string;
  promotion_item: Promotionitem[];
}

interface Promotionitem {
  product_id: number;
}
