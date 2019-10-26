import { Response } from "./Response";
import { Question } from "./Question";
export declare class Survey {
    id: number;
    url: string;
    responses: Response[];
    questions: Question[];
}
