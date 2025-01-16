import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";
import { IStudent } from '../Interfaces/student';
import { HttpService } from '../Services/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  studentList: IStudent[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  pageIndex: number = 1;
  pageSize: number = 5;
  sortBy: string = "Name";
  sortOrder: string = "asc";
  filterValue: string = "";

  name: string = '';
  id: string = '';
  email: string = '';

  errorMessage: string = '';
  loading: boolean = false;

  httpService = inject(HttpService);
  router = inject(Router);

  ngOnInit() {
    this.initialLoad();
  }

  initialLoad() {
    this.errorMessage = '';
    this.loading = true;
    this.httpService.getStudentsByPage(this.pageIndex, this.pageSize, this.sortBy, this.sortOrder, this.filterValue)
      .subscribe({
        next: (result: any) => {
          this.studentList = result.pageStudents;
          this.totalItems = result.studentsTotalCount;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  editStudent(id: number) {
    this.router.navigateByUrl("/create/" + id);
  }

  deleteStudent(id: number) {
    this.errorMessage = '';
    this.loading = true;
    this.httpService.deleteStudent(id).subscribe({
      next: () => {
        this.studentList = this.studentList.filter(x => x.id !== id);
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  sortData(column: string) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.initialLoad();
  }

  onSearch() {
    this.filterValue = `${this.name} ${this.email}`.trim().toLowerCase();
    this.initialLoad();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageIndex = page;
      this.initialLoad();
    }
  }

  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.initialLoad();
    }
  }

  previousPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.initialLoad();
    }
  }

  private handleError(error: HttpErrorResponse) {
    this.loading = false;
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = `Client error: ${error.error.message}`;
    } else {
      this.errorMessage = `Server error (${error.status}): ${error.message}`;
    }
  }
}
