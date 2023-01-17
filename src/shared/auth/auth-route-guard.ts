import { Injectable } from '@angular/core';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _router: Router  ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // if (!this._tokenService.getToken()) {
        //     this._router.navigate(['/account/login']);
        //     return false;
        // }

        // if (!route.data || !route.data["permission"]) {
        //     return true;
        // }

        // // if (this._permissionChecker.isGranted(route.data["permission"])) {
        // //     return true;
        // // }

        // this._router.navigate([this.selectBestRoute()]);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    selectBestRoute(): string {
        // if (!this._sessionService.user) {
        //     return '/account/login';
        // }
        
        // if (this._permissionChecker.isGranted('Pages.Users')) {
        //     return '/app/admin/users';
        // }

        return '/admin/dashboard';
    }
}