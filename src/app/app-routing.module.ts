import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
  { path: "", component: RegisterComponent},
  { path: "header", component: HeaderComponent},
  { path: "create", component:CreateStudentComponent},
  { path: "create/:id", component: CreateStudentComponent},
  { path: "register", component: RegisterComponent},
  { path: "Login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
