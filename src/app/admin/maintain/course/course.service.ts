import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from './course';
import { AppConsts } from 'src/shared/AppConsts';

@Injectable()
export class CourseService {


    private apiBaseUrl = AppConsts.apiBaseUrl;

    constructor(private httpClient: HttpClient) { }

    getCourses(): Observable<Course[]> {
        let url = this.apiBaseUrl + "/course";

        return this.httpClient.get<Course[]>(url);

    }

    addCourse(course: Course) {
        let url = this.apiBaseUrl + "/course";

        const uploadData = new FormData()
        
        if(course.image)
        uploadData.append('image', course.image, course.image.name);

        uploadData.append('name', course.name);
        uploadData.append('description', course.description);
        uploadData.append('difficulty', course.difficulty.toString())
        uploadData.append('prerequisites', course.prerequisites);
        uploadData.append('outcomes', course.outcomes);
        uploadData.append('syllabus', course.syllabus);

        return this.httpClient.post<string>(url, uploadData);
    }

    getCourseCount() {
        let url = this.apiBaseUrl + "/course/count";

        return this.httpClient.get<number>(url);
    }

    getCourse(id): Observable<Course> {
        let url = this.apiBaseUrl + "/course/" + id;

        return this.httpClient.get<Course>(url);

    }
    updateCourse(course: Course) {
        let url = this.apiBaseUrl + "/course/" + course.id;
      
        const uploadData = new FormData()
        
        if(course.image)
        uploadData.append('image', course.image, course.image.name);

        uploadData.append('name', course.name);
        uploadData.append('description', course.description);
        uploadData.append('difficulty', course.difficulty.toString())
        uploadData.append('prerequisites', course.prerequisites);
        uploadData.append('outcomes', course.outcomes);
        uploadData.append('syllabus', course.syllabus);

       //let headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});

        return this.httpClient.put<boolean>(url, uploadData);
    }

    deleteCourse(id: number): Observable<number> {
        let url = this.apiBaseUrl + "/course/" + id;

        return this.httpClient.delete<number>(url);

    }
}