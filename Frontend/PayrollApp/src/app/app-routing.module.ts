import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { AdvanceComponent } from './pages/advance/advance.component';
import { AllLeavesComponent } from './pages/allLeaves/all-leaves/all-leaves.component';
import { DepartmentComponent } from './pages/department/department.component';
import { BonusComponent } from './pages/bonus/bonus.component';
import { EmpDetailsComponent } from './pages/emp-details/emp-details.component';
import { EmpLoginComponent } from './pages/emp-login/emp-login.component';
import { EmpLayoutComponent } from './pages/emp-layout/emp-layout.component';



const routes: Routes = [
  { path: "", component: LoginComponent, },
  //   {path:"login",
  //   component:LoginComponent
  // },
  {
    path: "", component: LayoutComponent,

    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "attendance", component: AttendanceComponent },
      { path: "employee", component: EmployeeComponent },
      { path: "department", component: DepartmentComponent },
      { path: "leaves", component: LeavesComponent },
      { path: "salary", component: SalaryComponent },
      { path: "advance", component: AdvanceComponent },
      { path: "bonus", component: BonusComponent },
      { path: "allleaves", component: AllLeavesComponent },
      { path: "emp_details", component: EmpDetailsComponent },]

  },



];

//  const routes2: Routes = [
//   { path: "empLogIn", component: EmpLoginComponent },
//   {
//     path: "emplayout", component: EmpLayoutComponent,


//     children: [
//       { path: "attendance", component: AttendanceComponent },
//       { path: "leaves", component: LeavesComponent },
//     ]
//   }


// ]

@NgModule({
  imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
