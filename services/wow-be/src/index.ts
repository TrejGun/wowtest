import {NestFactory} from "@nestjs/core";
import {ApplicationModule} from "./app.module";
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const options = new DocumentBuilder()
    .setTitle("WOW test")
    .setDescription("API description")
    .setVersion("1.0")
    .addTag("wow")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
