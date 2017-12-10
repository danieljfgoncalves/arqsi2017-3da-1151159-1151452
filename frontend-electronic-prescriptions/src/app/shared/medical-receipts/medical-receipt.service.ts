import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs/Rx';
import { MedicalReceipt } from '../../model/medical-receipt';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'

import { Prescription } from '../../model/prescription';
import { Presentation } from '../../model/presentation';
import { Comment } from '../../model/comment';
import { Posology } from 'app/model/posology';
import { forEach } from '@angular/router/src/utils/collection';
import { Fill } from 'app/model/fill';
import { User } from 'app/model/user';

@Injectable()
export class MedicalReceiptService {
  
  private baseUrl = environment.receipts_frontend.url; 
  
  constructor(
    private http: HttpClient,
    private authService: AuthService) {}
  
  getHeaders() {
    let headers = new HttpHeaders({
      'x-access-token': this.authService.getToken()
    });
    let httpOptions = {
      headers: headers
    };
    return httpOptions;
  }

  mapReceipt(json): MedicalReceipt {

    let prescriptions: Prescription[] = new Array();
    for(let prescriptionJSON of json.prescriptions) {
      // fills
      let fills: Fill[] = new Array();
      for(let fillJSON of prescriptionJSON.fills) {
        let fill: Fill = new Fill(new Date(fillJSON.date), fillJSON.quantity);
        fills.push(fill);
      }
      // presentation
      let presentation: Presentation = new Presentation(
        null,
        prescriptionJSON.drug,
        null,
        null,
        prescriptionJSON.presentation.form,
        prescriptionJSON.presentation.concentration,
        prescriptionJSON.presentation.quantity,
        null
      );
      // Posology
      let posology: Posology = new Posology(
        prescriptionJSON.prescribedPosology.quantity,
        prescriptionJSON.prescribedPosology.technique,
        prescriptionJSON.prescribedPosology.interval,
        prescriptionJSON.prescribedPosology.period
      );

      let prescription = new Prescription(
        new Date(prescriptionJSON.expirationDate),
        prescriptionJSON.quantity,
        presentation,
        posology,
        prescriptionJSON.medicine,
        fills
      )
      prescriptions.push(prescription);
    }

    let patient: User = {
      id: json.patient.userID,
      name: json.patient.name,
      email: json.patient.email,
      mobile: json.patient.mobile,
      roles: json.patient.roles
    };

    let physician: User = {
      id: json.physician.userID,
      name: json.physician.name,
      email: json.physician.email,
      mobile: json.physician.mobile,
      roles: json.physician.roles
    };

    return new MedicalReceipt(
      prescriptions,
      new Date(json.creationDate),
      physician,
      patient
    );
  }

  getReceipts(): Observable < MedicalReceipt[] > {

    const url = this.baseUrl + '/api/medicalReceipts'

    return this.http.get< MedicalReceipt[] >(url,
      this.getHeaders()).map(res => {
        // Parse res to JSON
        let json = JSON.parse(JSON.stringify(res));

        let receipts: MedicalReceipt[] = new Array();
        for(let receipt of json) {
          receipts.push(this.mapReceipt(receipt));
        }
        return receipts;
      });
  }
}
