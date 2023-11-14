import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const arrayUrl = window.location.href.split('?code=');
    if (!localStorage.getItem("accessToken") && !arrayUrl[1]) {
      this.authService.deleteLocalStorage();
      this.authService.loginWithGitHub();
      return false;
    } else if (!localStorage.getItem("accessToken") && arrayUrl[1]) {
      this.authService.deleteLocalStorage();
      this.authService.getAccessToken(arrayUrl[1]).subscribe((res: any) => {
        if (res.access_token) {
          localStorage.setItem("accessToken", res.access_token);
          this.authService.getUserData().subscribe((res1) => {
            sessionStorage.setItem("userInfo", JSON.stringify(res1));
            this.authService.emitChange(res1);
          })
        }
      })
      return true;
    } else if (localStorage.getItem("accessToken")) {
      this.authService.getUserData().subscribe((res) => {
        sessionStorage.setItem("userInfo", JSON.stringify(res));
        this.authService.emitChange(res);
      })
      return true;
    }
    return false;
  }
}
