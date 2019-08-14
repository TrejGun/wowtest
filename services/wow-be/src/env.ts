import {config} from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV}`,
  debug: process.env.DEBUG as any,
});
