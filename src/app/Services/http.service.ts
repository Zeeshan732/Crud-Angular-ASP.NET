import { inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { IStudent } from '../Interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
  apiURL = "https://localhost:7181";
  constructor() { }

  http = inject(HttpClient);


  getallStudents(): Observable<IStudent[]> {

    return this.http.get<IStudent[]>(this.apiURL + "/api/Student");
  }
  checkIfEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/api/Student/check-email/${email}`);
  }
  createStudents(student: IStudent) {
    return this.http.post(this.apiURL + "/api/Student",student);
  }


  getAllStudentById(id: number) {

    return this.http.get(this.apiURL+"/api/Student/"+id);
  }


  updateStudents(id:number, student: IStudent) {
    return this.http.put<IStudent>(this.apiURL+"/api/Student/"+id, student);
  }

  deleteStudent(id: number) {
    return this.http.delete(this.apiURL+"/api/Student/"+id);
  }
}
