import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from './employee.model';
import { EmployeeService } from '../../service/employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentModel } from '../department/department.model';
import { DepartmentService } from '../../service/department.service';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employees: EmployeeModel[] = [];
  departments: DepartmentModel[] = [];
  employeeForm!: FormGroup;
  selectedEmployeeId: number | null = null;


  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.initEmployeeForm();
    this.loadDepartments();
  }

  private loadEmployees() {
    this.employeeService.getAllEmployee().subscribe(
      data => this.employees = data,
      error => console.error('Error fetching employees', error)
    );
  }

  private loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      data => this.departments = data,
      error => console.error('Error fetching departments', error)
    );
  }

  private initEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      joiningDate: [''],
      email: ['', Validators.email],
      gender: [''],
      contact: [''],
      salary: [''],
      department: ['']
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: EmployeeModel = this.employeeForm.value;
      this.employeeService.employeePost(employeeData).subscribe(
        response => {
          console.log('Employee created successfully', response);
          this.loadEmployees(); // Refresh the list of employees after creation
          this.employeeForm.reset(); // Reset the form
        },
        error => {
          console.error('Error creating employee', error);
          alert('Error creating employee. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }


  // Method to delete an employee
  // deleteEmployee(id: number) {
  //   if (confirm('Are you sure you want to delete this employee?')) {
  //     this.employeeService.deleteEmployee(id).subscribe(
  //       response => {
  //         console.log('Employee deleted successfully', response);
  //         this.loadEmployees(); // Refresh the list of employees after deletion
  //       },
  //       error => {
  //         console.error('Error deleting employee', error);
  //         alert('Error deleting employee. Please try again.');
  //       }
  //     );
  //   }
  // }

  deleteEmployee(row: any) {
    this.employeeService.deleteEmployee(row.id)
      .subscribe(res => {
        console.log(res);
        alert("Employee Deleted")
        this.employeeForm.reset();
        this.loadEmployees();

      },
        err => {
          alert("Data Not Deleted")
        }

      )

  }
  onEdit(row: EmployeeModel) {
    // Populate the form fields with the selected employee's data
    this.selectedEmployeeId = row.id; // Set the selected employee ID
    this.employeeForm.patchValue({
      name: row.name,
      joiningDate: row.joiningDate,
      email: row.email,
      gender: row.gender,
      contact: row.contact,
      salary: row.salary,
      department: row.department
    });
  }

  updateEmployee() {
    if (this.selectedEmployeeId !== null) {
      const employeeData: EmployeeModel = this.employeeForm.value;
      this.employeeService.editEmployee(this.selectedEmployeeId, employeeData).subscribe(
        response => {
          console.log('Employee updated successfully', response);
          this.loadEmployees();
          this.loadDepartments(); // Refresh the list of employees after update
          this.employeeForm.reset(); // Reset the form
          this.selectedEmployeeId = null; // Reset the selected employee ID
        },
        error => {
          console.error('Error updating employee', error);
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('An error occurred:', error.error.message);
          } else {
            // Server-side error
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
          alert('Error updating employee. Please try again.');
        }
      );
    } else {
      console.error('No employee selected for update');
    }
  }


  resetForm() {
    this.employeeForm.reset(); // Reset the form fields to their initial empty state
    this.selectedEmployeeId = null; // Reset the selected employee ID
  }

}
