import {Component, OnInit} from '@angular/core';
import {GithubService} from "../../../_services/github.service";

@Component({
  selector: 'app-repositories-info',
  templateUrl: './repositories-info.component.html',
  styleUrls: ['./repositories-info.component.scss']
})
export class RepositoriesInfoComponent implements OnInit {
  owner: string = '';
  repositoryName: string = '';
  language: string = '';
  size: string = '';
  updatedDate: string = '';
  page: number = 1;
  perPage: number = 10;
  advancedFilter: any = [
    {label: 'Programming Language', type: 'select', show: true},
    {label: 'Minimum created date', type: 'datepicker', show: true},
    {label: 'Repositories size', type: 'slider', show: true},
  ]

  dataList: any = [];
  constructor(private gitHubService: GithubService) {
  }

  ngOnInit(): void {

  }


  getRepository() {
    this.gitHubService.getRepository( this.owner, this.repositoryName, this.language, this.size, this.updatedDate, this.page, this.perPage).subscribe(res => {
      // @ts-ignore
      if (res.total_count > 0 && res.items.length > 0) {
        // @ts-ignore
        this.dataList = res.items
      }
    })
  }

  eventButton(e: any) {
    if ((e.keyCode === 13 && !e.shiftKey)) {
      this.getRepository()
    }
  }
}
