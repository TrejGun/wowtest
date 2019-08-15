import {TypeOrmModule} from "@nestjs/typeorm";
import {Test, TestingModule} from "@nestjs/testing";
import {AvatarsService} from "./avatars.service";
import {AvatarsEntity} from "./avatars.entity";
import * as ormconfig from "../ormconfig";

describe("UsersService", () => {
  let service: AvatarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([AvatarsEntity])],
      providers: [AvatarsService],
    }).compile();

    service = module.get<AvatarsService>(AvatarsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
