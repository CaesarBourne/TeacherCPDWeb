import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { AccountComponent } from "./account.component";
import { NgModule } from "@angular/core";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AccountComponent,
                children: [
                    { path: 'login', component: LoginComponent }
        ]}])
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule { }


export const AccountRoutingComponents = [AccountComponent,LoginComponent];

