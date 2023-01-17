import { MaintainComponent } from "./maintain.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CategoryComponent } from "./course/category/category.component";
import { EditCategoryModalComponent } from "./course/category/modals/edit-category/edit-category-modal.component";
import { AddCategoryModalComponent } from "./course/category/modals/add-category/add-category-modal.component";
import { AddCourseComponent } from "./course/add-course/add-course.component";
import { CourseComponent } from "./course/course.component";
import { CourseItemComponent } from "src/app/admin/maintain/course/course-item/course-item.component";
import { TopicComponent } from "./topic/topic.component";
import { TopicEditComponent } from "./topic/topic-edit/topic-edit.component";
import { AssessmentComponent } from "./assessment/assessment.component";
import { AddAssessmentComponent } from "./assessment/add-assessment/add-assessment.component";
import { AddQuestionComponent } from "src/app/admin/maintain/assessment/add-question/add-question.component";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: MaintainComponent,
                children: [
                    { path: 'courses', component: CourseComponent},
                    { path: 'course/category', component: CategoryComponent },
                    { path: 'course/add', component: AddCourseComponent},
                    { path: 'course/:id', component: CourseItemComponent},
                    { path: 'course/:id/topics', component:TopicComponent},
                    { path: 'course/:course_id/topic/:topic_id', component:TopicEditComponent},
                    { path: 'assessments', component:AssessmentComponent},
                    { path: 'assessment/add', component:AddAssessmentComponent},
                    { path: 'assessment/:assessment_id', component:AddQuestionComponent}
        ]}])
    ],
    exports: [
        RouterModule
    ]
})
export class MaintainRoutingModule { }


export const MaintainRoutingComponents = [CategoryComponent,MaintainComponent,EditCategoryModalComponent,
AddCourseComponent,CourseComponent,CourseItemComponent,TopicComponent,TopicEditComponent,
AssessmentComponent,AddAssessmentComponent,AddQuestionComponent];

