export interface Table {
  id: number;
  status_table_id: number;
  zone_id: number;
  table_number: string;
  seat_amount: number;
  created_at: string;
  updated_at: string;
  zone: string;
  status: string;
}

export interface Zone {
  id: number;
  name_zone: string;
  created_at: string;
  updated_at: string;
}
