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
    entities: [User],
  });
  await connection.runMigrations();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResolver, UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main().catch((err) => console.error(err));
