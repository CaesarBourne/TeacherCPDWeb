import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppRouteGuard } from '../shared/auth/auth-route-guard';
import { AppHttpInterceptor } from '../shared/interceptors/appHttpInterceptor';
import {ModalModule} from 'ngx-bootstrap';
import { AddCategoryModalComponent } from 'src/app/admin/maintain/course/category/modals/add-category/add-category-modal.component';
import { AuthenticationModule } from '../shared/auth/authenticationModule';
import { ScriptLoaderService } from '../shared/service-proxies/script-loader.service';
import { PNotifyService } from 'src/shared/service-proxies/pnotify.service';

@NgModule({
  declarations: [
    AppComponent,AddCategoryModalComponent
  ],
  entryComponents: [AddCategoryModalComponent],
  imports: [
    BrowserModule, HttpClientModule,AppRoutingModule,ModalModule.forRoot(),AuthenticationModule
  ],
  bootstrap: [AppComponent],
  providers: [ScriptLoaderService,PNotifyService]
})
export class AppModule {



 }
