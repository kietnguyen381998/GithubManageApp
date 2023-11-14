import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  url: any;
  menuList = [
    {link: 'repositories/info', title: 'Github Searcher', icon: 'fa-solid fa-arrow-up-short-wide'}
  ]
  subscribe: any;


  constructor(private router: Router) {
    this.subscribe = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
