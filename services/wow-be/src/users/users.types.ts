import {UserGender, UserRole} from "@package/types";

export interface CreateWatcherFields {
  email: string;
  password: string;
  confirm: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface CreateUserFields extends CreateWatcherFields {
  birthday: string;
  description: string;
  phone: string;
  gender: UserGender;
}
