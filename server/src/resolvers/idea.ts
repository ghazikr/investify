import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Idea } from "../entities/Idea";

@Resolver()
export class IdeaResolver {
  @Mutation(() => Idea, { nullable: true })
  async createIdea(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("cost") cost: number,
    @Ctx() { req }: MyContext
  ): Promise<Idea | null> {
    return Idea.create({
      title,
      description,
      cost,
      userId: req.session.userId,
    }).save();
  }
}
