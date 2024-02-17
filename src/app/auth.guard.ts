import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const helper = new JwtHelperService();
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = helper.decodeToken(token);
                const role = decodedToken.results[0].PhanQuyen;
                console.log(role);

                if (route.data['role'] && route.data['role'].indexOf(role) === -1) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            }
        }
        this.router.navigate(['/login']);
        return false;
    }

}
