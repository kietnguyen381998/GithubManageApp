import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  loginWithGitHub(): void {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=b88b3e32ca5bc94ac5b2')
  }

  getAccessToken(code: string) {
    return this.http.get<any>('http://localhost:3000/getAccessToken?code=' + code);
  }

  getUserData() {
    return this.http.get<any>('http://localhost:3000/getUserData');
  }

  getUsername() {
    if (sessionStorage.getItem('userInfo')) {
      return JSON.parse(sessionStorage.getItem('userInfo') as string)['login'];
    } else {
      return 'Guest';
    }
  }

  getUserAva() {
    if (sessionStorage.getItem('userInfo')) {
      return JSON.parse(sessionStorage.getItem('userInfo') as string)['avatar_url'];
    } else {
      return 'favicon.ico';
    }
  }

  logout() {
    this.deleteLocalStorage();
    window.location.href = '/'
  }

  deleteLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
  }
}
