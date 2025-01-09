import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IStudent } from '../Interfaces/student';
import { HttpService } from '../Services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {
  
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  id!: number;
  isEdit = false;

  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
     if(this.id){
      this.isEdit = true;
      this.httpService.getAllStudentById(this.id).subscribe((result)=>{
        this.studentForm.patchValue(result);
      })
     }
     else{
      this.isEdit = false;
     }


  }

  studentForm = this.formBuilder.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required]],
    department: ["", [Validators.required]],
    date: ["", [Validators.required]],
  });

  save() {
    
    const email = this.studentForm.value.email!;

    const student: IStudent = {
      id: this.id,
      name: this.studentForm.value.name!,
      email: this.studentForm.value.email!,
      phone: this.studentForm.value.phone!,
      department: this.studentForm.value.department!,
      date: new Date(this.studentForm.value.date!),
    };


   
    if(this.isEdit){
      this.httpService.updateStudents(this.id, student).subscribe(()=>{
        console.log('Student updated:', student);
      this.router.navigateByUrl("/header");
    });
    }
    
    else{
    this.httpService.checkIfEmailExists(email).subscribe((exists: boolean) => {
      if (exists) {
        alert("This email is already registered!");  // Show popup
      } 
      else {
        
        this.httpService.createStudents(student).subscribe(() => {
          console.log(student.date)
          this.router.navigateByUrl("/header");
        });
      }       
        
    });
  }
  }
}
