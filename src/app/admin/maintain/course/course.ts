import { Topic } from "../topic/topic";

export class Course
{
    id:number;
    name:string;
    description:string;
    image:File;
    difficulty:number = 1;
    prerequisites:string;
    outcomes:string;
    syllabus:string;
    topics:Topic[] = [];
}
export class CourseInput{

    id:number;
    name:string;
    description:string;
    image:File;
    difficulty:number = 1;
    prerequisites:string;
    outcomes:string;
    syllabus:string;
}