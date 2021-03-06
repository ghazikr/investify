import { Like } from "../entities/Like";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Idea } from "../entities/Idea";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
class PaginatedIdeas {
  @Field(() => [Idea])
  ideas: Idea[];
  @Field()
  hasMore: boolean;
}

@Resolver(Idea)
export class IdeaResolver {
  @FieldResolver(() => Int)
  async nbLikes(@Root() root: Idea) {
    return await Like.count({
      where: {
        ideaId: root.id,
      },
    });
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async likeStatus(
    @Root() root: Idea,
    @Ctx() { req }: MyContext
  ): Promise<boolean | null> {
    if (!req.session.userId) {
      return null;
    }

    const row = await Like.findOne({
      where: {
        userId: parseInt(req.session.userId),
        ideaId: root.id,
      },
    });

    if (!row) return false;
    return true;
  }

  @Mutation(() => Idea, { nullable: true })
  async createIdea(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("tldr") tldr: string,
    @Arg("cost") cost: number,
    @Ctx() { req }: MyContext
  ): Promise<Idea | null> {
    return Idea.create({
      title,
      description,
      cost,
      tldr,
      userId: req.session.userId,
    }).save();
  }

  @Query(() => Idea, { nullable: true })
  idea(@Arg("id", () => Int) id: number): Promise<Idea | undefined> {
    return Idea.findOne(id);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async like(
    @Arg("ideaId", () => Int) ideaId: number,
    @Ctx() { req }: MyContext
  ) {
    const row = await Like.findOne({
      where: {
        userId: req.session.userId,
        ideaId,
      },
    });

    if (!row) {
      await Like.insert({
        userId: req.session.userId,
        ideaId,
      });
    } else {
      await Like.delete({
        userId: req.session.userId,
        ideaId,
      });
    }
    return true;
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
     select i.*,
     json_build_object(
      'id', u.id,
      'username', u.username,
      'email',u.email,
      'createdAt', u."createdAt",
      'updatedAt', u."updatedAt"
      ) "user"
     from idea i
     inner join public.user u on u.id = i."userId"
     ${cursor ? `where i."createdAt" < $2` : ""}
     order by i."createdAt" DESC
     limit $1
     `,
      values
    );
    console.log(ideas);

    return {
      ideas: ideas.slice(0, currentLimit),
      hasMore: ideas.length === currentLimitPlusOne,
    };
  }
}
