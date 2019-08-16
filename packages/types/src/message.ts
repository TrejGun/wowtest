import {User} from "./user";

export interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  sender: User;
  recipient: User;
  text: string;
  createdAt: string;
  updatedAt: string;
}
