export class Topic
{
    id:number;
    name:string;
    video?:string;
    notes:string;
    index:string;
    course_id:string;
}

export class TopicInput
{
    id:number;
    name:string;
    video:File = null;
    notes:string;
    index:string;
    course_id:string;
}