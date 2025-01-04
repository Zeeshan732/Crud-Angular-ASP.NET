import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { IStudent } from '../Interfaces/student';
import { inject, Injectable } from '@angular/core';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  studentList: IStudent[] = [];
 httpService = inject(HttpService);
 router = inject(Router);
 
 
 ngOnInit() {
  this.httpService.getallStudents().subscribe((result)=>{
    this.studentList = result;
  })
 }


 editStudent(id:number){
    
     console.log(id);
     this.router.navigateByUrl("/create/"+id);
 }
 

 deleteStudent(id:number){
  this.httpService.deleteStudent(id).subscribe(()=>{
    this.studentList = this.studentList.filter(x => x.id != id);
  })
 }
  

}
