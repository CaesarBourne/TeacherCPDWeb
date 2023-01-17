import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginModel } from './login-model';
import { finalize, catchError}  from 'rxjs/operators';
import { AuthenticationService } from '../../../shared/auth/auth-service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls:['login.component.css']
})

export class LoginComponent implements OnInit,AfterViewInit {
    
    model:LoginModel = new LoginModel();
    submitting: boolean = false;
    showError:boolean = false;

    constructor(private auth: AuthenticationService,
        private router: Router) { }


    ngOnInit() { 


    }
    ngAfterViewInit(): void {
        $('#username').focus();
    }
    submit()
    {
        this.submitting = true;
        var global = this;
        this.auth.login(this.model).pipe(
            finalize(()=>{
                this.submitting = false;
            }),
        catchError( (err)=>{
        
            return of(null);

      })
        ).subscribe(result=>
        {
            if(result)
            {
               this.router.navigateByUrl(this.auth.getInterruptedUrl())
            }
            else{
                this.showError = true;
            }
        });
    }

    hideErrorBlock(){

        this.showError = false;
    }
  
}