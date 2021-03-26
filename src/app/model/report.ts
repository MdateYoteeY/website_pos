export interface Reports {
  order: Order[];
  person: Person[];
  sale: Sale[];
  product: Product[];
}

interface Product {
  name: string;
  amount: number;
}

interface Sale {
  price_all: number;
  price: number;
  discount: number;
  vat: number;
}

interface Person {
  people_amount: number;
}

interface Order {
  receipt_status: string;
  order_amount: number;
}
