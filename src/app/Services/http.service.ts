import { inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import { IStudent } from '../Interfaces/student';
import { IPageStudent } from '../Interfaces/pagestudent';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
  apiURL = "https://localhost:7179";
  constructor() { }

  http = inject(HttpClient);


  getallStudents(): Observable<IStudent[]> {

    return this.http.get<IStudent[]>(this.apiURL + "/Student/GetStudent/all");
  }

  getStudentsByPage(pageIndex: number, pageSize: number, sortBy: string, sortOrder: string, filterValue: string) {
    return this.http.get<IPageStudent>(this.apiURL + "/Student/GetStudentByPage", {
      params: new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString())
        .set('sortBy', sortBy)
        .set('sortOrder', sortOrder)
        .set('filterValue', filterValue)
    });
  }
  

  
  

  checkIfEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/Student/CheckEmailExists/check-email/${email}`);
  }
  createStudents(student: IStudent) {
    return this.http.post(this.apiURL + "/Student/CreateStudent/",student);
  }


  getAllStudentById(id: number) {

    return this.http.get(this.apiURL+"/Student/GetStudentById/"+id);
  }


  updateStudents(id:number, student: IStudent) {
    return this.http.put<IStudent>(this.apiURL+"/Student/UpdateStudent/"+id, student);
  }

  deleteStudent(id: number) {
    return this.http.delete(this.apiURL+"/Student/DeleteStudent/"+id);
  }
}
