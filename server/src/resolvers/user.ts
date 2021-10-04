import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";

@Resolver()
export class UserResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email, password } });
    if (!user) return null;
    return user;
  }
}
