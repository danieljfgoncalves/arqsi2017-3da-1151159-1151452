import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs/Rx';
import { MedicalReceipt } from '../../model/medical-receipt';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class MedicalReceiptService {
  
  private getUrl = environment.receipts_frontend + '/api/medicalReceipts'; 
  
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

  getReceipts(): Observable < MedicalReceipt[] > {

    return this.http.get< MedicalReceipt[] >(this.getUrl,
      this.getHeaders());
  }


}
