import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from './category';
import { AppConsts } from '../../../../../shared/AppConsts';

@Injectable()
export class CategoryService {


    private apiBaseUrl = AppConsts.apiBaseUrl;

    constructor(private httpClient: HttpClient) { }

    getCategories():Observable<Category[]>
    {
        let url = this.apiBaseUrl + "/course/category";

        return this.httpClient.get<Category[]>(url);

    }

    addCategory(name:string)
    {
        let url = this.apiBaseUrl + "/course/category";

        let _content = JSON.stringify(
            {
                "name": name
            }
        );

        return this.httpClient.post<Category>(url,_content);
    }

    getCategory(id:number): Observable<Category>
    {
        let url = this.apiBaseUrl + "/course/category/"+id;
    
        return this.httpClient.get<Category>(url);

    }
    updateCategory(category:Category)
    {
        let url = this.apiBaseUrl + "/course/category/"+category.id;

        let _content = JSON.stringify(category);

        return this.httpClient.put<Category>(url,_content);
    }

    deleteCategory(id:number):Observable<number>
    {
        let url = this.apiBaseUrl + "/course/category/"+id;
    
        return this.httpClient.delete<number>(url);

    }
}