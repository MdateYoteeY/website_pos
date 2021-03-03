import { PromotionComponent } from './../promotion.component';
import { Promotionitem } from './../../../model/promotion';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';



@Component({
  selector: 'app-list-promotion-dialog',
  templateUrl: './list-promotion-dialog.component.html',
  styleUrls: ['./list-promotion-dialog.component.scss']
})
export class ListPromotionDialogComponent implements OnInit {
  displayedColumns = ['ชื่อ', 'จำนวน', 'ราคา'];
  constructor(
    public dialogRef: MatDialogRef<PromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Promotionitem) {

    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
const ELEMENT_DATA: Promotionitem[] = [];
