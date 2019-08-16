import * as AWS from "aws-sdk";
import * as util from "util";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AvatarsEntity} from "./avatars.entity";
import {File} from "../users/users.utils";

@Injectable()
export class AvatarsService {
  // TODO use image_upload  service
  // https://github.com/shamnadps/Image_upload_typescript/blob/master/src/image_upload/image_upload.service.ts
  constructor(
    @InjectRepository(AvatarsEntity)
    private readonly avatarsRepository: Repository<AvatarsEntity>,
  ) {}

  public async update(id: number, file: File, data: any): Promise<AvatarsEntity> {
    const url = await this.uploadImage(file);
    let avatar = await this.avatarsRepository.findOne({where: {userId: id}});
    if (avatar) {
      await this.deleteImage(avatar.url);
      avatar.url = url;
    } else {
      avatar = this.avatarsRepository.create({
        userId: id,
        url,
        description: data.description,
      });
    }
    return avatar.save();
  }

  public async delete(id: number): Promise<AvatarsEntity | undefined> {
    const avatar = await this.avatarsRepository.findOne({where: {userId: id}});
    if (!avatar) {
      return;
    }
    await this.deleteImage(avatar.url);
    return avatar.remove();
  }

  private async deleteImage(name: string) {
    try {
      const client = new AWS.S3();
      // @ts-ignore https://github.com/microsoft/TypeScript/issues/26048
      await util.promisify(client.deleteObject.bind(client))({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: name,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw new Error(`Failed to delete image ${err}`);
    }
  }

  private async uploadImage(file: File) {
    try {
      const client = new AWS.S3();
      const name = `avatars/${Date.now()}.${file.mimetype.split("/")[1]}`;
      // @ts-ignore https://github.com/microsoft/TypeScript/issues/26048
      await util.promisify(client.putObject.bind(client))({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: name,
        ContentType: file.mimetype,
        ContentEncoding: file.encoding,
        Body: file.buffer,
      });
      return name;
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to upload image ${err}`);
    }
  }
}
