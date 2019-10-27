import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany} from "typeorm";
import {Answer} from "./Answer";
import {Question} from "./Question";

@Entity()
export class Survey {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @OneToMany(type => Answer, answer => answer.survey)
    answers: Answer[];

    @ManyToMany(type => Question, question => question.surveys, {
        cascade: ["insert"]
    })
    questions: Question[];

}