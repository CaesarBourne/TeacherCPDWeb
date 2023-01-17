import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/shared/auth/auth-service';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {
    constructor(private authService:AuthenticationService) { }

    ngOnInit() { 


    }

    logout()
    {
        this.authService.logout();
    }
}