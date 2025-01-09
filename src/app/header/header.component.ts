import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";
import { IStudent } from '../Interfaces/student';
import { HttpService } from '../Services/http.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  studentList: IStudent[] = [];
  totalItems: number = 0;  // Total number of students
  totalPages: number = 0;  // Total number of pages
  pageIndex: number = 1;   // Current page index
  pageSize: number = 5;    // Number of items per page
  sortBy: string = "Name";
  sortOrder: string = "asc";
  filterValue: string = "";

  name: string = '';  
  id: string = '';    
  email: string = ''; 

  httpService = inject(HttpService);
  router = inject(Router);

  ngOnInit() {
    this.initialLoad();
  }

  initialLoad() {
    this.httpService.getStudentsByPage(this.pageIndex, this.pageSize, this.sortBy, this.sortOrder, this.filterValue)
      .subscribe((result: any) => {
        console.log("API Response:", result); 
        this.studentList = result.pageStudents;  
        this.totalItems = result.studentsTotalCount;  
        this.totalPages = Math.ceil(this.totalItems / this.pageSize); 
        console.log("Updated Student List:", this.studentList); 
      });
  }

  editStudent(id: number) {
    console.log(id);
    this.router.navigateByUrl("/create/" + id);
  }

  deleteStudent(id: number) {
    this.httpService.deleteStudent(id).subscribe(() => {
      this.studentList = this.studentList.filter(x => x.id !== id);
    });
  }

  sortData(column: string) {
    if (this.sortBy === column) {
      // Toggle between 'asc' and 'desc'
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new column and default to 'asc'
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
  
    // Reload the data with updated sorting
    this.initialLoad();
    console.log(`Sorting by ${this.sortBy} in ${this.sortOrder} order`);

  }
  
  

  onSearch() {
    // Build the filter value by concatenating name, id, and email (if provided)
    this.filterValue = `${this.name} ${this.id} ${this.email}`.trim().toLowerCase();
  
    // Reload the data with the updated filter value
    this.initialLoad();
  }
  




  // Pagination methods
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
}
