import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrl: './emp-login.component.css'
})
export class EmpLoginComponent {

  empObj: any = {
    emp_name: "shohab@example.com",
    emp_name2: "taskinhasan@gmail.com",
    password: "1234"
  }
  constructor(private router2: Router) { }
  empLogIn() {
    if (this.empObj.emp_name == "shohab@example.com" || this.empObj.emp_name2 == "taskinhasan@gmail.com"
      && this.empObj.password == "1234") {
      this.router2.navigateByUrl("attendance");
      //  this.router.navigateByUrl("leave");
    }
    else {
      alert("user name and password is incorrect");
    }
  }

}
