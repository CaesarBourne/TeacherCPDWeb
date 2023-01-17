import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UsersComponent } from "./users/users.component";
import { UsermanagementComponent } from "src/app/admin/usermanagement/usermanagement.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: UsermanagementComponent,
                children: [
                   {path: 'users', component: UsersComponent},
                   {path: 'user-profile/:id', component: UserProfileComponent}
        ]}])
    ],
    exports: [
        RouterModule
    ]
})
export class UsermanagementRoutingModule { }


export const UsermanagementRoutingComponents = [UsermanagementComponent,UsersComponent,UserProfileComponent]

