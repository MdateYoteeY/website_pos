export interface method {
  method: string;
  staff: Array<Staff>;
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
