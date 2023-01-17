import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase, HttpResponse, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { catchError, map, tap, flatMap, finalize, switchMap} from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { LoginModel } from '../../app/account/login/login-model';
import { blobToText } from '../service-proxies/service-proxies';
import { LoginResult } from '../../app/account/login/loginResult';
import { AuthService } from 'ngx-auth';
import { TokenStorageService } from './token-storage.service';
import { AppConsts } from '../AppConsts';

@Injectable()
export class AuthenticationService  implements AuthService {

    private apiBaseUrl = "http://localhost:8080";
    private interruptedUrl: string;

    constructor(private httpClient: HttpClient,
        private tokenStorage:TokenStorageService) { 

        }

    isAuthorized(): Observable<boolean> {
      
        return this.tokenStorage
        .getAccessToken()
        .pipe(map(token => !!token));
    }
    getAccessToken(): Observable<string> {
        return this.tokenStorage.getAccessToken();
    }
    refreshToken(): Observable<any> {
        let url = this.apiBaseUrl + '/oauth/token/refresh';
        return this.tokenStorage
        .getRefreshToken()
        .pipe(
          switchMap((refreshToken: string) =>
            this.httpClient.post(url, { refreshToken })
          ),
          tap((tokens: TokenData) => this.saveAccessData(tokens)),
          
          catchError((err) => {
           this.logout();
            return Observable.throw(err);
          })
        );
    }
    refreshShouldHappen(response: HttpErrorResponse): boolean {
        return response.status === 403;
    }
    verifyTokenRequest(url: string): boolean {
        return url.endsWith('/token/refresh');
    }
   
    private saveAccessData({ access_token, refresh_token }: TokenData) {
        this.tokenStorage
          .setAccessToken(access_token)
          .setRefreshToken(refresh_token);
      }

      public logout(): void {
        this.tokenStorage.clear();
        location.reload(true);
      }
      
      public getInterruptedUrl(): string {
        return this.interruptedUrl;
      }
      public setInterruptedUrl(url: string): void {
        this.interruptedUrl = url;
      }
    
    login(loginModel:LoginModel)
    {
    
        let url = this.apiBaseUrl +'/oauth/token';
        let postData = {
            grant_type: "password",
            client_id: 2,
            client_secret: "YgjxK3B4S93YYdcMgNuEfNphEp9vSrhrQ2osYymh",
            username: loginModel.username,
            password: loginModel.password,
            scope: ""
        }

        return this.httpClient.post(url,postData)
        .pipe(tap((tokens: TokenData) => this.saveAccessData(tokens)));
    }

    protected processLoginResult(response: HttpResponseBase): Observable<boolean> {
        const status = response.status;
                
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;
          
        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(flatMap(_responseText => {
            let result200:LoginResult = null;
           // let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = JSON.parse(_responseText);// resultData200 ? RegisterOutput.fromJS(resultData200) : new RegisterOutput();
            
            if(result200.access_token)
            {
            //   this.tokenService.clearToken();
            //   this.tokenService.setToken(result200.access_token);

              return of(true);
            }
            return of(false);
            }));
        } else if (status !== 200 && status !== 204) {
           
            return of(false);
        }

        return of<any>(false);
    }
   
}