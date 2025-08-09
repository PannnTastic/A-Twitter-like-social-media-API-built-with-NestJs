import { Hashtag } from "src/hashtag/hashtag.entity";
import { User } from "src/users/Entity/user.entity";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Tweets{
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
    type:'text',
    nullable: false
   })
   text: string;

   @Column({
    type: 'text',
    nullable: true
   })
   image?: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @ManyToOne(() => User, (user) => user.tweets,  {eager: true})
   user: User;

   @ManyToMany(() => Hashtag, (hashtag) => hashtag.tweets, {eager: true} )
   @JoinTable()
   hashtag: Hashtag[];
}