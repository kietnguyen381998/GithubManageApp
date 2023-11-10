import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'repositories', redirectTo: 'repositories/info'},
  {path: '', redirectTo: 'repositories', pathMatch: 'full'},
  {
    path: 'repositories',
    loadChildren: () => import(`./modules/repositories-manage/repositories-manage.module`).then(m => m.RepositoriesManageModule),
  },
  {path: '**', redirectTo: 'repositories/info'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: false,
    anchorScrolling: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
