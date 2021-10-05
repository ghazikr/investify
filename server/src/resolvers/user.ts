import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { UserInput } from "./UserInput";

@Resolver()
export class UserResolver {
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("options") { username, password, email }: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<User | null> {
    const hashedPassword = await argon2.hash(password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username,
          email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (error) {
      if (error.code === "23505") {
        // duplicate username error
        return null;
      }
    }
    req.session.userId = user.id;
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      return null;
    }

    req.session.userId = user.id;
    return user;
  }
}
