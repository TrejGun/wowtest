import {INestApplication} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRole, UserGender} from "@package/types";
import * as request from "supertest";
import * as faker from "faker";
import {UsersModule} from "../../src/users/users.module";
import {AvatarsModule} from "../../src/avatars/avatars.module";
import * as ormconfig from "../../src/ormconfig";

describe("Users", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), UsersModule, AvatarsModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe("POST /users", () => {
    it(`creates user`, async () => {
      await request(app.getHttpServer())
        .post("/users")
        .send({
          email: faker.internet.email(),
          password: faker.internet.password(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          role: UserRole.Influencer,
          birthday: faker.date
            .past(10, "2010-01-01")
            .toISOString()
            .split("T")[0],
          gender: faker.random.arrayElement(Object.values(UserGender)),
        })
        .expect(({status}) => {
          expect(status).toEqual(201);
        });
    });

    it(`validation fails`, async () => {
      await request(app.getHttpServer())
        .post("/users")
        .send({})
        .expect(({status}) => {
          expect(status).toEqual(400);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
