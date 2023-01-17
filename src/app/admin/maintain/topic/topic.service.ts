import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConsts } from 'src/shared/AppConsts';
import { Topic, TopicInput } from 'src/app/admin/maintain/topic/topic';

@Injectable()
export class TopicService {


    private apiBaseUrl = AppConsts.apiBaseUrl+'/course';

    constructor(private httpClient: HttpClient) { }

    getTopics(course_id):Observable<Topic[]>
    {
        let url = this.apiBaseUrl + "/topics/"+course_id;

        return this.httpClient.get<Topic[]>(url);

    }

    addTopic(topic:TopicInput)
    {
        let url = this.apiBaseUrl +"/"+topic.course_id+"/"+ "/topic";

        const uploadData = new FormData()
        if(topic.video != null)
        uploadData.append('video',topic.video,topic.video.name);
        uploadData.append('course_id',topic.course_id); 
        uploadData.append('name',topic.name);
        uploadData.append('notes',topic.notes);
        uploadData.append('index',topic.index);

        return this.httpClient.post<Topic>(url,uploadData);
    }

    getTopic(course_id,topic_id): Observable<Topic>
    {
        let url = this.apiBaseUrl + `/${course_id}/topic/${topic_id}`;
    
        return this.httpClient.get<Topic>(url);

    }
    updateTopic(Topic:Topic)
    {
        let url = this.apiBaseUrl +"/"+Topic.course_id+ "/topic/"+Topic.id;

        let _content = JSON.stringify(Topic);

        return this.httpClient.put<Topic>(url,_content);
    }

    deleteTopic(id:number):Observable<number>
    {
        let url = this.apiBaseUrl +"/"+8+ "/topic/"+id;
    
        return this.httpClient.delete<number>(url);

    }
}