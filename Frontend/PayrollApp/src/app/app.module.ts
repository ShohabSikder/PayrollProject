import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvanceComponent } from './pages/advance/advance.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { LoginComponent } from './pages/login/login.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AllLeavesComponent } from './pages/allLeaves/all-leaves/all-leaves.component';
import { FilterPipe } from './filter.pipe';
import { DepartmentComponent } from './pages/department/department.component';
import { BonusComponent } from './pages/bonus/bonus.component';
import { EmpDetailsComponent } from './pages/emp-details/emp-details.component';
import { EmpLoginComponent } from './pages/emp-login/emp-login.component';
import { EmpLayoutComponent } from './pages/emp-layout/emp-layout.component';





@NgModule({
  declarations: [
    AppComponent,
    AdvanceComponent,
    AttendanceComponent,
    DashboardComponent,
    EmployeeComponent,
    LayoutComponent,
    LeavesComponent,
    LoginComponent,
    SalaryComponent,
    AllLeavesComponent,
    FilterPipe,
    DepartmentComponent,
    BonusComponent,
    EmpDetailsComponent,
    EmpLoginComponent,
    EmpLayoutComponent,
   
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

