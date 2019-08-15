export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum UserRole {
  Guest = "influencer",
  Admin = "marketer",
  System = "watcher",
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
