import { Component, OnInit } from '@angular/core';
import { MedicalReceipt } from '../../model/medical-receipt';
import { MedicalReceiptService } from './medical-receipt.service';

@Component({
  selector: 'app-medical-receipt',
  templateUrl: './medical-receipt.component.html',
  styleUrls: ['./medical-receipt.component.scss']
})
export class MedicalReceiptComponent implements OnInit {

  private receipts: MedicalReceipt [] = [];

  constructor(private receiptService: MedicalReceiptService) { }

  ngOnInit() {
    this.receiptService.getReceipts().subscribe(receipts => {
      this.receipts = receipts;
    })
  }

}
