import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../_services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName = 'Guest';
  userAva = 'favicon.ico';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('isOpenSidebar') === 'close') {
      const a: any = document.getElementById('body-container');
      a.classList.add('sidebar-collapse');
    }
    this.userName = this.authService.getUsername();
    this.userAva = this.authService.getUserAva();
  }

  logout() {
    this.authService.logout()
  }

  toggleMenu() {
    const a: any = document.getElementById('body-container');
    const hostname = window && window.location && window.location.hostname;
    if (!a.classList.contains('sidebar-collapse')) {
      localStorage.removeItem('isOpenSidebar');
      localStorage.setItem('isOpenSidebar', 'close');
    } else {
      localStorage.removeItem('isOpenSidebar');
    }
  }
}
