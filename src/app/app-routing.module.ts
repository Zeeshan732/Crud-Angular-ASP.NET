import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CreateStudentComponent } from './create-student/create-student.component';

const routes: Routes = [
  
  { path: "", component: HeaderComponent},
  { path: "header", component: HeaderComponent},
  { path: "create", component:CreateStudentComponent},
  { path: "create/:id", component: CreateStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
