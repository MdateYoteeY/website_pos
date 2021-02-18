import { environment } from './../../../environments/environment.prod';
import { Table, Zone } from './../../model/table.model';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, isEmpty } from 'rxjs/operators';


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent implements AfterViewInit, OnInit {
  form: FormGroup;
  zones: Zone[] = [];
  zoneControl = new FormControl();
  displayedColumns: string[] = ['table-number', 'seat-amount', 'zone', 'status'];
  dataSource = new MatTableDataSource<Table>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private http: HttpClient
    ){

    }
  ngOnInit(): void {
    this.getZone();
    this.getTable();
    this.form = new FormGroup({
      zone: this.zoneControl,
    });
    this.zoneControl.valueChanges.pipe(debounceTime(50)).subscribe((params) => {
      this.getTable({zone_id: params});
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getZone(){
    this.http
    .get<Zone[]>(`${environment.apiUrl}zones`)
    .subscribe((res) => {
      this.zones = res;

    });
  }
  getTable(params?: any) {
    this.http
      .get<Table[]>(`${environment.apiUrl}tables`, { params })
      .subscribe((res) => {
        this.dataSource.data = res;
      });
  }
}

const ELEMENT_DATA: Table[] = [];


