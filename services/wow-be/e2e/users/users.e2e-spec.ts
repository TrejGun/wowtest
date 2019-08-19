import {INestApplication, ValidationPipe} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserGender, UserRole} from "@package/types";
import * as request from "supertest";
import * as faker from "faker";
import {UsersModule} from "../../src/users/users.module";
import {AvatarsModule} from "../../src/avatars/avatars.module";
import * as ormconfig from "../../src/ormconfig";

function createFakeUser() {
  const _password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: _password,
    confirm: _password,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    role: UserRole.Influencer,
    birthday: faker.date
      .past(10, "2010-01-01")
      .toISOString()
      .split("T")[0],
    gender: faker.random.arrayElement(Object.values(UserGender)),
  };
}

describe("Users", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), UsersModule, AvatarsModule],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
      }),
    );

    await app.init();
  });

  describe("POST /users", () => {
    describe("Passes", () => {
      it(`creates user`, async () => {
        const data = createFakeUser();
        await request(app.getHttpServer())
          .post("/users")
          .send(data)
          .expect(({status}) => {
            expect(status).toEqual(201);
          });
      });
    });
    describe("Fails", () => {
      it(`validation fails firstName/valueMissing`, async () => {
        const data = createFakeUser();
        delete data.firstName;
        await request(app.getHttpServer())
          .post("/users")
          .send(data)
          .expect(({status, body}) => {
            expect(status).toEqual(400);
            expect(body.message[0]).toMatchObject({
              property: "firstName",
              constraints: {
                ValidateString: "valueMissing",
              },
            });
          });
      });

      it(`validation fails password/badInput`, async () => {
        const data = createFakeUser();
        data.password = "123456";
        await request(app.getHttpServer())
          .post("/users")
          .send(data)
          .expect(({status, body}) => {
            expect(status).toEqual(400);
            expect(body.message[0]).toMatchObject({
              property: "password",
              constraints: {
                ValidatePassword: "badInput",
              },
            });
          });
      });

      it(`validation fails confirm/badInput`, async () => {
        const data = createFakeUser();
        data.confirm = "123456";
        await request(app.getHttpServer())
          .post("/users")
          .send(data)
          .expect(({status, body}) => {
            expect(status).toEqual(400);
            expect(body.message[0]).toMatchObject({
              property: "confirm",
              constraints: {
                ValidateConfirm: "badInput",
              },
            });
          });
      });

      it(`validation fails confirm/badInput`, async () => {
        const data = createFakeUser();
        data.confirm = "123456";
        await request(app.getHttpServer())
          .post("/users")
          .send(data)
          .expect(({status, body}) => {
            expect(status).toEqual(400);
            expect(body.message[0]).toMatchObject({
              property: "confirm",
              constraints: {
                ValidateConfirm: "badInput",
              },
            });
          });
      });
    });

    describe("Intersection", () => {
      it(`validation fails birthday/valueMissing (Influencer)`, async () => {
        const data = createFakeUser();
        delete data.birthday;
        await request(app.getHttpServer())
          .post("/users")
          .send(data)
          .expect(({status, body}) => {
            expect(status).toEqual(400);
            expect(body.message[0]).toMatchObject({
              property: "birthday",
              constraints: {
                ValidateString: "valueMissing",
              },
            });
          });
      });

      it(`validation passes birthday/valueMissing (Marketer)`, async () => {
        const data = createFakeUser();
        data.role = UserRole.Marketer;
        delete data.birthday;
        await request(app.getHttpServer())
          .post("/users")
          .send(data)
          .expect(({status, body}) => {
            delete data.password;
            delete data.confirm;
            expect(status).toEqual(201);
            expect(body).toMatchObject(data);
          });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
