import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Prescription } from 'app/model/prescription';
import 'rxjs/add/operator/map'

import { Presentation } from './model/presentation';
import { Comment } from './model/comment';
import { Posology } from 'app/model/posology';
import { AuthService } from 'app/shared/auth/auth.service';

@Injectable()
export class PresentationService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getPresentations(): Observable<Presentation[]> {
    const url = environment.medicines_backend.url + '/api/presentations';
    return this.http.get<Presentation[]>(url).map(res => {
      let presentations: Presentation[] = new Array();

      let presentationsJSON = JSON.parse(JSON.stringify(res));
      console.log(presentationsJSON);
      for(var i = 0; i < presentationsJSON.length; i++) {
        presentations[i] = this.mapPresentation(presentationsJSON[i]);
        console.log(presentations[i]);
      }

      return presentations;
    });
  }

  getPresentation(id: number): Observable<Presentation> {
    const url = environment.medicines_backend.url + '/api/presentations/' + `${id}`;
    return this.http.get(url)
    .map((res: Response) => {
      let presentationJSON = JSON.parse(JSON.stringify(res));
      return this.mapPresentation(presentationJSON);
    });
  }

  mapPresentation(presentationJSON): Presentation {

    let medicines: string[] = new Array();
    for(var i=0; i< presentationJSON.medicines.length; i++) {
      medicines[i] = presentationJSON.medicines[i].name;
    }

    let posologies: Posology[] = new Array();
    for(var i=0; i< presentationJSON.medicines.length; i++) {
      let posology: Posology = new Posology(
        presentationJSON.posologies[i].quantity,
        presentationJSON.posologies[i].technique,
        presentationJSON.posologies[i].interval,
        presentationJSON.posologies[i].period
      );
      posologies[i] = posology;
    }

    //let comments: Comment[];
    //this.getComments(presentationJSON.presentationId).subscribe(c => comments = c);

    return new Presentation(
      presentationJSON.drug.name, medicines, posologies, 
      presentationJSON.form, presentationJSON.concentration, presentationJSON.quantity, null);
  }

  getComments(presentationID: number): Observable<Comment[]> {

    let url = environment.receipts_frontend.url + '/api/comments/' + `${presentationID}`;
    console.log(url);
    let token = this.authService.getToken();
    console.log(token);
    let httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    console.log(httpOptions);

    return this.http.get(url, httpOptions).map((res: Response) => {

      let comments: Comment[] = new Array();

      let commentsJSON = JSON.parse(JSON.stringify(res));
      console.log("COMMENTSJSON: ");
      console.log(commentsJSON);

      for(var i=0; i< commentsJSON; i++) {
        comments[i] = new Comment(
          commentsJSON.comment,
          commentsJSON.physician
        );
        console.log("COMMENTS[i]: ");
        console.log(comments[i]);
      }

      return comments;
    });

  }

}
