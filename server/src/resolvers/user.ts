import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";
import { v4 } from "uuid";
import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { UserInput } from "./UserInput";
import { sendEmail } from "../utils/sendEmail";

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

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      //email not in db
      return true;
    }
    console.log("jjj", redis);

    const token = v4();
    await redis.set(
      "forget-password" + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 // 1 day
    );

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    );

    return true;
  }

  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<User | null> {
    if (newPassword.length < 3) {
      return null;
    }
    const key = "forget-password" + token;
    const userId = await redis.get(key);

    if (!userId) {
      return null;
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await User.update(
      { id: userIdNum },
      { password: await argon2.hash(newPassword) }
    );

    req.session.userId = userId;
    redis.del(key);

    return user;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          resolve(false);
          // return;
        }
        resolve(true);
      })
    );
  }
}
