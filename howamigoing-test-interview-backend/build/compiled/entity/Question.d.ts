import { Survey } from "./Survey";
import { QuestionResponse } from "./QuestionResponse";
export declare enum Types {
    TEXT = "Text",
    LIKERT = "Likert"
}
export declare class Question {
    id: number;
    type: Types;
    text: string;
    surveys: Survey[];
    questionResponse: QuestionResponse[];
}
