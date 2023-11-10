import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RepositoriesInfoComponent} from "./repositories-info/repositories-info.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'info', component: RepositoriesInfoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoriesManageRoutingModule {
}
