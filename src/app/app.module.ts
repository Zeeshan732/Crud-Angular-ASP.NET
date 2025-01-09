import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { HeaderComponent } from './header/header.component';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateStudentComponent } from './create-student/create-student.component';
import { RouterModule } from '@angular/router';
import { HttpService } from './Services/http.service';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    HeaderComponent,
    CreateStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  
  ],
  providers: [ HttpService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
