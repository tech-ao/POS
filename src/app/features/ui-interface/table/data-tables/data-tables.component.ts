import { Component } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import {
  apiResultFormat,
  DataService,
  pageSelection,
  routes,
} from '../../../../core/core.index';
import { datatables } from '../../../../shared/model/page.model';  
import { PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-data-tables',
    templateUrl: './data-tables.component.html',
    styleUrls: ['./data-tables.component.scss'],
    imports: [CustomPaginationComponent,MatSortModule,FormsModule,MatSortModule,RouterLink]
})
export class DataTablesComponent {
  initChecked = false;
  public tableData: Array<datatables> = [];
  public tableDataCopy: Array<datatables> = [];
  public actualData: Array<datatables> = [];
  public routes = routes;
  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<datatables>;
  public searchDataValue = '';
  public row=true;

  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService
  ) {
    this.data.getDataTable().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.dataTable) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getDataTable().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: datatables, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<datatables>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

 
  public searchData(value: string): void {
   this.searchDataValue = value.trim().toLowerCase();
   this.dataSource.filter = this.searchDataValue;
   this.tableData = this.dataSource.filteredData;
   this.row = this.tableData.length > 0;
 
   if (this.searchDataValue !== '') {
     // Handle filtered data
     this.pagination.calculatePageSize.next({
       totalData: this.tableData.length,
       pageSize: this.pageSize,
       tableData: this.tableData,
       serialNumberArray: this.tableData.map((_, i) => i + 1), 
     });
   } else {
     // Handle reset to full data
     this.pagination.calculatePageSize.next({
       totalData: this.totalData,
       pageSize: this.pageSize,
       tableData: this.tableData,
       serialNumberArray: this.serialNumberArray,
     });
   }
 }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];

        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
}
