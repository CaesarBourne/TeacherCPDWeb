import { QuestionOption } from "./QuestionOption";

export class Question
{

    id:number;
    name:string;
    question:string;
    index:number;
    assessment_id:number;
    answer:number;
    options:QuestionOption[] = [];

}