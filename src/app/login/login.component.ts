import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../Services/http.service';
import { IUserService } from '../Interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  http = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  LoginForm = new FormGroup({
    Email: new FormControl("", [Validators.required, Validators.email]),
     Password: new FormControl("", [Validators.required])
  })


  Loginuser(){

    if(this.LoginForm.valid){
    const user : IUserService = {
      Email: this.LoginForm.value.Email!,
      Password: this.LoginForm.value.Password!,
    }
 
    this.http.loginUser(user).subscribe(result =>{
      
       if(result == 'Failure'){
        alert("Invalid");
      }
      else if(result == 'Success'){
        this.router.navigateByUrl("/header");
        alert("Login")
      }

    })
  }
    
  
}
  get Email() {
    return this.LoginForm.get("Email") as FormControl;
  }
  get Password() {
    return this.LoginForm.get("Password") as FormControl;
  }
}
