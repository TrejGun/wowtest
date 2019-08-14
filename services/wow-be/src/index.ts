import {NestFactory} from "@nestjs/core";
import {ApplicationModule} from "./app.module";

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
  await app.listen(process.env.PORT);
}

bootstrap();
