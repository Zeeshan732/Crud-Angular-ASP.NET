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
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } 
    else {
      
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
  
    this.initialLoad();
    console.log(`Sorting by ${this.sortBy} in ${this.sortOrder} order`);

  }
  
  

  onSearch() {
    
    this.filterValue = `${this.name} ${this.id} ${this.email}`.trim().toLowerCase();
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
}
