import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from 'app/pages/full-layout-page/example/full-layout-page.component';
import { PresentationsComponent } from 'app/pages/full-layout-page/presentations/presentations.component';
import { ChangeLogComponent } from 'app/changelog/changelog.component';
import { PresentationDetailComponent } from 'app/pages/full-layout-page/presentation-detail/presentation-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: ChangeLogComponent,
        data: {
          title: 'Dashboard Page'
        }
      },
      {
        path: 'example',
        component: FullLayoutPageComponent,
        data: {
          title: 'Example Page'
        }
      },
      {
        path: 'presentations',
        component: PresentationsComponent,
        data: {
          title: 'Presentations Page'
        }
      },
      {
        path: 'presentations/:id',
        component: PresentationDetailComponent,
        data: {
          title: 'Presentation Details Page'
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
