import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName = 'Guest';
  userAva = 'favicon.ico';
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('isOpenSidebar') === 'close') {
      const a: any = document.getElementById('body-container');
      a.classList.add('sidebar-collapse');
    }
  }

  logout() {

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
