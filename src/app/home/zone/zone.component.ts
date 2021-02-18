import { Zone } from './../../model/zone.model';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent implements AfterViewInit, OnInit {
  form: FormGroup;
  zoneControl = new FormControl();

  displayedColumns: string[] = ['zone', 'action'];

  dataSource = new MatTableDataSource<Zone>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getZone();
    this.form = new FormGroup({
      zone: this.zoneControl,
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getZone() {
    this.http.get<Zone[]>(`${environment.apiUrl}zones`).subscribe((res) => {
      this.dataSource.data = res;
      console.log(res);
    });
  }

  editData(data: Zone): void {}
  deleteData(data: Zone): void {
    this.http
      .delete(`${environment.apiUrl}zones/` + data.id)
      .subscribe((res) => {
        console.log(data.name_zone + ' has delete!');
      });
  }
}

const ELEMENT_DATA: Zone[] = [];
