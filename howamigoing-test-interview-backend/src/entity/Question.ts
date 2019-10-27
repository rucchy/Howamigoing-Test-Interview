import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Survey} from "./Survey";
import {QuestionAnswer} from "./QuestionAnswer";

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

    @ManyToMany(type => Survey, survey => survey.questions)
    @JoinTable()
    surveys: Survey[];

    @OneToMany(type => QuestionAnswer, questionAnswer => questionAnswer.question)
    questionAnswer: QuestionAnswer[];
}