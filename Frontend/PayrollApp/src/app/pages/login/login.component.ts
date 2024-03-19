import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeModel } from '../employee/employee.model';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeService } from '../../service/employee.service';
import { SalaryService } from '../../service/salary.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  UserObj: any = {
    "UserName": "admin",
    "UserName2": "shohab",
    "Password": "1234"
  }
 
  constructor(private router: Router){}
  onLogin(){
    if(this.UserObj.UserName=="admin" && this.UserObj.Password=="1234"){
      this.router.navigateByUrl("dashboard");
      
    }
    // else if(this.UserObj.UserName=="shohab" && this.UserObj.Password=="1234"){
    //   this.router.navigateByUrl("attendance");
      
    // }
   
    else{
      alert("Username and password is wrong");
    }
  }
}
