import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'zone', 'seat', 'action'];
  dataSource = new MatTableDataSource<Table>(ELEMENT_DATA);

  constructor() {}

  ngOnInit(): void {}

  openDialog(method: string): void {}
}
