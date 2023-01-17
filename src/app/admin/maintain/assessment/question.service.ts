import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConsts } from 'src/shared/AppConsts';
import { Question } from 'src/app/admin/maintain/assessment/Question';


@Injectable()
export class QuestionService {


    private apiBaseUrl = AppConsts.apiBaseUrl;

    constructor(private httpClient: HttpClient) { }

    getQuestions(assessment_id):Observable<Question[]>
    {
        let url = this.apiBaseUrl + "/assessment/"+assessment_id+"/questions";

        return this.httpClient.get<Question[]>(url);

    }

    addQuestion(assessment_id,question:Question)
    {
        let url = this.apiBaseUrl + "/assessment/"+assessment_id +"/question";

        let _content = JSON.stringify(question);
       
        return this.httpClient.post<string>(url,_content);
    }

    getQuestion(assessment_id,id): Observable<Question>
    {
        let url = this.apiBaseUrl + "/assessment/"+assessment_id+"/question"+id;
    
        return this.httpClient.get<Question>(url);

    }
    updateQuestion(assessment_id,Question:Question)
    {
        let url = this.apiBaseUrl + "/assessment/"+assessment_id+"/question"+Question.id;

        let _content = JSON.stringify(Question);

        return this.httpClient.put<Question>(url,_content);
    }

    deleteQuestion(assessment_id,id:number):Observable<number>
    {
        let url = this.apiBaseUrl + "/assessment/"+assessment_id+"/question"+id;
    
        return this.httpClient.delete<number>(url);

    }
}