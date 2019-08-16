import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Avatar as AvatarType} from "@package/types";
import {date} from "@package/date";

@Entity({schema: "wow", name: "avatar"})
export class AvatarsEntity extends BaseEntity implements AvatarType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: "int"})
  public userId: number;

  @Column({type: "varchar"})
  public url: string;

  @Column({type: "varchar"})
  public description: string;

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
