import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Field, Float, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Idea extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => Float)
  @Column()
  cost!: number;

  @Field()
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.ideas)
  user: User;

  @Field(() => String)
  @UpdateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  updatedAt: Date;
}
