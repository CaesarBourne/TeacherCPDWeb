import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule, AdminRoutingComponents } from './admin-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../shared/interceptors/tokenInterceptor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


@NgModule({
    imports: [AdminRoutingModule, CommonModule, FormsModule,ChartsModule],
    exports: [],
    declarations:[AdminRoutingComponents],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
          }
    ],
})
export class AdminModule {


 }
