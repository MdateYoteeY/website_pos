import { Orders} from 'src/app/model/order';
import { Productitem, } from './order';
import { Types } from './type';
import { Promotion, PromotionList } from './promotion';
import { StockList, stocklistproduct } from './stock';
import { Categorys } from './category';
import { StatusTables } from './table.model';
import { Tables } from 'src/app/model/table.model';
import { Zones } from './zone.model';
import { StatusProducts } from './status';
import { Stock, Stocks } from './stockproduct';
import { Products } from './product';
import { PromotionItems } from './promotionitem';

export interface method {
  stock?: Stocks;
  product?: Products;
  category: Categorys;
  method?: string;
  staff?: Array<Staff>;
  user?: Users;
  zone?: Zones;
  table?: Tables;
  tableStatus?: StatusTables;
  Category?: Categorys;
  statusproduct?: StatusProducts;
  stocklist?: StockList;
  promotion?: Promotion;
  promotionlist?: PromotionList;
  type?: Types;
  stocklistproduct?: stocklistproduct;
  addstock?: Stock;
  productitem?: Productitem;
  promotionitem?: PromotionItems;
  order?: Orders;

}

export interface Users {
  id: number;
  staff_id: number;
  firstname: string;
  lastname: string;
  phone_number: string;
  username: string;
  password_digest: string;
  created_at: string;
  updated_at: string;
  status: string;
  image: string;
}

export interface UserLogin {
  token: string;
  exp: string;
  data_user: Datauser;
}

interface Datauser {
  id: number;
  staff_id: number;
  firstname: string;
  lastname: string;
  phone_number: string;
  username: string;
  password_digest: string;
  created_at: string;
  updated_at: string;
  status: string;
  image: string;
}

export interface Staff {
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ErrorResponse {
  password: string[];
  username: string[];
}
