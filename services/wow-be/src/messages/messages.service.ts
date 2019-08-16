import {Repository} from "typeorm";
import {Injectable, ForbiddenException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MessagesEntity} from "./messages.entity";
import {UserRole} from "@package/types";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>,
  ) {}

  public findAll(senderId: number, recipientId: number): Promise<Array<MessagesEntity>> {
    return this.messageRepository.find({senderId, recipientId});
  }

  public async create(senderId: number, recipientId: number, data: any, role: UserRole): Promise<MessagesEntity> {
    const count = this.count(senderId, recipientId);
    if (!count && role === UserRole.Influencer) {
      throw new ForbiddenException("you can't start conversation");
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
