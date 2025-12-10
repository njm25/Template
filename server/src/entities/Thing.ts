import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("things")
export class Thing {
    @PrimaryGeneratedColumn({type: "int"})
    id: number;

    @Column({type: "varchar", length: 255})
    name: string;

    @CreateDateColumn({type: "datetime"})
    createdAt: Date;
}