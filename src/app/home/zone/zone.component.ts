import { ZoneDialogComponent } from './zone-dialog/zone-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Zones } from './../../model/zone.model';
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
  displayedColumns: string[] = ['zone', 'action'];
  dataSource = new MatTableDataSource<Zones>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getZone();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getZone() {
    this.http.get<Zones[]>(`${environment.apiUrl}zones`).subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  openDialog(method: string, data?: Zones): void {
    if (method === 'addZone') {
      const dialogRef = this.dialog.open(ZoneDialogComponent, {
        data: { method: 'addZone' },
      });
    } else if (method === 'editZone') {
      const dialogRef = this.dialog.open(ZoneDialogComponent, {
        data: { method: 'editZone', zone: data },
      });
    }

    this.dialog.afterAllClosed.subscribe((res) => {
      this.getZone();
    });
  }

  editData(data: Zones): void {
    this.openDialog('editZone', data);
  }

  deleteData(data: Zones): void {
    this.http
      .delete(`${environment.apiUrl}zones/` + data.id)
      .subscribe((res) => {
        console.log('Zone ' + data.name_zone + ' has delete!');
        this.getZone();
      });
  }
}

const ELEMENT_DATA: Zones[] = [];
