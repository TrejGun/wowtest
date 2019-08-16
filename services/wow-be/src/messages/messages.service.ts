import {Repository} from "typeorm";
import {Injectable, ForbiddenException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MessagesEntity} from "./messages.entity";
import {UserRole} from "@package/types";
import {UsersService} from "../users/users.service";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>,
    private readonly usersService: UsersService,
  ) {}

  public findAll(senderId: number, recipientId: number): Promise<Array<MessagesEntity>> {
    return this.messageRepository.find({senderId, recipientId});
  }

  public findOne(senderId: number, id: number): Promise<MessagesEntity | undefined> {
    return this.messageRepository.findOne({where: {id, senderId}, relations: ["sender", "recipient"]});
  }

  public async create(senderId: number, recipientId: number, data: any, role: UserRole): Promise<MessagesEntity> {
    if (senderId === recipientId) {
      throw new ForbiddenException("you can't send message to yourself");
    }

    const recipient = await this.usersService.findById(recipientId);
    if (!recipient) {
      throw new ForbiddenException("recipient not found");
    }
    if (recipient.role === UserRole.Marketer) {
      throw new ForbiddenException("you can't start conversation"); // with another marketer, just in case
    }

    const count = this.count(senderId, recipientId);
    if (!count && role === UserRole.Influencer) {
      throw new ForbiddenException("you can't start conversation"); // because you are an influencer
    }

    return this.messageRepository
      .create({
        senderId,
        recipientId,
        text: data.text,
      })
      .save();
  }

  public async update(senderId: number, id: number, data: any) {
    const message = await this.messageRepository.findOne({senderId, id});
    if (!message) {
      return;
    }
    message.text = data.text;
    return message.save();
  }

  public delete(senderId: number, id: number) {
    return this.messageRepository.delete({id, senderId});
  }

  public deleteDialog(senderId: number, recipientId: number) {
    return this.messageRepository.delete({senderId, recipientId});
  }

  public count(senderId: number, recipientId: number) {
    return this.messageRepository.count({senderId, recipientId});
  }
}
