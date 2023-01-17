import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsermanagementRoutingModule, UsermanagementRoutingComponents } from 'src/app/admin/usermanagement/usermanagement-routing.module';


@NgModule({
    imports: [UsermanagementRoutingModule, CommonModule, FormsModule],
    exports: [],
    declarations:[UsermanagementRoutingComponents]
})
export class UsermanagementModule {


 }
