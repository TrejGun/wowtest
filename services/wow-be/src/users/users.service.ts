import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsersEntity} from "./users.entity";
import {createHash} from "crypto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  public findAll(): Promise<Array<UsersEntity>> {
    return this.usersRepository.find();
  }

  public findById(id: number): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({id});
  }

  public async getByCredentials(username: string, password: string) {
    return this.usersRepository.findOne({
      where: {
        email: username,
        password: this.createPasswordHash(password, username),
      },
    });
  }

  private createPasswordHash(password: string, salt: string) {
    return createHash("sha256")
      .update(password)
      .update(salt)
      .digest("hex");
  }
}
