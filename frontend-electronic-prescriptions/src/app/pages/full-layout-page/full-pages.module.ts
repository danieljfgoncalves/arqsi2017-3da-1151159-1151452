import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { FullLayoutPageComponent } from './example/full-layout-page.component';
import { ChangeLogComponent } from 'app/changelog/changelog.component';
import { PresentationsComponent } from './presentations/presentations.component';
import { PresentationDetailComponent } from './presentation-detail/presentation-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule   
    ],
    declarations: [       
        FullLayoutPageComponent,
        ChangeLogComponent,
        PresentationsComponent,
        PresentationDetailComponent,
    ]
})
export class FullPagesModule { }
