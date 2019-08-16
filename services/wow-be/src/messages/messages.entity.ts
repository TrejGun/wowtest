import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Message as MessageType} from "@package/types";
import {date} from "@package/date";

@Entity({schema: "wow", name: "message"})
export class MessagesEntity extends BaseEntity implements MessageType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: "int"})
  public senderId: number;

  @Column({type: "int"})
  public recipientId: number;

  @Column({type: "varchar"})
  public text: string;

  @Column({type: "timestamptz"})
  public createdAt: string;

  @Column({type: "timestamptz"})
  public updatedAt: string;

  @BeforeInsert()
  public beforeInsert() {
    this.createdAt = date.toISOString();
    this.updatedAt = date.toISOString();
  }

  @BeforeUpdate()
  public beforeUpdate() {
    this.updatedAt = date.toISOString();
  }
}
