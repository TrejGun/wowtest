import {Test, TestingModule} from "@nestjs/testing";
import {UsersService} from "./users.service";
import {UsersEntity} from "./users.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as ormconfig from "../ormconfig";

export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([UsersEntity])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
