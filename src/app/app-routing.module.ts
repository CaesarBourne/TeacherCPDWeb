import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';

const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  {
    path: 'account',
    canActivate: [ PublicGuard ],
    loadChildren: './account/account.module#AccountModule', //Lazy load account module
    data: { preload: true }
  },
  {
    path: 'admin',
    canActivate: [ ProtectedGuard ],
    loadChildren: './admin/admin.module#AdminModule',
    data: { preload: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

export const routedComponents = [];