export interface Products {
  id: number;
  status_product_id: number;
  type_id: number;
  product_name: string;
  product_price: number;
  product_amount: number;
  created_at: string;
  updated_at: string;
  category_id: number;
  image: string;
  status: string;
  type: string;
}
export interface StatusProducts {
  id: number;
  product_status: string;
  created_at: string;
  updated_at: string;
}
