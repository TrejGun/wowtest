import {Avatar} from "../";

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
}

export enum UserRole {
  Influencer = "influencer",
  Marketer = "marketer",
  Watcher = "watcher",
}

export enum UserGender {
  Male = "male",
  Female = "female",
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
  parentId: number | null;
  gender: UserGender;
  role: UserRole;
  status: UserStatus;
  avatar: Avatar;
  createdAt: string;
  updatedAt: string;
}
