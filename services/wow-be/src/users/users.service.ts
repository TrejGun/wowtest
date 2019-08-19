import {createHash} from "crypto";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserStatus} from "@package/types";
import {UsersEntity} from "./users.entity";
import {CreateUserFields, CreateWatcherFields} from "./users.types";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  public findAll(): Promise<Array<UsersEntity>> {
    return this.usersRepository.find({relations: ["avatar"]});
  }

  public findById(id: number): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({id}, {relations: ["avatar"]});
  }

  public async getByCredentials(email: string, password: string) {
    return this.usersRepository.findOne({
      where: {
        email,
        password: this.createPasswordHash(password, email),
      },
    });
  }

  public async create(data: CreateUserFields | CreateWatcherFields, parentId: number | null): Promise<UsersEntity> {
    data.password = this.createPasswordHash(data.password, data.email);
    const user = await this.usersRepository
      .create({
        ...data,
        status: UserStatus.Pending,
        parentId,
      })
      .save();
    delete user.password;
    return user;
  }

  public delete(id: number, parentId: number) {
    return this.usersRepository.delete({id, parentId});
  }

  private createPasswordHash(password: string, salt: string): string {
    return createHash("sha256")
      .update(password)
      .update(salt)
      .digest("hex");
  }
}
