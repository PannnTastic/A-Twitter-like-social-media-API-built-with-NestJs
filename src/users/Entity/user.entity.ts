import { Profile } from "src/profile/profile.entity";
import { Tweets } from "src/tweets/tweets.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Profile , (profile) => profile.user , {
        eager: true,
        cascade: ['insert', 'remove']
    })
    profile?: Profile;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Tweets, (tweet) => tweet.user)
    tweets: Tweets[] ;
   
}