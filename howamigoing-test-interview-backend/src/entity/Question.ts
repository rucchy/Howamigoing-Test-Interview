import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Survey} from "./Survey";
import {QuestionResponse} from "./QuestionResponse";

export enum Types {
    TEXT = "Text",
    LIKERT = "Likert"
}

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: Types,
        default: Types.TEXT
    })
    type: Types

    @Column("text")
    text: string;

    @ManyToMany(type => Survey)
    @JoinTable()
    surveys: Survey[];

    @OneToMany(type => QuestionResponse, questionResponse => questionResponse.question)
    questionResponse: QuestionResponse[];
}