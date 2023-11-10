import {Component, OnInit} from '@angular/core';
import {GithubService} from "../../../_services/github.service";
import {GeneralService} from "../../../_services/general.service";

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
  maxSize: number = 104857600;
  minUpdatedDate = new Date();
  page: number = 1;
  perPage: number = 10;
  advancedFilter: any = [
    {label: 'Owner', type: 'input', show: true},
    {label: 'Programming Language', type: 'select', show: true},
    {label: 'Minimum created date', type: 'datepicker', show: true},
    {label: 'Repositories size', type: 'slider', show: true},
  ]

  dataList: any[] = [];
  languageList: any = [];

  constructor(private gitHubService: GithubService, private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.gitHubService.getLanguage().subscribe(res => {
      this.languageList = res;
    })
  }


  getRepository() {
    const yesterday = new Date(this.minUpdatedDate);
    yesterday.setDate(this.minUpdatedDate.getDate() - 1);
    const date = this.generalService.convertMatDateToYYYYMMDD(yesterday);
    this.gitHubService.getRepository( this.owner, this.repositoryName, this.language, this.minSize, this.maxSize, date, this.page, this.perPage).subscribe(res => {
      // @ts-ignore
      if (res.total_count > 0 && res.items.length > 0) {
        // @ts-ignore
        this.dataList = res.items
      }
    })
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
}
