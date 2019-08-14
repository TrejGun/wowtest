export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum UserRole {
  Guest = "guest",
  Admin = "admin",
  System = "system",
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  timeCreatedAt: string;
  timeUpdatedAt: string;
}
