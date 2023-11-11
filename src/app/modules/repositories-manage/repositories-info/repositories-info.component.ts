import {Component, HostListener, OnInit} from '@angular/core';
import {GithubService} from "../../../_services/github.service";
import {GeneralService} from "../../../_services/general.service";
import {query} from "@angular/animations";
import {HistoryService} from "../../../_services/history.service";

@Component({
  selector: 'app-repositories-info',
  templateUrl: './repositories-info.component.html',
  styleUrls: ['./repositories-info.component.scss']
})
export class RepositoriesInfoComponent implements OnInit {
  owner: string = '';
  repositoryName: string = '';
  language: string = '';
  minSize: number = 0;
  maxSize: number = 100;
  minUpdatedDate = new Date();
  page: number = 1;
  perPage: number = 15;
  languageList: any = [];
  advancedFilter: any = [
    {label: 'Owner', type: 'input', show: false},
    {label: 'Programming Language', type: 'select', show: false},
    {label: 'Minimum created date', type: 'datepicker', show: false},
    {label: 'Repositories size', type: 'slider', show: false},
  ]

  dataList: any[] = [];
  searchHistory: any [] = []

  isLoading = false;
  isError = false;

  constructor(private gitHubService: GithubService, private generalService: GeneralService, private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.searchHistory = this.historyService.getHistory();
    this.gitHubService.getLanguage().subscribe(res => {
      this.languageList = res;
    })
  }


  getRepository(str?: string) {
    let date = ''
    for (const i of this.advancedFilter) {
      if (i.type === 'datepicker' && i.show === true) {
        const yesterday = new Date(this.minUpdatedDate);
        yesterday.setDate(this.minUpdatedDate.getDate() - 1);
        date = this.generalService.convertMatDateToYYYYMMDD(yesterday);
      }
    }
    if (!this.owner && !this.repositoryName && !this.language && !date && !this.maxSize) {
      this.isError = true;
    } else {
      this.isError = false;
      let query = `q=`;
      if (str) {
        query = str
      } else {
        if (this.owner) {
          query += `user:${this.owner}+`;
        }
        if (this.repositoryName) {
          query += `${this.repositoryName}+`;
        }
        if (this.language) {
          query += `language:${this.language}+`;
        }
        if (date) {
          query += `pushed:>${date}+`;
        }
        if (this.maxSize || this.maxSize.toString() === '0') {
          query += `size:${this.minSize}..${this.maxSize*1024*1024}+`;
        }
        query += `&page=${this.page}&per_page=${this.perPage}`;
        query += `&sort=updated&order=desc`;
      }
      this.isLoading = true;
      this.gitHubService.getRepository(query).subscribe(res => {
        this.isLoading = false
        // @ts-ignore
        if (res.total_count && res.total_count > 0 && res.items && res.items.length > 0) {
          // @ts-ignore
          this.dataList = this.dataList.concat(res.items);
          this.historyService.addToHistory(query, this.owner, this.repositoryName, this.language, this.maxSize, date);
          this.searchHistory = this.historyService.getHistory();
        }
      }, error => {
        this.dataList = [];
        this.isLoading = false;
      })
    }
  }

  openDetail(obj: any) {
    this.gitHubService.getRepositoryURL(obj.owner.login, obj.name).subscribe((res: any) => {
      window.open(res.html_url, '_blank');
    })
  }

  runPastSearch(query: any): void {
    this.getRepository(query.query);
  }

  receiveSelectEvent(e: any, str: string) {
    // @ts-ignore
    this[str] = e;
  }

  eventButton(e: any) {
    if ((e.keyCode === 13 && !e.shiftKey)) {
      this.getRepository()
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.dataList.length > 0) {
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body, html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom >= docHeight - 1) {
        this.page++;
        this.getRepository();
      }
    }
  }
}
