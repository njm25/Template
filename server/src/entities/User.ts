import { Entity
    , PrimaryGeneratedColumn
    , Column
    , CreateDateColumn
    , UpdateDateColumn
} from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn({type: "int"})
    id: number;
    
    @Column({type: "varchar", length: 255, unique: true})
    email: string;

    @Column({type: "varchar", length: 25, unique: true})
    username: string;

    @Column({type: "varchar", length: 25})
    displayName: string;

    @Column({type: "varchar", length: 255})
    bio: string;

    @Column({type: "varchar", length: 255})
    passwordHash: string;

    @CreateDateColumn({type: "datetime"})
    createdAt: Date;

    @UpdateDateColumn({type: "datetime"})
    updatedAt: Date;
}