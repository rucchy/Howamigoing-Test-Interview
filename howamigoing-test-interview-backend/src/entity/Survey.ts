import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany} from "typeorm";
import {Response} from "./Response";
import {Question} from "./Question";

@Entity()
export class Survey {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @OneToMany(type => Response, response => response.survey)
    responses: Response[];

    @ManyToMany(type => Question, question => question.surveys)
    questions: Question[];

}