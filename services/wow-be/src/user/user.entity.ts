import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRole, UserStatus, User as UserType} from "@package/types";
import {date} from "@package/date";

@Entity({schema: "wow"})
export class User extends BaseEntity implements UserType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: "varchar"})
  public email: string;

  @Column({type: "varchar", select: false})
  public password: string;

  @Column({type: "varchar"})
  public firstName: string;

  @Column({type: "varchar"})
  public lastName: string;

  @Column({type: "varchar"})
  public phone: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  public role: UserRole;

  @Column({
    type: "enum",
    enum: UserStatus,
  })
  public status: UserStatus;

  @Column({type: "timestamptz"})
  public timeCreatedAt: string;

  @Column({type: "timestamptz"})
  public timeUpdatedAt: string;

  @BeforeInsert()
  public beforeInsert() {
    this.timeCreatedAt = date.toISOString();
    this.timeUpdatedAt = date.toISOString();
  }

  @BeforeUpdate()
  public beforeUpdate() {
    this.timeUpdatedAt = date.toISOString();
  }
}
