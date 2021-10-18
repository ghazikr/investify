import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Idea } from "../entities/Idea";

@ObjectType()
class PaginatedIdeas {
  @Field(() => [Idea])
  ideas: Idea[];
  @Field()
  hasMore: boolean;
}

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

  @Query(() => PaginatedIdeas)
  async ideas(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedIdeas> {
    const currentLimit = Math.min(50, limit);
    const currentLimitPlusOne = currentLimit + 1;

    const values: any[] = [currentLimitPlusOne];

    if (cursor) values.push(new Date(parseInt(cursor)));

    const ideas = await getConnection().query(
      `
     select i.*
     from idea i
     ${cursor ? `where i."createdAt" < $2` : ""}
     order by i."createdAt" DESC
     limit $1
     `,
      values
    );

    return {
      ideas: ideas.slice(0, currentLimit),
      hasMore: ideas.length === currentLimitPlusOne,
    };
  }
}
