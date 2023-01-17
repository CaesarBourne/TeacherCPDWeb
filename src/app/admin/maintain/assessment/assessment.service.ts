import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConsts } from 'src/shared/AppConsts';
import { Assessment } from 'src/app/admin/maintain/assessment/assessment';

@Injectable()
export class AssessmentService {


    private apiBaseUrl = AppConsts.apiBaseUrl;

    constructor(private httpClient: HttpClient) { }

    getAssessments():Observable<Assessment[]>
    {
        let url = this.apiBaseUrl + "/assessment";

        return this.httpClient.get<Assessment[]>(url);

    }

    addAssessment(assessment:Assessment)
    {
        let url = this.apiBaseUrl + "/assessment";

        let _content = JSON.stringify(assessment);
       
        return this.httpClient.post<string>(url,_content);
    }

    getAssessmentCount()
    {
        let url = this.apiBaseUrl + "/assessment/count";
    
        return this.httpClient.get(url);
    }

    getAssessment(id): Observable<Assessment>
    {
        let url = this.apiBaseUrl + "/assessment/"+id;
    
        return this.httpClient.get<Assessment>(url);

    }
    updateAssessment(Assessment:Assessment)
    {
        let url = this.apiBaseUrl + "/assessment/"+Assessment.id;

        let _content = JSON.stringify(Assessment);

        return this.httpClient.put<Assessment>(url,_content);
    }

    deleteAssessment(id:number):Observable<number>
    {
        let url = this.apiBaseUrl + "/assessment/"+id;
    
        return this.httpClient.delete<number>(url);

    }
}