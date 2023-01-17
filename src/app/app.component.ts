import { Component, AfterViewInit } from '@angular/core';
import { UserService } from './users-services';
import PNotify from 'pnotify/dist/es/PNotify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements AfterViewInit {
 
  title = 'app';

  constructor(private userService: UserService) {
    // this.userService.getAccessToken()
    //     .subscribe(data => {
    //         console.log(data);
    //     });
}
  

ngAfterViewInit(): void {
  PNotify.defaults.styling = 'bootstrap3'; // Bootstrap version 3
  PNotify.defaults.delay =3000;
}
}
