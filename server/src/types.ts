import { Request, Response } from "express";
import Redis from "ioredis";

export interface MyContext {
  req: Request & {
    session: {
      userId?: any;
    };
  };
  res: Response;
  redis: Redis.Redis;
}
