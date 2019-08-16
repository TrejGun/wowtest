import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import {User as UserType, UserGender, UserRole, UserStatus} from "@package/types";
import {date} from "@package/date";
import {AvatarsEntity} from "../avatars/avatars.entity";

@Entity({schema: "wow", name: "user"})
export class UsersEntity extends BaseEntity implements UserType {
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

  @Column({type: "date"})
  public birthday: string;

  @Column({type: "date"})
  public description: string;

  @Column({type: "date"})
  public phone: string;

  @Column({type: "int"})
  public parentId: number | null;

  @Column({
    type: "enum",
    enum: UserGender,
  })
  public gender: UserGender;

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

  @OneToOne(() => AvatarsEntity, avatar => avatar.userId)
  @JoinColumn({name: "id"})
  public avatar: AvatarsEntity;

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
