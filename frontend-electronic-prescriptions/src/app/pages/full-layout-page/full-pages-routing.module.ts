import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from 'app/pages/full-layout-page/example/full-layout-page.component';
import { ChangeLogComponent } from 'app/changelog/changelog.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: ChangeLogComponent,
        data: {
          title: 'Change Log Page'
        }
      },
      {
        path: 'example',
        component: FullLayoutPageComponent,
        data: {
          title: 'Change Log Page'
        }
      },
      // {
      //   path: 'profile',
      //   component: UserProfilePageComponent,
      //   data: {
      //     title: 'User Profile Page'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
