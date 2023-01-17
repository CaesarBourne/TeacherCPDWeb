import { AdminComponent } from "./admin.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppRouteGuard } from "../../shared/auth/auth-route-guard";
import { CourseComponent } from "./maintain/course/course.component";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AdminComponent,
                children: [
                    { path: 'dashboard', component: DashboardComponent},
                   {
                        path: 'maintain',
                        loadChildren: './maintain/maintain.module#MaintainModule',
                        data: { preload: true }
                      },
                      {
                        path: 'usermanagement',
                        loadChildren: './usermanagement/usermanagement.module#UsermanagementModule',
                        data: { preload: true }
                      }
                     
        ]}])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }


export const AdminRoutingComponents = [AdminComponent,DashboardComponent];

