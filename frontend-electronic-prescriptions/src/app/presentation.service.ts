import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Presentation } from './model/presentation';
import { environment } from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Prescription } from 'app/model/prescription';

@Injectable()
export class PresentationService {

  constructor(private http: HttpClient) { }

  getPresentations(): Observable<Presentation[]> {
    const url = environment.medicines_backend.url + '/api/presentations';
    return this.http.get<Presentation[]>(url);
  }

}
