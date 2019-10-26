import { Survey } from "./Survey";
import { QuestionResponse } from "./QuestionResponse";
export declare class Response {
    id: number;
    email: string;
    survey: Survey;
    questionResponse: QuestionResponse[];
}
