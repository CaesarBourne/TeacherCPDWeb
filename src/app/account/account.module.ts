import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { AccountRoutingModule, AccountRoutingComponents } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule,FormsModule,AccountRoutingModule],
    exports: [],
    declarations: [AccountRoutingComponents],
    providers: [],
})
export class AccountModule { }
