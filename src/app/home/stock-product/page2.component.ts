import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class StockProductComponent implements OnInit {
  displayedColumns: string[] = [
    'productID',
    'name',
    'unitPrice',
    'amount',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor() {}

  ngOnInit(): void {}
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    productID: 1,
    name: 'HydrogenHydrogenHydrogenHydrogenHydrogen',
    unitPrice: 1.0079,
    amount: 'H',
  },
  { productID: 7, name: 'Nitrogen', unitPrice: 14.0067, amount: 'Nzzz' },
  { productID: 8, name: 'Oxygen', unitPrice: 15.9994, amount: 'O' },
  { productID: 9, name: 'Fluorine', unitPrice: 18.9984, amount: 'F' },
  { productID: 10, name: 'Neon', unitPrice: 20.1797, amount: 'Ne' },
  { productID: 11, name: 'Sodium', unitPrice: 22.9897, amount: 'Na' },
  { productID: 12, name: 'Magnesium', unitPrice: 24.305, amount: 'Mg' },
  { productID: 13, name: 'Aluminum', unitPrice: 26.9815, amount: 'Al' },
  { productID: 14, name: 'Silicon', unitPrice: 28.0855, amount: 'Si' },
  { productID: 15, name: 'Phosphorus', unitPrice: 30.9738, amount: 'P' },
  { productID: 16, name: 'Sulfur', unitPrice: 32.065, amount: 'S' },
  { productID: 17, name: 'Chlorine', unitPrice: 35.453, amount: 'Cl' },
  { productID: 18, name: 'Argon', unitPrice: 39.948, amount: 'Ar' },
  { productID: 19, name: 'Potassium', unitPrice: 39.0983, amount: 'K' },
  { productID: 20, name: 'Calcium', unitPrice: 40.078, amount: 'Ca' },
];

export interface PeriodicElement {
  name: string;
  productID: number;
  unitPrice: number;
  amount: string;
}
