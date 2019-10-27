import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { Answer } from "./Answer";

@Entity()
export class QuestionAnswer {
    @PrimaryGeneratedColumn()
    public questionResponse!: number;

    @Column({length: 300})
    textAnswer: string;

    @ManyToOne(type => Question, question => question.questionAnswer)
    public question!: Question;

    @ManyToOne(type => Answer, answer => answer.questionAnswer)
    public answer!: Answer;
}