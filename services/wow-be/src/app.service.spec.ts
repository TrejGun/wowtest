import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import * as ormconfig from "./ormconfig";

describe.only("AppService", () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, UsersModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe("app service", () => {
    it("should return 'Hello World!'", () => {
      expect(appService.getHello()).toBe("Hello World!");
    });
  });
});
