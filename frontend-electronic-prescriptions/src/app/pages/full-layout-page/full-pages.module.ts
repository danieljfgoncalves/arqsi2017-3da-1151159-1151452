import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { FullLayoutPageComponent } from './example/full-layout-page.component';
import { ChangeLogComponent } from 'app/changelog/changelog.component';
import { PresentationsComponent } from './presentations/presentations.component';
import { PresentationDetailComponent } from './presentation-detail/presentation-detail.component';
import { MedicalReceiptConsultPageComponent } from 'app/pages/full-layout-page/receipts-consult-page/receipts-consult-page.component';
import { FormsModule } from '@angular/forms';
import { FillsComponent } from 'app/shared/fills/fills.component';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        NgbModule,
        FormsModule
    ],
    declarations: [       
        FullLayoutPageComponent,
        ChangeLogComponent,
        PresentationsComponent,
        PresentationDetailComponent,
        MedicalReceiptConsultPageComponent,
        FillsComponent
    ]
})
export class FullPagesModule { }
