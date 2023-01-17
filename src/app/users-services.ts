import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './user';
import { Observable } from 'rxjs';
import { AppConsts } from 'src/shared/AppConsts';

@Injectable()
export class UserService {

    private apiBaseUrl = AppConsts.apiBaseUrl+'/users';
    
    constructor(private httpClient: HttpClient) {
    

    }

 
    getAccessToken() {
       
       
        
    }

    getUserCount()
    {
        let url = this.apiBaseUrl + `/count`;
    
        return this.httpClient.get<number>(url);
    }

    // getUsers(accessToken: string): Observable<User[]> {

    //     var headers = new Headers({
    //         "Accept": "application/json",
    //         "Authorization": "Bearer " + accessToken,
    //     });

    //     return this.http.get(this.usersUrl, {
    //         headers: headers
    //     })
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // }
}