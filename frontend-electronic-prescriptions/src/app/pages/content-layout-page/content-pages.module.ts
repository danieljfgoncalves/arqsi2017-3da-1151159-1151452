import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { ContentLayoutPageComponent } from './example/content-layout-page.component';
import { LoginPageComponent } from './login/login-page.component';



@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule        
    ],
    declarations: [
        ContentLayoutPageComponent,
        LoginPageComponent
    ]
})
export class ContentPagesModule { }
