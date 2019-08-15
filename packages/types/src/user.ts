export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum UserRole {
  Guest = "influencer",
  Admin = "marketer",
  System = "watcher",
}

export enum UserGender {
  Male = "Male",
  Female = "Female",
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phone: string;
  description: string;
  gender: UserGender;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
