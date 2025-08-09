import { User } from "src/users/Entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile{
   @PrimaryGeneratedColumn()
   id: number;

    @Column({ 
        type: 'varchar', 
        length: 100,
        nullable: true,
     })
    name?: string;

    @Column({ nullable: true })
    gender?: string;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    dateOfBirth?: Date;

    @Column({ nullable: true })
    bio?: string;

    @Column({ type: 'text',nullable: true })
    profileImage?: string;

    @OneToOne(() => User, (user) => user.profile, {
         onDelete: 'CASCADE',
        })
    @JoinColumn()
    user: User;
}