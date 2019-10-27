import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import {Survey} from "./Survey";
import {QuestionAnswer} from "./QuestionAnswer";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    email: string;

    @ManyToOne(type => Survey, survey => survey.answers)
    survey: Survey;

    @OneToMany(type => QuestionAnswer, questionAnswer => questionAnswer.answer,{
        cascade: ["insert"]
    })
    questionAnswer: QuestionAnswer[];
}