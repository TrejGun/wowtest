import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly photoRepository: Repository<User>,
  ) {}

  public findAll(): Promise<Array<User>> {
    return this.photoRepository.find();
  }
}
