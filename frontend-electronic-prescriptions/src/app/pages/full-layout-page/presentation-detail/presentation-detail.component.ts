import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Presentation } from '../../../model/presentation';
import { PresentationService } from '../../../presentation.service';

@Component({
  selector: 'app-presentation-detail',
  templateUrl: './presentation-detail.component.html',
  styleUrls: ['./presentation-detail.component.scss']
})
export class PresentationDetailComponent implements OnInit {
  
  presentation: Presentation;
   
  constructor(
    private route: ActivatedRoute,
    private presentationService: PresentationService
  ) { }

  ngOnInit() {
    this.getPresentation();
  }

  getPresentation(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.presentationService.getPresentation(id)
    .subscribe(presentation => this.presentation = presentation);
  }

}
