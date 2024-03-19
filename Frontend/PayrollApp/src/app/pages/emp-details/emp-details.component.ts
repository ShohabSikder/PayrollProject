import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrl: './emp-details.component.css'
})
export class EmpDetailsComponent implements OnInit{


  employees:any[]=[]
  constructor(
    private service:EmployeeService
  ){}
  ngOnInit(): void {
    this.loadEmployees()
    
  }

  private loadEmployees() {
    this.service.getEmpDetails().subscribe({
      next: res =>{ this.employees = res
        console.log(res)
      },
      error:error => {console.error('Error fetching employees', error)}
    }
    );
  }

}
