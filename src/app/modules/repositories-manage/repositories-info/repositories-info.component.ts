import {Component, HostListener, OnInit} from '@angular/core';
import {GithubService} from "../../../_services/github.service";
import {GeneralService} from "../../../_services/general.service";
import {HistoryService} from "../../../_services/history.service";
import {GitHubRepository, ItemLanguage} from "../../../_models/repository.model";
import {ItemHistory} from "../../../_models/history.model";

@Component({
  selector: 'app-repositories-info',
  templateUrl: './repositories-info.component.html',
  styleUrls: ['./repositories-info.component.scss']
})
export class RepositoriesInfoComponent implements OnInit {
  searchInput: any = {
    repositoryName: '',
    owner: '',
    language: '',
    minSize: null,
    maxSize: null,
    minUpdatedDate: null,
    page: 1,
    perPage: 15,
  }
  languageList: ItemLanguage[] = [];
  advancedFilter = [
    {label: 'Owner', variable: 'owner', type: 'input', show: false, default: ''},
    {label: 'Programming Language', variable: 'language', type: 'select', show: false, default: ''},
    {label: 'Minimum created date', variable: 'minUpdatedDate', type: 'datepicker', show: false, default: new Date()},
    {label: 'Repositories size', variable: 'maxSize', type: 'slider', show: false, default: 100},
  ]

  dataList: GitHubRepository[] = [];
  searchHistory: ItemHistory [] = []

  isLoading = false;
  isError = false;
  isNull = false;

  constructor(private gitHubService: GithubService, private generalService: GeneralService, private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.searchHistory = this.historyService.getHistory();
    this.gitHubService.getLanguage().subscribe(res => {
      this.languageList = res;
    })
  }


  getRepository(item?: ItemHistory) {
    let date = '';
    let query = ``;
    if (item) {
      query = item.query;
    } else {
      query = `q=`;
      if (this.searchInput.repositoryName) {
        query += `${this.searchInput.repositoryName}+`;
      }
      if (this.searchInput.owner) {
        query += `user:${this.searchInput.owner}+`;
      }
      if (this.searchInput.language) {
        query += `language:${this.searchInput.language}+`;
      }
      if (this.searchInput.minUpdatedDate) {
        const yesterday = new Date(this.searchInput.minUpdatedDate);
        yesterday.setDate(this.searchInput.minUpdatedDate.getDate() - 1);
        date = this.generalService.convertMatDateToYYYYMMDD(yesterday);
        query += `pushed:>${date}+`;
      }
      if (this.searchInput.maxSize || (this.searchInput.maxSize !== null && this.searchInput.maxSize.toString() === '0')) {
        this.searchInput.minSize = 0;
        query += `size:${this.searchInput.minSize}..${this.searchInput.maxSize * 1024 * 1024}+`;
      }
      if (query === `q=`) {
        this.isError = true;
      } else {
        query += `&page=${this.searchInput.page}&per_page=${this.searchInput.perPage}`;
        query += `&sort=updated&order=desc`;
        this.isError = false;
      }
    }
    if (query !== ``) {
      this.isLoading = true;
      this.isNull = false;
      this.gitHubService.getRepository(query).subscribe(res => {
        this.isLoading = false;
        if (res.total_count && res.total_count > 0 && res.items && res.items.length > 0) {
          if (this.searchHistory.length > 0 && this.searchInput.repositoryName === this.searchHistory[0].repositoryName
            && this.searchInput.owner === this.searchHistory[0].owner
            && this.searchInput.language === this.searchHistory[0].language
            && this.searchInput.minSize === this.searchHistory[0].minSize
            && this.searchInput.maxSize === this.searchHistory[0].maxSize
            && this.searchInput.page !== this.searchHistory[0].page
            && this.searchInput.perPage !== this.searchHistory[0].perPage)
            this.dataList = this.dataList.concat(res.items);
          else {

          }
        }
        if (item) {
          this.historyService.addToHistory(item);
        } else {
          this.historyService.addToHistory(Object.assign(this.searchInput, query));
        }
        this.searchHistory = this.historyService.getHistory();
      }, error => {
        this.dataList = [];
        this.isLoading = false;
      })
    } else {
      this.isNull = true;
    }
  }

  openDetail(obj: GitHubRepository) {
    window.open(obj.html_url, '_blank');
  }

  runPastSearch(item: ItemHistory): void {
    this.getRepository(item);
  }

  selectFilterEvent(item: any, isShow: boolean) {
    if (isShow) {
      item.show = true;
      this.searchInput[item.variable] = item.default;
    } else {
      item.show = false;
    }
  }

  receiveSelectEvent(e: string) {
    this.searchInput.language = e;
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
        this.searchInput.page++;
        this.getRepository();
      }
    }
  }
}
