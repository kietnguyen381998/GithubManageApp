import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RepositoriesManageRoutingModule} from './repositories-manage-routing.module';
import {RepositoriesInfoComponent} from './repositories-info/repositories-info.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RepositoriesInfoComponent
  ],
  imports: [
    CommonModule,
    RepositoriesManageRoutingModule,
    SharedModule,

  ]
})
export class RepositoriesManageModule {
}
