import { NgModule } from '@angular/core';
import { MaintainRoutingComponents, MaintainRoutingModule } from './maintain-routing.module';
import { AddCategoryModalComponent } from './course/category/modals/add-category/add-category-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FroalaViewModule, FroalaEditorModule } from 'angular-froala-wysiwyg';



@NgModule({
    imports: [MaintainRoutingModule, CommonModule, FormsModule,
        FroalaEditorModule,FroalaViewModule],
    exports: [],
    declarations:[MaintainRoutingComponents]
})
export class MaintainModule {


 }
