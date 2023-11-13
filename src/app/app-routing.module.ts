import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./_services/auth.guard";

const routes: Routes = [
  {path: 'repositories', redirectTo: 'repositories/info'},
  {path: '', redirectTo: 'repositories/info', pathMatch: 'full'},
  {
    path: 'repositories',
    loadChildren: () => import(`./modules/repositories-manage/repositories-manage.module`).then(m => m.RepositoriesManageModule),
    canActivate: [AuthGuard]
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
