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

@Injectable()
export class PresentationService {

  constructor(private http: HttpClient) { }

  getPresentations(): Observable<Presentation[]> {
    const url = environment.medicines_backend.url + '/api/presentations';
    return this.http.get<Presentation[]>(url);
  }

  getPresentation(id: number): Observable<Presentation> {
    const url = environment.medicines_backend.url + '/api/presentations/' + `${id}`;
    return this.http.get(url)
    .map((res: Response) => {

      let obj = JSON.parse(JSON.stringify(res));

      let medicines: string[] = new Array();
      for(var i=0; i< obj.medicines.length; i++) {
        medicines[i] = obj.medicines[i].name;
      }

      let posologies: Posology[] = new Array();
      for(var i=0; i< obj.medicines.length; i++) {
        let posology: Posology = new Posology(
          obj.posologies[i].quantity,
          obj.posologies[i].technique,
          obj.posologies[i].interval,
          obj.posologies[i].period
        );
        posologies[i] = posology;
      }

      // TODO get comments

      return new Presentation(
        obj.drug.name, medicines, posologies, 
        obj.form, obj.concentration, obj.quantity, null);
    });
  }

  /*getComments(presentationID: number): Observable<Object> {
    const url = environment.receipts_frontend.url + '/api/comments/' + `${presentationID}`;
    return this.http.get(url).filter(obj => obj.);
  }*/

}
