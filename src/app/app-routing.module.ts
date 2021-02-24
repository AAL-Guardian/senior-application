import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'demo',
    loadChildren: () => import('./modules/demo/demo.module').then(mod => mod.DemoModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then(mod => mod.MainModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
