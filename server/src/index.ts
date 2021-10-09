import "reflect-metadata";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { TestResolver } from "./resolvers/test";
import { createConnection } from "typeorm";
import path from "path";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { MyContext } from "./types";
import { Idea } from "./entities/Idea";
import { IdeaResolver } from "./resolvers/idea";

const RedisStore = connectRedis(session);
const redis = new Redis();

const main = async () => {
  const app = express();

  const connection = await createConnection({
    type: "postgres",
    database: "investify",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Idea],
  });
  await connection.runMigrations();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: false, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "dfhjezof58ezhe",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResolver, UserResolver, IdeaResolver],
      validate: false,
    }),
    context: ({ req, res }: MyContext) => ({ req, redis, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main().catch((err) => console.error(err));
