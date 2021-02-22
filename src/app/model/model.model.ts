import { StatusTables } from './table.model';
import { Tables } from 'src/app/model/table.model';
import { Zones } from './zone.model';

export interface method {
  method?: string;
  staff?: Array<Staff>;
  user?: Users;
  zone?: Zones;
  table?: Tables;
  tableStatus?: StatusTables;
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
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}

interface Error {
  errors: string[];
}

interface Headers {
  normalizedNames: NormalizedNames;
  lazyUpdate?: any;
}

interface NormalizedNames {}
