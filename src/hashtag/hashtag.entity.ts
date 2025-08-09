import { Tweets } from "src/tweets/tweets.entity";
import { Column, Entity, PrimaryGeneratedColumn , ManyToMany, DeleteDateColumn} from "typeorm";

@Entity()
export class Hashtag{
    @PrimaryGeneratedColumn()
   id: number;

   @Column({
    type: 'text',
    nullable: false,
    unique: true
   })
   name: string;

   @DeleteDateColumn()
    deletedAt: Date;

   @ManyToMany(() => Tweets, (tweet) => tweet.hashtag, 
   {
    onDelete: 'CASCADE',
   })
   tweets: Tweets[];
}