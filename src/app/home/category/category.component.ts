import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/model/category';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  header = 'หมวดหมู่สินค้า';
  category: Categories;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getCategory(): void {
    this.http
      .get(`${environment.apiUrl}categories`)
      .subscribe((res: Categories) => {
        this.category = res;
      });
  }

  onSubmit(): void {}
  close(): void {}
}
