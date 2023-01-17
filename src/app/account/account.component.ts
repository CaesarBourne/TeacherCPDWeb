import { ViewEncapsulation, OnInit, Component } from "@angular/core";

@Component({
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent  implements OnInit {

    versionText: string;
    currentYear: number;

    public constructor(
      
    ) {;

       // this.currentYear = new Date().getFullYear();
        //this.versionText = this.appSession.application.version + ' [' + this.appSession.application.releaseDate.format('YYYYDDMM') + ']';
    }

   
    ngOnInit(): void {
        $('body').attr('class', 'login-container bg-green');
    }

    ngOnDestroy()
    {
        $("body").removeClass('bg-green');
    }
}