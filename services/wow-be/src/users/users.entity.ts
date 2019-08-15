import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRole, UserStatus, User as UserType} from "@package/types";
import {date} from "@package/date";

@Entity({schema: "wow", name: "user"})
export class UsersEntity extends BaseEntity implements UserType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: "varchar"})
  public email: string;

  @Column({type: "varchar", select: false})
  public password: string;

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
