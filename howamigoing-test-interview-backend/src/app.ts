import * as express from "express";
import * as bodyParser from  "body-parser";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import {Survey} from "./entity/Survey";
import {Answer} from "./entity/Answer";

// create typeorm connection
createConnection().then(connection => {
    const surveyRepository = connection.getRepository(Survey);
    const answerRepository = connection.getRepository(Answer);
    //const questionRepository = connection.getRepository(Question);
    // create and setup express app
    const app = express();
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
        const results = await answerRepository.findOne(req.params.id);
        return res.send(results);
    });

    // start express server
    app.listen(3000);
});