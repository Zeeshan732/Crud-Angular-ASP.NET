import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../Services/http.service';
import { IUser } from '../Interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formBuilder = inject(FormBuilder);
  http = inject(HttpService);

  registerForm = new FormGroup({
    Username: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z].*")]),
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", [Validators.required])
  });

  registeredSubmitted() {
    
    if (this.registerForm.valid) {
      const LoginUser: IUser = {
        Username: this.registerForm.value.Username!,
        Email: this.registerForm.value.Email!,
        Password: this.registerForm.value.Password!,
      };

      
      this.http.createUser(LoginUser).subscribe(result => {
        if(result == 'Success'){
          alert("Account Registered Succesfully!");
        }
        else if(result == 'Already Exist'){
          alert("Email Already Exists!")
        }
        else{
          alert("Something Went Wrong");

        }
        //console.log(result);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  get Username() {
    return this.registerForm.get("Username") as FormControl;
  }
  get Email() {
    return this.registerForm.get("Email") as FormControl;
  }
  get Password() {
    return this.registerForm.get("Password") as FormControl;
  }
}
