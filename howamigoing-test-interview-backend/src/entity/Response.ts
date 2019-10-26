import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import {Survey} from "./Survey";
import {QuestionResponse} from "./QuestionResponse";

@Entity()
export class Response {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    email: string;

    @ManyToOne(type => Survey, survey => survey.responses)
    survey: Survey;

    @OneToMany(type => QuestionResponse, questionResponse => questionResponse.response)
    questionResponse: QuestionResponse[];
}