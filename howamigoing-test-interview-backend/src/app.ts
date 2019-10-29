import * as express from "express";
import * as cors from "cors";
import * as bodyParser from  "body-parser";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import {Survey} from "./entity/Survey";
import {Answer} from "./entity/Answer";

// create typeorm connection
createConnection().then(connection => {
    const surveyRepository = connection.getRepository(Survey);
    const answerRepository = connection.getRepository(Answer);

    // create and setup express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // register routes
    app.get("/surveys",async function(req: Request, res: Response) {
        const surveys = await surveyRepository.find();
        res.json(surveys);
    });

    app.get("/survey/:id",async function(req: Request, res: Response) {
        const results = await surveyRepository.findOne(req.params.id,{relations: ["questions","answers"]});
        return res.send(results);
    });

    app.post("/surveyByURL",async function(req: Request, res: Response) {
        const results = await surveyRepository.findOne({where: { url: decodeURI(req.body.url)}, relations: ["questions"]});
        return res.send(results);
    });

    app.post("/surveyCreator",async function(req: Request, res: Response) {
        const exist = await surveyRepository.findOne({where: { url: decodeURI(req.body.url)}});
        if(!exist){
            const survey = await surveyRepository.create(req.body);
            const results = await surveyRepository.save(survey);
            return res.send(results);
        }
        return res.send({error:"Url exists"});
    });

    app.post("/answer/:id",async function(req: Request, res: Response) {
        const survey = await surveyRepository.findOne(req.params.id);
        if(survey){
            const answer = await answerRepository.create(req.body);
            const results = await answerRepository.save(answer);
            return res.send(results);
        }
        return res.send({error:"Survey don't exist"});
    });

    app.get("/answer/:id",async function(req: Request, res: Response) {
        const results = await connection.getRepository(Answer)
            .createQueryBuilder("answer")
            .select("survey.title as surveyTitle, survey.url as surveyURL, answer.email, question.type as questionType, question.text as question, questionanswer.textAnswer as answer")
            .innerJoin("answer.questionAnswer", "questionanswer")
            .innerJoin("questionanswer.question", "question")
            .innerJoin("answer.survey","survey")
            .where("answer.id = :id", {id: req.params.id})
            .getRawMany();
        if(results.length !== 0){
            return res.send(results);
        }
        return res.send(null);
    });

    // start express server
    app.listen(3001);
});