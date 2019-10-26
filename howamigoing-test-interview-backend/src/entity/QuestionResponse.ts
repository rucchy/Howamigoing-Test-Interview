import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { Response } from "./Response";

@Entity()
export class QuestionResponse {
    @PrimaryGeneratedColumn()
    public questionResponse!: number;

    @Column({length: 300})
    answer: string;

    @ManyToOne(type => Question, question => question.questionResponse)
    public question!: Question;

    @ManyToOne(type => Response, response => response.questionResponse)
    public response!: Response;
}