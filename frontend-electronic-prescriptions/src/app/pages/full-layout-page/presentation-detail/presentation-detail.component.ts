import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Presentation } from '../../../model/presentation';
import { PresentationService } from '../../../presentation.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

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

  getPresentation() {
    const id = +this.route.snapshot.paramMap.get('id');

    Observable.forkJoin(
      this.presentationService.getPresentation(id),
      this.presentationService.getComments(id)
    ).subscribe(data => {
      this.presentation = data[0];
      this.presentation.comments = data[1];
    });
  }

}
