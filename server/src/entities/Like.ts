import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Idea } from "./Idea";

@ObjectType()
@Entity()
export class Like extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @Field()
  @PrimaryColumn()
  ideaId: number;

  @Field(() => Idea)
  @ManyToOne(() => Idea, (idea) => idea.likes)
  idea: Idea;
}
