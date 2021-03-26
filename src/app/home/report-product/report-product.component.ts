import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as Chart from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-product',
  templateUrl: './report-product.component.html',
  styleUrls: ['./report-product.component.scss'],
})
export class ReportProductComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
