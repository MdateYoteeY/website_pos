import { ZoneComponent } from './../zone.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-zone-dialog',
  templateUrl: './zone-dialog.component.html',
  styleUrls: ['./zone-dialog.component.scss'],
})
export class ZoneDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ZoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
